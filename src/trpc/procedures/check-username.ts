import { checkUsernameSchema } from "@/schema/user";
import { isAuthed, isNotBanned, p } from "..";
import prisma from "@/utils/prisma";

export const checkUsername = p
  .use(isAuthed)
  .use(isNotBanned)
  .input(checkUsernameSchema)
  .query(async ({ ctx, input }) => {
    const { username } = input;
    const exists = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    return {
      exists: Boolean(exists),
    };
  });
