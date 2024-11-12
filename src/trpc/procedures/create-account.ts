import { createUserSchema } from "@/schema/user";
import { isAuthed, isNotExists, p } from "..";
import prisma from "@/utils/prisma";

export const createAccount = p
  .use(isAuthed)
  .use(isNotExists)
  .input(createUserSchema)
  .mutation(async ({ input, ctx }) => {
    return await prisma.user.create({
      data: {
        ...input,
        email: ctx.session!.user.email,
      },
    });
  });
