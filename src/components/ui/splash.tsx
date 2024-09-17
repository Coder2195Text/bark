"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

export const Splash: FC = () => {
  const { isLoading } = useUser();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`bg-white dark:bg-black z-50 fixed right-0 w-[100dvw] h-[100dvh] flex items-center justify-center transition-all duration-200 ease-in-out ${
        !mounted || isLoading ? "opacity-100 top-0" : "opacity-0 -top-full"
      }`}
    >
      <Image
        src="/icon.png"
        width={200}
        height={200}
        alt="Bark"
        className="animate-pulse"
      />
    </div>
  );
};
