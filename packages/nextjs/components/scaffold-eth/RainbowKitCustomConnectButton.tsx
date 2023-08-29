import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useAutoConnect } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(getTargetNetwork(), account.address)
          : undefined;

        if (!connected) {
          return (
            <button className="connect-button-gradient" onClick={openConnectModal} type="button">
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported || chain.id !== configuredNetwork.id) {
          return (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-error btn-sm dropdown-toggle gap-1">
                <span>Wrong network</span>
                <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
              </label>
              <ul className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
                <li>
                  <button
                    className="btn-sm !rounded-xl flex py-3 gap-3"
                    onClick={() => switchNetwork?.(configuredNetwork.id)}
                  >
                    <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <span>Switch to {configuredNetwork.name}</span>
                  </button>
                </li>
                <li>
                  <button
                    className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                    onClick={() => disconnect()}
                  >
                    <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <span>Disconnect</span>
                  </button>
                </li>
              </ul>
            </div>
          );
        }

        return (
          <div className={`connected-button-gradient px-2 flex justify-end items-center`}>
            <div className={`dropdown ${connected ? "dropdown-end" : ""} sm:bottom-0 md:top-0`}>
              <label tabIndex={0} className="connected-button-gradient">
                <BlockieAvatar address={account.address} size={24} ensImage={account.ensAvatar} />
                <span className="ml-2 mr-1">{account.displayName}</span>
                <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
              </label>
              <ul className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
                <li>
                  <button className="menu-item btn-sm !rounded-xl flex gap-3 py-3">
                    <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <a target="_blank" href={blockExplorerAddressLink} rel="noopener noreferrer">
                      View on Block Explorer
                    </a>
                  </button>
                </li>
                <li>
                  <button
                    className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3"
                    onClick={() => disconnect()}
                  >
                    <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <span>Disconnect</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
