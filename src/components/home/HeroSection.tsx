import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import { INSTITUTION } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgKhipuLogo from "@/assets/heroes/m1-khiputech-logo.png";
import imgPazySalvo from "@/assets/thumbnails/unidad-4/pazysalvo-hero-dashboard.png";
import imgNominaMovil from "@/assets/heroes/m3-nomina-movil.png";

/**
 * Portada principal de KhipuTech — Composición editorial asimétrica (estilo Aureli):
 * tipografía monumental a la izquierda, imagen secundaria vertical abajo-centro
 * y composición principal grande a la derecha con visuales reales del semestre.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(sectionRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        gsap.fromTo(
          "[data-home-hero]",
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.78,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }),
    { scope: sectionRef }
  );

  const scrollToModules = () => {
    const target = document.getElementById("modulos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="portada"
      ref={sectionRef}
      aria-label="Portada principal de KhipuTech"
      className="bg-background pt-12 pb-20 md:pt-16 md:pb-28"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Columna izquierda: título enorme + bloque inferior con intro e imagen vertical */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-6">
            <div data-home-hero className="space-y-4 pt-2 lg:pt-6">
              <h1 className="text-[clamp(3.6rem,8vw,6.8rem)] leading-[0.94] tracking-[-0.036em] text-foreground">
                <span className="block font-bold">Khipu</span>
                <span className="block">
                  <EditorialSerif
                    optical="display"
                    className="font-normal text-primary"
                  >
                    Tech.
                  </EditorialSerif>
                </span>
              </h1>
            </div>

            {/* Sub-fila estilo Aureli: intro + CTA a la izquierda, imagen vertical en el centro */}
            <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-12">
              <div
                data-home-hero
                className="flex flex-col justify-between space-y-6 sm:col-span-6"
              >
                <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
                  <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
                  <span>00 · Integrador</span>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Emprendimiento, obligaciones tributarias, nómina y liquidación
                  laboral reunidos en una plataforma documental limpia.
                </p>

                <div>
                  <button
                    type="button"
                    onClick={scrollToModules}
                    className="group inline-flex cursor-pointer items-center gap-3 border-b border-foreground pb-1.5 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <span>Explorar módulos</span>
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Imagen secundaria vertical (captura móvil real de nómina) */}
              <div data-home-hero className="sm:col-span-6">
                <div className="overflow-hidden rounded-lg border border-border bg-surface p-2 shadow-[var(--shadow-panel)]">
                  <img
                    src={imgNominaMovil}
                    alt="Aplicación móvil de nómina desarrollada en el semestre"
                    className="aspect-[3/4] w-full rounded-md object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: imagen protagonista grande + pie editorial */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-6">
            <div data-home-hero className="space-y-4">
              {/* Panel de identidad real de KhipuTech */}
              <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-panel)]">
                <img
                  src={imgKhipuLogo}
                  alt="Identidad oficial KhipuTech diseñada en la Unidad I"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              {/* Captura real de aplicación web desarrollada */}
              <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-hairline)]">
                <img
                  src={imgPazySalvo}
                  alt="Plataforma web PazySalvo desarrollada en la Unidad IV"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </div>
            </div>

            {/* Pie discreto de contexto */}
            <div
              data-home-hero
              className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase"
            >
              <span>
                {INSTITUTION.shortUniversity} · {INSTITUTION.shortFaculty} ·{" "}
                {INSTITUTION.program}
              </span>
              <span>{INSTITUTION.cycle}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
