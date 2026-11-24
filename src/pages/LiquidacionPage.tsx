import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import {
  getLiquidacionDoc,
  LIQUIDACION_HERO_VISUAL,
  PAZYSALVO_META,
  type LiquidacionDocument,
} from "@/data/liquidacion";
import { ModuleCover } from "@/components/layout/ModuleCover";
import { LiquidacionPazYSalvoSection } from "@/components/liquidacion/LiquidacionPazYSalvoSection";
import { LiquidacionDoceCasosSection } from "@/components/liquidacion/LiquidacionDoceCasosSection";
import { LiquidacionEvidenciasExpediente } from "@/components/liquidacion/LiquidacionEvidenciasExpediente";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";

export function LiquidacionPage() {
  const [selectedDoc, setSelectedDoc] = useState<LiquidacionDocument | null>(
    null
  );
  const ape04 = getLiquidacionDoc("ape-04");

  return (
    <div className="module-page flex flex-1 flex-col" data-module="04">
      <ModuleCover
        module="04"
        title="Liquidación"
        emphasis="laboral."
        target="escena-pazysalvo"
        description={
          <>
            <strong className="text-foreground">Automatización del paz y salvo</strong>
            , doce casos resueltos y cierre contractual del semestre.
          </>
        }
      />

      <section className="editorial-container atlas-evidence" aria-label="Evidencias del módulo">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <figure className="space-y-2.5 lg:col-span-8">
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
            <figcaption className="type-caption text-muted-foreground">
              {LIQUIDACION_HERO_VISUAL.caption}
            </figcaption>
          </figure>

          <figure className="space-y-2.5 lg:col-span-4">
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
            <figcaption className="type-caption text-muted-foreground">
              Certificado de Paz y Salvo · Anexo A (sin fondo)
            </figcaption>
          </figure>
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
