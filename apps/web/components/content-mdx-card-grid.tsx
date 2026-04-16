import Link from "next/link";
import { Badge } from "@repo/ui/components/ui/badge";
import { CdnImage } from "@/components/cdn-image";
import type { NewsEntryMeta } from "@/lib/mdx";
import { resolveMediaUrl } from "@/lib/cdn";
import { cn } from "@repo/ui/lib/utils";

type Props = {
  items: NewsEntryMeta[];
  hrefPrefix: string;
  categoryFallback?: string;
  emptyMessage?: string;
};

export function ContentMdxCardGrid({
  items,
  hrefPrefix,
  categoryFallback = "İçerik",
  emptyMessage = "Henüz içerik eklenmedi.",
}: Props) {
  if (items.length === 0) {
    return <p className="mt-8 text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
      {items.map((post) => (
        <Link
          key={post.slug}
          href={`${hrefPrefix}/${post.slug}`}
          className="group flex flex-col outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 rounded-xl"
        >
          <div className="mb-4 md:mb-5">
            {post.coverImage ? (
              <CdnImage
                src={resolveMediaUrl(post.coverImage)}
                alt={post.title ?? post.slug}
                width={1200}
                height={800}
                className={cn(
                  "aspect-[3/2] w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]",
                  /\.svg(\?|#|$)/i.test(post.coverImage) && "bg-muted object-contain"
                )}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div
                className={cn(
                  "aspect-[3/2] w-full rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-muted transition-opacity duration-300",
                  "group-hover:opacity-90"
                )}
              />
            )}
          </div>

          <div>
            <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-xs font-medium">
              {post.sector ?? categoryFallback}
            </Badge>
          </div>

          <div className="mb-2 line-clamp-2 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl text-foreground group-hover:text-primary transition-colors">
            {post.title ?? post.slug}
          </div>

          <div className="mb-4 line-clamp-3 text-sm text-muted-foreground md:mb-5 md:text-base">
            {post.excerpt ?? post.description}
          </div>

          <div className="mt-auto flex items-center gap-2">
            <div className="relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border">
              {post.authorImage ? (
                <CdnImage
                  alt=""
                  src={resolveMediaUrl(post.authorImage)}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-bold text-foreground">
                  {(post.authorName ?? "U")[0]}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-px">
              <span className="text-sm font-medium text-foreground">{post.authorName ?? "UGKTED"}</span>
              <span className="text-xs text-muted-foreground">
                {post.date ? new Date(post.date).toLocaleDateString("tr-TR") : ""}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
