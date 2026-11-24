import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  COMPETITIVE_COMPARISON,
  FODA_QUADRANTS,
  FODA_STRATEGIES,
  OPERATIONAL_PILLARS,
  OPERATIONAL_PROCESS,
  STRATEGIC_IDENTITY,
  SURVEY_KPI_METRICS,
  type FodaQuadrant,
} from "@/data/emprendimiento";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import { KhipuLogoEmblem } from "@/components/emprendimiento/KhipuLogoEmblem";
import { ResourceLinks } from "@/components/layout/ResourceLinks";
import { BUSINESS_SETUP_RESOURCES } from "@/data/publicResources";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  animateRealCounter,
  animateRuleDraw,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

const FODA_STYLES: Record<
  FodaQuadrant["tone"],
  { bg: string; heading: string }
> = {
  emerald: {
    bg: "bg-emerald-600/[0.06]",
    heading: "text-emerald-800",
  },
  amber: {
    bg: "bg-amber-600/[0.06]",
    heading: "text-amber-800",
  },
  sky: {
    bg: "bg-sky-600/[0.06]",
    heading: "text-sky-800",
  },
  rose: {
    bg: "bg-rose-600/[0.06]",
    heading: "text-rose-800",
  },
};

/**
 * Capítulo 03 / 04 — Plan Empresarial en cuatro escenas cinematográficas:
 *   3A. Identidad y dirección (emblema KhipuTech + Misión y Visión 2031)
 *   3B. FODA y decisiones estratégicas (matriz 2x2 + cruces FO/DO/FA/DA)
 *   3C. Mercado y competencia (encuesta real de 17 respuestas + comparativa VS)
 *   3D. Operación (proceso horizontal de 5 etapas + Se vende / Se necesita / Se valida)
 */
