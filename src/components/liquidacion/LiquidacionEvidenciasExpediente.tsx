import { useRef } from "react";
import { ArrowUpRight, Download, Eye } from "lucide-react";

import {
  GAMIFICATION_DATA,
  getLiquidacionDoc,
  LIQUIDACION_DOCUMENTS,
  VIDEO_DESPIDO_DATA,
  type LiquidacionDocument,
} from "@/data/liquidacion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

const ACCENT = "var(--module-04)";

interface LiquidacionClosingProps {
  onPreview: (doc: LiquidacionDocument) => void;
}

/**
 * Escenas 04 (Gamificación Laboral Hack + Video sobre despido) y
 * 05 (Expediente documental de los 4 archivos PDF originales).
 */
export function LiquidacionEvidenciasExpediente({
  onPreview,
}: LiquidacionClosingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hackDoc = getLiquidacionDoc("laboral-hack");
  const videoDoc = getLiquidacionDoc("video-despido");

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        const targets = gsap.utils.toArray<HTMLElement>("[data-ed-closing]");
        targets.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      }),
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* ==================================================================
       * 04 — GAMIFICACIÓN Y EVIDENCIA AUDIOVISUAL (BLANCO CÁLIDO)
       * ================================================================ */}
      <section
        id="escena-evidencias-u4"
        aria-labelledby="m4-evid-heading"
        className="border-t border-border bg-background py-24 md:py-36"
      >
        <div className="editorial-container space-y-16">
          <div data-ed-closing className="max-w-2xl space-y-3">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              04 · Evidencias complementarias
            </p>
            <h2
              id="m4-evid-heading"
              className="text-[clamp(2.25rem,4.6vw,3.8rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
            >
              Gamificación y{" "}
              <EditorialSerif
                optical="display"
                className="font-normal"
                style={{ color: ACCENT }}
              >
                video.
              </EditorialSerif>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
            {/* Izquierda: Laboral Hack / UTA + Kahoot (sin caja) */}
            <div data-ed-closing className="space-y-8 lg:col-span-7">
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h3 className="text-base font-bold text-foreground">
                  Laboral Hack / UTA · Grupo 2
                </h3>
                <button
                  type="button"
                  onClick={() => onPreview(hackDoc)}
                  className="cursor-pointer font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Ver PDF (10 págs.)
                </button>
              </div>

              <ol className="divide-y divide-border">
                {GAMIFICATION_DATA.runs.map((run, idx) => (
                  <li
                    key={run.member}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-muted-foreground">
                        0{idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {run.member}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {run.note} · {run.time}
                        </p>
                      </div>
                    </div>
                    <span
                      className="font-mono text-lg font-bold tabular-nums"
                      style={{ color: ACCENT }}
                    >
                      {run.score} / 100
                    </span>
                  </li>
                ))}
              </ol>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-sm">
                <span className="text-muted-foreground">
                  Kahoot · {GAMIFICATION_DATA.kahootTitle}
                </span>
                <a
                  href={GAMIFICATION_DATA.kahootUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 font-semibold text-foreground underline underline-offset-4 hover:opacity-75"
                >
                  <span>Abrir gincana</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* Derecha: Hoja QR real de Video despido.pdf */}
            <div
              data-ed-closing
              className="space-y-5 lg:col-span-5 lg:border-l lg:border-border lg:pl-12"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">
                  {VIDEO_DESPIDO_DATA.title}
                </h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {VIDEO_DESPIDO_DATA.date}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onPreview(videoDoc)}
                aria-label="Abrir Video despido.pdf"
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-[var(--shadow-hairline)] transition-colors hover:border-border-strong"
              >
                <img
                  src={VIDEO_DESPIDO_DATA.previewImageUrl}
                  alt="Hoja original Video despido.pdf con código QR y enlace a Drive"
                  loading="lazy"
                  className="mx-auto max-h-60 w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>

              <div className="flex items-center justify-between gap-4 text-xs">
                <a
                  href={VIDEO_DESPIDO_DATA.driveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 font-semibold text-foreground underline underline-offset-4 hover:opacity-75"
                >
                  <span>Ver video en Google Drive</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => onPreview(videoDoc)}
                  className="cursor-pointer font-medium text-muted-foreground hover:text-foreground"
                >
                  Abrir PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * 05 — EXPEDIENTE DOCUMENTAL (SUPERFICIE BLANCO PURO)
       * ================================================================ */}
      <section
        id="documentos-liquidacion"
        aria-labelledby="m4-docs-heading"
        className="border-t border-border bg-surface py-24 md:py-36"
      >
        <div className="editorial-container space-y-14">
          <div
            data-ed-closing
            className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div className="space-y-2">
              <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                05 · Expediente documental · Unidad IV
              </p>
              <h2
                id="m4-docs-heading"
                className="text-[clamp(2.25rem,4.6vw,3.8rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
              >
                Consulta{" "}
                <EditorialSerif
                  optical="display"
                  className="font-normal"
                  style={{ color: ACCENT }}
                >
                  cada trabajo.
                </EditorialSerif>
              </h2>
            </div>

            <p className="font-mono text-xs text-muted-foreground">
              4 archivos PDF originales
            </p>
          </div>

          <div
            data-ed-closing
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {LIQUIDACION_DOCUMENTS.map((doc) => (
              <article key={doc.id} className="group flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => onPreview(doc)}
                  aria-label={`Visualizar ${doc.fileName}`}
                  className="aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-background text-left transition-colors group-hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <img
                    src={doc.thumbnailUrl}
                    alt={`Portada de ${doc.fileName}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </button>

                <div className="flex flex-1 flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <p className="font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">
                      <span
                        style={doc.isIntegrator ? { color: ACCENT } : undefined}
                        className={doc.isIntegrator ? "font-semibold" : ""}
                      >
                        {doc.documentType}
                      </span>{" "}
                      · {doc.pages} {doc.pages === 1 ? "pág." : "págs."}
                    </p>

                    <h3 className="text-sm leading-snug font-bold text-foreground">
                      {doc.shortLabel}
                    </h3>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-foreground transition-opacity hover:opacity-70"
                    >
                      <Eye className="size-3.5" style={{ color: ACCENT }} />
                      <span>Ver PDF</span>
                    </button>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                      >
                        <span>Abrir</span>
                        <ArrowUpRight className="size-3" />
                      </a>
                      <a
                        href={doc.url}
                        download={doc.fileName}
                        className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                      >
                        <Download className="size-3" />
                        <span>PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
