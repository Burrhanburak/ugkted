import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function GET(request: Request) {
    // Verify Cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Example: Find pending members older than 7 days
    const pendingMembers = await prisma.user.findMany({
        where: {
            status: "PENDING",
            createdAt: {
                lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
        },
    });

    // Example: Send reminder emails (mocked log for now)
    console.log(`Found ${pendingMembers.length} pending members.`);

    return NextResponse.json({ success: true, count: pendingMembers.length });
}
