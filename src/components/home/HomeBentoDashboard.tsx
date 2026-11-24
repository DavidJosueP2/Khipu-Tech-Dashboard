import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { BRAND, INSTITUTION, SEMESTER_PARTIALS } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { LivingTerrain } from "@/components/visuals/LivingTerrain";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgM1Shelves from "@/assets/heroes/editorial-m1-main.jpg";
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
      aria-label="Proyecto integrador KhipuTech"
      className="bg-background pb-20 md:pb-28"
    >
      <header className="atlas-cover">
        <LivingTerrain />
        <div className="editorial-container">
          <div className="atlas-cover__copy">
            <h1 data-bento-hero className="type-hero">
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
              className="flex flex-col gap-6 pt-2"
            >
              <p className="editorial-lead">
                {BRAND.taglineBefore}
                <EditorialSerif
                  optical="text"
                  className="font-normal text-foreground"
                >
                  {BRAND.taglineItalic}
                </EditorialSerif>{" "}
                Proyecto integrador del ciclo {INSTITUTION.cycle}.
              </p>

              <p className="type-caption max-w-[50ch] text-muted-foreground">
                Cuatro módulos, dos parciales, cuatro guías APE y{" "}
                <strong className="text-foreground">
                  {INSTITUTION.metrics.studentDeliverablesCount} documentos
                </strong>
                .
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="editorial-container pt-10 md:pt-16">
        {/* ================================================================
         * BENTO GRID PRINCIPAL — 4 MÓDULOS + ESTRUCTURA + APLICACIONES
         * ============================================================== */}
        <div
          data-bento-grid
          className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-20"
        >
          {/* --------------------------------------------------------------
           * TILE 01 — MÓDULO 01: EMPRENDIMIENTO (7 cols)
           * ------------------------------------------------------------ */}
          <Link
            to="/emprendimiento"
            data-bento-tile
            className="group flex min-w-0 flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="type-feature">
                  El{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                  >
                    emprendimiento.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            {/* Imagen editorial completa de control de lotes KhipuTech */}
            <div className="overflow-hidden">
              <img
                src={imgM1Shelves}
                alt="Control inteligente de inventarios y caducidad KhipuTech"
                className="h-[clamp(13rem,24vw,28rem)] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-4">
              <div>
                <p
                  className="text-base font-bold tabular-nums"
                  style={{ color: "var(--module-01)" }}
                >
                  USD 2.900
                </p>
                <p className="text-xs text-muted-foreground">
                  Inversión inicial
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  USD 1.744
                </p>
                <p className="text-xs text-muted-foreground">
                  Resultado mensual
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  1,7 meses
                </p>
                <p className="text-xs text-muted-foreground">
                  Recuperación est.
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  6 PDFs
                </p>
                <p className="text-xs text-muted-foreground">
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
            className="group flex min-w-0 flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="type-feature">
                  Obligaciones{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                  >
                    tributarias.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div className="overflow-hidden">
              <img
                src={imgImportaciones}
                alt="Top 5 productos tecnológicos que más importa Ecuador 2024"
                className="h-[clamp(13rem,24vw,28rem)] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pb-2">
              <div>
                <p
                  className="text-base font-bold tabular-nums"
                  style={{ color: "var(--module-02)" }}
                >
                  $229,50
                </p>
                <p className="text-xs text-muted-foreground">
                  Crédito IVA
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Clase 42
                </p>
                <p className="text-xs text-muted-foreground">
                  Marca SENADI
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  8 PDFs
                </p>
                <p className="text-xs text-muted-foreground">
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
            className="group flex min-w-0 flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="type-feature">Remuneraciones y nómina.</h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div className="grid h-[clamp(13rem,21vw,24rem)] grid-cols-12 gap-3 overflow-hidden">
              <div className="col-span-6 overflow-hidden">
                <img
                  src={imgM3Workspace}
                  alt="Estructura y organización del talento humano"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="col-span-6 overflow-hidden">
                <img
                  src={imgNominaWeb}
                  alt="Aplicación web de roles de pago — APE 03"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pb-2">
              <div>
                <p
                  className="text-base font-bold tabular-nums"
                  style={{ color: "var(--module-03)" }}
                >
                  $13.083
                </p>
                <p className="text-xs text-muted-foreground">
                  Líquido neto
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  $3.588,64
                </p>
                <p className="text-xs text-muted-foreground">
                  Planilla IESS
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  4 PDFs
                </p>
                <p className="text-xs text-muted-foreground">
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
            className="group flex min-w-0 flex-col gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="type-feature">
                  Liquidación{" "}
                  <EditorialSerif
                    optical="display"
                    className="font-normal"
                  >
                    laboral.
                  </EditorialSerif>
                </h2>
              </div>
              <span className="inline-flex size-9 shrink-0 items-center justify-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div className="grid h-[clamp(13rem,21vw,24rem)] grid-cols-12 gap-3">
              <div className="col-span-8 overflow-hidden">
                <img
                  src={imgPazySalvo}
                  alt="Herramienta web PazySalvo — APE 04"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="col-span-4 flex min-h-0 items-center justify-center">
                <img
                  src={imgCertificadoPys}
                  alt="Certificado de Paz y Salvo generado en PDF"
                  className="max-h-full w-full object-contain mix-blend-multiply contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-2 sm:grid-cols-4">
              <div>
                <p
                  className="text-base font-bold tabular-nums"
                  style={{ color: "var(--module-04)" }}
                >
                  USD 3.999
                </p>
                <p className="text-xs text-muted-foreground">
                  Desahucio APE 04
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  12 casos
                </p>
                <p className="text-xs text-muted-foreground">
                  $232 a $42.439
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  95 / 100
                </p>
                <p className="text-xs text-muted-foreground">
                  Laboral Hack UTA
                </p>
              </div>
              <div>
                <p className="text-base font-bold text-foreground tabular-nums">
                  4 PDFs
                </p>
                <p className="text-xs text-muted-foreground">
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
            className="flex min-w-0 flex-col gap-6 pt-6 md:pt-12 lg:col-span-7"
          >
            <div className="space-y-3">
              <h2 className="type-feature">
                Recorrido <EditorialSerif>del semestre</EditorialSerif>
              </h2>
              <p className="type-caption text-muted-foreground">
                Ciclo {INSTITUTION.cycle} · Dos parciales y cuatro unidades
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {SEMESTER_PARTIALS.map((partial) => (
                <div key={partial.id} className="space-y-3.5">
                  <div className="space-y-2 border-b border-border pb-3">
                    <h3 className="type-subheading">{partial.name}</h3>
                    <p className="type-caption text-muted-foreground">
                      {partial.timeframe} · {partial.deliverablesTotal} documentos
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {partial.units.map((unit) => (
                      <li key={unit.unitNumber}>
                        <Link
                          to={unit.modulePath}
                          className="group/unit block space-y-1 text-sm"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                            <span className="font-semibold text-foreground group-hover/unit:text-primary">
                              {unit.moduleName}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {unit.apeFile.replace(".pdf", "")}
                            </span>
                          </div>
                          <p className="type-caption text-muted-foreground">
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
            className="flex min-w-0 flex-col gap-6 pt-6 md:pt-12 lg:col-span-5"
          >
            <div className="space-y-2.5">
              <h2 className="type-feature">
                Aplicaciones en producción
              </h2>

              <ul className="divide-y divide-border">
                {LIVE_TOOLS.map((tool) => (
                  <li key={tool.url}>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link flex items-center justify-between gap-3 py-4 text-sm"
                    >
                      <div>
                        <span className="block font-semibold text-foreground group-hover/link:text-primary">
                          {tool.label}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tool.sub}
                        </span>
                      </div>
                      <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border pt-3 text-xs text-muted-foreground">
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
