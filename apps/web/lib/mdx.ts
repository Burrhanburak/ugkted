import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-elements";
import { createHeadingId } from "@/lib/slugify-heading";

/** Monorepo / CI’de `cwd` bazen repo kökü olur; Vercel’de Root Directory yanlışsa da yakalarız. */
function resolveMdxRoot(): string {
  const fromPackage = path.join(process.cwd(), "content", "mdx");
  if (fs.existsSync(fromPackage)) return fromPackage;
  const fromMonorepoRoot = path.join(process.cwd(), "apps", "web", "content", "mdx");
  if (fs.existsSync(fromMonorepoRoot)) return fromMonorepoRoot;
  const fromThisFile = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "content", "mdx");
  if (fs.existsSync(fromThisFile)) return fromThisFile;
  return fromPackage;
}

const mdxRoot = resolveMdxRoot();

export type MdxFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
  excerpt?: string;
  authorName?: string;
  authorRole?: string;
  authorImage?: string;
  coverImage?: string;
  overview?: string;
  sector?: string;
  teamSize?: string;
  location?: string;
  established?: string;
  funding?: string;
  coreFeatures?: string;
  problem?: string;
  approach?: string;
  outcomes?: string[];
};

function resolveFile(relativeSlug: string): string | null {
  const normalized = relativeSlug.replace(/^\/+|\/+$/g, "");
  const filePath = path.join(mdxRoot, `${normalized}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return filePath;
}

export function mdxSourceExists(relativeSlug: string): boolean {
  return resolveFile(relativeSlug) !== null;
}

/** Frontmatter only (metadata, listing) */
export function getMdxFrontmatter(relativeSlug: string): MdxFrontmatter | null {
  const filePath = resolveFile(relativeSlug);
  if (!filePath) return null;
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return data as MdxFrontmatter;
}

export async function compileMdxFile(relativeSlug: string) {
  const filePath = resolveFile(relativeSlug);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return compileMDX<MdxFrontmatter>({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });
}

export type MdxHeading = {
  id: string;
  title: string;
};

/** Belirli bir MDX dosyasından H2 başlıkları çekilir (TOC için). */
export function listMdxHeadings(relativeSlug: string): MdxHeading[] {
  const filePath = resolveFile(relativeSlug);
  if (!filePath) return [];
  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);
  const headings: MdxHeading[] = [];

  for (const line of content.split("\n")) {
    const match = line.match(/^##\s+(.+)$/);
    if (!match) continue;
    const title = (match[1] ?? "").trim();
    if (!title) continue;
    headings.push({ id: createHeadingId(title), title });
  }

  return headings;
}

export type NewsEntryMeta = MdxFrontmatter & { slug: string };

function listFolderMeta(folder: string): NewsEntryMeta[] {
  const dir = path.join(mdxRoot, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const meta = getMdxFrontmatter(`${folder}/${slug}`) ?? {};
      return { slug, ...meta };
    })
    .sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
}

/** `content/mdx/news/*.mdx` — liste sayfaları için */
export function listNewsMdxMeta(): NewsEntryMeta[] {
  return listFolderMeta("news");
}

export function listBlogMdxMeta(): NewsEntryMeta[] {
  return listFolderMeta("blog");
}

/** `content/mdx/rehber/*.mdx` — STK / dernek bilgilendirme rehberleri (blog tarzı) */
export function listRehberMdxMeta(): NewsEntryMeta[] {
  return listFolderMeta("rehber");
}

export function listEventsMdxMeta(): NewsEntryMeta[] {
  return listFolderMeta("events");
}

export function listServicesMdxMeta(): NewsEntryMeta[] {
  return listFolderMeta("services");
}
