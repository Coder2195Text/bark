import type { Metadata } from "next";
import "./globals.css";
import { FC } from "react";
import { DM_Sans, Poppins } from "next/font/google";
import { Navbar } from "@/components/ui/nav";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Bark",
  description: "Bark, share your thoughts with the world.",
};

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-popins",
});

const Layout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
        <body className={`${dmSans.variable} ${poppins.variable} `}>
          <Navbar />

          <div className="p-2 fixed w-[100dvw] sm:w-[calc(100dvw-4rem)] md:w-[calc(100dvw-13rem)] h-[100dvh] overflow-auto right-0">
            <ThemeProvider attribute="class">{children}</ThemeProvider>
          </div>
        </body>
      </UserProvider>
    </html>
  );
};

export default Layout;
