import { FC, PropsWithChildren } from "react";
import { TRPCProvider } from "./trpc";
import { AccountProvider } from "./account";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <TRPCProvider>
      <AccountProvider>{children}</AccountProvider>
    </TRPCProvider>
  );
};
