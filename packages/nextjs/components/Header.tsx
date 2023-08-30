import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <a
      href={href}
      className={`${
        isActive ? "bg-secondary shadow-md" : ""
      } hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 whitespace-nowrap`}
    >
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
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const navigateToHome = () => {
    if (router.pathname !== "/" && router.pathname !== "/_error") {
      router.push("/");
    }
  };

  return (
    <div className="relative sticky lg:static top-0 navbar bg-transparent min-h-0 flex-shrink-0 flex justify-between z-40 px-0 sm:px-2">
      {/* ERS+logo conditionally shown based on route */}
      <div
        className={`flex items-center ml-4 cursor-pointer ${router.pathname !== "/" ? "hidden lg:flex" : "flex"}`}
        onClick={navigateToHome}
      >
        <div className="flex relative w-10 h-10 logo-size">
          <img alt="SE2 logo" className="cursor-pointer" src="/logo.svg" style={{ width: 37 }} />
        </div>
        <div className="flex flex-col -ml-5">
          <span className="font-bold leading-tight gradient-title">ΞRS</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="connect-button-gradient lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
          ref={burgerMenuRef}
        >
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

        {/* Button as-is for desktop */}
        <div className="connect-button-gradient hidden lg:flex justify-end">
          <RainbowKitCustomConnectButton />
        </div>

        {/* Floating button for mobile */}
        <div className="connect-button-gradient lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
          <RainbowKitCustomConnectButton />
        </div>

        {/* Hamburger for mobile */}
        <div className="lg:hidden absolute right-0 top-2" ref={burgerMenuRef}>
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
      </div>
    </div>
  );
};
