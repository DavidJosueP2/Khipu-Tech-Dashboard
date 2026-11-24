import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { INSTITUTION, SEMESTER_PARTIALS } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

import imgKhipuBrand from "@/assets/heroes/m1-khiputech-logo.png";
import imgSurveyMarket from "@/assets/heroes/m1-encuesta-mercado.png";
import imgImportaciones from "@/assets/heroes/m2-infografia-importaciones.png";
import imgNominaWeb from "@/assets/heroes/m3-nomina-web.png";
import imgNominaMovil from "@/assets/heroes/m3-nomina-movil.png";
import imgPazySalvo from "@/assets/thumbnails/unidad-4/pazysalvo-hero-dashboard.png";
import imgCertificadoPys from "@/assets/thumbnails/unidad-4/ape04-certificado-pys.png";

const LIVE_TOOLS = [
  {
    label: "Rol de Pagos Ecuador",
    sub: "APE 03 · App de nómina web y móvil",
    url: "https://rol-pagos-ecuador.vercel.app/sistema/inicio",
  },
  {
    label: "PazySalvo Web",
    sub: "APE 04 · Paz y salvo y liquidación PDF",
    url: "https://pazysalvo.madebyjohan.xyz/",
  },
  {
    label: "Repositorio PazySalvo",
    sub: "GitHub · Código fuente abierto",
    url: "https://github.com/kiramman-mp3/sistema-paz-y-salvo-laboral",
  },
] as const;

/**
 * Dashboard Bento editorial de la página principal de KhipuTech.
 * Expone desde el primer instante lo más importante de los cuatro módulos,
 * sus imágenes reales, cifras verificadas, parciales y herramientas activas.
 */
