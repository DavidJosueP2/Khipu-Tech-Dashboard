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

import imgM1Shelves from "@/assets/heroes/editorial-m1-main.jpg";
import imgM1KhipuKnot from "@/assets/heroes/editorial-m1-detail.jpg";

/**
 * Módulo 01 — Emprendimiento (KhipuTech · Unidad I).
 * Portada editorial estilo galería (Aureli): tipografía monumental sin desbordes,
 * escultura Khipu integrada sin fondo (mix-blend-multiply) y fotografía editorial
 * a sangre completa sin marcos ni tarjetas blancas.
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
            stagger: 0.08,
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
      {/* PORTADA EDITORIAL DEL MÓDULO 01 — ESTILO AURELI SIN MARCOS */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 01 Emprendimiento"
        className="flex min-h-[calc(100svh-4rem)] items-center py-10 md:py-14"
      >
        <div className="grid w-full grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Izquierda: título sin desbordes + sub-fila editorial con escultura sin fondo */}
          <div className="flex min-w-0 flex-col justify-between gap-10 lg:col-span-6">
            <div className="space-y-4 pt-2">
              <div
                data-m1-intro
                className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase"
                style={{ color: "var(--module-01)" }}
              >
                <span
                  className="h-px w-7"
                  style={{ backgroundColor: "var(--module-01)" }}
                  aria-hidden="true"
                />
                <span>01 · Unidad I · KhipuTech</span>
              </div>

              <h1
                data-m1-intro
                className="text-[clamp(2.45rem,4.35vw,4.15rem)] leading-[0.98] tracking-[-0.032em] text-foreground"
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
            </div>

            {/* Sub-fila inferior: descripción + acceso a la izquierda, escultura Khipu sin fondo al centro */}
            <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-12">
              <div data-m1-intro className="space-y-6 sm:col-span-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Control inteligente de lotes y caducidad para comercios: idea
                  de negocio, Canvas, plan estratégico y viabilidad financiera.
                </p>

                <div>
                  <button
                    type="button"
                    onClick={scrollToContent}
                    className="group inline-flex cursor-pointer items-center gap-2.5 border-b border-foreground pb-1.5 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    <span>Explorar módulo</span>
                    <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                  </button>
                </div>

                <p className="pt-2 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
                  APE 01 · 6 documentos · 17 encuestas
                </p>
              </div>

              {/* Escultura Khipu sin fondo (se funde directo en el lienzo blanco cálido) */}
              <div data-m1-intro className="sm:col-span-6">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(ape01)}
                  aria-label="Abrir Plan de Negocios APE 01"
                  className="group block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={imgM1KhipuKnot}
                    alt="Escultura geométrica inspirada en el nudo Khipu de KhipuTech"
                    className="mx-auto max-h-60 w-full object-contain mix-blend-multiply brightness-[1.1] contrast-[1.15] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Derecha: imagen editorial limpia a sangre completa (CERO borde, CERO marco blanco) */}
          <div data-m1-intro className="flex flex-col justify-between gap-3 lg:col-span-6">
            <button
              type="button"
              onClick={() => setSelectedDoc(ape01)}
              aria-label="Consultar Plan de Negocios en Guia Ape 01.pdf"
              className="group block w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={imgM1Shelves}
                alt="Orden y trazabilidad de lotes en anaquel — concepto KhipuTech"
                className="aspect-[4/4.6] max-h-[calc(100svh-10.5rem)] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </button>

            <div className="flex items-center justify-between font-mono text-[0.66rem] tracking-[0.16em] text-muted-foreground uppercase">
              <span>Trazabilidad de lotes · SaaS</span>
              <span>Plan integral · APE 01</span>
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULOS 01 y 02 — IDEA DE NEGOCIO + MODELO CANVAS */}
      <ChapterIdeaCanvas />

      {/* CAPÍTULO 03 — PLAN EMPRESARIAL */}
      <ChapterPlanEmpresarial />

      {/* CAPÍTULO 04 — RESULTADOS ECONÓMICOS */}
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
            Dashboard principal
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
