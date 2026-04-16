"use client";

import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { cn } from "@repo/ui/lib/utils";

export type SiteBreadcrumbSegment = {
  label: string;
  /** Son segment hariç tüm öğelerde zorunlu */
  href?: string;
};

export type SiteBreadcrumbProps = {
  items: SiteBreadcrumbSegment[];
  className?: string;
};

/**
 * Kurumsal sayfalar için breadcrumb: 3+ segmentte mobilde ara kırılımlar ellipsis menüde toplanır.
 */
export function SiteBreadcrumb({ items, className }: SiteBreadcrumbProps) {
  if (items.length === 0) return null;

  const first = items[0]!;
  const last = items[items.length - 1]!;

  if (items.length === 1) {
    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{last.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (items.length === 2 && first.href) {
    return (
      <Breadcrumb className={className}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={first.href}>{first.label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{last.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const middle = items.slice(1, -1);
  const middleLinks = middle.filter(
    (m): m is { label: string; href: string } => typeof m.href === "string"
  );

  return (
    <Breadcrumb className={cn("min-w-0", className)}>
      <BreadcrumbList className="items-center">
        <BreadcrumbItem className="shrink-0">
          {first.href ? (
            <BreadcrumbLink asChild>
              <Link href={first.href}>{first.label}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{first.label}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        {middle.map((m, i) => (
          <React.Fragment key={`mid-desktop-${m.href ?? i}`}>
            <BreadcrumbItem className="hidden shrink-0 md:inline-flex">
              {m.href ? (
                <BreadcrumbLink asChild>
                  <Link href={m.href}>{m.label}</Link>
                </BreadcrumbLink>
              ) : (
                <span className="text-muted-foreground">{m.label}</span>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:list-item" />
          </React.Fragment>
        ))}

        {middleLinks.length > 0 && (
          <>
            <BreadcrumbItem className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="size-8 shrink-0"
                    aria-label="Ara sayfalar"
                  >
                    <BreadcrumbEllipsis />
                    <span className="sr-only">Menüyü aç</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[10rem]">
                  <DropdownMenuGroup>
                    {middleLinks.map((m) => (
                      <DropdownMenuItem key={m.href} asChild>
                        <Link href={m.href}>{m.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="md:hidden" />
          </>
        )}

        <BreadcrumbItem className="min-w-0 max-w-[min(65vw,16rem)] md:max-w-[min(40vw,28rem)] lg:max-w-none">
          <BreadcrumbPage className="truncate" title={last.label}>
            {last.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
