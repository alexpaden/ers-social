import React from "react";

interface IReputationData {
  score: bigint;
  timestamp: string;
  tag: string;
  otherAddress: string;
  comment?: string;
}

interface ReputationDataProps {
  item: IReputationData;
  address: string;
  showGiven: boolean;
}

const ReputationData: React.FC<ReputationDataProps> = ({ item, showGiven }) => {
  const score = item.score;
  const timestamp = new Date(parseInt(item.timestamp || "0") * 1000);
  const datePart = timestamp.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timePart = timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <li className="bg-gray-100 p-4 rounded-lg shadow mb-4 flex flex-col" style={{ height: "200px" }}>
      <div className="flex rounded p-2" style={{ height: "175px" }}>
        <div className="w-1/3 flex flex-col items-center justify-center relative rounded-lg p-4">
          <div className="absolute inset-0 rounded-lg content-box-padding">
          <div className="relative z-10">
            <div className="mb-2 rounded p-2 shadow-lg w-3/4">
              <div className="text-xxs  font-mono">
                {datePart} - {timePart}
              </div>
            </div>
            <div className="w-3/4 self-center mb-2 rounded p-2 shadow-lg">
              <div className="text-2xl font-extrabold tracking-wider">{item.tag}</div>
            </div>
            <div className="w-1/3 self-center rounded p-4 shadow-2xl ">
              <span className="text-4xl font-mono font-extrabold tracking-wider">
                {score > 0 ? "+" : ""}
                {score.toString()}
              </span>
            </div>
          </div>
          </div>
        </div>


        {/* Comment & Sender */}
        <div className="w-3/4 flex flex-col">
          <div className="text-xs text-gray-400 mb-2">
            {showGiven ? `Receiver: ${item.otherAddress}` : `Sender: ${item.otherAddress}`}
          </div>
          <div
            className="text-lg text-gray-600 flex-grow bg-gray-100 p-4 rounded border border-gray-300"
            style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333" }}
          >
            {item.comment || "Loading..."}
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReputationData;