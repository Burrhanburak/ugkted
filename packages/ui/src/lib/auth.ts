import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET || "build-placeholder-32-chars-minimum-required",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    // Add providers here (Google, GitHub, etc.)
});
