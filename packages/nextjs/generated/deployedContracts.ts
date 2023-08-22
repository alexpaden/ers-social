const contracts = {
  84531: [
    {
      chainId: "84531",
      name: "baseGoerli",
      contracts: {
        ReputationServiceMachine: {
          address: "0x09c09308A737Ad0EA2c31ec507ba7DE8F86d223C",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__COMMENT_LENGTH_TOO_LONG",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__INSUFFICIENT_FUNDS",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__INSUFFICIENT_REVENUE",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__OWNER_EQUITY_CANNOT_EXCEED_100",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__PAYMENT_TO_RECEIVER_FAILED",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__REPUTATION_NOT_FOUND",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__SCORE_MAX_MUST_GREATER_ZERO",
              type: "error",
            },
            {
              inputs: [],
              name: "ERS_SOCIAL__TAG_LENGTH_TOO_LONG",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newMaxCommentBytes",
                  type: "uint256",
                },
              ],
              name: "MaxCommentBytesSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "int256",
                  name: "newMaxScore",
                  type: "int256",
                },
              ],
              name: "MaxScoreSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newOperatorEquity",
                  type: "uint256",
                },
              ],
              name: "OperatorEquitySet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "OperatorRevenueWithdrawn",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "ReputationDeleted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newPrice",
                  type: "uint256",
                },
              ],
              name: "ReputationFeeSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "int256",
                  name: "score",
                  type: "int256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "tag",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "comment",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
              ],
              name: "ReputationSet",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "deleteReputation",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "receivers",
                  type: "address[]",
                },
              ],
              name: "deleteReputationBatch",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getAddressesGivenReputationTo",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getAddressesReceivedReputationFrom",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getGivenReputationData",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "otherAddress",
                      type: "address",
                    },
                    {
                      internalType: "int256",
                      name: "score",
                      type: "int256",
                    },
                    {
                      internalType: "uint256",
                      name: "timestamp",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "tag",
                      type: "string",
                    },
                    {
                      internalType: "bytes32",
                      name: "commentHash",
                      type: "bytes32",
                    },
                  ],
                  internalType:
                    "struct ReputationServiceMachine.DetailedReputationData[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getReceivedReputationData",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "otherAddress",
                      type: "address",
                    },
                    {
                      internalType: "int256",
                      name: "score",
                      type: "int256",
                    },
                    {
                      internalType: "uint256",
                      name: "timestamp",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "tag",
                      type: "string",
                    },
                    {
                      internalType: "bytes32",
                      name: "commentHash",
                      type: "bytes32",
                    },
                  ],
                  internalType:
                    "struct ReputationServiceMachine.DetailedReputationData[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
              ],
              name: "getReputationData",
              outputs: [
                {
                  internalType: "int256",
                  name: "score",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "timestamp",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "tag",
                  type: "string",
                },
                {
                  internalType: "bytes32",
                  name: "commentHash",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "user",
                  type: "address",
                },
              ],
              name: "getTotalScore",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "comment",
                  type: "string",
                },
              ],
              name: "isCommentMatchHash",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxCommentBytes",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxScore",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "operatorEquity",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "operatorRevenue",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "reputationData",
              outputs: [
                {
                  internalType: "uint128",
                  name: "packedScoreAndTimestamp",
                  type: "uint128",
                },
                {
                  internalType: "bytes32",
                  name: "tag",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "commentHash",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "reputationFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxCommentBytes",
                  type: "uint256",
                },
              ],
              name: "setMaxCommentBytes",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "int256",
                  name: "_maxScore",
                  type: "int256",
                },
              ],
              name: "setMaxScore",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_operatorEquity",
                  type: "uint256",
                },
              ],
              name: "setOperatorEquity",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  internalType: "int256",
                  name: "score",
                  type: "int256",
                },
                {
                  internalType: "string",
                  name: "tag",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "comment",
                  type: "string",
                },
              ],
              name: "setReputation",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "int256",
                      name: "score",
                      type: "int256",
                    },
                    {
                      internalType: "string",
                      name: "tag",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "comment",
                      type: "string",
                    },
                  ],
                  internalType:
                    "struct ReputationServiceMachine.ReputationBatch[]",
                  name: "reputations",
                  type: "tuple[]",
                },
              ],
              name: "setReputationBatch",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_reputationFee",
                  type: "uint256",
                },
              ],
              name: "setReputationFee",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "totalScore",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdrawOperatorRevenue",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
