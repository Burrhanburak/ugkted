/**
 * Workers AI: metin (Gemma 4) + görsel (FLUX.2 Klein/Dev) + TTS (Deepgram Aura-2) + EmbeddingGemma + Vectorize.
 * Opsiyonel: AI Gateway (dashboard’da gateway oluştur, AI_GATEWAY_ID doldur).
 * Görseller ve isteğe bağlı ses R2’ye yazılır; public/ kullanılmaz.
 *
 * Neon: `wrangler secret put DATABASE_URL` — Neon pooled connection string (Prisma ile aynı tablo: membership_leads).
 */

import { createId } from "@paralleldrive/cuid2";
import { neon } from "@neondatabase/serverless";

const TEXT_MODEL = "@cf/google/gemma-4-26b-a4b-it" as const;

const FLUX_MODELS = {
  "klein-4b": "@cf/black-forest-labs/flux-2-klein-4b",
  "klein-9b": "@cf/black-forest-labs/flux-2-klein-9b",
  dev: "@cf/black-forest-labs/flux-2-dev",
} as const;

type FluxVariant = keyof typeof FLUX_MODELS;

const TTS_MODELS = {
  en: "@cf/deepgram/aura-2-en",
  es: "@cf/deepgram/aura-2-es",
} as const;

const EMBED_MODEL = "@cf/google/embeddinggemma-300m" as const;

/** Vectorize index oluştururken: wrangler vectorize create ugkted-content --dimensions=768 --metric=cosine */
const EMBED_DIM = 768;

export interface Env {
  AI: Ai;
  MEDIA_BUCKET: R2Bucket;
  /** wrangler.toml içinde [[vectorize]] yoksa tanımsız; vector uçları 503 döner. */
  VECTOR_INDEX?: VectorizeIndex;
  CDN_PUBLIC_BASE: string;
  WORKER_SECRET: string;
  /** Dashboard → AI → Gateways. Boşsa doğrudan Workers AI (gateway logu yok). */
  AI_GATEWAY_ID: string;
  /** Neon Postgres (secret). Mini admin / Prisma ile aynı `membership_leads` tablosu. */
  DATABASE_URL?: string;
}

type ContentKind = "blog" | "news" | "event" | "service";

interface ContentBody {
  brief: string;
  kind?: ContentKind;
  maxWords?: number;
}

interface ImageBody {
  prompt: string;
  /** Varsayılan: klein-4b (hızlı). klein-9b | dev */
  flux?: FluxVariant;
  prefix?: string;
  filenameSlug?: string;
  width?: number;
  height?: number;
}

interface TtsBody {
  text: string;
  locale: "en" | "es";
  speaker?: string;
  /** mp3 (varsayılan) */
  encoding?: "mp3";
  /** true ise R2’ye yükler ve JSON döner */
  store?: boolean;
  prefix?: string;
  filenameSlug?: string;
}

interface EmbedBody {
  text: string | string[];
}

interface VectorUpsertBody {
  id: string;
  text: string;
  metadata?: Record<string, string | number | boolean>;
}

interface VectorQueryBody {
  query: string;
  topK?: number;
}

function gatewayOptions(env: Env): AiOptions | undefined {
  const id = env.AI_GATEWAY_ID?.trim();
  if (!id) return undefined;
  return { gateway: { id } };
}

/** Workers AI chat çıktısı modele göre string veya iç içe nesne olabilir (ör. Gemma 4). */
function extractAssistantText(raw: unknown): string {
  if (typeof raw === "string") return raw;
  if (!raw || typeof raw !== "object") return String(raw);

  const r = raw as Record<string, unknown>;

  if (typeof r.response === "string") return r.response;

  if (r.response && typeof r.response === "object") {
    const resp = r.response as Record<string, unknown>;
    if (typeof resp.text === "string") return resp.text;
    if (Array.isArray(resp.content)) {
      return resp.content
        .map((c) =>
          c && typeof c === "object" && "text" in c
            ? String((c as { text: unknown }).text)
            : ""
        )
        .join("");
    }
  }

  const choices = r.choices;
  if (Array.isArray(choices) && choices[0] && typeof choices[0] === "object") {
    const msg = (choices[0] as { message?: { content?: unknown } }).message;
    const content = msg?.content;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .map((p) =>
          p && typeof p === "object" && "text" in p
            ? String((p as { text: unknown }).text)
            : ""
        )
        .join("");
    }
  }

  try {
    return JSON.stringify(raw);
  } catch {
    return String(raw);
  }
}

