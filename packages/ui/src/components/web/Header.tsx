"use client";

import { Logo } from "./logo";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Users,
  MessageCircle,
  Settings,
  Code,
  Palette,
  BookOpen,
  Trophy,
  Newspaper,
  Building,
  UserRoundCog,
  Images,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { CaretDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DonationModal } from "./donation-modal";

type NavRoute =
  | "/"
  | "/services"
  | "/about"
  | "/contact"
  | "/poems"
  | "/blog"
  | "/gallery"
  | "/books"
  | "/events";

const menuItems: { name: string; href: NavRoute }[] = [
  { name: "Anasayfa", href: "/" },
  { name: "Kurumsal", href: "/about" },
  { name: "Projeler", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Etkinlikler", href: "/events" },
  { name: "İletişim", href: "/contact" },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link
          href={href ?? "#"}
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10 text-white",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none mb-1">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-white/60">
            {children}
          </p>
        </Link>
      </NavigationMenu.Link>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuState(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuState]);

  return (
    <>
      {/* Mobile Header */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-0 z-50 mx-auto flex w-full justify-center overflow-hidden transition-all duration-300 pointer-events-none"
        )}
        style={{ height: menuState ? "100vh" : "79px" }}
      >
        <div
          className="flex h-full w-full flex-col p-2 pointer-events-auto"
          style={{ gap: "1px" }}
        >
          <nav className="flex w-full items-center justify-between rounded-2xl bg-white/80 px-7 py-5 text-[#eb0010] backdrop-blur-sm">
            <Link
              href="/"
              onClick={() => setMenuState(false)}
              className="flex items-center"
            >
              <Logo className="w-[96px] h-[30px] text-[#eb0010]" />
            </Link>
            <button
              className="text-sm font-bold uppercase text-[#eb0010]/80 "
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? "KAPAT" : "MENÜ"}
            </button>
          </nav>

          {menuState && (
            <>
              <ul className="flex w-full flex-1 flex-col items-center justify-center gap-1 rounded-2xl bg-white/80 px-7 py-5 text-[#eb0010] backdrop-blur-sm">
                {menuItems.map((item) => (
                  <li
                    key={item.href}
                    className="relative flex cursor-pointer flex-col items-center overflow-hidden"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-start gap-2",
                        pathname === item.href && "opacity-100"
                      )}
                      onClick={() => setMenuState(false)}
                    >
                      <span className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em]">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex w-full items-center justify-between rounded-2xl bg-white/80 p-4 text-sm tracking-tight text-black/60 backdrop-blur-sm">
                <Link href="/privacy" onClick={() => setMenuState(false)}>
                  Gizlilik
                </Link>
                <Link href="/terms" onClick={() => setMenuState(false)}>
                  Koşullar
                </Link>
              </div>

              <div className="flex w-full flex-col gap-2">
                <DonationModal>
                  <button
                    className="flex-1 flex items-center justify-center rounded-2xl bg-[#eb0010] p-4 text-sm font-bold text-white backdrop-blur-sm"
                    onClick={() => setMenuState(false)}
                  >
                    💝 Bağış Yap
                  </button>
                </DonationModal>

                <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center rounded-2xl bg-white/80 border-2 border-[#eb0010] p-4 text-sm font-bold text-[#eb0010] backdrop-blur-sm"
                  onClick={() => setMenuState(false)}
                >
                  👤 Üye Ol
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 border-b border-transparent transition duration-200 ease-in-out">
        <div className="mx-auto w-full max-w-7xl px-6 relative">
          <div
            className={cn(
              "mx-auto backdrop-blur-[15px] bg-[#fef6f154] rounded-[20px] transition-all duration-300 mt-4 mb-4",
              isScrolled
                ? "max-w-[650px] md:max-w-[800px]"
                : "max-w-[650px] md:max-w-[1140px]",
              "flex items-center justify-between px-4 py-2 md:px-4"
            )}
          >
            {/* Main Nav Content */}
            <div className="flex items-center justify-between w-full">
              {/* Logo */}
              <Link
                href="/"
                aria-label="home"
                className="flex items-center"
                prefetch={true}
              >
                <Logo className="text-[#006241]/80" />
              </Link>

              {/* Desktop Navigation */}
              <div className="flex items-center">
                <NavigationMenu.Root className="relative">
                  <NavigationMenu.List className="flex items-center mx-1">
                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/"
                          className={cn(
                            "h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#eb0010]/80 hover:text-[#eb0010]/60 focus-visible:text-[#006241]/80 lg:mx-3 outline-none",
                            pathname === "/" && "text-[#eb0010] font-bold"
                          )}
                          prefetch={true}
                        >
                          Anasayfa
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                      <NavigationMenu.Trigger className="h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#eb0010]/80 hover:text-[#eb0010]/60 focus-visible:text-[#eb0010]/80 lg:mx-3 group select-none gap-[2px] outline-none transition duration-150 ease-in-out">
                        Kurumsal
                        <CaretDownIcon
                          className="opacity-70 -ml-0.5 transition-transform duration-200 ease-in group-data-[state=open]:rotate-180"
                          aria-hidden
                        />
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute p-2 left-1/2 -translate-x-1/2 top-full mt-2 w-full sm:w-auto">
                        <ul className="m-0 grid list-none gap-x-2.5 p-[22px] sm:w-[500px] sm:grid-cols-2 bg-[#eb0010] rounded-[20px] border border-white/10 shadow-xl">
                          <ListItem title="Hakkımızda" href="/about">
                            Tarihçemiz, vizyonumuz ve misyonumuz.
                          </ListItem>
                          <ListItem title="Yönetim Kurulu" href="/board">
                            Derneğimizi yöneten kadromuz.
                          </ListItem>
                          <ListItem title="Tüzük" href="/bylaws">
                            Dernek tüzüğü ve yasal belgeler.
                          </ListItem>
                          <ListItem
                            title="Belgelerimiz"
                            href="/about/certificates-and-diploma"
                          >
                            Sertifika ve belgelerimiz.
                          </ListItem>
                          <ListItem title="Projelerimiz" href="/projects">
                            Yürüttüğümüz projeler ve başarılarımız.
                          </ListItem>
                          <ListItem title="Yayınlar" href="/publications">
                            Derneğimizin yayınladığı kitap ve makaleler.
                          </ListItem>
                        </ul>
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/services"
                          className={cn(
                            "h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#eb0010]/80 hover:text-[#eb0010]/60 focus-visible:text-[#eb0010]/80 lg:mx-3 outline-none",
                            pathname === "/services" &&
                            "text-[#eb0010] font-bold"
                          )}
                        >
                          Hizmetler
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/events"
                          className={cn(
                            "h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#eb0010]/80 hover:text-[#eb0010]/60 focus-visible:text-[#eb0010]/80 lg:mx-3 outline-none",
                            pathname === "/events" && "text-[#eb0010] font-bold"
                          )}
                        >
                          Etkinlikler
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/blog"
                          className={cn(
                            "h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#eb0010]/80 hover:text-[#eb0010]/60 focus-visible:text-[#eb0010]/80 lg:mx-3 outline-none",
                            pathname === "/blog" && "text-[#eb0010] font-bold"
                          )}
                        >
                          Blog
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>

                    <NavigationMenu.Item>
                      <NavigationMenu.Link asChild>
                        <Link
                          href="/contact"
                          className={cn(
                            "h-[58px] flex items-center mx-1 py-1 text-sm font-semibold text-[#eb0010]/80 hover:text-[#eb0010]/60 focus-visible:text-[#eb0010]/80 lg:mx-3 outline-none",
                            pathname === "/contact" &&
                            "text-[#eb0010] font-bold"
                          )}
                        >
                          İletişim
                        </Link>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  </NavigationMenu.List>
                </NavigationMenu.Root>
              </div>

              {/* Desktop CTA Button */}
              <DonationModal>
                <Button
                  variant="outline"
                  className="hidden md:flex border-white/80 text-[#eb0010]/80 hover:text-red-500"
                >
                  Bağış Yap
                </Button>
              </DonationModal>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
