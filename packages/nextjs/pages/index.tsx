import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
//import { isAddress } from "viem";
//import { useEnsAddress, useEnsName } from "wagmi";
import { useEnsAddress } from "wagmi";
import { useAddress } from "~~/components/AddressContext";
import { MetaHeader } from "~~/components/MetaHeader";

// Make sure to install 'viem' or replace with equivalent function

const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

const Home = () => {
  const [value, setValue] = useState("");
  const { setAddress } = useAddress();
  const router = useRouter();
  const [renderKey, setRenderKey] = useState(0);

  const { data: ensAddress } = useEnsAddress({
    name: value,
    enabled: isENS(value),
    chainId: 1,
    cacheTime: 30_000,
  });

  // const { data: ensName } = useEnsName({
  //   address: value,
  //   enabled: isAddress(value),
  //   chainId: 1,
  //   cacheTime: 30_000,
  // });

  useEffect(() => {
    if (ensAddress) {
      setValue(ensAddress);
      setAddress(ensAddress); // Update the address in the context
    }
  }, [ensAddress, setAddress]);

  useEffect(() => {
    // Reset render key when navigating back to the home page
    setRenderKey(prevKey => prevKey + 1);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/${value}`);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center overflow-y-hidden">
      <MetaHeader title="reputation.blue" description="Social Reputation by ERS.blue (Ethereum Reputation Service)">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>

      <main className="flex flex-col items-center justify-center w-full text-center pt-dynamic">
        <h1 className="font-bold gradient-text responsive-text z-20" style={{ lineHeight: 1.5 }}>
          Your Ξ reputation
        </h1>
        <div className="sub-cta font-bold mb-8 description-darker">
          Your identity across web3, a worldly perspective from any address,
          <br />
          and your decentralised score.
        </div>

        <div className="relative w-full max-w-md" style={{ margin: 10 }}>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              key={renderKey}
              type="text"
              id="nameSearch"
              name="nameSearch"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 h-20 border-gray-300 rounded-md placeholder-darker"
              placeholder="Search for an address"
              style={{
                backgroundColor: "white",
                color: "grey",
                fontSize: "1.5em",
                fontWeight: "bold",
                opacity: 0.7,
              }}
            />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
