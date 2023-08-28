import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { AddressInput } from "~~/components/scaffold-eth/Input/AddressInput";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import AddressInputComponent from "./AddressInputComponent";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2`}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleAddressChange = useCallback((newAddress: React.SetStateAction<string>) => {
    setAddress(newAddress);
  }, []);

  const handleAddressSubmit = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      console.log("handleAddressSubmit called"); // Add this line
      if (address) {
        router.push(`/${address}`);
      }
    },
    [address, router],
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/debug">
          <BugAntIcon className="h-4 w-4" />
          Debug Contract
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky lg:static top-0 navbar bg-transparent min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="flex items-center gap-2 ml-4 mr-6">
        <div className="flex relative w-10 h-10">
          <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold leading-tight">Social Reputation</span>
          <span className="text-xs">by ERS.blue</span>
        </div>
      </div>

      <div className="flex-grow">
        <AddressInputComponent />
      </div>

      <div className="flex-grow"></div>

      <div className="flex items-center" ref={burgerMenuRef}>
        <label
          tabIndex={0}
          className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
          onClick={() => {
            setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
          }}
        >
          <Bars3Icon className="h-1/2" />
        </label>
        {isDrawerOpen && (
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            onClick={() => {
              setIsDrawerOpen(false);
            }}
          >
            {navLinks}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-2">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
