import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

import { BRAND } from "@/data/platform";
import {
  getEmprendimientoDoc,
  type AcademicDocument,
} from "@/data/emprendimiento";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { ChapterIdeaCanvas } from "@/components/emprendimiento/ChapterIdeaCanvas";
import { ChapterPlanEmpresarial } from "@/components/emprendimiento/ChapterPlanEmpresarial";
import { ChapterResultadosEconomicos } from "@/components/emprendimiento/ChapterResultadosEconomicos";
import { DocumentsGallerySection } from "@/components/emprendimiento/DocumentsGallerySection";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgKhipuBrand from "@/assets/heroes/m1-khiputech-logo.png";
import imgSurveyMarket from "@/assets/heroes/m1-encuesta-mercado.png";

/**
 * Módulo 01 — Emprendimiento (KhipuTech · Unidad I).
 * Portada editorial con composición propia: tipografía + marca oficial a la
 * izquierda y galería vertical del estudio de mercado a la derecha.
 */
export function EmprendimientoPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<AcademicDocument | null>(null);
  const ape01 = getEmprendimientoDoc("ape-01");

  useGSAP(
    () =>
      withResponsiveMotion(heroRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        gsap.fromTo(
          "[data-m1-intro]",
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
    const el = document.getElementById("capitulo-idea");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="editorial-container flex flex-1 flex-col">
      {/* PORTADA EDITORIAL DEL MÓDULO 01 — MARCA + ESTUDIO DE MERCADO */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 01 Emprendimiento"
        className="py-14 md:py-22"
      >
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Izquierda: título monumental + bajada + logotipo real de KhipuTech */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-6">
            <div className="space-y-6">
              <div
                data-m1-intro
                className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase"
                style={{ color: "var(--module-01)" }}
              >
                <span
                  className="h-px w-7"
                  style={{ backgroundColor: "var(--module-01)" }}
                  aria-hidden="true"
                />
                <span>01 · Unidad I</span>
              </div>

              <h1
                data-m1-intro
                className="text-[clamp(3.1rem,6.8vw,5.8rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
              >
                <span className="block font-bold">El</span>
                <span className="block">
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                    style={{ color: "var(--module-01)" }}
                  >
                    emprendimiento.
                  </EditorialSerif>
                </span>
              </h1>

              <p
                data-m1-intro
                className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                Idea de negocio, Business Model Canvas, perfil estratégico y
                viabilidad financiera de KhipuTech.
              </p>

              <div data-m1-intro className="pt-1">
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

            {/* Visual secundario: identidad oficial extraída de Guia Ape 01.pdf */}
            <button
              type="button"
              data-m1-intro
              onClick={() => setSelectedDoc(ape01)}
              aria-label="Abrir Plan de Negocios APE 01"
              className="group block w-full max-w-md cursor-pointer overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-hairline)] transition-colors hover:border-border-strong"
            >
              <img
                src={imgKhipuBrand}
                alt="Logotipo oficial KhipuTech — Figura 1 de Guia Ape 01.pdf"
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </button>
          </div>

          {/* Derecha: visual vertical protagonista (encuesta real de 17 comercios) */}
          <div data-m1-intro className="flex flex-col justify-between gap-4 lg:col-span-6">
            <button
              type="button"
              onClick={() => setSelectedDoc(ape01)}
              aria-label="Consultar encuesta de mercado en Guia Ape 01.pdf"
              className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-[var(--shadow-panel)] transition-colors hover:border-border-strong"
            >
              <img
                src={imgSurveyMarket}
                alt="Resultados reales de la encuesta de mercado de KhipuTech (17 respuestas)"
                className="max-h-[34rem] w-full rounded-md object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
            </button>

            <div className="flex items-center justify-between font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
              <span>Plan de negocios · 17 encuestas</span>
              <span>APE 01 · 6 documentos</span>
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULOS 01 y 02 — IDEA DE NEGOCIO + MODELO CANVAS */}
      <ChapterIdeaCanvas />

      {/* CAPÍTULO 03 — PLAN EMPRESARIAL (4 ESCENAS: IDENTIDAD, FODA, MERCADO, OPERACIÓN) */}
      <ChapterPlanEmpresarial />

      {/* CAPÍTULO 04 — RESULTADOS ECONÓMICOS (2 ESCENAS: INVERSIÓN/COSTOS + INGRESOS/RECUPERACIÓN) */}
      <ChapterResultadosEconomicos />

      {/* CIERRE — GALERÍA VISUAL DE LOS 6 PDF ORIGINALES */}
      <DocumentsGallerySection onPreview={setSelectedDoc} />

      {/* NAVEGACIÓN SECUENCIAL INFERIOR */}
      <nav
        aria-label="Navegación entre módulos"
        className="grid grid-cols-1 gap-6 border-t border-border py-10 sm:grid-cols-2"
      >
        <Link
          to="/"
          className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Portada principal
          </span>
          <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {BRAND.product}
          </span>
        </Link>

        <Link
          to="/tributacion"
          className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end sm:text-right"
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            Siguiente módulo
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
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
      </nav>

      {/* Visor lateral de PDF original */}
      <PdfViewerSheet
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
