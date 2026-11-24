import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

import {
  getTributacionDoc,
  type TributacionDocument,
} from "@/data/tributacion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { TributacionSections } from "@/components/tributacion/TributacionSections";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgImportaciones from "@/assets/heroes/m2-infografia-importaciones.png";
import imgFacturadorSri from "@/assets/heroes/m2-facturador-sri.png";

/**
 * Módulo 02 — Obligaciones tributarias (Unidad II).
 * Portada editorial invertida: infografía vertical protagonista a la izquierda,
 * tipografía y captura del Facturador SRI a la derecha.
 */
export function TributacionPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<TributacionDocument | null>(
    null
  );
  const tarea11 = getTributacionDoc("tarea-11");
  const tarea07 = getTributacionDoc("tarea-07");

  useGSAP(
    () =>
      withResponsiveMotion(heroRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        gsap.fromTo(
          "[data-m2-hero]",
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
    const el = document.getElementById("escena-formalizacion");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="editorial-container flex flex-1 flex-col">
      {/* PORTADA EDITORIAL INVERTIDA DEL MÓDULO 02 */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 02 Obligaciones tributarias"
        className="py-14 md:py-22"
      >
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Izquierda: póster vertical real de Top 5 Importaciones (TAREA 11) */}
          <div
            data-m2-hero
            className="order-2 flex flex-col justify-between gap-4 lg:order-1 lg:col-span-5"
          >
            <button
              type="button"
              onClick={() => setSelectedDoc(tarea11)}
              aria-label="Abrir infografía de importaciones TAREA 11"
              className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface p-2.5 shadow-[var(--shadow-panel)] transition-colors hover:border-border-strong"
            >
              <img
                src={imgImportaciones}
                alt="Infografía Top 5 de productos tecnológicos que más importa Ecuador 2024 (TAREA 11)"
                className="max-h-[36rem] w-full rounded-md object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </button>
            <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
              Infografía comercial · TAREA 11 · Ecuador 2024
            </span>
          </div>

          {/* Derecha: tipografía monumental + captura secundaria del Facturador SRI */}
          <div className="order-1 flex flex-col justify-between gap-10 lg:order-2 lg:col-span-7">
            <div className="space-y-6">
              <div
                data-m2-hero
                className="flex items-center gap-3 font-mono text-[0.72rem] tracking-[0.18em] uppercase"
                style={{ color: "var(--module-02)" }}
              >
                <span
                  className="h-px w-7"
                  style={{ backgroundColor: "var(--module-02)" }}
                  aria-hidden="true"
                />
                <span>02 · Unidad II</span>
              </div>

              <h1
                data-m2-hero
                className="text-[clamp(3rem,6.6vw,5.6rem)] leading-[0.95] tracking-[-0.035em] text-foreground"
              >
                <span className="block font-bold">Obligaciones</span>
                <span className="block">
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                    style={{ color: "var(--module-02)" }}
                  >
                    tributarias.
                  </EditorialSerif>
                </span>
              </h1>

              <p
                data-m2-hero
                className="max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                RUC y CIIU, Facturador SRI, liquidación de IVA (INDUMETAL S.A.),
                registro de marca SENADI y contratación inicial PYME.
              </p>

              <div data-m2-hero className="pt-1">
                <button
                  type="button"
                  onClick={scrollToContent}
                  className="group inline-flex cursor-pointer items-center gap-2.5 border-b border-foreground pb-1.5 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <span>Explorar expediente</span>
                  <ArrowDown className="size-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Pie visual derecho: captura real del Facturador SRI + índice temático */}
            <div
              data-m2-hero
              className="grid grid-cols-1 items-end gap-6 border-t border-border pt-7 sm:grid-cols-12"
            >
              <button
                type="button"
                onClick={() => setSelectedDoc(tarea07)}
                aria-label="Abrir evidencia del Facturador SRI TAREA 07"
                className="group block cursor-pointer overflow-hidden rounded-lg border border-border bg-surface p-2 shadow-[var(--shadow-hairline)] transition-colors hover:border-border-strong sm:col-span-7"
              >
                <img
                  src={imgFacturadorSri}
                  alt="Emisión de factura electrónica en el Facturador SRI (TAREA 07)"
                  className="aspect-[16/10] w-full rounded object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>

              <div className="space-y-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase sm:col-span-5 sm:text-right">
                <p className="font-semibold text-foreground">APE 02 · 8 archivos</p>
                <p>RUC · CIIU · SRI</p>
                <p>IVA · SENADI · PYME</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESCENAS VISUALES DEL MÓDULO 02 */}
      <TributacionSections onPreview={setSelectedDoc} />

      {/* NAVEGACIÓN SECUENCIAL ENTRE MÓDULOS */}
      <nav
        aria-label="Navegación entre módulos"
        className="grid grid-cols-1 gap-6 border-t border-border py-10 sm:grid-cols-2"
      >
        <Link
          to="/emprendimiento"
          className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Módulo anterior
          </span>
          <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            <span
              className="type-editorial-numeral text-xl"
              style={{ color: "var(--module-01)" }}
            >
              01
            </span>
            <span>Emprendimiento</span>
          </span>
        </Link>

        <Link
          to="/nomina"
          className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end sm:text-right"
        >
          <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            Siguiente módulo
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
          <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            <span
              className="type-editorial-numeral text-xl"
              style={{ color: "var(--module-03)" }}
            >
              03
            </span>
            <span>Remuneraciones y nómina</span>
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
