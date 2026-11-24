import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { BRAND, INSTITUTION, SEMESTER_PARTIALS } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgM1Shelves from "@/assets/heroes/editorial-m1-main.jpg";
import imgM1KhipuKnot from "@/assets/heroes/editorial-m1-detail.jpg";
import imgImportaciones from "@/assets/heroes/m2-infografia-importaciones.png";
import imgM3Workspace from "@/assets/heroes/editorial-m3-main.jpg";
import imgNominaWeb from "@/assets/heroes/m3-nomina-web.png";
import imgPazySalvo from "@/assets/thumbnails/unidad-4/pazysalvo-hero-dashboard.png";
import imgCertificadoPys from "@/assets/thumbnails/unidad-4/ape04-certificado-pys.png";

const LIVE_TOOLS = [
  {
    label: "Rol de Pagos Ecuador",
    sub: "APE 03 · App web y móvil de nómina",
    url: "https://rol-pagos-ecuador.vercel.app/sistema/inicio",
  },
  {
    label: "PazySalvo Web",
    sub: "APE 04 · Paz y salvo y liquidación PDF",
    url: "https://pazysalvo.madebyjohan.xyz/",
  },
  {
    label: "Repositorio PazySalvo",
    sub: "GitHub · Código fuente",
    url: "https://github.com/kiramman-mp3/sistema-paz-y-salvo-laboral",
  },
] as const;

/**
 * Página principal de KhipuTech: portada de presentación monumental integrada
 * directamente con el Dashboard Bento editorial de los cuatro módulos.
 */
