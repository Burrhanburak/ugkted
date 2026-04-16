import { prisma } from "@repo/database";

export default async function AdminLeadsPage() {
  const leads = await prisma.membershipLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Üyelik başvuruları</h1>
        <a
          href="/api/admin/export/leads"
          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted"
        >
          CSV dışa aktar
        </a>
      </div>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-3 py-2 font-medium">Tarih</th>
              <th className="px-3 py-2 font-medium">Ad</th>
              <th className="px-3 py-2 font-medium">Soyad</th>
              <th className="px-3 py-2 font-medium">E-posta</th>
              <th className="px-3 py-2 font-medium">Telefon</th>
              <th className="px-3 py-2 font-medium">Faaliyet</th>
              <th className="px-3 py-2 font-medium">Kaynak</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted-foreground">
                  Henüz kayıt yok. <code className="rounded bg-muted px-1">/api/membership</code> veya Worker{" "}
                  <code className="rounded bg-muted px-1">/data/leads</code> ile eklenir.
                </td>
              </tr>
            ) : (
              leads.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">
                    {row.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="px-3 py-2">{row.firstName}</td>
                  <td className="px-3 py-2">{row.lastName}</td>
                  <td className="px-3 py-2">{row.email}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.phone ?? "—"}</td>
                  <td className="max-w-[200px] truncate px-3 py-2 text-muted-foreground" title={row.activityArea ?? ""}>
                    {row.activityArea ? `${row.activityArea.slice(0, 80)}${row.activityArea.length > 80 ? "…" : ""}` : "—"}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{row.source}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
