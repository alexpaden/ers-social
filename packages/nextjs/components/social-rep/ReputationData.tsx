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
    <li className="bg-gray-100 p-4 rounded-lg shadow mb-4 flex flex-col">
      <div className="flex flex-col rounded p-2 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-4">
          <div className="text-xs text-gray-400 mb-2">
            {showGiven ? `Receiver: ${item.otherAddress}` : `Sender: ${item.otherAddress}`}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xxs font-mono mb-1">
              {datePart} - {timePart}
            </div>
            <div className="flex items-center">
              <div className="text-2xl font-extrabold tracking-wider mb-1">{item.tag}</div>
              <span className="text-4xl font-mono font-extrabold tracking-wider ml-2">
                ({score > 0 ? "+" : ""}
                {score.toString()})
              </span>
            </div>
          </div>
        </div>

        {/* Comment */}
        <div className="w-full flex flex-col">
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
