"use client";

import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useAccount } from "../providers/account";
import { MdHomeFilled, MdLogin } from "react-icons/md";
import { IconType } from "react-icons";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const NAV_LINKS: {
  name: string;
  icon: IconType;
  url: string;
}[] = [
  {
    name: "Home",
    icon: MdHomeFilled,
    url: "/",
  },
];

export const Navbar: FC = () => {
  const { status, data } = useAccount();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className="flex flex-col fixed bottom-0 left-0  items-center justify-start text-left h-[100dvh] w-16 md:w-52 pb-2 border-r-1">
      <Image src="/icon.png" width={64} height={64} alt="" className="p-2" />

      <div className="overflow-auto flex-1 w-full p-2">
        {NAV_LINKS.map(({ name, icon: Icon, url }) => (
          <a
            key={name}
            className="flex items-center justify-center md:justify-start"
            href={url}
          >
            <Icon className="inline my-auto w-8 h-8 md:mx-3" />
            <span className="hidden md:inline">{name}</span>
          </a>
        ))}
      </div>
      <hr className="my-2" />
      <div className="flex flex-col md:flex-row justify-around  w-full px-2 py-1 gap-2">
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center bg-page"
        >
          <motion.svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            {
              resolvedTheme === "dark" ? (
                // sun icon
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="white"
                  strokeWidth={4}
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1.1,
                    transition: {
                      duration: 0.5,
                    },
                  }}
                />
              ) : (
                // moon icon
                <motion.path
                  stroke="black"
                  strokeWidth={4}
                  fill="none"
                  d="M 30 3.788 C 15.292 -0.764 1.172 12.313 4.584 27.326 C 7.995 42.339 26.38 48.029 37.676 37.568 C 39.456 35.92 40.921 33.961 42 31.788 C 31.223 36.407 19.487 27.627 20.876 15.985 C 21.52 10.581 24.998 5.932 30 3.788 Z"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    transition: {
                      duration: 0.5,
                    },
                  }}
                />
              )

              // sun and moon icons
            }
          </motion.svg>
        </button>
        {status != "pending" && !data && (
          <a className="btn px-4 py-2.5 md:py-1" href="/api/auth/login">
            <MdLogin className="inline my-auto" />
            <span className="ml-2 hidden md:inline">Login</span>
          </a>
        )}
        {status == "pending" && <span>...</span>}
      </div>
    </nav>
  );
};
