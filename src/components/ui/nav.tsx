"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { FC } from "react";

export const Navbar: FC = () => {
  const user = useUser();
  return (
    <nav className="flex flex-col fixed bottom-0 left-0  items-center justify-start text-left w-[100dvh] h-16 sm:h-[100dvh] sm:w-16 md:w-52 p-2 bg-background">
      <Image
        src="/icon.png"
        width={48}
        height={48}
        alt=""
        className="hidden sm:block"
      />
      {user.user?.email || "Not logged in"}
    </nav>
  );
};
