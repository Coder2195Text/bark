"use client";

import Image from "next/image";
import { FC } from "react";
import { useAccount } from "../providers/account";
import { MdHomeFilled, MdLogin } from "react-icons/md";
import { IconType } from "react-icons";

const NAV_LINKS: {
  name: string;
  icon: IconType;
}[] = [
  {
    name: "Home",
    icon: MdHomeFilled,
  },
];

export const Navbar: FC = () => {
  const { status, data } = useAccount();
  return (
    <nav className="flex flex-col fixed bottom-0 left-0  items-center justify-start text-left w-[100dvh] h-16 sm:h-[100dvh] sm:w-16 md:w-52 pb-2 bg-background">
      <Image
        src="/icon.png"
        width={64}
        height={64}
        alt=""
        className="hidden sm:block p-2"
      />

      <div className="overflow-auto flex-1 w-full p-2">
        {NAV_LINKS.map(({ name, icon: Icon }) => (
          <a
            key={name}
            className="flex items-center justify-start px-4 py-2.5 md:py-1"
            href={`/${name.toLowerCase()}`}
          >
            <Icon className="inline my-auto" />
            <span className="ml-2 hidden md:inline">{name}</span>
          </a>
        ))}
      </div>
      <hr className="my-2 hidden sm:block" />

      {status != "pending" && !data && (
        <a className="btn px-4 py-2.5 md:py-1" href="/api/auth/login">
          <MdLogin className="inline my-auto" />
          <span className="ml-2 hidden md:inline">Login</span>
        </a>
      )}
      {status == "pending" && <span>...</span>}
    </nav>
  );
};
