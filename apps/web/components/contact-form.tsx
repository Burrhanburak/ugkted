"use client";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/ui/field";

const textareaClassName = cn(
  "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
  "border-input dark:border-input/50 h-24 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs",
  "transition-[color,box-shadow] outline-none resize-y",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
);

export function ContactForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Bize ulaşın</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Sorularınız veya önerileriniz için formu doldurun, en kısa sürede size
            dönüş yapacağız.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Ad Soyad</FieldLabel>
          <Input id="name" type="text" placeholder="Adınız Soyadınız" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">E-posta</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="ornek@email.com"
            required
          />
          <FieldDescription>
            Size bu adres üzerinden ulaşacağız. E-posta adresinizi üçüncü
            kişilerle paylaşmayız.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="subject">Konu</FieldLabel>
          <Input
            id="subject"
            type="text"
            placeholder="Mesajınızın konusu"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Mesajınız</FieldLabel>
          <textarea
            id="message"
            name="message"
            placeholder="Mesajınızı buraya yazın..."
            required
            rows={5}
            className={textareaClassName}
          />
        </Field>
        <Field>
          <Button className="w-full bg-[#eb0010]"   type="submit">Gönder</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
