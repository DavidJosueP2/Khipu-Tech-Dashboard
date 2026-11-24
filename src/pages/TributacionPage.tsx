import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  getTributacionDoc,
  type TributacionDocument,
} from "@/data/tributacion";
import { ModuleCover } from "@/components/layout/ModuleCover";
import { TributacionSections } from "@/components/tributacion/TributacionSections";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";

import imgImportaciones from "@/assets/heroes/m2-infografia-importaciones.png";
import imgSignoDistintivo from "@/assets/heroes/editorial-m1-detail.jpg";

export function TributacionPage() {
  const [selectedDoc, setSelectedDoc] = useState<TributacionDocument | null>(
    null
  );
  const tarea11 = getTributacionDoc("tarea-11");
  const tarea10 = getTributacionDoc("tarea-10");

  return (
    <div className="module-page flex flex-1 flex-col" data-module="02">
      <ModuleCover
        module="02"
        title="Obligaciones"
        emphasis="tributarias."
        target="escena-formalizacion"
        action="Explorar expediente"
        description={
          <>
            RUC y CIIU, Facturador SRI,{" "}
            <strong className="text-foreground">liquidación de IVA</strong>{" "}
            (INDUMETAL S.A.), registro de marca SENADI y contratación inicial PYME.
          </>
        }
      />

      <div className="editorial-container flex flex-1 flex-col">
        <section className="atlas-evidence grid items-center gap-10 md:grid-cols-2" aria-label="Evidencias de formalización">
          <figure className="space-y-3">
            <button
              type="button"
              onClick={() => setSelectedDoc(tarea11)}
              aria-label="Abrir infografía de importaciones, Tarea 11"
              className="group block w-full cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-ring"
            >
              <img
                src={imgImportaciones}
                alt="Top 5 de productos tecnológicos que más importa Ecuador en 2024"
                loading="lazy"
                className="max-h-[32rem] w-full object-contain object-left transition-transform group-hover:scale-[1.015]"
              />
            </button>
            <figcaption className="type-caption text-muted-foreground">Infografía Ecuador 2024 · Tarea 11</figcaption>
          </figure>
          <div className="space-y-6">
            <figure className="space-y-3">
              <button
                type="button"
                onClick={() => setSelectedDoc(tarea10)}
                className="editorial-action cursor-pointer"
              >
                Abrir simulación SENADI
              </button>
              <img
                src={imgSignoDistintivo}
                alt="Signo distintivo de KhipuTech de la simulación SENADI"
                loading="lazy"
                className="h-40 w-40 object-contain mix-blend-multiply"
              />
            </figure>
            <dl className="flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-5">
              <div>
                <dt className="type-caption text-muted-foreground">CIIU principal</dt>
                <dd className="font-bold">J62010101</dd>
              </div>
              <div>
                <dt className="type-caption text-muted-foreground">Crédito IVA</dt>
                <dd className="font-bold text-module-02">USD 229,50</dd>
              </div>
              <div>
                <dt className="type-caption text-muted-foreground">Marca SENADI</dt>
                <dd className="font-bold">Clase 42</dd>
              </div>
            </dl>
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
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              Módulo anterior
            </span>
            <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              <span>Emprendimiento</span>
            </span>
          </Link>

          <Link
            to="/nomina"
            className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end sm:text-right"
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              Siguiente módulo
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              <span>Remuneraciones y nómina</span>
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
