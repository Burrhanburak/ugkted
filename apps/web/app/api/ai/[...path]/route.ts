import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ALLOWED = new Set([
  "content",
  "image",
  "tts",
  "embed",
  "vector/upsert",
  "vector/query",
]);

function workerBase(): string {
  const u = process.env.UGKTED_WORKER_URL?.trim();
  if (!u) throw new Error("UGKTED_WORKER_URL missing");
  return u.replace(/\/+$/, "");
}

function workerSecret(): string {
  const s = process.env.UGKTED_WORKER_SECRET?.trim();
  if (!s) throw new Error("UGKTED_WORKER_SECRET missing");
  return s;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path } = await context.params;
  if (!path?.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const segment = path.join("/");
  if (!ALLOWED.has(segment)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let base: string;
  let secret: string;
  try {
    base = workerBase();
    secret = workerSecret();
  } catch {
    return NextResponse.json(
      { error: "AI worker not configured (UGKTED_WORKER_URL / UGKTED_WORKER_SECRET)" },
      { status: 503 }
    );
  }

  const body = await request.text();
  const workerUrl = `${base}/ai/${segment}`;

  const res = await fetch(workerUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const contentType =
    res.headers.get("content-type") ?? "application/json; charset=utf-8";
  const buf = await res.arrayBuffer();

  return new NextResponse(buf, {
    status: res.status,
    headers: {
      "content-type": contentType,
    },
  });
}
