/**
 * Rehber MDX dosyalarında liste + detay + OG için gerekli ön yüz alanlarını doğrular.
 * `coverImage` her dosyada zorunludur (kart ve paylaşım görseli).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "mdx", "rehber");

const requiredKeys = ["title", "description", "excerpt", "date", "coverImage"] as const;

function main() {
  if (!fs.existsSync(dir)) {
    console.error("Rehber klasörü yok:", dir);
    process.exit(1);
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  if (files.length === 0) {
    console.error("content/mdx/rehber altında .mdx dosyası bulunamadı.");
    process.exit(1);
  }

  let failed = false;
  for (const file of files) {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data } = matter(raw) as { data: Record<string, unknown> };

    for (const key of requiredKeys) {
      const v = data[key];
      if (v == null || String(v).trim() === "") {
        console.error(`[rehber/${file}] Eksik veya boş alan: ${key}`);
        failed = true;
      }
    }
  }

  if (failed) {
    process.exit(1);
  }

  console.log(`Rehber MDX doğrulandı: ${files.length} dosya (coverImage dahil tüm zorunlu alanlar dolu).`);
}

main();
