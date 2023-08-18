import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [receiver, setReceiver] = useState("");
  const [score, setScore] = useState("");
  const [tag, setTag] = useState("");
  const [comment, setComment] = useState("");

  const scoreBigInt = score.startsWith('-') 
  ? BigInt(score.substring(1)) * BigInt(-1) 
  : BigInt(score);

const { writeAsync, isLoading } = useScaffoldContractWrite({
  contractName: "ReputationServiceMachine",
  functionName: "setReputation",
  args: [receiver, scoreBigInt, tag, comment],
  value: "0.01",
  onBlockConfirmation: (txnReceipt) => {
    console.log("📦 Transaction blockHash", txnReceipt.blockHash);
  },
});

  return (
    <div className="flex bg-base-300 relative pb-10">
      <DiamondIcon className="absolute top-24" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Set Reputation_</span>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input type="text" placeholder="Receiver Address" className="input" onChange={e => setReceiver(e.target.value)} />
            <input type="text" placeholder="Score" className="input" onChange={e => setScore(e.target.value)} />
            <input type="text" placeholder="Tag" className="input" onChange={e => setTag(e.target.value)} />
            <input type="text" placeholder="Comment" className="input" onChange={e => setComment(e.target.value)} />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeAsync()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
