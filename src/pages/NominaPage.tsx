import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

import { getNominaDoc, type NominaDocument } from "@/data/nomina";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { NominaContratacionOrganigrama } from "@/components/nomina/NominaContratacionOrganigrama";
import { NominaRemuneracionesSection } from "@/components/nomina/NominaRemuneracionesSection";
import { NominaAppJuridicoExpediente } from "@/components/nomina/NominaAppJuridicoExpediente";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgNominaWeb from "@/assets/heroes/m3-nomina-web.png";
import imgNominaMovil from "@/assets/heroes/m3-nomina-movil.png";

/**
 * Módulo 03 — Remuneraciones y nómina (Unidad III).
 * Portada editorial panorámica con dúo asimétrico web + móvil reales del
 * sistema de roles de pago documentado en APE 03 (TechInstall Solutions).
 */
export function NominaPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<NominaDocument | null>(null);
  const ape03 = getNominaDoc("ape-03");

  useGSAP(
    () =>
      withResponsiveMotion(heroRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        gsap.fromTo(
          "[data-m3-hero]",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.76,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }),
    { scope: heroRef }
  );

  const scrollToContent = () => {
    const el = document.getElementById("escena-contratacion");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="editorial-container flex flex-1 flex-col">
      {/* PORTADA EDITORIAL PANORÁMICA DEL MÓDULO 03 — DÚO WEB + MÓVIL */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 03 Remuneraciones y nómina"
        className="py-14 md:py-22"
      >
        <div className="space-y-12">
          {/* Fila superior dividida: título monumental a la izquierda, bajada + CTA a la derecha */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <div
                data-m3-hero
                className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase"
                style={{ color: "var(--module-03)" }}
              >
                <span
                  className="h-px w-7"
                  style={{ backgroundColor: "var(--module-03)" }}
                  aria-hidden="true"
                />
                <span>03 · Unidad III · TechInstall Solutions</span>
              </div>

              <h1
                data-m3-hero
                className="text-[clamp(2.9rem,6.4vw,5.4rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
              >
                <span className="font-bold">Remuneraciones </span>
                <EditorialSerif
                  optical="display"
                  className="font-normal"
                  style={{ color: "var(--module-03)" }}
                >
                  y nómina.
                </EditorialSerif>
              </h1>
            </div>

            <div
              data-m3-hero
              className="flex flex-col items-start space-y-5 lg:col-span-5 lg:items-end lg:text-right"
            >
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Contratación laboral, organigrama funcional, planilla consolidada
                con conciliación IESS y aplicación web/móvil.
              </p>

              <button
                type="button"
                onClick={scrollToContent}
                className="group inline-flex cursor-pointer items-center gap-2.5 border-b border-foreground pb-1.5 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <span>Explorar módulo</span>
                <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Dúo visual asimétrico: pantalla web panorámica + vista móvil vertical */}
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
            <figure data-m3-hero className="space-y-2.5 lg:col-span-8">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape03)}
                aria-label="Abrir capturas de la aplicación de nómina en APE 03"
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-panel)] transition-colors hover:border-border-strong"
              >
                <img
                  src={imgNominaWeb}
                  alt="Panel principal web de la aplicación de roles de pago (APE 03)"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </button>
              <figcaption className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
                Aplicación web · Panel mensual de nómina (Figura 8 · APE 03)
              </figcaption>
            </figure>

            <figure data-m3-hero className="space-y-2.5 lg:col-span-4">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape03)}
                aria-label="Abrir versión móvil en APE 03"
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface p-2 shadow-[var(--shadow-panel)] transition-colors hover:border-border-strong"
              >
                <img
                  src={imgNominaMovil}
                  alt="Versión móvil de la aplicación de roles de pago (APE 03)"
                  className="aspect-[3/4] max-h-[26rem] w-full rounded-md object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </button>
              <figcaption className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
                Versión móvil · 12 registros · IESS
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* SECCIONES 03.01 Y 03.02 */}
      <NominaContratacionOrganigrama onPreview={setSelectedDoc} />

      {/* SECCIÓN 03.03 — REMUNERACIONES, BENEFICIOS Y CONCILIACIÓN IESS */}
      <NominaRemuneracionesSection onPreview={setSelectedDoc} />

      {/* SECCIONES 03.04, 03.05 Y 03.06 */}
      <NominaAppJuridicoExpediente onPreview={setSelectedDoc} />

      {/* NAVEGACIÓN SECUENCIAL ENTRE MÓDULOS */}
      <nav
        aria-label="Navegación entre módulos"
        className="grid grid-cols-1 gap-6 border-t border-border py-10 sm:grid-cols-2"
      >
        <Link
          to="/tributacion"
          className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Módulo anterior
          </span>
          <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            <span
              className="type-editorial-numeral text-xl"
              style={{ color: "var(--module-02)" }}
            >
              02
            </span>
            <span>Obligaciones tributarias</span>
          </span>
        </Link>

        <Link
          to="/liquidacion"
          className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end sm:text-right"
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            Siguiente módulo
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            <span
              className="type-editorial-numeral text-xl"
              style={{ color: "var(--module-04)" }}
            >
              04
            </span>
            <span>Liquidación laboral</span>
          </span>
        </Link>
      </nav>

      {/* VISOR LATERAL DE PDF ORIGINAL */}
      <PdfViewerSheet
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
