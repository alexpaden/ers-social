import { useCallback, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { isAddress } from "viem";
import { Address } from "viem";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

// ToDo:  move this function to an utility file
const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

/**
 * Address input with ENS name resolution
 */
export const AddressInput = ({
  value,
  name,
  placeholder,
  onChange,
  disabled,
  onKeyDown,
}: CommonInputProps<Address | string>) => {
  const { data: ensAddress, isLoading: isEnsAddressLoading } = useEnsAddress({
    name: value,
    enabled: isENS(value),
    chainId: 1,
    cacheTime: 30_000,
  });

  const [enteredEnsName, setEnteredEnsName] = useState<string>();
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({
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

  // ens => address
  useEffect(() => {
    if (!ensAddress) return;

    // ENS resolved successfully
    setEnteredEnsName(value);
    onChange(ensAddress);
  }, [ensAddress, onChange, value]);

  const handleChange = useCallback(
    (newValue: Address) => {
      setEnteredEnsName(undefined);
      onChange(newValue);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log("Key down event triggered"); // Add this line
      if (e.key === "Enter") {
        console.log("Enter key pressed"); // Add this line
        console.log("onKeyDown is:", onKeyDown); // Add this line
        onKeyDown?.(e);
      }
    },
    [onKeyDown],
  );

  const TypedInputBase = InputBase as React.FC<CommonInputProps<Address>>;

  return (
    <div className="bg-white">
      {" "}
      {/* Added bg-white here */}
      {console.log("handleKeyDown is:", handleKeyDown)} {/* Add this line */}
      <TypedInputBase
        name={name}
        placeholder="Search for ENS or Address"
        className="w-full"
        error={ensAddress === null}
        value={value}
        onChange={handleChange}
        disabled={isEnsAddressLoading || isEnsNameLoading || disabled}
        onKeyDown={handleKeyDown}
        disabled={isEnsAddressLoading || isEnsNameLoading || disabled}
        prefix={
          ensName && (
            <div className="flex bg-base-300 rounded-l-full items-center justify-center">
              {ensAvatar ? (
                <span className="w-[35px]">
                  {
                    // eslint-disable-next-line
                    <img className="w-full align-middle" src={ensAvatar} alt={`${ensAddress} avatar`} />
                  }
                </span>
              ) : null}
              <span className="text-accent px-2">{enteredEnsName ?? ensName}</span>
            </div>
          )
        }
        suffix={
          value && (
            <div className="flex items-center">
              {" "}
              {/* Added flex and items-center */}
              <Blockies className="!rounded-full" seed={value?.toLowerCase() as string} size={7} scale={5} />
            </div>
          )
        }
      />
    </div>
  );
};
