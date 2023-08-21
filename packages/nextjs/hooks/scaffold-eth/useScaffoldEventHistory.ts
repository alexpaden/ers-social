import { useEffect, useState } from "react";
import { Abi, AbiEvent, ExtractAbiEventNames } from "abitype";
import { Hash } from "viem";
import { usePublicClient } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { replacer } from "~~/utils/scaffold-eth/common";
import { ContractAbi, ContractName, UseScaffoldEventHistoryConfig } from "~~/utils/scaffold-eth/contract";

export const useScaffoldEventHistory = <
  TContractName extends ContractName,
  TEventName extends ExtractAbiEventNames<ContractAbi<TContractName>>,
>({
  contractName,
  eventName,
  fromBlock,
  batchSize = 2000n,
  filters,
  blockData,
  transactionData,
  receiptData,
}: UseScaffoldEventHistoryConfig<TContractName, TEventName> & { batchSize?: bigint }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo(contractName);
  const publicClient = usePublicClient();

  useEffect(() => {
    async function readEvents() {
      try {
        if (!deployedContractData) {
          throw new Error("Contract not found");
        }

        const abiEvent = (deployedContractData.abi as Abi).find(
          part => part.type === "event" && part.name === eventName,
        ) as AbiEvent;

        const latestBlock = await publicClient.getBlockNumber();
        let currentToBlock = latestBlock;
        let currentFromBlock = Math.max(Number(latestBlock) - Number(batchSize) + 1, Number(fromBlock || 8654330n));

        while (currentToBlock >= (fromBlock || 8654330n)) {
          console.log(`Reading logs from block ${currentFromBlock} to ${currentToBlock}`);
        
          const logs = await publicClient.getLogs({
            address: deployedContractData?.address,
            event: abiEvent,
            args: filters as any,
            fromBlock: BigInt(currentFromBlock), // Ensure fromBlock is a BigInt
            toBlock: BigInt(currentToBlock),     // Ensure toBlock is a BigInt
          });

          const newEvents = [];
          for (let i = logs.length - 1; i >= 0; i--) {
            newEvents.push({
              log: logs[i],
              args: logs[i].args,
              block:
                blockData && logs[i].blockHash === null
                  ? null
                  : await publicClient.getBlock({ blockHash: logs[i].blockHash as Hash }),
              transaction:
                transactionData && logs[i].transactionHash !== null
                  ? await publicClient.getTransaction({ hash: logs[i].transactionHash as Hash })
                  : null,
              receipt:
                receiptData && logs[i].transactionHash !== null
                  ? await publicClient.getTransactionReceipt({ hash: logs[i].transactionHash as Hash })
                  : null,
            });
          }

          setEvents(prevEvents => [...prevEvents, ...newEvents]);
          currentToBlock -= batchSize;
          currentFromBlock = Math.max(Number(currentToBlock) - Number(batchSize) + 1, Number(fromBlock || 8654330n));
        }

        setError(undefined);
      } catch (e: any) {
        console.error("Error reading events:", e);
        setEvents([]);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (!deployedContractLoading) {
      readEvents();
    }
  }, [
    publicClient,
    fromBlock,
    contractName,
    eventName,
    deployedContractLoading,
    deployedContractData?.address,
    deployedContractData,
    JSON.stringify(filters, replacer),
    blockData,
    transactionData,
    receiptData,
    batchSize,
  ]);

  return {
    data: events,
    isLoading: isLoading,
    error: error,
  };
};
