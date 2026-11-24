import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";

import {
  getLiquidacionDoc,
  LIQUIDACION_HERO_VISUAL,
  PAZYSALVO_META,
  type LiquidacionDocument,
} from "@/data/liquidacion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { LiquidacionPazYSalvoSection } from "@/components/liquidacion/LiquidacionPazYSalvoSection";
import { LiquidacionDoceCasosSection } from "@/components/liquidacion/LiquidacionDoceCasosSection";
import { LiquidacionEvidenciasExpediente } from "@/components/liquidacion/LiquidacionEvidenciasExpediente";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

/**
 * Módulo 04 — Liquidación laboral (Unidad IV).
 * Minimalismo editorial puro sobre fondo blanco cálido: captura real a sangre
 * completa de PazySalvo + certificado oficial integrado sin fondo (mix-blend-multiply).
 */
export function LiquidacionPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<LiquidacionDocument | null>(
    null
  );
  const ape04 = getLiquidacionDoc("ape-04");

  useGSAP(
    () =>
      withResponsiveMotion(heroRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        gsap.fromTo(
          "[data-m4-hero]",
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
    const el = document.getElementById("escena-pazysalvo");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* ==================================================================
       * PORTADA EDITORIAL DEL MÓDULO 04 — DÍPTICO SIN MARCOS BLANCOS
       * ================================================================ */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 04 Liquidación laboral"
        className="flex min-h-[calc(100svh-4rem)] items-center bg-background py-10 md:py-14"
      >
        <div className="editorial-container w-full space-y-10">
          {/* Título protagonista + bajada + acceso único */}
          <div className="space-y-6">
            <div
              data-m4-hero
              className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase"
              style={{ color: "var(--module-04)" }}
            >
              <span
                className="h-px w-7"
                style={{ backgroundColor: "var(--module-04)" }}
                aria-hidden="true"
              />
              <span>04 · Unidad IV · PazySalvo y 12 casos</span>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <h1
                data-m4-hero
                className="text-[clamp(2.8rem,6.2vw,5.4rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
              >
                <span className="font-bold">Liquidación </span>
                <EditorialSerif
                  optical="display"
                  className="font-normal"
                  style={{ color: "var(--module-04)" }}
                >
                  laboral.
                </EditorialSerif>
              </h1>

              <div
                data-m4-hero
                className="flex flex-col items-start gap-4 lg:items-end lg:text-right"
              >
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Automatización del paz y salvo, doce casos resueltos y cierre
                  contractual del semestre.
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
          </div>

          {/* Díptico sin marcos: PazySalvo a sangre + Certificado PDF sin fondo */}
          <div className="grid grid-cols-1 items-center gap-8 border-t border-border pt-8 lg:grid-cols-12">
            <figure data-m4-hero className="space-y-2.5 lg:col-span-8">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape04)}
                aria-label="Abrir APE 04.pdf en el visor"
                className="group block w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={LIQUIDACION_HERO_VISUAL.imageUrl}
                  alt={LIQUIDACION_HERO_VISUAL.alt}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </button>
              <figcaption className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">
                {LIQUIDACION_HERO_VISUAL.caption}
              </figcaption>
            </figure>

            <figure data-m4-hero className="space-y-2.5 lg:col-span-4">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape04)}
                aria-label="Abrir certificado de paz y salvo en APE 04.pdf"
                className="group block w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={PAZYSALVO_META.gallery[2].imageUrl}
                  alt={PAZYSALVO_META.gallery[2].title}
                  className="mx-auto max-h-[24rem] w-full object-contain mix-blend-multiply contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">
                Certificado de Paz y Salvo · Anexo A (sin fondo)
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ESCENAS 01 Y 02 — PAZYSALVO Y CASO HIPOTÉTICO */}
      <LiquidacionPazYSalvoSection onPreview={setSelectedDoc} />

      {/* ESCENA 03 — DOCE CASOS RESUELTOS (ÍNDICE EDITORIAL SIN TABLA) */}
      <LiquidacionDoceCasosSection onPreview={setSelectedDoc} />

      {/* ESCENAS 04 Y 05 — GAMIFICACIÓN, VIDEO Y EXPEDIENTE */}
      <LiquidacionEvidenciasExpediente onPreview={setSelectedDoc} />

      {/* NAVEGACIÓN DE CIERRE */}
      <nav
        aria-label="Navegación entre módulos"
        className="border-t border-border bg-background py-12"
      >
        <div className="editorial-container flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            to="/nomina"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>03 · Remuneraciones y nómina</span>
          </Link>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-opacity hover:opacity-75"
          >
            <span>Volver al dashboard de KhipuTech</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </nav>

      {/* VISOR LATERAL DE PDF ORIGINAL */}
      <PdfViewerSheet
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
