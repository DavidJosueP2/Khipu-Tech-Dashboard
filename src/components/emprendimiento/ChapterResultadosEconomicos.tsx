import { useRef } from "react";

import {
  FINANCIAL_SUMMARY,
  INVESTMENT_BARS,
  MONTHLY_COST_BARS,
} from "@/data/emprendimiento";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import {
  animateEditorialReveal,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

const MAX_INVESTMENT = 2400;
const MAX_MONTHLY_COST = 2046;
const PAYBACK_PCT = Math.min(
  100,
  (FINANCIAL_SUMMARY.paybackMonths / 12) * 100
);

/**
 * Capítulo 04 / 04 — Resultados Económicos en dos escenas visuales:
 *   4A. Inversión inicial (USD 2.900) y Costos mensuales (USD 2.256) con barras animadas
 *   4B. Ingresos (USD 4.000) vs Costos (USD 2.256), margen (43,6 %) y recuperación (1,7 meses)
 */
export function ChapterResultadosEconomicos() {
  const costsRef = useRef<HTMLElement>(null);
  const outcomeRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(costsRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: costsRef.current, start: "top 80%", once: true },
        });

        const bars = gsap.utils.toArray<HTMLElement>("[data-cost-bar]");
        bars.forEach((bar, idx) => {
          const targetW = bar.dataset.width ?? "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetW,
              duration: 0.9,
              delay: idx * 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: costsRef.current,
                start: "top 72%",
                once: true,
              },
            }
          );
        });
      }),
    { scope: costsRef }
  );

  useGSAP(
    () =>
      withResponsiveMotion(outcomeRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: outcomeRef.current, start: "top 80%", once: true },
        });

        const bars = gsap.utils.toArray<HTMLElement>("[data-outcome-bar]");
        bars.forEach((bar, idx) => {
          const targetW = bar.dataset.width ?? "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetW,
              duration: 1.0,
              delay: idx * 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: outcomeRef.current,
                start: "top 74%",
                once: true,
              },
            }
          );
        });
      }),
    { scope: outcomeRef }
  );

  return (
    <>
      {/* ESCENA 4A — INVERSIÓN Y COSTOS */}
      <section
        id="capitulo-economia"
        ref={costsRef}
        aria-labelledby="economia-costos-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-12">
          <ChapterHeader
            headingId="economia-costos-heading"
            titleBold="Inversión"
            titleItalic="y costos"
            lead="El estudio económico determina si KhipuTech es viable. Primero cuantificamos cuánto cuesta ponerlo en marcha y sostener su operación mensual."
            objective="Estimar los recursos iniciales y los costos operativos mensuales necesarios para operar."
          />

          {/* Barras horizontales: Inversión inicial */}
          <div className="space-y-5">
            <p className="text-xs font-semibold text-primary">
              Inversión inicial (Cuadro 10)
            </p>

            <div className="space-y-3.5">
              {INVESTMENT_BARS.map((item) => {
                const pct = Math.max(3, (item.amount / MAX_INVESTMENT) * 100);
                return (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[16.5rem_1fr_4.5rem] sm:gap-5"
                  >
                    <span className="text-sm text-foreground/88">
                      {item.label}
                    </span>
                    <div className="h-3 overflow-hidden rounded-full bg-surface-subtle">
                      <div
                        data-cost-bar
                        data-width={`${pct.toFixed(1)}%`}
                        style={{ width: `${pct.toFixed(1)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground tabular-nums sm:text-right">
                      {item.formatted}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-bold text-foreground">
                Total inversión inicial
              </span>
              <span className="text-xl font-bold text-primary tabular-nums sm:text-2xl">
                {FINANCIAL_SUMMARY.initialInvestmentFormatted}
              </span>
            </div>
          </div>

          {/* Barras horizontales: Costo mensual */}
          <div className="space-y-5 pt-4">
            <p className="text-xs font-semibold text-primary">
              Costo mensual de operación y talento humano (Cuadros 11 y 12)
            </p>

            <div className="space-y-3.5">
              {MONTHLY_COST_BARS.map((item) => {
                const pct = Math.max(
                  3,
                  (item.amount / MAX_MONTHLY_COST) * 100
                );
                return (
                  <div
                    key={item.label}
                    className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[16.5rem_1fr_4.5rem] sm:gap-5"
                  >
                    <span className="text-sm text-foreground/88">
                      {item.label}
                    </span>
                    <div className="h-3 overflow-hidden rounded-full bg-surface-subtle">
                      <div
                        data-cost-bar
                        data-width={`${pct.toFixed(1)}%`}
                        style={{ width: `${pct.toFixed(1)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-sky-400/75 to-primary"
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground tabular-nums sm:text-right">
                      {item.formatted}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-baseline justify-between border-t border-border pt-4">
              <span className="text-sm font-bold text-foreground">
                Costo mensual total
              </span>
              <span className="text-xl font-bold text-foreground tabular-nums sm:text-2xl">
                USD {FINANCIAL_SUMMARY.monthlyTotalCostFormatted}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ESCENA 4B — INGRESOS, RESULTADO Y RECUPERACIÓN */}
      <section
        id="capitulo-resultado"
        ref={outcomeRef}
        aria-labelledby="economia-resultado-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-12">
          <ChapterHeader
            headingId="economia-resultado-heading"
            titleBold="Ingresos"
            titleItalic="y resultados"
            lead="Con 200 clientes a USD 20 mensuales, los ingresos superan a los costos operativos y la inversión inicial se recupera en 1,7 meses."
            objective="Comprobar la viabilidad financiera preliminar comparando ingresos proyectados contra costos mensuales."
          />

          {/* Barras comparativas: Ingresos vs Costos */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[16.5rem_1fr_5rem] sm:gap-5">
              <span className="text-sm font-medium text-foreground/90">
                Ingresos · {FINANCIAL_SUMMARY.projectedClients} clientes × USD{" "}
                {FINANCIAL_SUMMARY.subscriptionPrice}
              </span>
              <div className="h-5 overflow-hidden rounded-full bg-surface-subtle">
                <div
                  data-outcome-bar
                  data-width="100%"
                  style={{ width: "100%" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300"
                />
              </div>
              <span className="text-base font-bold text-foreground tabular-nums sm:text-right">
                {FINANCIAL_SUMMARY.monthlyRevenueFormatted}
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[16.5rem_1fr_5rem] sm:gap-5">
              <span className="text-sm font-medium text-foreground/90">
                Costos mensuales totales
              </span>
              <div className="h-5 overflow-hidden rounded-full bg-surface-subtle">
                <div
                  data-outcome-bar
                  data-width={`${(
                    (FINANCIAL_SUMMARY.monthlyTotalCost /
                      FINANCIAL_SUMMARY.monthlyRevenue) *
                    100
                  ).toFixed(1)}%`}
                  style={{
                    width: `${(
                      (FINANCIAL_SUMMARY.monthlyTotalCost /
                        FINANCIAL_SUMMARY.monthlyRevenue) *
                      100
                    ).toFixed(1)}%`,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400"
                />
              </div>
              <span className="text-base font-bold text-foreground tabular-nums sm:text-right">
                {FINANCIAL_SUMMARY.monthlyTotalCostFormatted}
              </span>
            </div>
          </div>

          {/* Resultado mensual destacado */}
          <div className="flex flex-col justify-between gap-4 border-y border-border/80 py-8 sm:flex-row sm:items-baseline">
            <div className="space-y-1">
              <p className="text-lg font-bold text-foreground sm:text-xl">
                Resultado mensual · margen de{" "}
                <span className="text-primary">
                  {FINANCIAL_SUMMARY.marginPercent}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Diferencia neta mensual entre ingresos proyectados y estructura
                de costos.
              </p>
            </div>

            <div className="text-4xl font-bold tracking-tight text-primary tabular-nums sm:text-5xl">
              {FINANCIAL_SUMMARY.monthlyNetResultFormatted}
            </div>
          </div>

          {/* Escala visual de recuperación de la inversión (0 a 12 meses) */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm font-medium text-foreground/88">
                Recuperación simple de la inversión de{" "}
                {FINANCIAL_SUMMARY.initialInvestmentFormatted}
              </span>
              <span className="text-2xl font-bold text-primary tabular-nums sm:text-3xl">
                {FINANCIAL_SUMMARY.paybackFormatted}
              </span>
            </div>

            <div className="relative pt-2 pb-1">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-subtle">
                <div
                  data-outcome-bar
                  data-width={`${PAYBACK_PCT.toFixed(1)}%`}
                  style={{ width: `${PAYBACK_PCT.toFixed(1)}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                />
              </div>

              {/* Marcador luminoso en 1,7 meses */}
              <span
                aria-hidden="true"
                style={{ left: `${PAYBACK_PCT.toFixed(1)}%` }}
                className="absolute top-1 size-4 -translate-x-1/2 rounded-full border-2 border-primary bg-foreground shadow-[0_0_16px_var(--primary)]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>6 meses</span>
              <span>12 meses</span>
            </div>
          </div>

          {/* Nota de validación real del APE 01 */}
          <p className="border-l-2 border-primary/50 pl-4 text-sm leading-relaxed text-muted-foreground">
            {FINANCIAL_SUMMARY.caveat}
          </p>
        </div>
      </section>
    </>
  );
}
