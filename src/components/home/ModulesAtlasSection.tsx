import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { useAtlas } from "@/context/atlas-context";
import { MODULES, type ModuleId } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import {
  animateEditorialReveal,
  animateRuleDraw,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

/**
 * Sección principal de los cuatro módulos de desarrollo y gestión de KhipuTech Rotación.
 * Composición editorial limpia con pocos elementos simultáneos, filas amplias y divisores.
 */
export function ModulesAtlasSection() {
  const { setActiveHighlight } = useAtlas();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(sectionRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        animateEditorialReveal("[data-modules-intro]", {
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        });

        const rows = gsap.utils.toArray<HTMLElement>("[data-module-row]");
        rows.forEach((row) => {
          const modId = row.dataset.moduleId as ModuleId | undefined;
          const rule = row.querySelector("[data-module-rule]");
          const pieces = row.querySelectorAll("[data-module-piece]");

          if (rule) {
            animateRuleDraw(rule, {
              duration: 0.8,
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                once: true,
              },
            });
          }

          gsap.fromTo(
            pieces,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              stagger: 0.05,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
              },
            }
          );

          if (modId) {
            gsap.timeline({
              scrollTrigger: {
                trigger: row,
                start: "top 55%",
                end: "bottom 45%",
                onEnter: () => setActiveHighlight(modId),
                onEnterBack: () => setActiveHighlight(modId),
              },
            });
          }
        });
      }),
    { scope: sectionRef }
  );

  return (
    <section
      id="modulos"
      ref={sectionRef}
      aria-labelledby="modulos-heading"
      className="editorial-container py-24 md:py-32"
    >
      {/* Encabezado limpio y amplio */}
      <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
        <div className="space-y-3 lg:col-span-7">
          <p data-modules-intro className="type-overline text-primary">
            01 — 04 · Plataforma corporativa
          </p>
          <h2 id="modulos-heading" data-modules-intro className="type-display">
            Cuatro áreas de gestión{" "}
            <EditorialSerif
              optical="display"
              className="font-normal text-primary"
            >
              empresarial.
            </EditorialSerif>
          </h2>
        </div>

        <p
          data-modules-intro
          className="text-sm leading-relaxed text-muted-foreground lg:col-span-5"
        >
          Desde la formulación del modelo de negocio de KhipuTech hasta las
          obligaciones tributarias, la nómina y las liquidaciones laborales
          trabajadas durante el ciclo.
        </p>
      </div>

      {/* Lista editorial numerada de gran formato (sin cards) */}
      <div>
        {MODULES.map((mod) => (
          <article
            key={mod.id}
            data-module-row
            data-module-id={mod.id}
            onMouseEnter={() => setActiveHighlight(mod.id)}
            className="group relative"
          >
            <div data-module-rule className="editorial-rule" />

            <Link
              to={mod.path}
              className="grid grid-cols-1 items-baseline gap-4 py-10 transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring md:grid-cols-[5.5rem_1.2fr_1.4fr_auto] md:gap-8 md:py-12"
            >
              {/* Numeral */}
              <span
                data-module-piece
                className="type-editorial-numeral text-4xl transition-transform duration-300 group-hover:translate-x-1 md:text-5xl"
                style={{ color: mod.accentVar }}
              >
                {mod.id}
              </span>

              {/* Título y unidad */}
              <div data-module-piece className="space-y-1.5">
                <h3 className="text-[clamp(1.45rem,2.3vw,2.05rem)] leading-[1.12] font-bold tracking-tight text-foreground">
                  {mod.titleComposition.before && (
                    <span>{mod.titleComposition.before}</span>
                  )}
                  <EditorialSerif
                    optical="display"
                    className="font-normal transition-colors duration-300 group-hover:text-primary"
                  >
                    {mod.titleComposition.serifItalic}
                  </EditorialSerif>
                  {mod.titleComposition.after && (
                    <span>{mod.titleComposition.after}</span>
                  )}
                </h3>
                <p className="font-mono text-[0.72rem] tracking-wider text-muted-foreground uppercase">
                  {mod.unit} · {mod.totalDeliverables} documentos
                </p>
              </div>

              {/* Descripción concisa */}
              <p
                data-module-piece
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {mod.shortDescription}
              </p>

              {/* Acceso limpio */}
              <span
                data-module-piece
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em] text-foreground uppercase transition-colors group-hover:text-primary md:justify-end"
              >
                <span>Abrir</span>
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: mod.accentVar }}
                />
              </span>
            </Link>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1.5px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
              style={{ backgroundColor: mod.accentVar }}
            />
          </article>
        ))}

        <div className="editorial-rule" />
      </div>
    </section>
  );
}