export function HomeBentoDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        gsap.fromTo(
          "[data-bento-tile]",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.06,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }),
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      aria-label="Panel integrador de KhipuTech"
      className="bg-background pt-10 pb-20 md:pt-12 md:pb-28"
    >
      <div className="editorial-container space-y-8">
        {/* Cabecera compacta del Dashboard (sin botón de explorar) */}
        <header
          data-bento-tile
          className="flex flex-col justify-between gap-6 border-b border-border pb-7 lg:flex-row lg:items-end"
        >
          <div className="space-y-2">
            <h1 className="text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.96] tracking-[-0.035em] text-foreground">
              <span className="font-bold">Khipu</span>
              <EditorialSerif
                optical="display"
                className="font-normal text-primary"
              >
                Tech.
              </EditorialSerif>
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground md:text-[0.95rem]">
              Panel integrador del semestre · {INSTITUTION.course} (
              {INSTITUTION.shortUniversity} · {INSTITUTION.shortFaculty})
            </p>
          </div>

          {/* Métricas globales del expediente */}
          <dl className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs">
            <div>
              <dt className="text-[0.65rem] tracking-wider text-muted-foreground uppercase">
                Módulos
              </dt>
              <dd className="text-lg font-bold text-foreground">04</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-wider text-muted-foreground uppercase">
                Parciales
              </dt>
              <dd className="text-lg font-bold text-foreground">02</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-wider text-muted-foreground uppercase">
                Guías APE
              </dt>
              <dd className="text-lg font-bold text-foreground">04</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-wider text-muted-foreground uppercase">
                Documentos
              </dt>
              <dd className="text-lg font-bold text-foreground">
                {INSTITUTION.metrics.studentDeliverablesCount}
              </dd>
            </div>
          </dl>
        </header>

        {/* ================================================================
         * BENTO GRID PRINCIPAL — 4 MÓDULOS + ESTRUCTURA + HERRAMIENTAS
         * ============================================================== */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* --------------------------------------------------------------
           * TILE 01 — MÓDULO 01: EMPRENDIMIENTO (7 cols)
           * ------------------------------------------------------------ */}
          <Link
            to="/emprendimiento"
            data-bento-tile
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-hairline)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-panel)] md:p-7 lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-01)" }}
                >
                  01 · Unidad I · Plan de negocios
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.85rem]">
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

            {/* Imágenes reales de Unidad I: Logo oficial + Encuesta 17 comercios */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-12">
              <div className="overflow-hidden rounded-xl border border-border bg-background sm:col-span-7">
                <img
                  src={imgKhipuBrand}
                  alt="Marca oficial KhipuTech — APE 01"
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-border bg-background p-1.5 sm:col-span-5">
                <img
                  src={imgSurveyMarket}
                  alt="Encuesta de validación de mercado (17 respuestas)"
                  className="h-44 w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
                />
              </div>
            </div>

            {/* Cifras clave verificadas (Guia Ape 01.pdf) */}
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
              <div>
                <p
                  className="font-mono text-base font-bold tabular-nums"
                  style={{ color: "var(--module-01)" }}
                >
                  USD 2.900
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Inversión inicial
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  USD 1.744
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Resultado mensual
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  1,7 meses
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Recuperación est.
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  6 PDFs
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  APE 01 + Tareas 01–05
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
            className="group flex flex-col justify-between gap-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-hairline)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-panel)] md:p-7 lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-02)" }}
                >
                  02 · Unidad II · SRI, IVA y SENADI
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.85rem]">
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

            {/* Visual real: Infografía Top 5 Importaciones Ecuador 2024 */}
            <div className="overflow-hidden rounded-xl border border-border bg-background p-1.5">
              <img
                src={imgImportaciones}
                alt="Top 5 productos tecnológicos que más importa Ecuador 2024 — TAREA 11"
                className="h-44 w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
              />
            </div>

            {/* Cifras clave verificadas (Guia Ape 02.pdf) */}
            <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
              <div>
                <p
                  className="font-mono text-base font-bold tabular-nums"
                  style={{ color: "var(--module-02)" }}
                >
                  $229,50
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Crédito IVA
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground">
                  Clase 42
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Marca SENADI
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  8 PDFs
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
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
            className="group flex flex-col justify-between gap-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-hairline)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-panel)] md:p-7 lg:col-span-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-03)" }}
                >
                  03 · Unidad III · TechInstall Solutions
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.85rem]">
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

            {/* Imágenes reales: App Web + Móvil de Roles de Pago (APE 03) */}
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-8 overflow-hidden rounded-xl border border-border bg-background">
                <img
                  src={imgNominaWeb}
                  alt="Aplicación web de roles de pago — APE 03"
                  className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
                />
              </div>
              <div className="col-span-4 overflow-hidden rounded-xl border border-border bg-background p-1">
                <img
                  src={imgNominaMovil}
                  alt="Versión móvil de roles de pago — APE 03"
                  className="h-44 w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
                />
              </div>
            </div>

            {/* Cifras clave verificadas (APE 03.pdf) */}
            <div className="grid grid-cols-3 gap-3 border-t border-border pt-4">
              <div>
                <p
                  className="font-mono text-base font-bold tabular-nums"
                  style={{ color: "var(--module-03)" }}
                >
                  $13.083
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Líquido neto
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  $3.588,64
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Planilla IESS
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  4 PDFs
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
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
            className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-hairline)] transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-panel)] md:p-7 lg:col-span-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span
                  className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase"
                  style={{ color: "var(--module-04)" }}
                >
                  04 · Unidad IV · PazySalvo y 12 casos
                </span>
                <h2 className="text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-[1.85rem]">
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

            {/* Imágenes reales: Dashboard PazySalvo + Certificado Paz y Salvo PDF */}
            <div className="grid grid-cols-12 gap-3.5">
              <div className="col-span-8 overflow-hidden rounded-xl border border-border bg-background">
                <img
                  src={imgPazySalvo}
                  alt="Herramienta web PazySalvo — APE 04"
                  className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
                />
              </div>
              <div className="col-span-4 overflow-hidden rounded-xl border border-border bg-background p-1.5">
                <img
                  src={imgCertificadoPys}
                  alt="Certificado de Paz y Salvo PDF generado por PazySalvo"
                  className="h-44 w-full rounded-lg object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] sm:h-48"
                />
              </div>
            </div>

            {/* Cifras clave verificadas (APE 04 + 12 casos + Laboral Hack) */}
            <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
              <div>
                <p
                  className="font-mono text-base font-bold tabular-nums"
                  style={{ color: "var(--module-04)" }}
                >
                  USD 3.999
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Desahucio APE 04
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  12 casos
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  $232 a $42.439
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  95 / 100
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
                  Laboral Hack UTA
                </p>
              </div>
              <div>
                <p className="font-mono text-base font-bold text-foreground tabular-nums">
                  4 PDFs
                </p>
                <p className="text-[0.7rem] text-muted-foreground">
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
            className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-hairline)] md:p-7 lg:col-span-7"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-base font-bold text-foreground">
                Recorrido del semestre · {INSTITUTION.cycle}
              </h2>
              <span className="font-mono text-[0.68rem] tracking-wider text-muted-foreground uppercase">
                2 parciales · 4 unidades
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {SEMESTER_PARTIALS.map((partial) => (
                <div key={partial.id} className="space-y-3">
                  <div className="flex items-baseline justify-between border-b border-border pb-2">
                    <span className="text-xs font-bold tracking-wider text-foreground uppercase">
                      {partial.name}
                    </span>
                    <span className="font-mono text-[0.68rem] text-muted-foreground">
                      {partial.deliverablesTotal} docs
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {partial.units.map((unit) => (
                      <li key={unit.unitNumber}>
                        <Link
                          to={unit.modulePath}
                          className="group/unit flex items-baseline justify-between gap-3 text-xs transition-colors hover:text-primary"
                        >
                          <span className="font-medium text-foreground group-hover/unit:text-primary">
                            <span className="mr-2 font-mono text-muted-foreground">
                              {unit.moduleId}
                            </span>
                            {unit.moduleName}
                          </span>
                          <span className="shrink-0 font-mono text-[0.68rem] text-muted-foreground">
                            {unit.apeFile.replace(".pdf", "")}
                          </span>
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
            className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-hairline)] md:p-7 lg:col-span-5"
          >
            <div className="space-y-3">
              <h2 className="text-base font-bold text-foreground">
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

            <div className="border-t border-border pt-3.5 text-[0.72rem] text-muted-foreground">
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