async function runAi(
  env: Env,
  model: string,
  inputs: Record<string, unknown>
): Promise<unknown> {
  const gw = gatewayOptions(env);
  if (gw) {
    return env.AI.run(model, inputs as never, gw);
  }
  return env.AI.run(model, inputs as never);
}

async function runAiMultipart(
  env: Env,
  model: string,
  body: ReadableStream<Uint8Array> | null,
  contentType: string
): Promise<unknown> {
  if (!body) throw new Error("Multipart body missing");
  const payload = { multipart: { body, contentType } };
  const gw = gatewayOptions(env);
  if (gw) {
    return env.AI.run(model, payload as never, gw);
  }
  return env.AI.run(model, payload as never);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...corsHeaders(),
    },
  });
}

function corsHeaders(): Record<string, string> {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
    "access-control-max-age": "86400",
  };
}

function requireAuth(request: Request, env: Env): Response | null {
  const secret = env.WORKER_SECRET;
  if (!secret) {
    return json({ error: "WORKER_SECRET not configured" }, 500);
  }
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (token !== secret) {
    return json({ error: "Unauthorized" }, 401);
  }
  return null;
}

function cdnBase(env: Env): string {
  return env.CDN_PUBLIC_BASE.replace(/\/+$/, "");
}

function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return s || "asset";
}

