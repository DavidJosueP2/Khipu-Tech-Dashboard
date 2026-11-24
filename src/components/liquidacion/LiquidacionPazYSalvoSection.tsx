import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  APE04_HYPOTHETICAL_CASE,
  getLiquidacionDoc,
  PAZYSALVO_META,
  type LiquidacionDocument,
} from "@/data/liquidacion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

const ACCENT = "var(--module-04)";

interface LiquidacionPazYSalvoProps {
  onPreview: (doc: LiquidacionDocument) => void;
}

/**
 * Escenas 01 (Herramienta PazySalvo con una sola captura protagonista a la vez)
 * y 02 (Caso hipotético y contraste por causa sin tablas ni ruido visual).
 */
export function LiquidacionPazYSalvoSection({
  onPreview,
}: LiquidacionPazYSalvoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlideId, setActiveSlideId] = useState<string>(
    PAZYSALVO_META.gallery[0].id
  );

  const ape04 = getLiquidacionDoc("ape-04");
  const activeSlide =
    PAZYSALVO_META.gallery.find((item) => item.id === activeSlideId) ??
    PAZYSALVO_META.gallery[0];

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        const targets = gsap.utils.toArray<HTMLElement>("[data-ed-reveal]");
        targets.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
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
       * 01 — APLICACIÓN PAZYSALVO (SUPERFICIE BLANCO PURO)
       * ================================================================ */}
      <section
        id="escena-pazysalvo"
        aria-labelledby="m4-app-heading"
        className="border-t border-border bg-surface py-24 md:py-36"
      >
        <div className="editorial-container space-y-16">
          {/* Encabezado limpio, dos líneas máximo */}
          <div
            data-ed-reveal
            className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          >
            <div className="space-y-3">
              <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                01 · APE 04 · Herramienta web
              </p>
              <h2
                id="m4-app-heading"
                className="text-[clamp(2.25rem,4.6vw,3.8rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
              >
                Sistema{" "}
                <EditorialSerif
                  optical="display"
                  className="font-normal"
                  style={{ color: ACCENT }}
                >
                  PazySalvo.
                </EditorialSerif>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Verificación en cinco departamentos, cálculo automático de
              liquidación y generación de documentos en PDF y ZIP.
            </p>
          </div>

          {/* Selector minimalista + UNA única imagen grande protagonista */}
          <div data-ed-reveal className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div
                role="tablist"
                aria-label="Vistas reales de la herramienta PazySalvo"
                className="flex flex-wrap items-center gap-6"
              >
                {PAZYSALVO_META.gallery.map((slide) => {
                  const active = slide.id === activeSlide.id;
                  return (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveSlideId(slide.id)}
                      className={`relative cursor-pointer pb-1 text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {slide.tabLabel}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute right-0 -bottom-[17px] left-0 h-[2px]"
                          style={{ backgroundColor: ACCENT }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-5 text-xs font-medium">
                {PAZYSALVO_META.externalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Imagen real en gran formato */}
            <figure className="space-y-4">
              <button
                type="button"
                onClick={() => onPreview(ape04)}
                aria-label={`Abrir ${activeSlide.title} en APE 04.pdf`}
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-background p-4 text-left shadow-[var(--shadow-panel)] transition-all duration-300 hover:border-border-strong md:p-6"
              >
                <img
                  key={activeSlide.id}
                  src={activeSlide.imageUrl}
                  alt={activeSlide.title}
                  className={`mx-auto w-full rounded-lg object-contain transition-transform duration-500 ease-out group-hover:scale-[1.01] ${
                    activeSlide.aspectHint === "portrait"
                      ? "max-h-[40rem]"
                      : "max-h-[38rem]"
                  }`}
                />
              </button>

              <figcaption className="flex flex-col justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-baseline">
                <span>
                  <strong className="font-semibold text-foreground">
                    {activeSlide.title}
                  </strong>{" "}
                  — {activeSlide.caption}
                </span>
                <span className="shrink-0 font-mono">{activeSlide.figure}</span>
              </figcaption>
            </figure>
          </div>

          {/* Secuencia editorial numerada de las 5 unidades (sin cajas) */}
          <ol
            data-ed-reveal
            className="grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-5"
          >
            {PAZYSALVO_META.clearanceUnits.map((u) => (
              <li key={u.step} className="space-y-1.5">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: ACCENT }}
                >
                  {u.step}
                </span>
                <h3 className="text-sm font-bold text-foreground">{u.unit}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {u.verification}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ==================================================================
       * 02 — CASO HIPOTÉTICO Y CONTRASTE POR CAUSA (BLANCO CÁLIDO)
       * ================================================================ */}
      <section
        id="escena-caso-ape04"
        aria-labelledby="m4-case-heading"
        className="border-t border-border bg-background py-24 md:py-36"
      >
        <div className="editorial-container space-y-16">
          <div data-ed-reveal className="max-w-2xl space-y-3">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              02 · Validación del caso hipotético
            </p>
            <h2
              id="m4-case-heading"
              className="text-[clamp(2.25rem,4.6vw,3.8rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
            >
              Un caso, cuatro{" "}
              <EditorialSerif
                optical="display"
                className="font-normal"
                style={{ color: ACCENT }}
              >
                escenarios.
              </EditorialSerif>
            </h2>
            <p className="text-sm text-muted-foreground md:text-base">
              {APE04_HYPOTHETICAL_CASE.employer} ·{" "}
              {APE04_HYPOTHETICAL_CASE.worker}
            </p>
          </div>

          {/* Composición en 2 columnas limpias (sin tablas ni cajas pesadas) */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            {/* Izquierda: Protagonista numérico + desglose en lista editorial */}
            <div data-ed-reveal className="space-y-8 lg:col-span-6">
              <div className="space-y-2 border-b border-border pb-6">
                <span className="font-mono text-xs text-muted-foreground uppercase">
                  {APE04_HYPOTHETICAL_CASE.causeLabel}
                </span>
                <p
                  className="font-mono text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
                  style={{ color: ACCENT }}
                >
                  {APE04_HYPOTHETICAL_CASE.netAmount}
                </p>
                <p className="text-xs text-muted-foreground">
                  {APE04_HYPOTHETICAL_CASE.metaLine}
                </p>
              </div>

              <dl className="divide-y divide-border text-sm">
                {APE04_HYPOTHETICAL_CASE.breakdown.map((row) => (
                  <div
                    key={row.item}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="space-y-0.5">
                      <span
                        className={
                          row.isDeduction
                            ? "text-muted-foreground"
                            : "font-medium text-foreground"
                        }
                      >
                        {row.item}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {row.formulaNote}
                      </span>
                    </dt>
                    <dd
                      className={`shrink-0 font-mono text-sm tabular-nums ${
                        row.isDeduction
                          ? "text-muted-foreground"
                          : "font-semibold text-foreground"
                      }`}
                    >
                      {row.amount}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Derecha: Contraste visual limpio de las 4 causales */}
            <div
              data-ed-reveal
              className="flex flex-col justify-between gap-10 lg:col-span-6 lg:border-l lg:border-border lg:pl-12"
            >
              <div className="space-y-8">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    Impacto neto según causa de terminación
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Mismo trabajador, antigüedad y remuneración (Tabla 6 de APE
                    04).
                  </p>
                </div>

                <div className="space-y-7">
                  {APE04_HYPOTHETICAL_CASE.scenarioComparison.map((sc) => (
                    <div key={sc.cause} className="space-y-2.5">
                      <div className="flex items-baseline justify-between gap-4 text-sm">
                        <span
                          className={
                            sc.highlight
                              ? "font-semibold text-foreground"
                              : "text-foreground/80"
                          }
                        >
                          {sc.cause}
                        </span>
                        <span
                          className="shrink-0 font-mono font-bold tabular-nums"
                          style={{
                            color: sc.highlight ? ACCENT : "var(--foreground)",
                          }}
                        >
                          {sc.netTotal}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle">
                        <div
                          style={{
                            width: `${sc.widthPct}%`,
                            backgroundColor: sc.highlight
                              ? ACCENT
                              : "var(--foreground)",
                            opacity: sc.highlight ? 1 : 0.35,
                          }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
                <span>{APE04_HYPOTHETICAL_CASE.sbuExerciseNote}</span>
                <button
                  type="button"
                  onClick={() => onPreview(ape04)}
                  className="shrink-0 cursor-pointer font-semibold text-foreground underline underline-offset-4 transition-colors hover:text-primary"
                >
                  Ver informe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
