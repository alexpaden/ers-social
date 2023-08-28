import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import AddressInputComponent from "./AddressInputComponent";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <a href={href} className={`${isActive ? "bg-secondary shadow-md" : ""} hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 whitespace-nowrap`}>
      {children}
    </a>
  );
};

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef(null);
  const router = useRouter();

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), [])
  );

  const navigateToHome = () => {
    if (router.pathname !== '/' && router.pathname !== '/_error') {
      router.push('/');
    }
  };

  return (
    <div className="relative sticky lg:static top-0 navbar bg-transparent min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="flex items-center gap-2 ml-4 mr-6 cursor-pointer" onClick={navigateToHome}>
        <div className="flex relative w-10 h-10 logo-size">
          <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold leading-tight gradient-title">ERS</span>
        </div>
      </div>

      <div className="flex-grow">
        {router.pathname !== '/' && <AddressInputComponent />}
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center relative" ref={burgerMenuRef}>
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
    className="absolute right-full mt-3 p-2 shadow bg-base-100 rounded-box w-[200px]"
    onClick={() => {
      setIsDrawerOpen(false);
    }}
  >
    <li>
      <NavLink href="/">Home</NavLink>
    </li>
    <li>
      <NavLink href="/debug">
        <BugAntIcon className="h-4 w-4" />
        Debug Contract
      </NavLink>
    </li>
  </ul>
)}
      </div>
      <div className="flex items-center gap-2">
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
