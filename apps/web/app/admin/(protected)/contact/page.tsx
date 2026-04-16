import { prisma } from "@repo/database";

export default async function AdminContactPage() {
  const rows = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">İletişim formu mesajları</h1>
        <a
          href="/api/admin/export/contact"
          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted"
        >
          CSV dışa aktar
        </a>
      </div>
      <p className="text-sm text-muted-foreground">
        <code className="rounded bg-muted px-1">/contact</code> sayfasından gelen gönderiler.
      </p>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-3 py-2 font-medium">Tarih</th>
              <th className="px-3 py-2 font-medium">Ad</th>
              <th className="px-3 py-2 font-medium">E-posta</th>
              <th className="px-3 py-2 font-medium">Konu</th>
              <th className="px-3 py-2 font-medium">Mesaj</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted-foreground">
                  Henüz mesaj yok.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0 align-top">
                  <td className="px-3 py-2 tabular-nums text-muted-foreground whitespace-nowrap">
                    {row.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="px-3 py-2">{row.name}</td>
                  <td className="px-3 py-2">{row.email}</td>
                  <td className="px-3 py-2 max-w-[140px]">{row.subject}</td>
                  <td className="px-3 py-2 text-muted-foreground whitespace-pre-wrap break-words max-w-md">
                    {row.message}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
