import { prisma } from "@repo/database";

export default async function AdminHomePage() {
  const [total, last7] = await Promise.all([
    prisma.membershipLead.count(),
    prisma.membershipLead.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 864e5) } },
    }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Özet</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Toplam başvuru</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">{total}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">Son 7 gün</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">{last7}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Neon <code className="rounded bg-muted px-1">DATABASE_URL</code> ile senkron. Cloudflare Worker aynı tabloya{" "}
        <code className="rounded bg-muted px-1">POST /data/leads</code> ile yazabilir.
      </p>
    </div>
  );
}
