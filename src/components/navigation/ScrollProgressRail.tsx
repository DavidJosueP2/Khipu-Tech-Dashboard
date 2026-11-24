import { useRef, useState } from "react";

import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

interface SectionAnchor {
  id: string;
  code: string;
  label: string;
}

const HOME_SECTIONS: readonly SectionAnchor[] = [
  { id: "portada", code: "00", label: "Portada" },
  { id: "modulos", code: "01", label: "Módulos" },
  { id: "semestre", code: "02", label: "Semestre" },
];

/**
 * Riel lateral minimalista de progreso cartográfico para la página de inicio (solo escritorio xl+).
 * Sincronizado con GSAP ScrollTrigger; desaparece en pantallas medianas y móviles.
 */
export function ScrollProgressRail() {
  const railRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("portada");

  useGSAP(
    () =>
      withResponsiveMotion(railRef.current, ({ isDesktop }) => {
        if (!isDesktop) return;

        if (progressBarRef.current) {
          gsap.fromTo(
            progressBarRef.current,
            { scaleY: 0, transformOrigin: "top center" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25,
              },
            }
          );
        }

        HOME_SECTIONS.forEach((sec) => {
          const el = document.getElementById(sec.id);
          if (!el) return;
          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top 45%",
              end: "bottom 45%",
              onEnter: () => setActiveId(sec.id),
              onEnterBack: () => setActiveId(sec.id),
            },
          });
        });
      }),
    { scope: railRef }
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside
      ref={railRef}
      aria-label="Indicador de recorrido"
      className="pointer-events-auto fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-5 xl:flex"
    >
      <div className="relative h-24 w-px bg-border">
        <div
          ref={progressBarRef}
          className="absolute inset-0 bg-primary"
          style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
        />
      </div>

      <nav className="flex flex-col items-end gap-2.5">
        {HOME_SECTIONS.map((sec) => {
          const isCurrent = activeId === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`group flex cursor-pointer items-center gap-2 text-right transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isCurrent
                  ? "text-foreground"
                  : "text-muted-foreground/65 hover:text-foreground"
              }`}
              aria-label={`Ir a la sección ${sec.label}`}
            >
              <span className="text-[0.65rem] font-medium tracking-widest uppercase">
                {sec.label}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  isCurrent
                    ? "scale-125 bg-primary"
                    : "bg-border-strong group-hover:bg-foreground"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
