import { prisma } from "@repo/database";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAdminCookie } from "@/lib/admin-session";

function escapeCsv(value: string): string {
  const safe = value.replace(/"/g, '""');
  return /[",\n]/.test(safe) ? `"${safe}"` : safe;
}

export async function GET() {
  const secret = process.env.ADMIN_DASHBOARD_SECRET;
  if (!(await verifyAdminCookie(await cookies(), secret))) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const rows = await prisma.membershipLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 10000,
  });

  const header = [
    "createdAt",
    "firstName",
    "lastName",
    "email",
    "phone",
    "activityArea",
    "source",
  ];

  const lines = rows.map((row) =>
    [
      row.createdAt.toISOString(),
      row.firstName,
      row.lastName,
      row.email,
      row.phone ?? "",
      row.activityArea ?? "",
      row.source,
    ]
      .map((cell) => escapeCsv(String(cell)))
      .join(","),
  );

  const csv = ["\uFEFF" + header.join(","), ...lines].join("\n");
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="membership-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