export function HomeBentoDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        gsap.fromTo(
          "[data-bento-hero]",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.78,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );

        gsap.fromTo(
          "[data-bento-tile]",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.68,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: "[data-bento-grid]",
              start: "top 86%",
              once: true,
            },
          }
        );
      }),
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Portada y Dashboard integrador de KhipuTech"
      className="bg-background pt-10 pb-20 md:pt-14 md:pb-28"
    >
      <div className="editorial-container space-y-12 md:space-y-14">
        {/* ================================================================
         * APERTURA DE PRESENTACIÓN MONUMENTAL — KHIPUTECH PROTAGONISTA
         * ============================================================== */}
        <header className="grid grid-cols-1 items-center gap-8 border-b border-border pb-10 lg:grid-cols-12 lg:pb-12">
          <div className="min-w-0 space-y-6 lg:col-span-9">
            <div
              data-bento-hero
              className="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] tracking-[0.2em] text-primary uppercase"
            >
              <span className="h-px w-8 bg-primary" aria-hidden="true" />
              <span>
                {INSTITUTION.shortUniversity} · {INSTITUTION.shortFaculty} ·{" "}
                {INSTITUTION.course}
              </span>
            </div>

            <h1
              data-bento-hero
              className="text-[clamp(4.1rem,10.2vw,8.8rem)] leading-[0.88] tracking-[-0.042em] text-foreground"
            >
              <span className="font-bold">Khipu</span>
              <EditorialSerif
                optical="display"
                className="font-normal text-primary"
              >
                Tech.
              </EditorialSerif>
            </h1>

            <div
              data-bento-hero
              className="flex flex-col justify-between gap-6 pt-2 md:flex-row md:items-end"
            >
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                {BRAND.taglineBefore}
                <EditorialSerif
                  optical="text"
                  className="font-normal text-foreground"
                >
                  {BRAND.taglineItalic}
                </EditorialSerif>{" "}
                Proyecto integrador del ciclo {INSTITUTION.cycle}.
              </p>

              <dl className="flex shrink-0 flex-wrap items-center gap-x-7 gap-y-2 font-mono text-xs">
                <div>
                  <dt className="text-[0.62rem] tracking-wider text-muted-foreground uppercase">
                    Módulos
                  </dt>
                  <dd className="text-base font-bold text-foreground">04</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] tracking-wider text-muted-foreground uppercase">
                    Parciales
                  </dt>
                  <dd className="text-base font-bold text-foreground">02</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] tracking-wider text-muted-foreground uppercase">
                    Guías APE
                  </dt>
                  <dd className="text-base font-bold text-foreground">04</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] tracking-wider text-muted-foreground uppercase">
                    Documentos
                  </dt>
                  <dd className="text-base font-bold text-foreground">
                    {INSTITUTION.metrics.studentDeliverablesCount}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Escultura geométrica Khipu sin fondo acompañando el gran titular */}
          <div
            data-bento-hero
            className="hidden items-center justify-end lg:col-span-3 lg:flex"
          >
            <img
              src={imgM1KhipuKnot}
              alt="Escultura geométrica del emblema KhipuTech"
              className="h-52 w-52 object-contain mix-blend-multiply brightness-[1.1] contrast-[1.15]"
            />
          </div>
        </header>

        {/* ================================================================
         * BENTO GRID PRINCIPAL — 4 MÓDULOS + ESTRUCTURA + APLICACIONES
         * ============================================================== */}
        <div
          data-bento-grid
          className="grid grid-cols-1 gap-5 lg:grid-cols-12"
        >
          {/* --------------------------------------------------------------
           * TILE 01 — MÓDULO 01: EMPRENDIMIENTO (7 cols)
           * ------------------------------------------------------------ */}
          <Link
            to="/emprendimiento"
            data-bento-tile
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-panel)] lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.66rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-01)" }}
                >
                  01 · Unidad I · Plan de negocios
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.75rem]">
                  El{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                    style={{ color: "var(--module-01)" }}
                  >
                    emprendimiento.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            {/* Imagen editorial completa de control de lotes KhipuTech */}
            <div className="overflow-hidden">
              <img
                src={imgM1Shelves}
                alt="Control inteligente de inventarios y caducidad KhipuTech"
                className="h-56 w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border px-6 py-4 sm:grid-cols-4">
              <div>
                <p
                  className="font-mono text-sm font-bold tabular-nums"
                  style={{ color: "var(--module-01)" }}
                >
                  USD 2.900
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Inversión inicial
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  USD 1.744
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Resultado mensual
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  1,7 meses
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Recuperación est.
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  6 PDFs
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  APE 01 + T01–T05
                </p>
              </div>
            </div>
          </Link>

          {/* --------------------------------------------------------------
           * TILE 02 — MÓDULO 02: OBLIGACIONES TRIBUTARIAS (5 cols)
           * ------------------------------------------------------------ */}
          <Link
            to="/tributacion"
            data-bento-tile
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-panel)] lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.66rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-02)" }}
                >
                  02 · Unidad II · SRI, IVA y SENADI
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.75rem]">
                  Obligaciones{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                    style={{ color: "var(--module-02)" }}
                  >
                    tributarias.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div className="overflow-hidden">
              <img
                src={imgImportaciones}
                alt="Top 5 productos tecnológicos que más importa Ecuador 2024"
                className="h-56 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border px-6 py-4">
              <div>
                <p
                  className="font-mono text-sm font-bold tabular-nums"
                  style={{ color: "var(--module-02)" }}
                >
                  $229,50
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Crédito IVA
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground">
                  Clase 42
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Marca SENADI
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  8 PDFs
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  APE 02 + T06–T12
                </p>
              </div>
            </div>
          </Link>

          {/* --------------------------------------------------------------
           * TILE 03 — MÓDULO 03: REMUNERACIONES Y NÓMINA (5 cols)
           * ------------------------------------------------------------ */}
          <Link
            to="/nomina"
            data-bento-tile
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-panel)] lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.66rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-03)" }}
                >
                  03 · Unidad III · TechInstall Solutions
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.75rem]">
                  Remuneraciones{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                    style={{ color: "var(--module-03)" }}
                  >
                    y nómina.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div className="grid grid-cols-12 overflow-hidden">
              <div className="col-span-6 overflow-hidden">
                <img
                  src={imgM3Workspace}
                  alt="Estructura y organización del talento humano"
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="col-span-6 overflow-hidden border-l border-border">
                <img
                  src={imgNominaWeb}
                  alt="Aplicación web de roles de pago — APE 03"
                  className="h-52 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border px-6 py-4">
              <div>
                <p
                  className="font-mono text-sm font-bold tabular-nums"
                  style={{ color: "var(--module-03)" }}
                >
                  $13.083
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Líquido neto
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  $3.588,64
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Planilla IESS
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  4 PDFs
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  APE 03 + 3 evid.
                </p>
              </div>
            </div>
          </Link>

          {/* --------------------------------------------------------------
           * TILE 04 — MÓDULO 04: LIQUIDACIÓN LABORAL (7 cols)
           * ------------------------------------------------------------ */}
          <Link
            to="/liquidacion"
            data-bento-tile
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-border-strong hover:shadow-[var(--shadow-panel)] lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4 p-6 pb-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.66rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-04)" }}
                >
                  04 · Unidad IV · PazySalvo y 12 casos
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.75rem]">
                  Liquidación{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                    style={{ color: "var(--module-04)" }}
                  >
                    laboral.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div className="grid grid-cols-12 items-center bg-background">
              <div className="col-span-8 overflow-hidden">
                <img
                  src={imgPazySalvo}
                  alt="Herramienta web PazySalvo — APE 04"
                  className="h-52 w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="col-span-4 flex h-52 items-center justify-center p-3">
                <img
                  src={imgCertificadoPys}
                  alt="Certificado de Paz y Salvo generado en PDF"
                  className="max-h-48 w-full object-contain mix-blend-multiply contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border px-6 py-4 sm:grid-cols-4">
              <div>
                <p
                  className="font-mono text-sm font-bold tabular-nums"
                  style={{ color: "var(--module-04)" }}
                >
                  USD 3.999
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Desahucio APE 04
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  12 casos
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  $232 a $42.439
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  95 / 100
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  Laboral Hack UTA
                </p>
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-foreground tabular-nums">
                  4 PDFs
                </p>
                <p className="text-[0.68rem] text-muted-foreground">
                  APE 04 + evidencias
                </p>
              </div>
            </div>
          </Link>

          {/* --------------------------------------------------------------
           * TILE 05 — ESTRUCTURA DEL SEMESTRE (7 cols)
           * ------------------------------------------------------------ */}
          <div
            data-bento-tile
            className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 lg:col-span-7"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-bold tracking-wide text-foreground uppercase">
                Recorrido del semestre · {INSTITUTION.cycle}
              </h2>
              <span className="font-mono text-[0.66rem] tracking-wider text-muted-foreground uppercase">
                2 parciales · 4 unidades
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {SEMESTER_PARTIALS.map((partial) => (
                <div key={partial.id} className="space-y-3.5">
                  <div className="flex items-baseline justify-between border-b border-border pb-2">
                    <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                      {partial.name}
                    </span>
                    <span className="font-mono text-[0.68rem] text-muted-foreground">
                      {partial.timeframe} · {partial.deliverablesTotal} docs
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {partial.units.map((unit) => (
                      <li key={unit.unitNumber}>
                        <Link
                          to={unit.modulePath}
                          className="group/unit block space-y-0.5 text-xs transition-colors"
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="font-semibold text-foreground group-hover/unit:text-primary">
                              <span className="mr-2 font-mono text-muted-foreground">
                                {unit.moduleId}
                              </span>
                              {unit.moduleName}
                            </span>
                            <span className="shrink-0 font-mono text-[0.66rem] text-muted-foreground">
                              {unit.apeFile.replace(".pdf", "")}
                            </span>
                          </div>
                          <p className="pl-6 text-[0.7rem] leading-snug text-muted-foreground">
                            {unit.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* --------------------------------------------------------------
           * TILE 06 — APLICACIONES DESPLEGADAS Y EQUIPO (5 cols)
           * ------------------------------------------------------------ */}
          <div
            data-bento-tile
            className="flex flex-col justify-between gap-5 rounded-xl border border-border bg-surface p-6 lg:col-span-5"
          >
            <div className="space-y-2.5">
              <h2 className="text-sm font-bold tracking-wide text-foreground uppercase">
                Aplicaciones en producción
              </h2>

              <ul className="divide-y divide-border">
                {LIVE_TOOLS.map((tool) => (
                  <li key={tool.url}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link flex items-center justify-between gap-3 py-2.5 text-xs transition-colors"
                    >
                      <div>
                        <span className="block font-semibold text-foreground group-hover/link:text-primary">
                          {tool.label}
                        </span>
                        <span className="text-[0.7rem] text-muted-foreground">
                          {tool.sub}
                        </span>
                      </div>
                      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-3 text-[0.7rem] text-muted-foreground">
              <span className="font-semibold text-foreground">
                Equipo {INSTITUTION.level}:
              </span>{" "}
              {INSTITUTION.team.join(" · ")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
