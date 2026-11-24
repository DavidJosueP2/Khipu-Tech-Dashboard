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
import imgKhipuSculpture from "@/assets/heroes/editorial-m1-detail.jpg";

/**
 * Módulo 02 — Obligaciones tributarias (Unidad II).
 * Portada editorial invertida con ritmo equivalente al Módulo 01: título arriba,
 * bajada sobria (text-sm) + acceso + datos fiscales y emblema SENADI agrupados
 * abajo sin huecos vacíos ni elementos añadidos.
 */
export function TributacionPage() {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<TributacionDocument | null>(
    null
  );
  const tarea11 = getTributacionDoc("tarea-11");
  const tarea10 = getTributacionDoc("tarea-10");

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
            stagger: 0.08,
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
      {/* PORTADA EDITORIAL INVERTIDA DEL MÓDULO 02 — RITMO LIMPIO SIN HUECOS */}
      <section
        ref={heroRef}
        aria-label="Portada del Módulo 02 Obligaciones tributarias"
        className="flex min-h-[calc(100svh-4rem)] items-center py-10 md:py-14"
      >
        <div className="grid w-full grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Izquierda: póster real íntegro de Top 5 Importaciones (TAREA 11) */}
          <div
            data-m2-hero
            className="order-2 flex flex-col justify-between gap-3 lg:order-1 lg:col-span-5"
          >
            <button
              type="button"
              onClick={() => setSelectedDoc(tarea11)}
              aria-label="Abrir infografía de importaciones TAREA 11"
              className="group block w-full cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <img
                src={imgImportaciones}
                alt="Top 5 de productos tecnológicos que más importa Ecuador 2024 (TAREA 11)"
                className="max-h-[calc(100svh-11rem)] w-full object-contain object-left transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
            </button>
            <span className="font-mono text-[0.66rem] tracking-[0.16em] text-muted-foreground uppercase">
              Infografía Ecuador 2024 · TAREA 11
            </span>
          </div>

          {/* Derecha: título protagonista arriba; texto pequeño + botón + emblema agrupados abajo */}
          <div className="order-1 flex min-w-0 flex-col justify-between gap-10 lg:order-2 lg:col-span-7">
            <div className="space-y-4 pt-2">
              <div
                data-m2-hero
                className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] uppercase"
                style={{ color: "var(--module-02)" }}
              >
                <span
                  className="h-px w-7"
                  style={{ backgroundColor: "var(--module-02)" }}
                  aria-hidden="true"
                />
                <span>02 · Unidad II · Formalización PYME</span>
              </div>

              <h1
                data-m2-hero
                className="text-[clamp(2.6rem,4.9vw,4.6rem)] leading-[0.96] tracking-[-0.032em] text-foreground"
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
            </div>

            {/* Bloque inferior estilo Emprendimiento: texto pequeño + CTA a la izquierda, emblema SENADI a la derecha */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 items-end gap-8 sm:grid-cols-12">
                <div data-m2-hero className="space-y-5 sm:col-span-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    RUC y CIIU, Facturador SRI, liquidación de IVA (INDUMETAL
                    S.A.), registro de marca SENADI y contratación inicial PYME.
                  </p>

                  <div>
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

                <div
                  data-m2-hero
                  className="flex justify-start sm:col-span-5 sm:justify-end"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(tarea10)}
                    aria-label="Abrir simulación SENADI TAREA 10"
                    className="group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={imgKhipuSculpture}
                      alt="Signo distintivo KhipuTech registrado en simulación SENADI Clase 42"
                      className="h-44 w-44 object-contain mix-blend-multiply brightness-[1.1] contrast-[1.15] transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </div>
              </div>

              <dl
                data-m2-hero
                className="grid grid-cols-3 gap-4 border-t border-border pt-5"
              >
                <div>
                  <dt className="font-mono text-[0.64rem] tracking-wider text-muted-foreground uppercase">
                    CIIU principal
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm font-bold text-foreground">
                    J62010101
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.64rem] tracking-wider text-muted-foreground uppercase">
                    Crédito IVA
                  </dt>
                  <dd
                    className="mt-0.5 font-mono text-sm font-bold"
                    style={{ color: "var(--module-02)" }}
                  >
                    USD 229,50
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.64rem] tracking-wider text-muted-foreground uppercase">
                    Marca SENADI
                  </dt>
                  <dd className="mt-0.5 font-mono text-sm font-bold text-foreground">
                    Clase 42
                  </dd>
                </div>
              </dl>
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
