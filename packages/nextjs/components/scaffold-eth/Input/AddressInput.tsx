import { useCallback, useEffect, useState } from "react";
import Blockies from "react-blockies";
import { Address, isAddress } from "viem";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

const isENS = (address = "") => address.endsWith(".eth") || address.endsWith(".xyz");

interface AddressInputProps extends CommonInputProps<Address | string> {
  error?: boolean;
  prefix?: React.ReactNode; // Add this line
  suffix?: React.ReactNode; // Add this line if needed
}

export const AddressInput = ({ value, name, onChange, disabled }: AddressInputProps) => {
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

  useEffect(() => {
    if (!ensAddress) return;
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

  const TypedInputBase = InputBase as React.FC<AddressInputProps>;

  return (
    <div className="bg-white">
      <TypedInputBase
        name={name}
        className="w-full"
        error={ensAddress === null}
        value={value}
        onChange={handleChange}
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
              <Blockies className="!rounded-full" seed={value?.toLowerCase() as string} size={7} scale={5} />
            </div>
          )
        }
      />
    </div>
  );
};
