import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "ugkted_admin";
const PAYLOAD = "ugkted-admin-v1";

export function createAdminToken(secret: string): string {
  const sig = createHmac("sha256", secret).update(PAYLOAD).digest("base64url");
  return `${PAYLOAD}.${sig}`;
}

export function verifyAdminToken(token: string | undefined, secret: string): boolean {
  if (!token || !secret) return false;
  const [p, s] = token.split(".");
  if (p !== PAYLOAD || !s) return false;
  const expected = createHmac("sha256", secret).update(PAYLOAD).digest("base64url");
  if (expected.length !== s.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(s));
  } catch {
    return false;
  }
}

type CookieStore = { get: (name: string) => { value: string } | undefined };

export function verifyAdminCookie(cookies: CookieStore, secret: string | undefined): boolean {
  if (!secret) return false;
  return verifyAdminToken(cookies.get(ADMIN_COOKIE)?.value, secret);
}
