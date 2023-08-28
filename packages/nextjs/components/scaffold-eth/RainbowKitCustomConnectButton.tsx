import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Address, Balance, BlockieAvatar } from "~~/components/scaffold-eth";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const configuredNetwork = getTargetNetwork();
  const { disconnect } = useDisconnect();
  const { switchNetwork } = useSwitchNetwork();
  const [addressCopied, setAddressCopied] = useState(false);

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
                  <button className="btn-sm !rounded-xl flex py-3 gap-3" onClick={() => switchNetwork?.(configuredNetwork.id)}>
                    <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <span>Switch to {configuredNetwork.name}</span>
                  </button>
                </li>
                <li>
                  <button className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3" onClick={() => disconnect()}>
                    <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <span>Disconnect</span>
                  </button>
                </li>
              </ul>
            </div>
          );
        }


        return (
          <div className="connected-button-gradient px-2 flex justify-end items-center">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="connected-button-gradient">
                <BlockieAvatar address={account.address} size={24} ensImage={account.ensAvatar} />
                <span className="ml-2 mr-1">{account.displayName}</span>
                <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
              </label>

              <ul className="dropdown-content menu p-2 mt-1 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
                <li>
                  {addressCopied ? (
                    <div className="btn-sm !rounded-xl flex gap-3 py-3">
                      <CheckCircleIcon className="text-xl font-normal h-6 w-4 cursor-pointer" aria-hidden="true" />
                      <span>Copy address</span>
                    </div>
                  ) : (
                    <CopyToClipboard text={account.address} onCopy={() => {
                      setAddressCopied(true);
                      setTimeout(() => {
                        setAddressCopied(false);
                      }, 800);
                    }}>
                      <div className="btn-sm !rounded-xl flex gap-3 py-3">
                        <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 cursor-pointer" aria-hidden="true" />
                        <span>Copy address</span>
                      </div>
                    </CopyToClipboard>
                  )}
                </li>
                <li>
                  <label htmlFor="qrcode-modal" className="btn-sm !rounded-xl flex gap-3 py-3">
                    <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <span>View QR Code</span>
                  </label>
                </li>
                <li>
                  <button className="menu-item btn-sm !rounded-xl flex gap-3 py-3">
                    <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    <a target="_blank" href={blockExplorerAddressLink} rel="noopener noreferrer">View on Block Explorer</a>
                  </button>
                </li>
                <li>
                  <button className="menu-item text-error btn-sm !rounded-xl flex gap-3 py-3" onClick={() => disconnect()}>
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
