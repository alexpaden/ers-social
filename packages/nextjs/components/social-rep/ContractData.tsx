import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const ContractData = () => {
  const { address } = useAccount();

  const { data: totalScore } = useScaffoldContractRead({
    contractName: "ReputationServiceMachine",
    functionName: "getTotalScore",
    args: [address],
  });

  const { data: addressesReceivedRep } = useScaffoldContractRead({
    contractName: "ReputationServiceMachine",
    functionName: "getAddressesReceivedReputationFrom",
    args: [address],
  });

  const { data: addressesGivenRep } = useScaffoldContractRead({
    contractName: "ReputationServiceMachine",
    functionName: "getAddressesGivenReputationTo",
    args: [address],
  });

  // useScaffoldEventSubscriber({
  //   contractName: "ReputationServiceMachine", // Replace with the actual contract name
  //   eventName: "ReputationSet",
  //   listener: logs => {
  //     logs.map(log => {
  //       const { sender, receiver, score, tag, comment, timestamp } = log.args;
  //       console.log("📡 ReputationSet event", sender, receiver, score, tag, comment, timestamp);
  //     });
  //   },
  // });

  const {
    data: reputationSetEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "ReputationServiceMachine",
    eventName: "ReputationSet",
    fromBlock: 8654330n, // Update this value if needed
    blockData: true,
  });

  if (isLoadingEvents) {
    // Handle loading state
  } else if (errorReadingEvents) {
    // Handle error state
  } else if (reputationSetEvents) {
    // Check if reputationSetEvents is defined
    reputationSetEvents.map(event => {
      const { sender, receiver, score, tag, comment, timestamp } = event.args;
      console.log("Historical ReputationSet event", sender, receiver, score, tag, comment, timestamp);

      // Additional logic to display or process the historical events
    });
  } else {
    // Handle the case where reputationSetEvents is undefined, if needed
  }

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div className="max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full">
        <div className="bg-secondary border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-end">Total Score</div>
          <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalScore?.toString() || "0"}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3">Given Reputation To:</h3>
        <ul>
          {addressesGivenRep?.map(receiver => (
            <li key={receiver}>{receiver}</li>
          ))}
        </ul>

        <h3 className="text-xl font-bold mt-5 mb-3">Received Reputation From:</h3>
        <ul>
          {addressesReceivedRep?.map(sender => (
            <li key={sender}>{sender}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
