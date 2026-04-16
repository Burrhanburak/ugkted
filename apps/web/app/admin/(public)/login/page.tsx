"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@repo/ui/components/ui/field";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Giriş başarısız");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">UGKTED yönetim</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Ortam değişkeni{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">ADMIN_DASHBOARD_SECRET</code> ile aynı parolayı girin.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="admin-pw">Parola</FieldLabel>
            <Input
              id="admin-pw"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-xl"
            />
          </Field>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" disabled={pending} className="w-full rounded-xl">
            {pending ? "…" : "Giriş"}
          </Button>
        </FieldGroup>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4 hover:text-foreground">
          Siteye dön
        </Link>
      </p>
    </div>
  );
}
