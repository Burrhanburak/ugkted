"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Mail, Phone, User } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";
import Image from "next/image";

const inputClass =
  "h-10 rounded-xl border-zinc-950/10 bg-background text-sm shadow-none md:text-sm";

const textareaClass = cn(
  "placeholder:text-muted-foreground min-h-[100px] w-full rounded-xl border border-zinc-950/10 bg-background px-3 py-2.5 text-sm shadow-none",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none resize-y",
  "disabled:opacity-50"
);

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const firstName = String(fd.get("firstName") ?? "").trim();
    const lastName = String(fd.get("lastName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const activityArea = String(fd.get("activityArea") ?? "").trim();
    setStatus("pending");
    setErrMsg(null);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, activityArea }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrMsg(data.error ?? "Gönderilemedi");
        setStatus("err");
        return;
      }
      setStatus("ok");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrMsg("Ağ hatası");
      setStatus("err");
    }
  }

  if (status === "ok") {
    return (
      <div
        className={cn(
          "flex flex-col gap-6 rounded-2xl border border-emerald-600/25 bg-emerald-50/80 p-6 text-center dark:border-emerald-500/30 dark:bg-emerald-950/40",
          className
        )}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">Üye başvurunuz alındı</h1>
          <p className="text-sm text-muted-foreground text-balance leading-relaxed">
            Başvurunuz kaydedildi ve yönetim kurulumuz tarafından inceleniyor. Değerlendirme tamamlandığında{" "}
            <span className="font-medium text-foreground">e-posta veya telefon</span> ile bilgilendirileceksiniz.
          </p>
        </div>
        <Button asChild className="h-10 w-full rounded-xl border border-zinc-950/10 bg-[#eb0010] text-background hover:bg-[#eb0010]/90">
          <Link href="/">Ana sayfaya dön</Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          Sorunuz varsa{" "}
          <Link href="/contact" className="font-medium underline underline-offset-4 hover:text-primary">
            iletişim
          </Link>{" "}
          sayfasından yazabilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <form {...props} className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit}>
      <FieldGroup className="gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex flex-col items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-10 items-center justify-center rounded-xl">
              <Image src="/favicon.ico" className="" alt="UGKTED" width={30} height={30} />
            </div>
            <span className="sr-only">UGKTED</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Dernek üyeliği başvurusu</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Şifre veya hesap oluşturma yoktur. Bilgileriniz yalnızca başvuruyu değerlendirmek için kaydedilir.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Ad</FieldLabel>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="name"
                name="firstName"
                placeholder="Adınız"
                required
                disabled={status === "pending"}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="surname">Soyad</FieldLabel>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="surname"
                name="lastName"
                placeholder="Soyadınız"
                required
                disabled={status === "pending"}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">E-posta</FieldLabel>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@email.com"
              required
              disabled={status === "pending"}
              className={cn(inputClass, "pl-10")}
            />
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Telefon</FieldLabel>
          <div className="relative">
            <Phone
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="05xx xxx xx xx"
              required
              disabled={status === "pending"}
              className={cn(inputClass, "pl-10")}
            />
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="activityArea">Faaliyet alanı</FieldLabel>
          <textarea
            id="activityArea"
            name="activityArea"
            placeholder="Hangi alanda faaliyet göstermek veya UGKTED ile nasıl iş birliği yapmak istediğinizi kısaca yazın (ör. kültür, eğitim, girişimcilik, gönüllülük…)."
            required
            rows={4}
            disabled={status === "pending"}
            className={textareaClass}
          />
          <FieldDescription>En az birkaç cümle; başvurunuzun değerlendirilmesine yardımcı olur.</FieldDescription>
        </Field>

        {errMsg ? <p className="text-center text-sm text-destructive">{errMsg}</p> : null}

        <Field>
          <Button
            type="submit"
            disabled={status === "pending"}
            className="h-10 w-full rounded-xl border border-zinc-950/10 bg-[#eb0010] text-background hover:bg-[#eb0010]/90"
          >
            {status === "pending" ? "Gönderiliyor…" : "Başvuruyu gönder"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Sorularınız için{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
            iletişime geçin
          </Link>
          .
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
