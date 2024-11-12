import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./server";
import superjson from "superjson";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "@/utils/prisma";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const base = t.middleware(async (opts) => {
  const session = await getSession();

  const profile =
    session &&
    (await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { punishment: true },
    }));

  return opts.next({
    ctx: {
      session,
      profile,
    },
  });
});

export const isNotBanned = base.unstable_pipe(async (opts) => {
  const user = opts.ctx.session?.user;
  const profile = opts.ctx.profile;

  if (user && profile?.punishment?.type === "BAN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are banned.",
    });
  }

  return opts.next();
});

// for muted
export const isNotMuted = base.unstable_pipe(async (opts) => {
  const user = opts.ctx.session?.user;
  const profile = opts.ctx.profile;

  if (
    user &&
    // since a ban is also a mute, we dont need to check for ban here, just the punishment if it exists
    profile?.punishment
  ) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are muted.",
    });
  }

  return opts.next();
});

export const isAuthed = base.unstable_pipe(async (opts) => {
  if (!opts.ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not logged in",
    });
  }

  return opts.next();
});

export const isExists = base.unstable_pipe(async (opts) => {
  const profile = opts.ctx.profile;

  if (!profile) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  return opts.next();
});

export const isNotExists = base.unstable_pipe(async (opts) => {
  const profile = opts.ctx.profile;

  if (profile) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "User not found",
    });
  }

  return opts.next();
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

export const router = t.router;
export const p = t.procedure.use(base);
