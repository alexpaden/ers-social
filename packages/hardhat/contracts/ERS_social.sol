// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


error ERS_SOCIAL__SCORE_MAX_MUST_GREATER_ZERO();
error ERS_SOCIAL__OWNER_EQUITY_CANNOT_EXCEED_100();
error ERS_SOCIAL__COMMENT_LENGTH_TOO_LONG();
error ERS_SOCIAL__INSUFFICIENT_FUNDS();
error ERS_SOCIAL__PAYMENT_TO_RECEIVER_FAILED();
error ERS_SOCIAL__REPUTATION_NOT_FOUND();
error ERS_SOCIAL__TAG_LENGTH_TOO_LONG();
error ERS_SOCIAL__INSUFFICIENT_REVENUE();


contract ReputationServiceMachine is Ownable, ReentrancyGuard {
    using EnumerableSet for EnumerableSet.AddressSet;

    // Mappings to store given and received reputations
    mapping(address => EnumerableSet.AddressSet) private givenReputation;
    mapping(address => EnumerableSet.AddressSet) private receivedReputation;

    struct ReputationData {
        uint128 packedScoreAndTimestamp; // 64 bits for score, 64 bits for timestamp
        bytes32 tag; // 256 bits for a 32-character ASCII tag
        bytes32 commentHash;
    }

    struct ReputationBatch {
        address receiver;
        int score;
        string tag;
        string comment;
    }

    struct DetailedReputationData {
        address otherAddress;
        int score;
        uint timestamp;
        string tag;
        bytes32 commentHash;
    }

    mapping(address => mapping(address => ReputationData)) public reputationData; // Nested mapping for reputation data
    mapping(address => int) public totalScore;

    uint public reputationFee;
    uint public operatorEquity;
    uint public operatorRevenue;
    uint public maxCommentBytes;
    int public maxScore;

    event ReputationSet(address indexed sender, address indexed receiver, int score, string tag, string comment, uint timestamp);
    event ReputationFeeSet(uint newPrice);
    event MaxScoreSet(int newMaxScore);
    event OperatorRevenueWithdrawn(uint amount);
    event OperatorEquitySet(uint newOperatorEquity);
    event MaxCommentBytesSet(uint newMaxCommentBytes);
    event ReputationDeleted(address indexed sender, address indexed receiver); // Event for deleting reputation
    
    
    // Constructor to initialize contract with default values
    constructor() {
        reputationFee = 0 ether;
        operatorEquity = 100;
        operatorRevenue = 0;
        maxCommentBytes = 320;
        maxScore = 2;

        // Set the deployer as the initial owner
        transferOwnership(msg.sender);
    }


    // Function to set the price of reputation
    function setReputationFee(uint _reputationFee) public onlyOwner {
        reputationFee = _reputationFee;
        emit ReputationFeeSet(_reputationFee);
    }

    // Function to set the maximum score value
    function setMaxScore(int _maxScore) public onlyOwner {
        if (_maxScore <= 0) {
            revert ERS_SOCIAL__SCORE_MAX_MUST_GREATER_ZERO();
        }
        maxScore = _maxScore;
        emit MaxScoreSet(_maxScore);
    }


    // Function to set the operator's equity
    function setOperatorEquity(uint _operatorEquity) public onlyOwner {
        if (_operatorEquity > 100) {
            revert ERS_SOCIAL__OWNER_EQUITY_CANNOT_EXCEED_100();
        }
        operatorEquity = _operatorEquity;
        emit OperatorEquitySet(_operatorEquity);
    }


    // Function to set the maximum comment bytes
    function setMaxCommentBytes(uint _maxCommentBytes) public onlyOwner {
        maxCommentBytes = _maxCommentBytes;
        emit MaxCommentBytesSet(_maxCommentBytes);
    }


    // Function to set single reputation
    function setReputation(address receiver, int score, string memory tag, string memory comment) public payable nonReentrant {
        if (msg.value < reputationFee) {
            revert ERS_SOCIAL__INSUFFICIENT_FUNDS();
        }

        // Call the internal function to set the reputation
        setReputationInternal(receiver, score, tag, comment, maxScore);

        // Refund any excess funds sent
        if (msg.value > reputationFee) {
            payable(msg.sender).transfer(msg.value - reputationFee);
        }
    }

    // Function to set reputation in batch
    function setReputationBatch(ReputationBatch[] memory reputations) public payable nonReentrant {
        uint totalBatchPrice = reputationFee * reputations.length;
        if (msg.value < totalBatchPrice) {
            revert ERS_SOCIAL__INSUFFICIENT_FUNDS();
        }

        for (uint i = 0; i < reputations.length; i++) {
            // Call the internal function to set the reputation for each batch item
            setReputationInternal(
                reputations[i].receiver,
                reputations[i].score,
                reputations[i].tag,
                reputations[i].comment,
                maxScore
            );
        }

        // Refund any excess funds sent
        if (msg.value > totalBatchPrice) {
            payable(msg.sender).transfer(msg.value - totalBatchPrice);
        }
    }


    // Internal function to handle setting reputation
    function setReputationInternal(address receiver, int score, string memory tag, string memory comment, int currentMaxScore) private {
        if (bytes(tag).length > 32) {
            revert ERS_SOCIAL__TAG_LENGTH_TOO_LONG();
        }
        if (bytes(comment).length > maxCommentBytes) {
            revert ERS_SOCIAL__COMMENT_LENGTH_TOO_LONG();
        }

        if (score > currentMaxScore) {
            score = currentMaxScore;
        } else if (score < -currentMaxScore) {
            score = -currentMaxScore;
        }

        bytes32 tagBytes = bytes32(0); // Default value if tag is empty
        if (bytes(tag).length > 0) {
            assembly {
                tagBytes := mload(add(tag, 32))
            }
        }
        bytes32 commentHash = sha256(abi.encodePacked(comment));

        uint contractRevenue;
        uint receiverRevenue;
        if (operatorEquity == 100) {
            contractRevenue = reputationFee; 
            receiverRevenue = 0; 
        } else {
            uint reputationFeeScaled = reputationFee * 100;
            contractRevenue = (reputationFeeScaled * operatorEquity) / 10000;
            receiverRevenue = reputationFee - contractRevenue;
            (bool success, ) = receiver.call{value: receiverRevenue}("");
            if (!success) {
                revert ERS_SOCIAL__PAYMENT_TO_RECEIVER_FAILED();
            }
        }


        operatorRevenue += contractRevenue;

        // If the sender has already given a reputation to the receiver, deduct it from the total
        if (reputationData[msg.sender][receiver].packedScoreAndTimestamp != 0) {
            int previousScore = int64(uint64(reputationData[msg.sender][receiver].packedScoreAndTimestamp >> 64));
            totalScore[receiver] -= previousScore;
        }

        // Pack the score and timestamp together into the 128-bit field
        uint128 packedScoreAndTimestamp = uint128(uint256(score)) << 64 | uint64(block.timestamp);

        // Set the new packed score and timestamp data along with the comment hash
        reputationData[msg.sender][receiver] = ReputationData(packedScoreAndTimestamp, tagBytes, commentHash);

        totalScore[receiver] += score;

        givenReputation[msg.sender].add(receiver);
        receivedReputation[receiver].add(msg.sender);

        emit ReputationSet(msg.sender, receiver, score, tag, comment, block.timestamp);
    }


    // Function to delete reputation
    function deleteReputation(address receiver) public {
        if (reputationData[msg.sender][receiver].packedScoreAndTimestamp == 0) {
            revert ERS_SOCIAL__REPUTATION_NOT_FOUND();
        }

        ReputationData storage data = reputationData[msg.sender][receiver];
        int packedScore = int64(uint64(data.packedScoreAndTimestamp >> 64));

        totalScore[receiver] -= packedScore;

        delete reputationData[msg.sender][receiver];

        givenReputation[msg.sender].remove(receiver);
        receivedReputation[receiver].remove(msg.sender);

        emit ReputationDeleted(msg.sender, receiver);
    }


    // Function to delete reputation in batch
    function deleteReputationBatch(address[] memory receivers) public {
        for (uint i = 0; i < receivers.length; i++) {
            deleteReputation(receivers[i]);
        }
    }


    // Function to get reputation data
    function getReputationData(address sender, address receiver) public view returns (int score, uint timestamp, string memory tag, bytes32 commentHash) {
        ReputationData storage data = reputationData[sender][receiver];
        int packedScore = int64(uint64(data.packedScoreAndTimestamp >> 64));
        uint packedTimestamp = uint64(data.packedScoreAndTimestamp);
        string memory tagString = bytes32ToString(data.tag);
        return (packedScore, packedTimestamp, tagString, data.commentHash);
    }


    // Function to convert bytes32 to string
    function bytes32ToString(bytes32 _bytes32) private pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }


    // Function to check if comment matches hash
    function isCommentMatchHash(address sender, address receiver, string memory comment) public view returns (bool) {
        ReputationData storage data = reputationData[sender][receiver];
        bytes32 storedHash = data.commentHash;
        bytes32 computedHash = sha256(abi.encodePacked(comment));

        return storedHash == computedHash;
    }


    // Function to allow the owner to withdraw a specified amount of operator revenue
    function withdrawOperatorRevenue(uint amount) public onlyOwner {
        if (amount == 0 || amount > operatorRevenue) {
            revert ERS_SOCIAL__INSUFFICIENT_REVENUE();
        }

        operatorRevenue -= amount; // Reduce the operator revenue by the specified amount

        // Transfer the specified amount to the owner
        payable(owner()).transfer(amount);

        emit OperatorRevenueWithdrawn(amount);
    }


    // Function to get addresses that have given reputation to a user
    function getAddressesGivenReputationTo(address user) public view returns (address[] memory) {
        return givenReputation[user].values();
    }

    // Function to get addresses that have received reputation from a user
    function getAddressesReceivedReputationFrom(address user) public view returns (address[] memory) {
        return receivedReputation[user].values();
    }


    // Function to get the total score for a specific address
    function getTotalScore(address user) public view returns (int) {
        return totalScore[user];
    }


    // Function to get all given reputation data for a user
    function getGivenReputationData(address user) public view returns (DetailedReputationData[] memory) {
        address[] memory addresses = givenReputation[user].values();
        DetailedReputationData[] memory result = new DetailedReputationData[](addresses.length);

        for (uint i = 0; i < addresses.length; i++) {
            (int score, uint timestamp, string memory tag, bytes32 commentHash) = getReputationData(user, addresses[i]);
            result[i] = DetailedReputationData(addresses[i], score, timestamp, tag, commentHash);
        }

        return result;
    }


    // Function to get all received reputation data for a user
    function getReceivedReputationData(address user) public view returns (DetailedReputationData[] memory) {
        address[] memory addresses = receivedReputation[user].values();
        DetailedReputationData[] memory result = new DetailedReputationData[](addresses.length);

        for (uint i = 0; i < addresses.length; i++) {
            (int score, uint timestamp, string memory tag, bytes32 commentHash) = getReputationData(addresses[i], user);
            result[i] = DetailedReputationData(addresses[i], score, timestamp, tag, commentHash);
        }

        return result;
    }
}