import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { BRAND } from "@/data/platform";
import {
  getEmprendimientoDoc,
  type AcademicDocument,
} from "@/data/emprendimiento";
import { ModuleCover } from "@/components/layout/ModuleCover";
import { ChapterIdeaCanvas } from "@/components/emprendimiento/ChapterIdeaCanvas";
import { ChapterPlanEmpresarial } from "@/components/emprendimiento/ChapterPlanEmpresarial";
import { ChapterResultadosEconomicos } from "@/components/emprendimiento/ChapterResultadosEconomicos";
import { DocumentsGallerySection } from "@/components/emprendimiento/DocumentsGallerySection";
import { PdfViewerSheet } from "@/components/documents/PdfViewerSheet";

export function EmprendimientoPage() {
  const [selectedDoc, setSelectedDoc] = useState<AcademicDocument | null>(null);
  const ape01 = getEmprendimientoDoc("ape-01");

  return (
    <div className="module-page flex flex-1 flex-col" data-module="01">
      <ModuleCover
        module="01"
        title="Emprendimiento"
        emphasis="KhipuTech."
        target="capitulo-idea"
        description={
          <>
            <strong className="text-foreground">Control inteligente de lotes y caducidad</strong>{" "}
            para comercios: idea de negocio, Canvas, plan estratégico y viabilidad financiera.
          </>
        }
      >
        <button type="button" className="editorial-action cursor-pointer" onClick={() => setSelectedDoc(ape01)}>
          Ver plan de negocios
        </button>
      </ModuleCover>

      <div className="editorial-container flex flex-1 flex-col">
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
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
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
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              Siguiente módulo
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              <span>Obligaciones tributarias</span>
            </span>
          </Link>
        </nav>
      </div>

      {/* Visor lateral de PDF original */}
      <PdfViewerSheet
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
