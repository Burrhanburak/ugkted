"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Tag, User } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";

const inputClass =
  "h-10 rounded-xl border-zinc-950/10 bg-background text-sm shadow-none md:text-sm";

const textareaClassName = cn(
  "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
  "min-h-[140px] w-full min-w-0 rounded-xl border border-zinc-950/10 bg-background px-3 py-2.5 text-sm shadow-none",
  "transition-[color,box-shadow] outline-none resize-y",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
);

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [status, setStatus] = useState<"idle" | "pending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const subject = String(fd.get("subject") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    setStatus("pending");
    setErrMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrMsg(data.error ?? "Gönderilemedi");
        setStatus("err");
        return;
      }
      setStatus("ok");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setErrMsg("Ağ hatası — bağlantınızı kontrol edin.");
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
        {...props}
      >
        <div className="mx-auto justify-center  flex size-14 items-center rounded-full bg-emerald-600/15 text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Mesajınız iletildi</h2>
          <p className="text-sm text-muted-foreground text-balance leading-relaxed">
            Form gönderildi. Ekibimiz en kısa sürede e-posta adresinize dönüş yapabilir.
          </p>
        </div>
        <Button asChild variant="outline" className="h-10 w-full rounded-xl">
          <Link href="/">Ana sayfaya dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <FieldGroup className="gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex flex-col items-center gap-2 font-medium">
              <span className="sr-only">UGKTED</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Bize ulaşın</h1>
            <FieldDescription className="text-balance">
              Sorularınız veya önerileriniz için formu doldurun. Üye olmak ister misiniz?{" "}
              <Link
                href="/register"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                Üyelik başvurusu
              </Link>
            </FieldDescription>
          </div>

          {errMsg ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-center text-sm text-destructive">
              {errMsg}
            </p>
          ) : null}

          <Field>
            <FieldLabel htmlFor="contact-name">Ad Soyad</FieldLabel>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Adınız Soyadınız"
                required
                disabled={status === "pending"}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="contact-email">E-posta</FieldLabel>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ornek@gmail.com"
                required
                disabled={status === "pending"}
                className={cn(inputClass, "pl-10")}
              />
            </div>
            <FieldDescription>
              Size bu adres üzerinden döneceğiz; e-postanızı üçüncü kişilerle paylaşmayız.
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="contact-subject">Konu</FieldLabel>
            <div className="relative">
              <Tag
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Mesajınızın konusu"
                required
                disabled={status === "pending"}
                className={cn(inputClass, "pl-10")}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="contact-message">Mesajınız</FieldLabel>
            <div className="relative">
              <MessageSquare
                className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
                aria-hidden
              />
              <textarea
                id="contact-message"
                name="message"
                placeholder="Mesajınızı buraya yazın..."
                required
                rows={5}
                disabled={status === "pending"}
                className={cn(textareaClassName, "pl-10")}
              />
            </div>
          </Field>

          <Field>
            <Button
              type="submit"
              disabled={status === "pending"}
              className="h-10 w-full rounded-xl border border-zinc-950/10 bg-[#eb0010] text-white hover:bg-[#eb0010]/90"
            >
              {status === "pending" ? "Gönderiliyor…" : "Gönder"}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldDescription className="px-1 text-center text-xs sm:text-sm">
        Devam ederek{" "}
        <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
          Kullanım Koşullarımızı
        </Link>{" "}
        ve{" "}
        <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
          Gizlilik Politikamızı
        </Link>{" "}
        kabul etmiş olursunuz.
      </FieldDescription>
    </div>
  );
}
