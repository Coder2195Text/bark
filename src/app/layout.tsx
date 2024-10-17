import type { Metadata } from "next";
import "./globals.css";
import { FC } from "react";
import { DM_Sans, Poppins } from "next/font/google";
import { Navbar } from "@/components/ui/nav";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Splash } from "@/components/ui/splash";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Bark",
  description: "Bark, share your thoughts with the world.",
};

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-popins",
  subsets: ["latin", "latin-ext"],
});

const Layout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${poppins.variable} `}>
        <ThemeProvider attribute="class">
          <UserProvider>
            <Providers>
              <Splash />
              <Navbar />
              <div className="p-2 fixed w-[100dvw] sm:w-[calc(100dvw-4rem)] md:w-[calc(100dvw-13rem)] h-[100dvh] overflow-auto right-0">
                {children}
              </div>
            </Providers>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
