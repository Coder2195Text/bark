import { router } from ".";
import { getProfile } from "./procedures/get-profile";
export const appRouter = router({
  // 👇 define your queries here
  getProfile,
  // 👇 define your mutations here
});

export const createContext = async () => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
