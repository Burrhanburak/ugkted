import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  firstName: z.string().trim().min(1).max(120),
  lastName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(8).max(32),
  activityArea: z.string().trim().min(3).max(4000),
});

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      {
        error:
          "Kayıt için veritabanı yapılandırılmamış (DATABASE_URL). Geliştirme için Postgres/Neon adresini ekleyin ve `bun run db:push` çalıştırın.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Lütfen tüm zorunlu alanları geçerli şekilde doldurun." }, { status: 400 });
  }

  try {
    await prisma.membershipLead.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        activityArea: parsed.data.activityArea,
        source: "web",
      },
    });
  } catch (e) {
    console.error("[membership]", e);
    const hint =
      process.env.NODE_ENV === "development" && e instanceof Error ? e.message : null;
    return NextResponse.json(
      {
        error: hint
          ? `Kayıt oluşturulamadı: ${hint}`
          : "Kayıt oluşturulamadı. Bağlantıyı kontrol edin veya daha sonra tekrar deneyin.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
