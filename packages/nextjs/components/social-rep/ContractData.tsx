import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

type DetailedReputationData = {
  otherAddress: string;
  score: bigint;
  timestamp: bigint;
  tag: string;
  commentHash: string;
  comment?: string;
};

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

export const ContractData = () => {
  const { address } = useAccount();
  const [showGiven, setShowGiven] = useState(true);
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

  const formatScore = (score: bigint, tag: string) => (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="flex items-center">
        <span className="text-4xl font-mono font-bold">
          {score > 0 ? "+" : ""}
          {score.toString()}
        </span>
      </span>
      <div className="text-xs rounded-full px-2 py-1 mt-1 truncate w-16 text-center">{tag}</div>
    </div>
  );

  useEffect(() => {
    if (givenReputationData && receivedReputationData) {
      const newCommentHashes = [...givenReputationData, ...receivedReputationData].map(item =>
        item.commentHash.slice(2),
      );
      setCommentHashes(newCommentHashes);
    }
  }, [givenReputationData, receivedReputationData]);

  const commentsFromAPI = useFetchCommentsFromAPI(commentHashes);

  const joinComments = (arr1, comments) => {
    return arr1.map(item1 => ({
      ...item1,
      comment: comments[item1.commentHash.slice(2)] || "Loading...",
    }));
  };

  const joinedData = showGiven
    ? joinComments(givenReputationData || [], commentsFromAPI)
    : joinComments(receivedReputationData || [], commentsFromAPI);

  return (
    <div className="flex flex-col justify-center items-center py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div className="max-w-2xl bg-white bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full relative z-1">
        <div className="flex justify-between items-center mb-4">
          <div className="btn-group">
            <button className={`btn ${showGiven ? "btn-primary" : "btn-outline"}`} onClick={() => setShowGiven(true)}>
              Given
            </button>
            <button className={`btn ${showGiven ? "btn-outline" : "btn-primary"}`} onClick={() => setShowGiven(false)}>
              Received
            </button>
          </div>
          <div className="flex">
            <div className="p-2 py-1 flex items-end">Total Score</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end">
              {totalScore?.toString() || "0"}
            </div>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3">{showGiven ? "Given Reputation To:" : "Received Reputation From:"}</h3>
        <ul>
          {joinedData.map((item, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
              <div className="flex justify-between items-center">
                <div className="w-1/4">{formatScore(item.score, item.tag)}</div>
                <div className="text-xs text-gray-400 ml-2 w-3/4">
                  <div>Sender: {(showGiven ? address : item.otherAddress).slice(-7)}</div>
                  <div>Receiver: {(showGiven ? item.otherAddress : address).slice(-7)}</div>
                </div>
              </div>
              <hr className="my-2" />
              <div className="text-sm text-gray-600">{item.comment || "Loading..."}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContractData;
