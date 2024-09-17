"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FC } from "react";

export const Navbar: FC = () => {
  const user = useUser();
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <nav className="flex flex-col fixed bottom-0 left-0 border-t-2 md:border-t-0 md:border-r-2 items-center justify-start text-left w-[100dvh] h-16 sm:h-[100dvh] sm:w-16 md:w-52 p-2 bg-background">
      <Image
        src="/icon.png"
        width={48}
        height={48}
        alt=""
        className="hidden sm:block"
      />
      {user.user?.email || "Not logged in"}
      <button
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        Toggle Theme
      </button>
    </nav>
  );
};
