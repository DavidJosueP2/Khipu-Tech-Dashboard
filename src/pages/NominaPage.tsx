import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getNominaDoc, type NominaDocument } from "@/data/nomina";
import { ModuleCover } from "@/components/layout/ModuleCover";
import { NominaContratacionOrganigrama } from "@/components/nomina/NominaContratacionOrganigrama";
import { NominaRemuneracionesSection } from "@/components/nomina/NominaRemuneracionesSection";
import { NominaAppJuridicoExpediente } from "@/components/nomina/NominaAppJuridicoExpediente";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";

import imgStudioWorkspace from "@/assets/heroes/editorial-m3-main.jpg";
import imgNominaWeb from "@/assets/heroes/m3-nomina-web.png";

export function NominaPage() {
  const [selectedDoc, setSelectedDoc] = useState<NominaDocument | null>(null);
  const ape03 = getNominaDoc("ape-03");

  return (
    <div className="module-page flex flex-1 flex-col" data-module="03">
      <ModuleCover
        module="03"
        title="Remuneraciones"
        emphasis="y nómina."
        target="escena-contratacion"
        description={
          <>
            Contratación laboral, organigrama funcional,{" "}
            <strong className="text-foreground">planilla consolidada con conciliación IESS</strong>{" "}
            y aplicación web/móvil.
          </>
        }
      />

      <div className="editorial-container flex flex-1 flex-col">
        <section className="atlas-evidence" aria-label="Evidencias del módulo">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <figure className="space-y-2.5 lg:col-span-7">
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
              <figcaption className="type-caption text-muted-foreground">
                Estructura organizacional · 12 registros · SBU ejercicio $482
              </figcaption>
            </figure>

            <figure className="space-y-2.5 lg:col-span-5">
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
              <figcaption className="flex items-center justify-between type-caption text-muted-foreground">
                <span>Rol de pagos web · APE 03</span>
                <span>IESS $3.588,64</span>
              </figcaption>
            </figure>
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
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Módulo anterior
            </span>
            <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              <span>Obligaciones tributarias</span>
            </span>
          </Link>

          <Link
            to="/liquidacion"
            className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end sm:text-right"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              Siguiente módulo
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              <span>Liquidación laboral</span>
            </span>
          </Link>
        </nav>

        {/* VISOR LATERAL DE PDF ORIGINAL */}
      </div>

      <PdfViewerSheet
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
