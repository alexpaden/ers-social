import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useAddress } from "./AddressContext";
import Blockies from "react-blockies";
import { isAddress } from "viem";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";

const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

const AddressInputComponent = () => {
  const [value, setValue] = useState("");
  const { setAddress } = useAddress();

  const { data: ensAddress } = useEnsAddress({
    name: value,
    enabled: isENS(value),
    chainId: 1,
    cacheTime: 30_000,
  });

  const { data: ensName } = useEnsName({
    address: value,
    enabled: isAddress(value),
    chainId: 1,
    cacheTime: 30_000,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    enabled: Boolean(ensName),
    chainId: 1,
    cacheTime: 30_000,
  });

  useEffect(() => {
    if (!ensAddress) return;
    setValue(ensAddress);
    setAddress(ensAddress); // Update the address in the context
  }, [ensAddress, setAddress]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        window.location.href = `/${value}`;
      }
    },
    [value],
  );

  return (
    <div className="bg-white">
      <div className="flex border-2 text-accent">
        {ensName && (
          <div className="flex bg-base-300 rounded-l-full items-center justify-center">
            {ensAvatar ? (
              <span className="w-[35px]">
                <img className="w-full align-middle" src={ensAvatar} alt={`${ensAddress} avatar`} width={35} />
              </span>
            ) : null}
            <span className="text-accent px-2">{ensName}</span>
          </div>
        )}

<input
  className={`focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-auto font-medium placeholder:text-accent/50 text-gray-400 rounded-0 bg-white ${window.innerWidth <= 768 ? 'mobile-styles' : ''}`}
  placeholder="Search for ENS or Address"
  value={value}
  onChange={handleChange}
  onKeyDown={handleKeyDown}
  autoComplete="off"
/>

        {value && (
          <div className="flex items-center">
            <Blockies className="!rounded-full" seed={value.toLowerCase()} size={7} scale={5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressInputComponent;
