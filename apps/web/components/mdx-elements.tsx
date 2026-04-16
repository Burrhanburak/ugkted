import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { createHeadingId } from "@/lib/slugify-heading";
import { Callout } from "@/components/mdx-callout";

type AnchorProps = ComponentPropsWithoutRef<"a">;

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join(" ");
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function MdxLink({ href, children, ...rest }: AnchorProps) {
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className="font-medium text-primary underline underline-offset-4 hover:no-underline"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}

/** next-mdx-remote compileMDX `components` prop */
export const mdxComponents: MDXComponents = {
  Callout,
  a: MdxLink,
  h2: ({ children, ...props }) => {
    const id = createHeadingId(textFromChildren(children));
    return (
      <h2
        id={id}
        className="mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = createHeadingId(textFromChildren(children));
    return (
      <h3 id={id} className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground" {...props}>
        {children}
      </h3>
    );
  },
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-muted-foreground" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-primary/40 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b bg-muted/50 px-3 py-2 text-left font-medium" {...props} />,
  td: (props) => <td className="border-b border-border/60 px-3 py-2" {...props} />,
};
