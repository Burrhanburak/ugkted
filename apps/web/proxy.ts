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
    const isAuthRoute = pathName.startsWith("/login") || pathName.startsWith("/register");
    const isAdminRoute = pathName.startsWith("/admin");
    const isDashboardRoute = pathName.startsWith("/dashboard") || pathName.startsWith("/profile");

    if (!session) {
        if (isDashboardRoute || isAdminRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    } else {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        if (isAdminRoute && session.user.role !== "ADMIN") {
            // Redirect non-admins to dashboard
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/admin/:path*",
        "/login",
        "/register",
    ],
};
