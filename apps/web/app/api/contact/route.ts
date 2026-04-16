import { prisma } from "@repo/database";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(8000),
});

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      {
        error:
          "Mesaj kaydı için veritabanı yapılandırılmamış (DATABASE_URL). Lütfen yöneticiye haber verin.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Lütfen tüm alanları geçerli şekilde doldurun." }, { status: 400 });
  }

  try {
    await prisma.contactSubmission.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });
  } catch (e) {
    console.error("[contact]", e);
    const hint =
      process.env.NODE_ENV === "development" && e instanceof Error ? e.message : null;
    return NextResponse.json(
      {
        error: hint ? `Kaydedilemedi: ${hint}` : "Mesaj kaydedilemedi. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
