"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";

export function AdminLogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-auto px-2 py-1 text-muted-foreground"
      disabled={pending}
      onClick={async () => {
        setPending(true);
        try {
          await fetch("/api/admin/logout", { method: "POST" });
          router.push("/admin/login");
          router.refresh();
        } finally {
          setPending(false);
        }
      }}
    >
      Çıkış
    </Button>
  );
}
