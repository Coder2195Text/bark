import type { AppRouter } from "./server";
import { createTRPCReact } from "@trpc/react-query";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCReact<AppRouter>({});
