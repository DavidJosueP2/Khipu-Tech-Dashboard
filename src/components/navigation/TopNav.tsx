import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";

import { BRAND, INSTITUTION, MODULES, NAV_ITEMS } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

/**
 * Barra superior minimalista editorial de KhipuTech.
 * Sin selector de tema claro/oscuro ni adornos innecesarios: marca limpia,
 * navegación horizontal espaciada y menú móvil accesible.
 */
export function TopNav() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useGSAP(
    () => {
      const updateIndicator = (immediate: boolean) => {
        const activeLink = linkRefs.current[location.pathname];
        const container = navListRef.current;
        const indicator = indicatorRef.current;
        if (!activeLink || !container || !indicator) return;

        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const targetX = linkRect.left - containerRect.left;
        const targetW = linkRect.width;

        if (immediate || prefersReducedMotion()) {
          gsap.set(indicator, { x: targetX, width: targetW, opacity: 1 });
        } else {
          gsap.to(indicator, {
            x: targetX,
            width: targetW,
            opacity: 1,
            duration: 0.38,
            ease: "power3.out",
          });
        }
      };

      updateIndicator(false);

      const handleResize = () => updateIndicator(true);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    { scope: navListRef, dependencies: [location.pathname] }
  );

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="editorial-container flex h-16 items-center justify-between gap-6">
        {/* Marca tipográfica limpia */}
        <Link
          to="/"
          className="flex items-baseline text-[1.25rem] leading-none tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          aria-label={`Inicio — ${BRAND.product}`}
        >
          <span className="font-bold text-foreground">Khipu</span>
          <EditorialSerif
            optical="display"
            className="font-normal text-foreground"
          >
            Tech.
          </EditorialSerif>
        </Link>

        {/* Navegación centrada espaciada (escritorio) */}
        <nav
          aria-label="Navegación principal"
          className="relative hidden items-center lg:flex"
        >
          <div ref={navListRef} className="relative flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  ref={(el) => {
                    linkRefs.current[item.path] = el;
                  }}
                  to={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-2 text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[14px] left-0 h-[1.5px] bg-foreground opacity-0"
            />
          </div>
        </nav>

        {/* Extremo derecho minimalista */}
        <div className="flex items-center gap-3">
          <span className="hidden text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground uppercase lg:inline">
            UTA · 2026
          </span>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-foreground lg:hidden"
                  aria-label="Abrir menú de navegación"
                />
              }
            >
              <Menu className="size-3.5" />
              <span>Menú</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full max-w-sm border-l border-border bg-background p-0"
            >
              <SheetHeader className="border-b border-border px-6 py-5 text-left">
                <SheetTitle className="flex items-baseline text-2xl font-bold tracking-tight">
                  <span className="text-foreground">Khipu</span>
                  <EditorialSerif
                    optical="display"
                    className="font-normal text-foreground"
                  >
                    Tech.
                  </EditorialSerif>
                </SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground">
                  {INSTITUTION.course} · {INSTITUTION.cycle}
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Navegación móvil"
                className="flex flex-1 flex-col divide-y divide-border px-6 py-4"
              >
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  aria-current={location.pathname === "/" ? "page" : undefined}
                  className="flex items-center justify-between py-4 text-sm font-medium text-foreground"
                >
                  <span>Inicio</span>
                  <ArrowUpRight className="size-4 opacity-50" />
                </Link>

                {MODULES.map((mod) => (
                  <Link
                    key={mod.id}
                    to={mod.path}
                    onClick={closeMobileMenu}
                    aria-current={
                      location.pathname === mod.path ? "page" : undefined
                    }
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {mod.id}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {mod.fullName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {mod.unit}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t border-border px-6 py-5 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">
                  {INSTITUTION.university}
                </p>
                <p className="mt-0.5">{INSTITUTION.program}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
