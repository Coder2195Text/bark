"use client";
import { GetProfileOutput, trpc } from "@/trpc/client";
import { AppRouter } from "@/trpc/server";
import { TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { FC, PropsWithChildren, createContext, useContext } from "react";

type AccountQuery = UseTRPCQueryResult<
  GetProfileOutput,
  TRPCClientErrorLike<AppRouter>
>;

const AccountContext = createContext<AccountQuery>({} as AccountQuery);

export const AccountProvider: FC<PropsWithChildren> = ({ children }) => {
  const account = trpc.getProfile.useQuery();

  return (
    <AccountContext.Provider value={account}>
      {children}
    </AccountContext.Provider>
  );
};
export const useAccount = () => {
  return useContext(AccountContext);
};
