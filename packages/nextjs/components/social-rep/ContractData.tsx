import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldEventHistory, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";


type EventData = {
  sender?: string;
  receiver?: string;
  score?: bigint;
  tag?: string;
  comment?: string;
  timestamp?: bigint;
};

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

  const [allEvents, setAllEvents] = useState<EventData[]>([]);

  const {
    data: reputationSetEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "ReputationServiceMachine",
    eventName: "ReputationSet",
    fromBlock: 8654330n,
    blockData: true,
  });


  useScaffoldEventSubscriber({
    contractName: "ReputationServiceMachine",
    eventName: "ReputationSet",
    listener: logs => {
      logs.map(log => {
        const eventArgs: EventData = {
          sender: log.args.sender,
          receiver: log.args.receiver,
          score: log.args.score,
          tag: log.args.tag,
          comment: log.args.comment,
          timestamp: log.args.timestamp,
        };
        console.log("📡 New ReputationSet event", eventArgs);
        setAllEvents(prevEvents => [...prevEvents, eventArgs]);
      });
    },
  });

  useEffect(() => {
    if (reputationSetEvents) {
      const historicalEvents: EventData[] = reputationSetEvents.map(event => event.args);
      console.log("Historical ReputationSet events", historicalEvents);
      setAllEvents(historicalEvents);
    }
  }, [reputationSetEvents]);

  const [showGiven, setShowGiven] = useState(true);

  const sortedEvents = allEvents.sort((a, b) => Number((b.timestamp || 0n) - (a.timestamp || 0n)));

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div className="max-w-md bg-base-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full">
        <div className="flex justify-center mb-4">
          <div className="btn-group">
            <button className={`btn ${showGiven ? 'btn-primary' : 'btn-outline'}`} onClick={() => setShowGiven(true)}>Given</button>
            <button className={`btn ${showGiven ? 'btn-outline' : 'btn-primary'}`} onClick={() => setShowGiven(false)}>Received</button>
          </div>
        </div>
        {showGiven ? (
          <>
            <h3 className="text-xl font-bold mb-3">Given Reputation To:</h3>
            <ul>
              {sortedEvents.filter(event => event.sender === address).map((event, index) => (
                <li key={index}>
                  {event.receiver}: {event.score?.toString() || '0'} (Tag: {event.tag}, Comment: {event.comment})
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mt-5 mb-3">Received Reputation From:</h3>
            <ul>
              {sortedEvents.filter(event => event.receiver === address).map((event, index) => (
                <li key={index}>
                  {event.sender}: {event.score?.toString() || '0'} (Tag: {event.tag}, Comment: {event.comment})
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};