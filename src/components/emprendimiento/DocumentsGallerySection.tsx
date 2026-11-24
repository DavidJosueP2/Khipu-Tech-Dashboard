import { useRef } from "react";
import { Download, Eye } from "lucide-react";

import {
  EMPRENDIMIENTO_DOCUMENTS,
  type AcademicDocument,
} from "@/data/emprendimiento";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

interface DocumentsGallerySectionProps {
  onPreview: (doc: AcademicDocument) => void;
}

/**
 * Cierre documental del Módulo 01: galería visual con vista previa real
 * de la primera página de cada uno de los seis archivos PDF originales
 * (Guía APE 01 como Informe Principal + Tareas 01 a 05 como Evidencias).
 */
export function DocumentsGallerySection({
  onPreview,
}: DocumentsGallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(sectionRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        animateEditorialReveal("[data-gallery-head]", {
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });

        animateDocumentListStagger("[data-doc-tile]", {
          stagger: 0.07,
          scrollTrigger: {
            trigger: "[data-doc-grid]",
            start: "top 84%",
            once: true,
          },
        });
      }),
    { scope: sectionRef }
  );

  return (
    <section
      id="documentos-respaldo"
      ref={sectionRef}
      aria-labelledby="respaldo-heading"
      className="border-t border-border/70 py-20 md:py-28"
    >
      <div className="space-y-12">
        <div className="space-y-4">
          <p
            data-gallery-head
            className="font-mono text-[0.72rem] font-medium tracking-[0.2em] text-primary/90 uppercase"
          >
            Módulo 01 · Documentos de respaldo
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="respaldo-heading"
              data-gallery-head
              className="text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
            >
              Consulta{" "}
              <EditorialSerif
                optical="display"
                className="font-normal text-primary"
              >
                cada trabajo.
              </EditorialSerif>
            </h2>

            <p
              data-gallery-head
              className="font-mono text-xs text-muted-foreground"
            >
              6 archivos originales · 1 informe APE + 5 evidencias de fase
            </p>
          </div>
        </div>

        {/* Galería con miniaturas reales de los 6 PDF */}
        <div
          data-doc-grid
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {EMPRENDIMIENTO_DOCUMENTS.map((doc) => (
            <article
              key={doc.id}
              data-doc-tile
              className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                doc.isIntegrator
                  ? "border-primary/45 bg-surface/85 hover:border-primary"
                  : "border-border/80 bg-surface/55 hover:border-border-strong hover:bg-surface/80"
              }`}
            >
              {/* Miniatura real de la página 1 del PDF */}
              <button
                type="button"
                onClick={() => onPreview(doc)}
                aria-label={`Visualizar ${doc.fileName}`}
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden border-b border-border/70 bg-white text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={doc.thumbnailUrl}
                  alt={`Portada de ${doc.fileName}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-[0.7rem] font-semibold text-foreground opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                  <Eye className="size-3 text-primary" />
                  Abrir visor
                </span>
              </button>

              {/* Ficha editorial del documento */}
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] font-bold tracking-[0.14em] uppercase ${
                        doc.isIntegrator
                          ? "bg-primary text-primary-foreground"
                          : "border border-border-strong bg-surface-subtle text-muted-foreground"
                      }`}
                    >
                      {doc.documentType}
                    </span>
                    <span className="font-mono text-[0.68rem] text-muted-foreground">
                      {doc.pages} {doc.pages === 1 ? "pág." : "págs."} · {doc.date}
                    </span>
                  </div>

                  <h3 className="text-base leading-snug font-bold text-foreground">
                    {doc.shortLabel}
                  </h3>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {doc.summary}
                  </p>
                </div>

                {/* Acciones de consulta y descarga */}
                <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3.5">
                  <button
                    type="button"
                    onClick={() => onPreview(doc)}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Eye className="size-3.5" />
                    <span>Visualizar PDF</span>
                  </button>

                  <a
                    href={doc.url}
                    download={doc.fileName}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <Download className="size-3.5" />
                    <span>Descargar</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
