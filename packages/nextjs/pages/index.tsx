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
        <h1 className="font-bold gradient-text responsive-text z-20 " style={{ lineHeight: 1.5 }}>
          Your Ξ reputation
        </h1>

        <div className="sub-cta mb-8 description-darker z-20" style={{ paddingTop: 20 }}>
          Your identity across web3, a worldly perspective of any address,&nbsp;
          <span className="mobile-hidden">
            <br />
          </span>
          and your decentralised score.
        </div>

        <div className="relative w-full max-w-md" style={{ paddingLeft: 15, paddingRight: 15 }}>
          <div className="mt-1 relative shadow-sm">
            <input
              key={renderKey}
              type="text"
              id="nameSearch"
              name="nameSearch"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full h-20 border-gray-300 rounded-xl placeholder-darker border"
              placeholder="Search Ethereum . . ."
              style={{
                backgroundColor: "white",
                color: "grey",
                fontSize: "1.5em",
                fontWeight: "bold",
                opacity: 0.7,
                padding: 45,
                paddingLeft: 20,
                paddingRight: 10,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
