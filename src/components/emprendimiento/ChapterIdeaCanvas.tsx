import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

import {
  CANVAS_BLOCKS,
  OPPORTUNITY_ALTERNATIVES,
  ROTATION_CYCLE,
  type CanvasBlock,
} from "@/data/emprendimiento";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  animateRuleDraw,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

function CanvasBlockItem({
  block,
  featured = false,
}: {
  block: CanvasBlock;
  featured?: boolean;
}) {
  return (
    <div
      data-canvas-cell
      className={`space-y-3 py-5 ${
        featured ?"border-l-2 border-primary pl-5" :"border-l border-border/80 pl-5"
      }`}
    >
      <div className="flex items-baseline gap-2.5">
        <span
          className={` text-xs font-bold ${
            featured ?"text-primary" :"text-primary/80"
          }`}
        >
          {block.number}
        </span>
        <h4 className="text-base font-bold text-foreground">{block.name}</h4>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {block.detail}
      </p>

      <ul className="space-y-1.5 pt-1">
        {block.highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-foreground/90"
          >
            <span
              aria-hidden="true"
              className={`mt-2 size-1.5 shrink-0 rounded-full ${
                featured ?"bg-primary" :"bg-primary/60"
              }`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Capítulos 01/04 (Idea de negocio) y 02/04 (Modelo de negocio Canvas)
 * de la presentación corporativa de KhipuTech.
 */
export function ChapterIdeaCanvas() {
  const ideaRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(ideaRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: ideaRef.current, start: "top 80%", once: true },
        });
        animateDocumentListStagger("[data-opp-item]", {
          stagger: 0.09,
          scrollTrigger: { trigger: "[data-opp-grid]", start: "top 82%", once: true },
        });
        animateRuleDraw("[data-cycle-line]", {
          duration: 0.9,
          scrollTrigger: { trigger: "[data-cycle-row]", start: "top 85%", once: true },
        });
      }),
    { scope: ideaRef }
  );

  useGSAP(
    () =>
      withResponsiveMotion(canvasRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;
        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: { trigger: canvasRef.current, start: "top 80%", once: true },
        });
        animateDocumentListStagger("[data-canvas-group]", {
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-canvas-board]", start: "top 82%", once: true },
        });
      }),
    { scope: canvasRef }
  );

  return (
    <>
      {/* ESCENA 01 / 04 — IDEA DE NEGOCIO */}
      <section
        id="capitulo-idea"
        ref={ideaRef}
        aria-labelledby="idea-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="idea-heading"
            titleBold="Idea"
            titleItalic="de negocio"
            lead="Toda solución sólida nace de un problema medible. Evaluamos tres problemáticas del entorno y priorizamos las pérdidas por productos caducados en comercios."
            objective="Formular una oportunidad B2B con impacto financiero directo y alto potencial de automatización."
          />

          {/* Comparativa de las 3 alternativas analizadas */}
          <div
            data-opp-grid
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            {OPPORTUNITY_ALTERNATIVES.map((alt) => {
              const isSelected = alt.status === "selected";
              return (
                <div
                  key={alt.number}
                  data-opp-item
                  className={`flex flex-col justify-between gap-5 rounded-xl p-6 transition-colors ${
                    isSelected
                      ? "bg-primary/10"
                      : "bg-surface/35 opacity-80"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`type-editorial-numeral text-3xl ${
                          isSelected ?"text-primary" :"text-muted-foreground"
                        }`}
                      >
                        {alt.number}
                      </span>
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                          <CheckCircle2 className="size-3" />
                          Seleccionada
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Evaluada
                        </span>
                      )}
                    </div>

                    <h3 className="type-subheading leading-snug text-foreground">
                      {alt.title}
                    </h3>
                    <p className="text-xs font-medium text-primary/90">
                      {alt.audience}
                    </p>
                  </div>

                  <p className="border-t border-border/60 pt-4 text-sm leading-relaxed text-muted-foreground">
                    {alt.rationale}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Flujo de la solución KhipuTech (4 pasos conectados) */}
          <div data-cycle-row className="space-y-6 pt-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="type-subheading text-primary">
                Cómo responde KhipuTech
              </p>
              <span className="text-xs text-muted-foreground">
                Plataforma SaaS en la nube + App móvil de prevención de mermas
              </span>
            </div>

            <div className="relative">
              <div
                data-cycle-line
                aria-hidden="true"
                className="absolute inset-x-0 top-0 hidden h-px bg-primary/35 md:block"
              />
              <ol className="grid grid-cols-1 gap-6 md:grid-cols-4 md:pt-4">
                {ROTATION_CYCLE.map((step) => (
                  <li key={step.step} className="relative space-y-2.5">
                    <div className="flex items-center gap-3">
                      <span className="type-editorial-numeral flex size-8 items-center justify-center text-2xl text-module-01">
                        {step.step}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground md:pl-10">
                      {step.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ESCENA 02 / 04 — MODELO DE NEGOCIO CANVAS (LECTURA SECUENCIAL EN 4 DIMENSIONES) */}
      <section
        id="capitulo-canvas"
        ref={canvasRef}
        aria-labelledby="canvas-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="canvas-heading"
            titleBold="Modelo de negocio"
            lead="Nueve bloques ordenados en cuatro preguntas clave para explicar con claridad qué ofrece KhipuTech, a quién llega, cómo opera y cómo genera ingresos."
            objective="Presentar la lógica comercial y operativa del negocio de forma directa y fácil de exponer."
          />

          <div
            data-canvas-board
            className="divide-y divide-border/80 border-y border-border/80"
          >
            {/* 1. Qué ofrecemos y para quién */}
            <div
              data-canvas-group
              className="grid grid-cols-1 gap-8 bg-primary/[0.04] px-4 py-8 lg:grid-cols-[15rem_1fr] lg:gap-10 lg:px-6"
            >
              <div className="space-y-1.5">
                <h3 className="type-subheading text-foreground">
                  ¿Qué ofrecemos y para quién?
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  El núcleo de la propuesta de KhipuTech y el perfil comercial al
                  que atiende.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <CanvasBlockItem block={CANVAS_BLOCKS.value} featured />
                <CanvasBlockItem block={CANVAS_BLOCKS.segments} />
              </div>
            </div>

            {/* 2. Cómo llegamos y retenemos */}
            <div
              data-canvas-group
              className="grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[15rem_1fr] lg:gap-10 lg:px-6"
            >
              <div className="space-y-1.5">
                <h3 className="type-subheading text-foreground">
                  ¿Cómo llegamos al cliente?
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Canales de captación, entrega del servicio y acompañamiento
                  técnico continuo.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <CanvasBlockItem block={CANVAS_BLOCKS.channels} />
                <CanvasBlockItem block={CANVAS_BLOCKS.relationships} />
              </div>
            </div>

            {/* 3. Cómo lo operamos internamente */}
            <div
              data-canvas-group
              className="grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[15rem_1fr] lg:gap-10 lg:px-6"
            >
              <div className="space-y-1.5">
                <h3 className="type-subheading text-foreground">
                  ¿Cómo lo hacemos posible?
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Recursos técnicos y humanos, procesos críticos y alianzas que
                  sostienen el servicio.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <CanvasBlockItem block={CANVAS_BLOCKS.resources} />
                <CanvasBlockItem block={CANVAS_BLOCKS.activities} />
                <CanvasBlockItem block={CANVAS_BLOCKS.partners} />
              </div>
            </div>

            {/* 4. Base financiera */}
            <div
              data-canvas-group
              className="grid grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[15rem_1fr] lg:gap-10 lg:px-6"
            >
              <div className="space-y-1.5">
                <h3 className="type-subheading text-foreground">
                  ¿Cuánto cuesta y cómo genera ingresos?
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Equilibrio entre la estructura de costos mensuales y el modelo
                  de suscripción SaaS.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <CanvasBlockItem block={CANVAS_BLOCKS.costs} />
                <CanvasBlockItem block={CANVAS_BLOCKS.revenue} featured />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
