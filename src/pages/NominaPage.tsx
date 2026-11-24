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

import imgStudioWorkspace from "@/assets/heroes/editorial-m3-main.jpg";
import imgNominaWeb from "@/assets/heroes/m3-nomina-web.png";

/**
 * Módulo 03 — Remuneraciones y nómina (Unidad III).
 * Portada panorámica editorial sin marcos blancos: cabecera dividida arriba y
 * contrapunto limpio entre el espacio organizativo y la app real de roles de pago.
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
            stagger: 0.08,
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
      {/* PORTADA EDITORIAL PANORÁMICA DEL MÓDULO 03 — SIN CAJAS BLANCAS */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 03 Remuneraciones y nómina"
        className="flex min-h-[calc(100svh-4rem)] items-center py-8 md:py-10"
      >
        <div className="w-full space-y-7">
          {/* Cabecera dividida */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="min-w-0 space-y-3 lg:col-span-7">
              <div
                data-m3-hero
                className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase"
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
                className="text-[clamp(2.5rem,4.7vw,4.5rem)] leading-[0.98] tracking-[-0.032em] text-foreground"
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
              className="flex flex-col items-start space-y-4 lg:col-span-5 lg:items-end lg:text-right"
            >
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
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

          {/* Contrapunto visual limpio a sangre completa (CERO marco padding) */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <figure data-m3-hero className="space-y-2.5 lg:col-span-7">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape03)}
                aria-label="Abrir informe APE 03"
                className="group block w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={imgStudioWorkspace}
                  alt="Organización del talento humano y estructura corporativa — TechInstall Solutions"
                  className="max-h-[22.5rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="font-mono text-[0.66rem] tracking-[0.16em] text-muted-foreground uppercase">
                Estructura organizacional · 12 registros · SBU ejercicio $482
              </figcaption>
            </figure>

            <figure data-m3-hero className="space-y-2.5 lg:col-span-5">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape03)}
                aria-label="Ver sistema web de roles de pago en APE 03"
                className="group block w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={imgNominaWeb}
                  alt="Sistema web de roles de pago desarrollado en APE 03"
                  className="max-h-[22.5rem] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="flex items-center justify-between font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">
                <span>Rol de pagos web · APE 03</span>
                <span>IESS $3.588,64</span>
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
