import { S3Client } from "@aws-sdk/client-s3";

const r2Endpoint =
  process.env.R2_ENDPOINT?.trim() ||
  (process.env.CLOUDFLARE_ACCOUNT_ID
    ? `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`
    : undefined);

export const r2 = new S3Client({
  region: "auto",
  endpoint: r2Endpoint,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
  },
});
