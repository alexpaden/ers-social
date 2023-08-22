import { useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

type DetailedReputationData = {
  otherAddress: string;
  score: bigint;
  timestamp: bigint;
  tag: string;
  commentHash: string;
};

export const ContractData = () => {
  const { address } = useAccount();

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

  const [showGiven, setShowGiven] = useState(true);

  const formatScore = (score: bigint, tag: string) => (
    <div className="flex flex-col items-center justify-center h-full">
      <span className="flex items-center">
        <span className="text-gray-400 text-sm">(</span>
        <span className={`text-4xl font-mono font-bold ${score > 0 ? 'text-green-500' : score < 0 ? 'text-red-500' : 'text-gray-400'}`}>{score > 0 ? '+' : ''}{score.toString()}</span>
        <span className="text-gray-400 text-sm">)</span>
      </span>
      <div className="bg-blue-200 text-blue-800 text-xs rounded-full px-2 py-1 mt-1 truncate w-16 text-center">{tag}</div>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div className="max-w-2xl bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="btn-group">
            <button className={`btn ${showGiven ? 'btn-primary' : 'btn-outline'}`} onClick={() => setShowGiven(true)}>Given</button>
            <button className={`btn ${showGiven ? 'btn-outline' : 'btn-primary'}`} onClick={() => setShowGiven(false)}>Received</button>
          </div>
          <div className="bg-secondary border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-end">Total Score</div>
            <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {formatScore(totalScore || 0)}
            </div>
          </div>
        </div>
        {showGiven ? renderReputationList(givenReputationData, address) : renderReputationList(receivedReputationData, address, true)}
      </div>
    </div>
  );

  function renderReputationList(data: DetailedReputationData[] | undefined, address: string, isReceived = false) {
    return (
      <>
        <h3 className="text-xl font-bold mb-3">{isReceived ? "Received Reputation From:" : "Given Reputation To:"}</h3>
        <ul>
          {data?.map((item: DetailedReputationData, index: number) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex justify-between items-center">
                <div className="w-1/4">
                  {formatScore(item.score, item.tag)}
                </div>
                <div className="text-xs text-gray-400 ml-2 w-3/4">
                  <div>Sender: {isReceived ? address : item.otherAddress}</div>
                  <div>Receiver: {isReceived ? item.otherAddress : address}</div>
                </div>
              </div>
              <hr className="my-2" />
              <div className="text-sm text-gray-600">{item.commentHash}</div>
            </li>
          ))}
        </ul>
      </>
    );
  }
};