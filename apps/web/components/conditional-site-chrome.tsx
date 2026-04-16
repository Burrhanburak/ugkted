"use client";

import { usePathname } from "next/navigation";
import Header from "@repo/ui/components/web/Header";
import Footer from "@repo/ui/components/web/Footer";

export function ConditionalSiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");
  const isAuthPage = pathname?.startsWith("/register");

  if (isStudio || isAuthPage) {
    return <main id="main-content">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
