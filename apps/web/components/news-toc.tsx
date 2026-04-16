"use client";

import { useEffect, useMemo, useState } from "react";
import { TextAlignStart } from "lucide-react";
import type { MdxHeading } from "@/lib/mdx";

type NewsTocProps = {
  headings: MdxHeading[];
  scrollContainerId?: string;
  title?: string;
};

export function NewsToc({ headings, scrollContainerId, title = "On this page" }: NewsTocProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const elements = headingIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const rootEl = scrollContainerId
      ? document.getElementById(scrollContainerId)
      : null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root: rootEl,
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [headingIds]);

  if (headings.length === 0) return null;

  const handleAnchorClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    if (!scrollContainerId) return;
    const container = document.getElementById(scrollContainerId);
    const target = document.getElementById(id);
    if (!container || !target) return;

    event.preventDefault();
    const offsetTop = target.offsetTop - 20;
    container.scrollTo({ top: offsetTop, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="sticky top-8 ml-10 hidden h-fit shrink-0 lg:block">
      <span className="flex items-center gap-2 text-sm">
        <TextAlignStart className="h-4 w-4" />
        {title}
      </span>
      <nav className="mt-2 text-sm">
        <ul>
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(event) => handleAnchorClick(event, h.id)}
                className={`block py-1 transition-colors duration-200 hover:text-primary ${
                  activeId === h.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {h.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

