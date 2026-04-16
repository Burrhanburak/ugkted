import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  const secret = process.env.ADMIN_DASHBOARD_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "ADMIN_DASHBOARD_SECRET tanımlı değil" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  if (!body.password || body.password !== secret) {
    return NextResponse.json({ error: "Geçersiz parola" }, { status: 401 });
  }

  const token = createAdminToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
