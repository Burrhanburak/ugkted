import { compileMdxFile } from "@/lib/mdx";

type MdxBodyProps = {
  slug: string;
  className?: string;
};

/** Sunucuda `content/mdx/{slug}.mdx` derler; dosya yoksa null döner */
export async function MdxBody({ slug, className = "prose prose-neutral dark:prose-invert max-w-none" }: MdxBodyProps) {
  const compiled = await compileMdxFile(slug);
  if (!compiled) return null;
  return <div className={className}>{compiled.content}</div>;
}
