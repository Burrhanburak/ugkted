import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { verifyAdminCookie } from "@/lib/admin-session";
import { AdminLogoutButton } from "./logout-button";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const secret = process.env.ADMIN_DASHBOARD_SECRET;
  if (!(await verifyAdminCookie(await cookies(), secret))) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <Link href="/admin" className="text-sm font-semibold tracking-tight">
          UGKTED Admin
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground">
            Özet
          </Link>
          <Link href="/admin/leads" className="text-muted-foreground hover:text-foreground">
            Başvurular
          </Link>
          <Link href="/admin/contact" className="text-muted-foreground hover:text-foreground">
            İletişim
          </Link>
          <AdminLogoutButton />
        </nav>
      </header>
      <main className="p-4 lg:p-6">{children}</main>
    </div>
  );
}
