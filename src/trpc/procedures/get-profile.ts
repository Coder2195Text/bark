import { p } from "..";

export const getProfile = p.query(async ({ ctx }) => {
  return ctx.profile;
});
