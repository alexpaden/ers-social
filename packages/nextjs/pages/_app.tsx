import type { AppProps } from "next/app";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { AddressProvider } from "~~/components/AddressContext";
//import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
//import DiamondIcon from "~~/components/social-rep/assets/DiamondIcon";
//import HareIcon from "~~/components/social-rep/assets/HareIcon";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

//<DiamondIcon className="absolute top-10 right-0 z-10" />
//<HareIcon className="absolute left-0 bottom-0 z-10" />

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar}>
        <AddressProvider>
          <div className="flex flex-col min-h-screen bg-full-gradient">
            {/* Gradient background */}
            <Header />
            <main className="relative flex flex-col flex-1" style={{ paddingBottom: "0" }}>
              <Component {...pageProps} />
            </main>
          </div>
        </AddressProvider>
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
