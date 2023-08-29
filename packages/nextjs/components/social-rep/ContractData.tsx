import React, { useEffect, useState } from "react";
import ReputationData from "./ReputationData";
import axios from "axios";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const useFetchCommentsFromAPI = (commentHashes: string[]) => {
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.post("https://ers-events-indexer-production-12c3.up.railway.app/comment/lookup", {
          commentHashes,
        });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (commentHashes.length > 0) {
      fetchComments();
    }
  }, [commentHashes]);

  return comments;
};

export const ContractData = ({ address }: { address: string }) => {
  //const { address } = useAccount();
  const [showGiven, setShowGiven] = useState(false);
  const [commentHashes, setCommentHashes] = useState<string[]>([]);

  const { data: givenReputationData } = useScaffoldContractRead({
    contractName: "ReputationServiceMachine",
    functionName: "getGivenReputationData",
    args: [address],
  });

  const { data: receivedReputationData } = useScaffoldContractRead({
    contractName: "ReputationServiceMachine",
    functionName: "getReceivedReputationData",
    args: [address],
  });

  const { data: totalScore } = useScaffoldContractRead({
    contractName: "ReputationServiceMachine",
    functionName: "getTotalScore",
    args: [address],
  });

  useEffect(() => {
    if (givenReputationData && receivedReputationData) {
      const newCommentHashes = [...givenReputationData, ...receivedReputationData].map(item =>
        item.commentHash.slice(2),
      );
      setCommentHashes(newCommentHashes);
    }
  }, [givenReputationData, receivedReputationData]);

  const commentsFromAPI = useFetchCommentsFromAPI(commentHashes);

  const joinComments = (arr1: ReadonlyArray<any>, comments: { [key: string]: string }): any[] => {
    return arr1.map(item1 => ({
      ...item1,
      comment: comments[item1.commentHash.slice(2)] || "Loading...",
    }));
  };

  const joinedData = showGiven
    ? joinComments(givenReputationData || [], commentsFromAPI)
    : joinComments(receivedReputationData || [], commentsFromAPI);

    return (
      <div className="p-4 sm:p-[5%] w-full mx-auto my-10 relative">
        <div className="bg-white bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full relative z-1">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-4">
            <div className="flex flex-col items-center bg-gray-200 p-2 rounded-lg shadow gradient-button mb-4 sm:mb-0">
              <div className="flex flex-col items-center">
                <div className="text-xxs text-gray-700">
                  {address}'s
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-700">
                  Total Score is
                </div>
              </div>
              <div className="flex items-center ">
                <div className="text-2xl sm:text-4xl font-bold text-center text-gray-700">
                  {totalScore?.toString() || "0"}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-1/4 items-center sm:items-end">
              <div className="btn-group mb-2">
                <button
                  style={{ borderRadius: "4px" }}
                  className={`btn ${showGiven ? "btn-outline" : "gradient-button"}`}
                  onClick={() => setShowGiven(false)}
                >
                  Received
                </button>
                <button
                  style={{ borderRadius: "4px" }}
                  className={`btn ${showGiven ? "gradient-button" : "btn-outline"}`}
                  onClick={() => setShowGiven(true)}
                >
                  Given
                </button>
              </div>
            </div>
          </div>
  
          <ul>
            {joinedData.map((item, index) => (
              <ReputationData key={index} item={item} address={address} showGiven={showGiven} />
            ))}
          </ul>
        </div>
      </div>
    );
};

export default ContractData;
