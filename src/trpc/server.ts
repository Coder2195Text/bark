import { router } from ".";
import { checkUsername } from "./procedures/check-username";
import { createAccount } from "./procedures/create-account";
import { getProfile } from "./procedures/get-profile";
export const appRouter = router({
  // 👇 define your queries here
  getProfile,
  checkUsername,
  // 👇 define your mutations here
  createAccount,
});

export const createContext = async () => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