async function imageToArrayBuffer(image: unknown): Promise<ArrayBuffer> {
  if (image instanceof ReadableStream) {
    return new Response(image).arrayBuffer();
  }
  if (image instanceof ArrayBuffer) {
    return image;
  }
  if (ArrayBuffer.isView(image)) {
    const v = image as ArrayBufferView;
    const copy = new Uint8Array(v.byteLength);
    copy.set(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
    return copy.buffer;
  }
  if (typeof Blob !== "undefined" && image instanceof Blob) {
    return image.arrayBuffer();
  }
  throw new Error("Unexpected image output from Workers AI");
}

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function runFluxToPngBuffer(
  env: Env,
  modelId: string,
  prompt: string,
  width: number,
  height: number
): Promise<ArrayBuffer> {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("width", String(width));
  form.append("height", String(height));
  const serialized = new Response(form);
  const body = serialized.body;
  const contentType = serialized.headers.get("content-type");
  if (!body || !contentType) throw new Error("FormData serialization failed");

  const raw = await runAiMultipart(env, modelId, body, contentType);

  if (
    raw &&
    typeof raw === "object" &&
    "image" in raw &&
    typeof (raw as { image: unknown }).image === "string"
  ) {
    return base64ToArrayBuffer((raw as { image: string }).image);
  }
  return imageToArrayBuffer(raw);
}

async function audioToArrayBuffer(out: unknown): Promise<ArrayBuffer> {
  if (out instanceof ReadableStream) {
    return new Response(out).arrayBuffer();
  }
  if (out instanceof ArrayBuffer) return out;
  if (ArrayBuffer.isView(out)) {
    const v = out as ArrayBufferView;
    const copy = new Uint8Array(v.byteLength);
    copy.set(new Uint8Array(v.buffer, v.byteOffset, v.byteLength));
    return copy.buffer;
  }
  if (typeof Blob !== "undefined" && out instanceof Blob) {
    return out.arrayBuffer();
  }
  if (typeof out === "string") {
    try {
      return base64ToArrayBuffer(out);
    } catch {
      const bytes = new Uint8Array(out.length);
      for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xff;
      return bytes.buffer;
    }
  }
  throw new Error("Unexpected TTS output from Workers AI");
}

function parseEmbeddingData(raw: unknown): number[][] {
  if (raw && typeof raw === "object" && "data" in raw) {
    const data = (raw as { data: unknown }).data;
    if (Array.isArray(data) && data.every((row) => Array.isArray(row))) {
      return data as number[][];
    }
  }
  throw new Error("Unexpected embedding model output");
}

async function embedTexts(env: Env, text: string | string[]): Promise<number[][]> {
  const payload =
    typeof text === "string" ? { text } : { text: text as string[] };
  const raw = await runAi(env, EMBED_MODEL, payload as Record<string, unknown>);
  return parseEmbeddingData(raw);
}

function systemPromptForKind(kind: ContentKind): string {
  const base =
    "Sen UGKTED (Uluslararası Göç ve Kültür Ticaret Eğitim Derneği) için içerik yazıyorsun. " +
    "Profesyonel, güven veren, abartısız Türkçe kullan. Markdown kullanabilirsin (## başlık, **vurgu**, liste). " +
    "Uydurma yasal madde veya resmi kurum iddiası yazma.";
  switch (kind) {
    case "news":
      return base + " Haber tonu: kısa giriş, gelişme, sonuç; tarih belirtmek gerekiyorsa genel ifade kullan.";
    case "event":
      return base + " Etkinlik duyurusu: ne, ne zaman, kimler için, nasıl katılım — net CTA.";
    case "service":
      return base + " Hizmet tanıtımı: fayda odaklı, somut maddeler.";
    default:
      return base + " Blog yazısı: okunabilir paragraflar, alt başlıklar.";
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      const gatewayOn = Boolean(env.AI_GATEWAY_ID?.trim());
      return json({
        service: "ugkted-worker",
        aiGateway: gatewayOn
          ? { enabled: true, gatewayId: env.AI_GATEWAY_ID.trim() }
          : { enabled: false, hint: "AI_GATEWAY_ID var ile Workers AI çağrıları gateway loglarına düşer" },
        vectorize: {
          bindingConfigured: Boolean(env.VECTOR_INDEX),
          index: "ugkted-content",
          embeddingModel: EMBED_MODEL,
          dimensions: EMBED_DIM,
          note:
            "API token’da Vectorize yoksa binding kapatılır. İzin + index sonrası wrangler.toml’a [[vectorize]] ekleyin.",
        },
        aiSearch: {
          note:
            "Cloudflare AI Search ayrı instance / namespace ister; wrangler ai_search binding eklenerek env üzerinden kullanılır — şu an Vectorize + Gemma ile RAG bu worker’da.",
        },
        models: {
          text: TEXT_MODEL,
          image: FLUX_MODELS,
          tts: TTS_MODELS,
          embed: EMBED_MODEL,
        },
        endpoints: {
          "POST /data/leads": {
            auth: "Authorization: Bearer WORKER_SECRET",
            body: { firstName: "string", lastName: "string", email: "string" },
            note: "Neon membership_leads tablosuna yazar (DATABASE_URL gerekli).",
          },
          "POST /ai/content": { body: { brief: "string", kind: "blog|news|event|service", maxWords: "optional" } },
          "POST /ai/image": {
            body: {
              prompt: "string",
              flux: "klein-4b | klein-9b | dev (optional)",
              prefix: "cdn/...",
              filenameSlug: "optional",
              width: "256-1024",
              height: "256-1024",
            },
          },
          "POST /ai/tts": {
            body: {
              text: "string",
              locale: "en | es",
              speaker: "optional (model dokümantasyonundaki konuşmacı adı)",
              encoding: "mp3 (optional)",
              store: "optional boolean — true ise R2’ye mp3 yazar",
              prefix: "cdn/audio/...",
              filenameSlug: "optional",
            },
          },
          "POST /ai/embed": { body: { text: "string | string[]" }, returns: "{ data: number[][], dimensions }" },
          "POST /ai/vector/upsert": { body: { id: "string", text: "string", metadata: "optional" } },
          "POST /ai/vector/query": { body: { query: "string", topK: "optional default 8" } },
        },
        storage: "R2 — publicUrl = CDN_PUBLIC_BASE + key",
      });
    }

    if (request.method === "POST" && url.pathname === "/data/leads") {
      const authErr = requireAuth(request, env);
      if (authErr) return authErr;
      const dbUrl = env.DATABASE_URL?.trim();
      if (!dbUrl) {
        return json({ error: "DATABASE_URL not configured (wrangler secret put DATABASE_URL)" }, 503);
      }
      try {
        const body = (await request.json()) as {
          firstName?: string;
          lastName?: string;
          email?: string;
        };
        const firstName = body.firstName?.trim();
        const lastName = body.lastName?.trim();
        const email = body.email?.trim().toLowerCase();
        if (!firstName || !lastName || !email) {
          return json({ error: "firstName, lastName, email required" }, 400);
        }
        const sql = neon(dbUrl);
        const id = createId();
        await sql`
          INSERT INTO membership_leads (id, first_name, last_name, email, source, created_at)
          VALUES (${id}, ${firstName}, ${lastName}, ${email}, 'worker', now())
        `;
        return json({ ok: true, id });
      } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown error";
        return json({ error: message }, 500);
      }
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const authErr = requireAuth(request, env);
    if (authErr) return authErr;

    try {
      if (url.pathname === "/ai/content") {
        const body = (await request.json()) as ContentBody;
        if (!body?.brief?.trim()) {
          return json({ error: "brief is required" }, 400);
        }
        const kind: ContentKind = body.kind ?? "blog";
        const maxWords = Math.min(Math.max(body.maxWords ?? 600, 100), 2000);

        const result = await runAi(env, TEXT_MODEL, {
          messages: [
            { role: "system", content: systemPromptForKind(kind) },
            {
              role: "user",
              content: `Konu / notlar:\n${body.brief.trim()}\n\nYaklaşık ${maxWords} kelimeyi geçme.`,
            },
          ],
          max_tokens: 4096,
        });

        const text = extractAssistantText(result).trim();

        const logId = env.AI.aiGatewayLogId;
        return json({ kind, text, ...(logId ? { aiGatewayLogId: logId } : {}) });
      }

      if (url.pathname === "/ai/image") {
        const body = (await request.json()) as ImageBody;
        if (!body?.prompt?.trim()) {
          return json({ error: "prompt is required" }, 400);
        }

        const fluxKey: FluxVariant =
          body.flux && body.flux in FLUX_MODELS ? body.flux : "klein-4b";
        const modelId = FLUX_MODELS[fluxKey];

        const prefix = (body.prefix ?? "cdn/generated").replace(/^\/+|\/+$/g, "");
        const slugPart = body.filenameSlug ? slugify(body.filenameSlug) : `img-${Date.now()}`;
        const key = `${prefix}/${slugPart}.png`;

        const width = clamp(body.width ?? 768, 256, 1024);
        const height = clamp(body.height ?? 768, 256, 1024);

        const buf = await runFluxToPngBuffer(
          env,
          modelId,
          body.prompt.trim(),
          width,
          height
        );

        await env.MEDIA_BUCKET.put(key, buf, {
          httpMetadata: { contentType: "image/png", cacheControl: "public, max-age=31536000" },
        });

        const publicUrl = `${cdnBase(env)}/${key}`;
        const logId = env.AI.aiGatewayLogId;

        return json({
          key,
          publicUrl,
          contentType: "image/png",
          model: modelId,
          note: "MDX coverImage: göreli key (örn. cdn/blog/foo.png)",
          ...(logId ? { aiGatewayLogId: logId } : {}),
        });
      }

      if (url.pathname === "/ai/tts") {
        const body = (await request.json()) as TtsBody;
        if (!body?.text?.trim()) {
          return json({ error: "text is required" }, 400);
        }
        const locale = body.locale;
        if (locale !== "en" && locale !== "es") {
          return json({ error: "locale must be \"en\" or \"es\"" }, 400);
        }

        const modelId = TTS_MODELS[locale];
        const encoding = body.encoding ?? "mp3";
        const ttsInput: Record<string, unknown> = {
          text: body.text.trim(),
          encoding,
        };
        if (body.speaker?.trim()) {
          ttsInput.speaker = body.speaker.trim();
        }

        const raw = await runAi(env, modelId, ttsInput);
        const buf = await audioToArrayBuffer(raw);

        if (body.store) {
          const prefix = (body.prefix ?? "cdn/audio").replace(/^\/+|\/+$/g, "");
          const slugPart = body.filenameSlug
            ? slugify(body.filenameSlug)
            : `speech-${Date.now()}`;
          const key = `${prefix}/${slugPart}.mp3`;
          const contentType = "audio/mpeg";

          await env.MEDIA_BUCKET.put(key, buf, {
            httpMetadata: { contentType, cacheControl: "public, max-age=31536000" },
          });

          const publicUrl = `${cdnBase(env)}/${key}`;
          const logId = env.AI.aiGatewayLogId;
          return json({
            key,
            publicUrl,
            contentType,
            model: modelId,
            ...(logId ? { aiGatewayLogId: logId } : {}),
          });
        }

        return new Response(buf, {
          headers: {
            "content-type": "audio/mpeg",
            "cache-control": "no-store",
            ...corsHeaders(),
          },
        });
      }

      if (url.pathname === "/ai/embed") {
        const body = (await request.json()) as EmbedBody;
        if (!body?.text || (typeof body.text === "string" && !body.text.trim())) {
          return json({ error: "text is required (string or string[])" }, 400);
        }
        if (Array.isArray(body.text) && body.text.length === 0) {
          return json({ error: "text array must not be empty" }, 400);
        }
        const data = await embedTexts(env, body.text);
        const logId = env.AI.aiGatewayLogId;
        return json({
          data,
          dimensions: data[0]?.length ?? 0,
          model: EMBED_MODEL,
          ...(logId ? { aiGatewayLogId: logId } : {}),
        });
      }

      if (url.pathname === "/ai/vector/upsert") {
        if (!env.VECTOR_INDEX) {
          return json(
            { error: "Vectorize binding yok (wrangler.toml). API token’a Vectorize izni + index ekleyin." },
            503
          );
        }
        const body = (await request.json()) as VectorUpsertBody;
        if (!body?.id?.trim() || !body?.text?.trim()) {
          return json({ error: "id and text are required" }, 400);
        }
        const vectors = await embedTexts(env, body.text.trim());
        const values = vectors[0];
        if (!values || values.length !== EMBED_DIM) {
          return json(
            { error: `Embedding dimension mismatch (expected ${EMBED_DIM})` },
            500
          );
        }
        const meta: Record<string, string | number | boolean> = {
          text: body.text.trim().slice(0, 600),
          ...body.metadata,
        };
        await env.VECTOR_INDEX.upsert([
          {
            id: body.id.trim(),
            values,
            metadata: meta as Record<string, import("@cloudflare/workers-types").VectorizeVectorMetadata>,
          },
        ]);
        return json({ ok: true, id: body.id.trim() });
      }

      if (url.pathname === "/ai/vector/query") {
        if (!env.VECTOR_INDEX) {
          return json(
            { error: "Vectorize binding yok (wrangler.toml). API token’a Vectorize izni + index ekleyin." },
            503
          );
        }
        const body = (await request.json()) as VectorQueryBody;
        if (!body?.query?.trim()) {
          return json({ error: "query is required" }, 400);
        }
        const topK = clamp(body.topK ?? 8, 1, 50);
        const vectors = await embedTexts(env, body.query.trim());
        const values = vectors[0];
        if (!values || values.length !== EMBED_DIM) {
          return json({ error: "Embedding failed" }, 500);
        }
        const matches = await env.VECTOR_INDEX.query(values, {
          topK,
          returnMetadata: true,
        });
        return json({ matches: matches.matches, count: matches.count });
      }

      return json({ error: "Not found" }, 404);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      return json({ error: message }, 500);
    }
  },
} satisfies ExportedHandler<Env>;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
