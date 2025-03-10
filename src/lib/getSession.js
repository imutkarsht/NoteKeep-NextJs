import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSession = cache(async () => {
  const session = await getServerSession(authOptions);
  return session;
});
