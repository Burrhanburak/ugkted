import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: request.nextUrl.origin,
            headers: {
                //get the cookie from the request
                cookie: request.headers.get("cookie") || "",
            },
        }
    );

    const pathName = request.nextUrl.pathname;
    const isAuthRoute = pathName.startsWith("/register");
    const isDashboardRoute = pathName.startsWith("/dashboard") || pathName.startsWith("/profile");

    if (!session) {
        if (isDashboardRoute) {
            return NextResponse.redirect(new URL("/register", request.url));
        }
    } else {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }
    // /admin — ayrı cookie oturumu (lib/admin-session); bu proxy’ye dahil değil

    return NextResponse.next();
}

/** Next.js 16: `proxy.ts` içinde literal olmalı; başka dosyadan re-export edilemez. */
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/register"],
};
