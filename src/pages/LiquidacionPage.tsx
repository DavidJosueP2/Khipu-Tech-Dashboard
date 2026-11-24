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
 * Minimalismo editorial puro sobre fondo blanco cálido: tipografía monumental,
 * captura real protagonista de PazySalvo y espacios negativos generosos.
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
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.78,
            stagger: 0.1,
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
       * PORTADA EDITORIAL MINIMALISTA (BLANCO CÁLIDO + IMAGEN CENTRAL)
       * ================================================================ */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 04 Liquidación laboral"
        className="bg-background pt-16 pb-24 md:pt-24 md:pb-32"
      >
        <div className="editorial-container space-y-12 md:space-y-16">
          {/* Título protagonista enorme + bajada breve + único acceso */}
          <div className="space-y-8">
            <h1
              data-m4-hero
              className="text-[clamp(3.3rem,8.4vw,7.2rem)] leading-[0.95] tracking-[-0.036em] text-foreground"
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
              className="flex flex-col justify-between gap-6 border-t border-border pt-6 sm:flex-row sm:items-center"
            >
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                Automatización del paz y salvo, doce casos resueltos y
                evidencias de terminación contractual.
              </p>

              <button
                type="button"
                onClick={scrollToContent}
                className="group inline-flex shrink-0 cursor-pointer items-center gap-2.5 self-start rounded-full bg-foreground px-6 py-3 text-xs font-semibold tracking-[0.12em] text-background uppercase transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:self-auto"
              >
                <span>Explorar módulo</span>
                <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Díptico escalonado propio del Módulo 04: PazySalvo + Certificado PDF */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <figure data-m4-hero className="space-y-3 lg:col-span-8">
              <button
                type="button"
                onClick={() => setSelectedDoc(ape04)}
                aria-label="Abrir APE 04.pdf en el visor"
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-panel)] transition-all duration-500 hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <img
                  src={LIQUIDACION_HERO_VISUAL.imageUrl}
                  alt={LIQUIDACION_HERO_VISUAL.alt}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                />
              </button>
              <figcaption className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
                {LIQUIDACION_HERO_VISUAL.caption}
              </figcaption>
            </figure>

            <figure
              data-m4-hero
              className="space-y-3 lg:col-span-4 lg:mt-10"
            >
              <button
                type="button"
                onClick={() => setSelectedDoc(ape04)}
                aria-label="Abrir certificado de paz y salvo en APE 04.pdf"
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface p-2.5 shadow-[var(--shadow-panel)] transition-all duration-500 hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <img
                  src={PAZYSALVO_META.gallery[2].imageUrl}
                  alt={PAZYSALVO_META.gallery[2].title}
                  className="aspect-[3/4] w-full rounded-md object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
              </button>
              <figcaption className="font-mono text-[0.68rem] tracking-[0.12em] text-muted-foreground uppercase">
                Certificado de Paz y Salvo · Anexo A
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
            <span>Volver al inicio de KhipuTech</span>
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
