import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  getLiquidacionDoc,
  TWELVE_LIQUIDATION_CASES,
  type LiquidacionDocument,
} from "@/data/liquidacion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

const ACCENT = "var(--module-04)";

type CaseFilter = "all" | "indemnity" | "benefitsOnly";

interface LiquidacionDoceCasosProps {
  onPreview: (doc: LiquidacionDocument) => void;
}

/**
 * Escena 03 — Índice editorial numerado (SIN tablas ni tarjetas) para los
 * 12 casos resueltos en `Liquidaciones_Laborales_David_Josue_Barragan_Pozo.pdf`.
 */
export function LiquidacionDoceCasosSection({
  onPreview,
}: LiquidacionDoceCasosProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<CaseFilter>("all");
  const casesDoc = getLiquidacionDoc("liquidaciones-12");

  const visibleCases = TWELVE_LIQUIDATION_CASES.filter((item) => {
    if (filter === "indemnity") return item.hasIndemnityOrDesahucio;
    if (filter === "benefitsOnly") return !item.hasIndemnityOrDesahucio;
    return true;
  });

  useGSAP(
    () =>
      withResponsiveMotion(sectionRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        gsap.fromTo(
          "[data-cases-reveal]",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }),
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="escena-doce-casos"
      aria-labelledby="m4-cases-heading"
      className="border-t border-border bg-surface py-24 md:py-36"
    >
      <div className="editorial-container space-y-14">
        <div
          data-cases-reveal
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
              03 · Práctica de liquidaciones laborales
            </p>
            <h2
              id="m4-cases-heading"
              className="text-[clamp(2.25rem,4.6vw,3.8rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
            >
              Doce casos{" "}
              <EditorialSerif
                optical="display"
                className="font-normal"
                style={{ color: ACCENT }}
              >
                resueltos.
              </EditorialSerif>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onPreview(casesDoc)}
            className="group inline-flex cursor-pointer items-center gap-1.5 self-start border-b border-foreground pb-1 text-xs font-semibold tracking-[0.12em] text-foreground uppercase transition-opacity hover:opacity-70 lg:self-end"
          >
            <span>Abrir documento original (12 págs.)</span>
            <ArrowUpRight className="size-3.5" />
          </button>
        </div>

        {/* Filtros discretos solo texto */}
        <div
          data-cases-reveal
          role="group"
          aria-label="Filtrar los doce casos"
          className="flex flex-wrap items-center gap-6 border-b border-border pb-4"
        >
          {(
            [
              { id: "all", label: "Todos · 12" },
              { id: "indemnity", label: "Indemnización o desahucio · 8" },
              { id: "benefitsOnly", label: "Solo haberes · 4" },
            ] as const
          ).map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`relative cursor-pointer pb-1 text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
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

        {/* Índice editorial numerado con divisores finos (sin tabla ni tarjetas) */}
        <ol
          data-cases-reveal
          className="divide-y divide-border border-b border-border"
        >
          {visibleCases.map((item) => (
            <li
              key={item.number}
              className="grid grid-cols-1 items-center gap-3 py-5 md:grid-cols-[3.5rem_1.35fr_0.95fr_9rem_7.5rem] md:gap-6"
            >
              <span
                className="type-editorial-numeral text-2xl"
                style={{
                  color: item.hasIndemnityOrDesahucio
                    ? ACCENT
                    : "var(--muted-foreground)",
                }}
              >
                {item.number}
              </span>

              <div className="space-y-0.5">
                <h3 className="text-sm font-semibold text-foreground md:text-[0.95rem]">
                  {item.scenario}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {item.mainDriver}
                </p>
              </div>

              <div className="font-mono text-xs text-muted-foreground">
                {item.region} · {item.period} · {item.salary}
              </div>

              <div className="hidden h-1 overflow-hidden rounded-full bg-surface-subtle md:block">
                <div
                  style={{
                    width: `${item.widthPct}%`,
                    backgroundColor: item.hasIndemnityOrDesahucio
                      ? ACCENT
                      : "var(--muted-foreground)",
                    opacity: item.hasIndemnityOrDesahucio ? 0.9 : 0.45,
                  }}
                  className="h-full rounded-full"
                />
              </div>

              <div
                className="font-mono text-base font-bold tabular-nums md:text-right"
                style={{
                  color: item.hasIndemnityOrDesahucio
                    ? ACCENT
                    : "var(--foreground)",
                }}
              >
                {item.total}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
