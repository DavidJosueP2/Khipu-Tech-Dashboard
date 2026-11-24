import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { useAtlas } from "@/context/atlas-context";
import { INSTITUTION, SEMESTER_PARTIALS } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  animateRuleDraw,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

/**
 * Resumen cronológico de la estructura académica (2 parciales · 4 unidades).
 * Presentación sobria y espaciada, claramente separada de los cuatro módulos funcionales.
 */
export function SemesterStructureSection() {
  const { setActiveHighlight } = useAtlas();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(sectionRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
            end: "bottom 40%",
            onEnter: () => setActiveHighlight("semester"),
            onEnterBack: () => setActiveHighlight("semester"),
          },
        });

        animateEditorialReveal("[data-semester-header]", {
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });

        animateRuleDraw("[data-semester-rule]", {
          duration: 0.85,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        const blocks = gsap.utils.toArray<HTMLElement>("[data-partial-block]");
        blocks.forEach((block) => {
          const items = block.querySelectorAll("[data-unit-row]");
          animateDocumentListStagger(items, {
            stagger: 0.08,
            scrollTrigger: {
              trigger: block,
              start: "top 86%",
              once: true,
            },
          });
        });
      }),
    { scope: sectionRef }
  );

  return (
    <section
      id="semestre"
      ref={sectionRef}
      aria-labelledby="semestre-heading"
      className="editorial-container py-24 md:py-32"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div className="space-y-3 lg:col-span-7">
          <p data-semester-header className="type-overline text-accent-warm">
            Organización del ciclo · {INSTITUTION.cycle}
          </p>
          <h2 id="semestre-heading" data-semester-header className="type-display">
            <EditorialSerif
              optical="display"
              className="font-normal text-primary"
            >
              Recorrido
            </EditorialSerif>{" "}
            por parciales y unidades
          </h2>
        </div>

        <p
          data-semester-header
          className="text-sm leading-relaxed text-muted-foreground lg:col-span-5"
        >
          Dos parciales y cuatro unidades académicas que respaldan los{" "}
          {INSTITUTION.metrics.studentDeliverablesCount} documentos integrados
          en la plataforma.
        </p>
      </div>

      <div data-semester-rule className="editorial-rule mt-10 mb-14" />

      <div className="space-y-16">
        {SEMESTER_PARTIALS.map((partial) => (
          <div
            key={partial.id}
            data-partial-block
            className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="space-y-2.5 lg:col-span-4">
              <div className="flex items-baseline gap-3">
                <span className="type-editorial-numeral text-3xl text-accent-warm">
                  {partial.index}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {partial.name}
                  </h3>
                  <p className="font-mono text-[0.72rem] tracking-wider text-muted-foreground uppercase">
                    {partial.timeframe}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {partial.summary}
              </p>
            </div>

            <div className="divide-y divide-border border-t border-border lg:col-span-8 lg:border-t-0">
              {partial.units.map((unit) => (
                <div
                  key={unit.unitNumber}
                  data-unit-row
                  className="grid grid-cols-1 gap-3 py-6 first:pt-0 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
                >
                  <span className="type-overline text-foreground">
                    {unit.unitLabel}
                  </span>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-base font-semibold text-foreground">
                        {unit.title}
                      </h4>
                      <span className="font-mono text-[0.72rem] text-muted-foreground">
                        {unit.apeFile} · {unit.worksLabel}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {unit.synthesis}
                    </p>

                    <Link
                      to={unit.modulePath}
                      className="group inline-flex items-center gap-1.5 pt-1 text-xs font-medium text-primary transition-colors hover:text-foreground"
                    >
                      <span>
                        Módulo {unit.moduleId}: {unit.moduleName}
                      </span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
