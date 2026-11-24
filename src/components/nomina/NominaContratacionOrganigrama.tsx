import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Eye, Scale } from "lucide-react";

import {
  COMPLEMENTARY_CONTRACTS_CHECK,
  getNominaDoc,
  MANABI_MDT_STATS,
  NOMINA_VISUAL_ASSETS,
  ORGANIGRAMA_ROLES,
  PRODUCTION_MODES,
  REGIME_SUMMARY,
  SEVEN_CONTRACTS,
  type NominaDocument,
} from "@/data/nomina";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import { ResourceLinks } from "@/components/layout/ResourceLinks";
import { HIRING_RESOURCES } from "@/data/publicResources";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

const MODULE_ACCENT = "var(--module-03)";

interface NominaSectionProps {
  onPreview: (doc: NominaDocument) => void;
}

/**
 * Escenas 03.01 (Contratación y modalidades laborales) y
 * 03.02 (Estructura y organización del personal — TechInstall Solutions).
 */
export function NominaContratacionOrganigrama({
  onPreview,
}: NominaSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ape03 = getNominaDoc("ape-03");
  const modosDoc = getNominaDoc("modos-produccion");

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        const scenes = gsap.utils.toArray<HTMLElement>("[data-m3-scene]");
        scenes.forEach((scene) => {
          const reveals = scene.querySelectorAll("[data-scene-reveal]");
          if (reveals.length > 0) {
            animateEditorialReveal(reveals, {
              stagger: 0.08,
              scrollTrigger: { trigger: scene, start: "top 80%", once: true },
            });
          }

          const items = scene.querySelectorAll("[data-m3-item]");
          if (items.length > 0) {
            animateDocumentListStagger(items, {
              stagger: 0.06,
              scrollTrigger: { trigger: scene, start: "top 78%", once: true },
            });
          }
        });

        const bars = gsap.utils.toArray<HTMLElement>("[data-m3-canton-bar]");
        bars.forEach((bar, idx) => {
          const targetW = bar.dataset.width ?? "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetW,
              duration: 0.9,
              delay: idx * 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar.closest("[data-m3-manabi]") ?? bar,
                start: "top 78%",
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
       * 03.01 — CONTRATACIÓN Y MODALIDADES LABORALES
       * ================================================================ */}
      <section
        id="escena-contratacion"
        data-m3-scene
        aria-labelledby="m3-s1-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-16">
          <ChapterHeader
            headingId="m3-s1-heading"
            titleBold="Contratos y"
            titleItalic="modalidades"
            lead="Contraste normativo entre los regímenes del Ecuador (Código del Trabajo, LOSEP, LOEP, LOES y Código Civil) a partir de siete instrumentos reales analizados en el APE 03."
            objective="Diferenciar subordinación, estabilidad, aportes al IESS y condiciones económicas según el régimen de vinculación."
          />

          {/* Comparativa de 4 regímenes (Tabla 1 APE 03) — banda limpia sin tarjetas pesadas */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {REGIME_SUMMARY.map((item) => (
              <div
                key={item.regime}
                data-m3-item
                className="space-y-3 border-t-2 pt-5"
                style={{
                  borderColor:
                    "color-mix(in oklch, var(--module-03) 50%, transparent)",
                }}
              >
                <h3 className="text-sm font-bold text-foreground">
                  {item.regime}
                </h3>
                <p className="text-xs font-medium text-foreground/85">
                  {item.modality}
                </p>
                <div className="space-y-1.5 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <p>{item.schedule}</p>
                  <p style={{ color: MODULE_ACCENT }}>{item.iessRates}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.stabilityNote}
                </p>
              </div>
            ))}
          </div>

          {/* Tabla editorial de los 7 contratos reales del Anexo 1 de APE 03 */}
          <div data-m3-item className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-bold text-foreground">
                Siete instrumentos de vinculación analizados (Anexo 1 · APE 03)
              </h3>
              <button
                type="button"
                onClick={() => onPreview(ape03)}
                className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground"
                style={{ color: MODULE_ACCENT }}
              >
                <Eye className="size-3.5" />
                <span>Ver matriz completa en APE 03 (págs. 9–20)</span>
              </button>
            </div>

            <div className="overflow-x-auto border-y border-border/80">
              <table className="w-full min-w-[46rem] border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-border/80 text-xs text-muted-foreground">
                    <th className="py-3.5 pr-3 font-semibold">Caso</th>
                    <th className="py-3.5 pr-4 font-semibold">
                      Institución / Cargo
                    </th>
                    <th className="py-3.5 pr-4 font-semibold">
                      Régimen / Modalidad
                    </th>
                    <th className="py-3.5 pr-4 font-semibold">Remuneración</th>
                    <th className="py-3.5 font-semibold">Estabilidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/55">
                  {SEVEN_CONTRACTS.map((c) => (
                    <tr
                      key={c.number}
                      className="transition-colors hover:bg-surface/45"
                    >
                      <td
                        className="py-3.5 pr-3 font-bold"
                        style={{ color: MODULE_ACCENT }}
                      >
                        {c.number}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="block font-semibold text-foreground">
                          {c.institution}
                        </span>
                        <span className="text-muted-foreground">{c.role}</span>
                      </td>
                      <td className="py-3.5 pr-4 text-foreground/85">
                        {c.regime}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-foreground tabular-nums">
                        {c.remuneration}
                      </td>
                      <td className="py-3.5 text-muted-foreground">
                        {c.stability}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trabajo complementario: Barragan Modos de producción.pdf */}
          <div
            data-m3-manabi
            className="space-y-8 rounded-2xl bg-surface/45 p-7 md:p-9"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-border/70 pb-5 sm:flex-row sm:items-end">
              <div className="space-y-1.5">
                <p
                  className="inline-flex items-center gap-2 text-xs font-semibold"
                  style={{ color: MODULE_ACCENT }}
                >
                  <Scale className="size-3.5" />
                  Trabajo complementario · Análisis contractual y contexto laboral
                </p>
                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  Contratos (CT, LOSEP, LOES), modos de producción y mercado laboral de Manabí
                </h3>
              </div>

              <button
                type="button"
                onClick={() => onPreview(modosDoc)}
                className="editorial-action shrink-0"
              >
                <Eye className="size-3.5" style={{ color: MODULE_ACCENT }} />
                <span>Abrir documento (6 págs.)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              {/* Izquierda: 3 contratos comparados + 5 modos de producción */}
              <div className="space-y-7 lg:col-span-7">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Hoja de análisis comparativo (3 contratos ficticios)
                  </p>
                  <div className="divide-y divide-border/60 border-y border-border/70">
                    {COMPLEMENTARY_CONTRACTS_CHECK.map((item) => (
                      <div
                        key={item.caseLabel}
                        className="grid grid-cols-1 gap-2 py-3.5 sm:grid-cols-[11rem_1fr]"
                      >
                        <div>
                          <p className="text-xs font-bold text-foreground">
                            {item.caseLabel}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.regime}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs leading-relaxed text-foreground/85">
                            {item.finding}
                          </p>
                          <span className="inline-block text-xs font-semibold text-accent-warm">
                            Conclusión: {item.verdict}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Matriz sintetizada de los 5 modos de producción */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Matriz de modos de producción (5 etapas históricas)
                  </p>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
                    {PRODUCTION_MODES.map((m) => (
                      <div
                        key={m.mode}
                        className="rounded-lg bg-background/45 p-3"
                      >
                        <p className="text-xs font-bold text-foreground">
                          {m.mode}
                        </p>
                        <p className="mt-1 text-xs leading-snug text-muted-foreground">
                          {m.organization}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Derecha: Análisis MDT de contratos vigentes en Manabí */}
              <div className="flex flex-col justify-between gap-6 border-t border-border/70 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Contratos vigentes en Manabí · Fuente MDT
                  </p>

                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-4xl font-bold tracking-tight tabular-nums"
                      style={{ color: MODULE_ACCENT }}
                    >
                      {MANABI_MDT_STATS.totalContracts}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      contratos vigentes en{" "}
                      <strong className="text-foreground">
                        {MANABI_MDT_STATS.totalCompanies}
                      </strong>{" "}
                      empresas
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-y border-border/65 py-3.5 text-xs">
                    <div>
                      <span className="block text-base font-bold text-foreground">
                        {MANABI_MDT_STATS.menShare}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Hombres ({MANABI_MDT_STATS.menCount})
                      </span>
                    </div>
                    <div>
                      <span className="block text-base font-bold text-foreground">
                        {MANABI_MDT_STATS.womenShare}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Mujeres ({MANABI_MDT_STATS.womenCount})
                      </span>
                    </div>
                    <div>
                      <span className="block text-base font-bold text-foreground">
                        {MANABI_MDT_STATS.indefiniteCount}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Indefinidos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Barras animadas por cantón */}
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Concentración cantonal principal
                  </p>
                  {MANABI_MDT_STATS.cantons.map((c) => (
                    <div
                      key={c.canton}
                      className="grid grid-cols-[6rem_1fr_4.2rem] items-center gap-3"
                    >
                      <span className="text-xs font-medium text-foreground/90">
                        {c.canton}
                      </span>
                      <div className="h-2.5 overflow-hidden rounded-full bg-surface-subtle">
                        <div
                          data-m3-canton-bar
                          data-width={`${c.widthPct}%`}
                          style={{
                            width: `${c.widthPct}%`,
                            backgroundColor: MODULE_ACCENT,
                          }}
                          className="h-full rounded-full opacity-90"
                        />
                      </div>
                      <span className="text-right text-xs font-semibold text-foreground tabular-nums">
                        {c.contracts}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ResourceLinks
            title="Registrar el contrato y la afiliación"
            links={HIRING_RESOURCES}
          />
        </div>
      </section>

      {/* ==================================================================
       * 03.02 — ESTRUCTURA Y ORGANIZACIÓN DEL PERSONAL (TECHINSTALL SOLUTIONS)
       * ================================================================ */}
      <section
        id="escena-organigrama"
        data-m3-scene
        aria-labelledby="m3-s2-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="m3-s2-heading"
            titleBold="Organigrama funcional"
            lead="Estructura jerárquica de TechInstall Solutions en cuatro niveles (A, B, C y E) que articula diez puestos operativos de la PYME y dos perfiles institucionales de validación."
            objective="Visualizar las líneas de dependencia, dotación por cargo y responsabilidades definidas para el ejercicio de nómina."
          />

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            {/* Izquierda: Organigrama original Figura 2 de APE 03 */}
            <div data-m3-item className="space-y-3 lg:col-span-6">
              <button
                type="button"
                onClick={() => onPreview(ape03)}
                aria-label="Abrir organigrama original en APE 03.pdf"
                className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-3 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <img
                  src={NOMINA_VISUAL_ASSETS.organigrama}
                  alt="Organigrama funcional original de TechInstall Solutions (Figura 2, APE 03)"
                  loading="lazy"
                  className="w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </button>
              <p className="text-xs text-muted-foreground">
                Figura 2 original de <strong className="text-foreground">APE 03.pdf</strong> · Caso empresarial TechInstall Solutions (RUC 1790000000001).
              </p>
            </div>

            {/* Derecha: Distribución editorial de los 6 grupos / 12 registros (Tabla 8) */}
            <div className="divide-y divide-border/70 border-y border-border/80 lg:col-span-6">
              {ORGANIGRAMA_ROLES.map((item) => (
                <div
                  key={item.role}
                  data-m3-item
                  className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[1fr_auto] sm:gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-foreground">
                        {item.role}
                      </h3>
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: item.isValidationProfile
                            ? "var(--accent-warm)"
                            : MODULE_ACCENT,
                        }}
                      >
                        {item.level}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.responsibility}
                    </p>
                    <p className="text-xs text-muted-foreground/90">
                      {item.regime} · Depende de: {item.reportsTo}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-xs font-bold text-foreground">
                      {item.headcount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enlace contextual hacia la TAREA 12 del Módulo 02 (sin duplicar PDF) */}
          <div
            data-m3-item
            className="flex flex-col justify-between gap-3 border-l-2 border-module-02/60 pl-5 sm:flex-row sm:items-center"
          >
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-sm">
              <strong className="text-foreground">
                Relación con la Unidad II:
              </strong>{" "}
              los requisitos previos de vinculación PYME, vacante Encuentra Empleo y aviso de entrada IESS se encuentran documentados en{" "}
              <strong className="text-foreground">TAREA 12</strong> dentro del Módulo 02.
            </p>
            <Link
              to="/tributacion#escena-laboral-pyme"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold transition-colors hover:text-foreground"
              style={{ color: "var(--module-02)" }}
            >
              <span>Ver en Módulo 02</span>
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