export function ChapterPlanEmpresarial() {
  const identityRef = useRef<HTMLElement>(null);
  const fodaRef = useRef<HTMLElement>(null);
  const marketRef = useRef<HTMLElement>(null);
  const opsRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(identityRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: identityRef.current, start: "top 80%", once: true },
        });
        animateEditorialReveal("[data-id-block]", {
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-id-grid]", start: "top 80%", once: true },
        });
      }),
    { scope: identityRef }
  );

  useGSAP(
    () =>
      withResponsiveMotion(fodaRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: fodaRef.current, start: "top 80%", once: true },
        });
        animateDocumentListStagger("[data-foda-box]", {
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-foda-grid]", start: "top 82%", once: true },
        });
        animateDocumentListStagger("[data-foda-strat]", {
          stagger: 0.07,
          scrollTrigger: { trigger: "[data-foda-strats]", start: "top 88%", once: true },
        });
      }),
    { scope: fodaRef }
  );

  useGSAP(
    () =>
      withResponsiveMotion(marketRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: marketRef.current, start: "top 80%", once: true },
        });

        const kpis = gsap.utils.toArray<HTMLElement>("[data-survey-counter]");
        kpis.forEach((el, idx) => {
          const target = Number(el.dataset.target ?? "0");
          const decimals = Number(el.dataset.decimals ?? "0");
          const suffix = el.dataset.suffix ?? "";
          animateRealCounter(el, target, {
            delay: idx * 0.08,
            duration: 1.05,
            scrollTrigger: { trigger: "[data-kpi-strip]", start: "top 85%", once: true },
            formatter: (v) =>
              decimals > 0
                ? `${v.toFixed(decimals).replace(".", ",")}${suffix}`
                : `${Math.round(v)}${suffix}`,
          });
        });

        animateEditorialReveal("[data-comp-panel]", {
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-comp-grid]", start: "top 82%", once: true },
        });
      }),
    { scope: marketRef }
  );

  useGSAP(
    () =>
      withResponsiveMotion(opsRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: opsRef.current, start: "top 80%", once: true },
        });
        animateRuleDraw("[data-ops-connector]", {
          duration: 1.0,
          scrollTrigger: { trigger: "[data-ops-track]", start: "top 84%", once: true },
        });
        animateDocumentListStagger("[data-ops-step]", {
          stagger: 0.09,
          scrollTrigger: { trigger: "[data-ops-track]", start: "top 84%", once: true },
        });
        animateRuleDraw("[data-ops-pillar-rule]", {
          duration: 0.8,
          scrollTrigger: { trigger: "[data-ops-pillars]", start: "top 86%", once: true },
        });
      }),
    { scope: opsRef }
  );

  return (
    <>
      {/* ESCENA 3A — IDENTIDAD Y DIRECCIÓN */}
      <section
        id="capitulo-plan"
        ref={identityRef}
        aria-labelledby="plan-identidad-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-16">
          <ChapterHeader
            headingId="plan-identidad-heading"
            titleBold="Identidad"
            titleItalic="estratégica"
            lead="El plan empresarial parte de quiénes somos. Definimos un nombre con raíz cultural, un símbolo geométrico, una misión y una visión a 2031."
            objective="Definir la identidad y la dirección del negocio: qué somos y hacia dónde vamos."
          />

          <div
            data-id-grid
            className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16"
          >
            {/* Izquierda: Emblema vectorial fiel a Figura 1 */}
            <div data-id-block className="lg:col-span-5">
              <KhipuLogoEmblem />
            </div>

            {/* Derecha: Misión y Visión con tipografía editorial serif italic */}
            <div className="space-y-12 lg:col-span-7">
              <div
                data-id-block
                className="space-y-4"
              >
                <h3 className="type-subheading">
                  Misión
                </h3>
                <p className="editorial-aside serif-complete-italic">
                  {STRATEGIC_IDENTITY.mission}
                </p>
              </div>

              <div
                data-id-block
                className="space-y-4"
              >
                <h3 className="type-subheading">
                  Visión 2031
                </h3>
                <p className="editorial-aside serif-complete-italic">
                  {STRATEGIC_IDENTITY.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESCENA 3B — FODA Y ESTRATEGIA */}
      <section
        id="capitulo-foda"
        ref={fodaRef}
        aria-labelledby="plan-foda-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-12">
          <ChapterHeader
            headingId="plan-foda-heading"
            titleBold="Análisis FODA"
            lead="Del diagnóstico FODA nacen las decisiones concretas: potenciamos nuestra arquitectura técnica y compensamos la etapa inicial mediante pilotos."
            objective="Convertir el análisis interno y externo en decisiones estratégicas accionables."
          />

          {/* Matriz FODA 2×2 translúcida con código de color semántico */}
          <div
            data-foda-grid
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {FODA_QUADRANTS.map((q) => {
              const style = FODA_STYLES[q.tone];
              return (
                <div
                  key={q.category}
                  data-foda-box
                  className={`space-y-4 rounded-xl p-6 backdrop-blur-xs ${style.bg}`}
                >
                  <div className="flex items-baseline gap-2.5">
                    <h3 className={`type-subheading ${style.heading}`}>
                      {q.category}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {q.scope}
                    </span>
                  </div>

                  <p className="type-caption font-semibold text-foreground">
                    {q.tags.join(" · ")}
                  </p>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {q.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Cruce estratégico FO / DO / FA / DA */}
          <div data-foda-strats className="space-y-3 pt-2">
            {FODA_STRATEGIES.map((strat) => (
              <div
                key={strat.code}
                data-foda-strat
                className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="inline-flex w-fit shrink-0 items-center gap-2 text-xs font-semibold text-primary">
                  <span>{strat.code}</span>
                  <span aria-hidden="true" className="opacity-50">
                    ·
                  </span>
                  <span>{strat.label}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-primary/70 sm:inline"
                >
                  →
                </span>
                <p className="text-sm font-medium text-foreground/92">
                  {strat.decision}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESCENA 3C — MERCADO Y COMPETENCIA */}
      <section
        id="capitulo-mercado"
        ref={marketRef}
        aria-labelledby="plan-mercado-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="plan-mercado-heading"
            titleBold="El mercado"
            titleItalic="y la competencia"
            lead="El sondeo en Ambato confirma la necesidad: los comercios controlan caducidades de forma manual y buscan alertas preventivas a un precio accesible."
            objective="Conocer al cliente objetivo y a los competidores reales para definir nuestra diferenciación."
          />

          {/* Banda de 4 indicadores reales del sondeo (17 respuestas) */}
          <div
            data-kpi-strip
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SURVEY_KPI_METRICS.map((kpi) => (
              <div
                key={kpi.label}
                className="space-y-2 border-l border-primary/45 pl-5"
              >
                <div
                  data-survey-counter
                  data-target={kpi.numericTarget}
                  data-decimals={kpi.decimals}
                  data-suffix={kpi.suffix}
                  className="text-4xl font-bold tracking-tight text-foreground tabular-nums sm:text-[2.65rem]"
                >
                  {kpi.value}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>

          {/* Comparativa competitiva: Nuestra diferencia VS Contífico y Dora.ec */}
          <div
            data-comp-grid
            className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.15fr_auto_1fr]"
          >
            {/* KhipuTech Rotación destacado */}
            <div
              data-comp-panel
              className="flex flex-col justify-between gap-6 rounded-2xl bg-primary/12 p-7 sm:p-9"
            >
              <div className="space-y-4">
                <span className="inline-flex text-xs font-bold text-primary">
                  Nuestra diferencia
                </span>

                <div className="space-y-1">
                  <h3 className="type-subheading text-foreground">
                    {COMPETITIVE_COMPARISON.featured.name}
                  </h3>
                  <div className="flex flex-wrap items-baseline gap-2.5 pt-2">
                    <span className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      {COMPETITIVE_COMPARISON.featured.priceHeadline}
                    </span>
                    <span className="text-sm text-primary">
                      {COMPETITIVE_COMPARISON.featured.priceSubtext}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-foreground/85">
                {COMPETITIVE_COMPARISON.featured.description}
              </p>
            </div>

            {/* Separador VS */}
            <div className="flex items-center justify-center">
              <span className="serif-editorial-italic text-2xl text-muted-foreground">
                vs
              </span>
            </div>

            {/* Competidores reales en Ecuador */}
            <div className="flex flex-col gap-4">
              {COMPETITIVE_COMPARISON.competitors.map((comp) => (
                <div
                  key={comp.name}
                  data-comp-panel
                  className="flex flex-1 flex-col justify-between gap-3 rounded-2xl bg-surface/50 p-6"
                >
                  <div className="space-y-1">
                    <h3 className="type-subheading text-foreground">
                      {comp.name}
                    </h3>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                        {comp.priceHeadline}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {comp.priceSubtext}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {comp.offering} {comp.strength}
                  </p>
                  <a href={comp.plansUrl} target="_blank" rel="noreferrer" className="editorial-action">
                    Ver planes actuales de {comp.name}
                    <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
                    <span className="sr-only"> (abre en una pestaña nueva)</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Los precios de la comparativa corresponden al estudio de mercado del APE 01.
          </p>
        </div>
      </section>

      {/* ESCENA 3D — OPERACIÓN */}
      <section
        id="capitulo-operacion"
        ref={opsRef}
        aria-labelledby="plan-operacion-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-16">
          <ChapterHeader
            headingId="plan-operacion-heading"
            titleBold="Operación"
            titleItalic="del negocio"
            lead="Operar KhipuTech implica seguir un flujo claro y repetible desde la prospección en comercios de Ambato hasta el soporte continuo."
            objective="Concretar el proceso para entregar el servicio, los recursos requeridos y la estrategia de validación."
          />

          {/* Línea horizontal conectada de 5 pasos */}
          <div data-ops-track className="relative">
            <div
              data-ops-connector
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-px bg-primary/35 md:block"
            />

            <ol className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-5 md:pt-4">
              {OPERATIONAL_PROCESS.map((item) => (
                <li key={item.step} data-ops-step className="relative space-y-3">
                  <div className="type-editorial-numeral flex size-8 items-center justify-center text-2xl text-module-01">
                    {item.step}
                  </div>
                  <h3 className="type-subheading text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.activity}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Banda inferior de 3 pilares: Se vende · Se necesita · Se valida */}
          <div
            data-ops-pillars
            className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3"
          >
            {OPERATIONAL_PILLARS.map((pillar) => (
              <div key={pillar.label} className="space-y-3">
                <div
                  data-ops-pillar-rule
                  className="h-px w-full bg-primary/45"
                />
                <h3 className="type-subheading text-foreground">
                  {pillar.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {pillar.value}
                </p>
              </div>
            ))}
          </div>

          <ResourceLinks title="Trámites para poner en marcha el negocio" links={BUSINESS_SETUP_RESOURCES} />
        </div>
      </section>
    </>
  );
}
