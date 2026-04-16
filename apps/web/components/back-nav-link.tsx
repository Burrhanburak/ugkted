import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

type BackNavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Breadcrumb altında: anasayfa veya liste sayfasına dönüş. */
export function BackNavLink({ href, children, className }: BackNavLinkProps) {
  return (
    <div className={cn("mb-6", className)}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeftIcon className="size-4 shrink-0" aria-hidden />
        <span>{children}</span>
      </Link>
    </div>
  );
}
