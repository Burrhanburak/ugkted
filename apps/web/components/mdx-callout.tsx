import type { ReactNode } from "react";
import { createHeadingId } from "@/lib/slugify-heading";

type CalloutType = "tip";

function TipBulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 11 14" fill="currentColor" className={className} aria-hidden="true">
      <path d="M3.13 12.42c0 .17.05.34.14.48l.47.7c.14.22.47.39.73.39h1.69c.26 0 .59-.18.72-.39l.47-.7c.08-.12.14-.34.14-.48V11.35H3.13v1.07zM5.31 0C2.52.01.5 2.27.5 4.79c0 1.21.45 2.32 1.19 3.16.45.52 1.16 1.59 1.43 2.5.01.01.02.02.02.02h4.38l.01-.01c.27-.91.98-1.98 1.44-2.51.74-.82 1.19-1.93 1.19-3.16C10.13 2.15 7.97 0 5.31 0zm2.64 7.11c-.43.49-.96 1.27-1.34 2.08H4.02c-.38-.81-.91-1.59-1.34-2.08C2.12 6.48 1.81 5.64 1.81 4.79c0-1.69 1.32-3.47 3.48-3.48 1.96 0 3.53 1.57 3.53 3.48 0 .85-.31 1.69-.87 2.32zM4.88 2.19c-1.21 0-2.19.98-2.19 2.19 0 .24.2.43.44.43s.44-.2.44-.43c0-.72.59-1.31 1.31-1.31.24 0 .44-.2.44-.44 0-.24-.2-.44-.44-.44z" />
    </svg>
  );
}

const tipStyles = {
  shell:
    "border-green-200 bg-green-50/60 dark:border-green-800/50 dark:bg-green-950/25",
  icon: "text-green-500 dark:text-green-400",
  title: "text-green-900 dark:text-green-100",
  body: "text-green-800 dark:text-green-200 [&_a]:text-green-700 dark:[&_a]:text-green-300 [&_a]:underline",
} as const;

type CalloutProps = {
  /** MDX içinde `<Callout type="tip">` — şimdilik yalnızca tip. */
  type?: CalloutType;
  title?: string;
  children: ReactNode;
};

/**
 * MDX içinde kullanım: kısa giriş paragrafı + anlamlı `<ul><li>` listeleri (GEO/SEO için gerçek liste yapısı).
 */
export function Callout({ type = "tip", title = "İpucu", children }: CalloutProps) {
  if (type !== "tip") {
    return null;
  }

  const titleId = `callout-${createHeadingId(title)}`;

  return (
    <aside
      data-callout-type="tip"
      aria-labelledby={titleId}
      className={`not-prose my-5 flex gap-3 rounded-2xl border px-4 py-3.5 ${tipStyles.shell}`}
    >
      <div className={`mt-0.5 shrink-0 ${tipStyles.icon}`}>
        <TipBulbIcon className="h-4 w-auto" />
      </div>
      <div className="min-w-0 flex-1">
        <p id={titleId} className={`mb-1 text-sm font-semibold leading-snug ${tipStyles.title}`}>
          {title}
        </p>
        <div
          className={`text-sm leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:my-1.5 [&>ul]:list-disc [&>ul]:pl-4 [&>ul>li]:mb-0.5 [&>ol]:my-1.5 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol>li]:mb-0.5 ${tipStyles.body}`}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}
