import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Vercel React Best Practices: server-cache-react
 * Per-request deduplication – multiple components calling getCachedSession()
 * in the same request will only trigger one auth check.
 *
 * Use in server components instead of direct auth.api.getSession().
 */
export const getCachedSession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
});
