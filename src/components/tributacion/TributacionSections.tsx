import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  ShieldCheck,
} from "lucide-react";

import {
  CIIU_ACTIVITIES,
  ECUADOR_TECH_IMPORTS_2024,
  FACTURA_SRI_VISUAL,
  getTributacionDoc,
  INDUMETAL_DOCS,
  INDUMETAL_IVA_VISUAL,
  PYME_HIRE_KPIS,
  PYME_HIRING_STEPS,
  SENADI_VISUAL,
  TRIBUTACION_DOCUMENTS,
  type TributacionDocument,
} from "@/data/tributacion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import { TributacionFichaFiscal } from "@/components/tributacion/TributacionFichaFiscal";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  animateRuleDraw,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

const MODULE_ACCENT = "var(--module-02)";

interface TributacionSectionsProps {
  onPreview: (doc: TributacionDocument) => void;
}

/**
 * Presentación visual del Módulo 02 — Obligaciones tributarias (Unidad II):
 *   01 / 04 · Registro RUC, códigos CIIU y Facturador SRI
 *   02 / 04 · Comprobantes comerciales e IVA (Caso INDUMETAL S.A. + Form. 2011)
 *   03 / 04 · Marca SENADI (Clase 42) y Top 5 importaciones tecnológicas (2024)
 *   04 / 04 · Obligaciones laborales PYME (TAREA 12 + puente hacia /nomina)
 *   Cierre  · Galería visual con portadas reales de los 8 PDF (APE 02 + Tareas 06–12)
 */
export function TributacionSections({ onPreview }: TributacionSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ape02 = getTributacionDoc("ape-02");
  const invoice = getTributacionDoc("tarea-07");
  const indumetal = getTributacionDoc("tarea-08");
  const ivaForm = getTributacionDoc("tarea-09");

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        const scenes = gsap.utils.toArray<HTMLElement>("[data-t2-scene]");
        scenes.forEach((scene) => {
          const reveals = scene.querySelectorAll("[data-scene-reveal]");
          if (reveals.length > 0) {
            animateEditorialReveal(reveals, {
              stagger: 0.08,
              scrollTrigger: { trigger: scene, start: "top 80%", once: true },
            });
          }

          const items = scene.querySelectorAll("[data-t2-item]");
          if (items.length > 0) {
            animateDocumentListStagger(items, {
              stagger: 0.07,
              scrollTrigger: { trigger: scene, start: "top 78%", once: true },
            });
          }
        });

        // Barras animadas de IVA (INDUMETAL) e Importaciones (Ecuador 2024)
        const bars = gsap.utils.toArray<HTMLElement>("[data-t2-bar]");
        bars.forEach((bar, idx) => {
          const targetW = bar.dataset.width ?? "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetW,
              duration: 0.95,
              delay: (idx % 5) * 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar.closest("[data-t2-scene]") ?? bar,
                start: "top 75%",
                once: true,
              },
            }
          );
        });

        animateRuleDraw("[data-hiring-line]", {
          duration: 0.95,
          scrollTrigger: {
            trigger: "#escena-laboral-pyme",
            start: "top 78%",
            once: true,
          },
        });
      }),
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="flex flex-col">
      {/* ==================================================================
       * 01 / 04 — RUC, CIIU Y FACTURACIÓN ELECTRÓNICA
       * ================================================================ */}
      <section
        id="escena-formalizacion"
        data-t2-scene
        aria-labelledby="t2-s1-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="t2-s1-heading"
            titleBold="Registro y formalización"
            titleItalic="tributaria"
            lead="Formalizar la empresa tecnológica comienza definiendo sus actividades CIIU, contrastando el catastro público y emitiendo comprobantes en el Facturador SRI."
            objective="Identificar las actividades económicas del emprendimiento y practicar la emisión electrónica ante el SRI."
          />

          <TributacionFichaFiscal />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Izquierda: Códigos CIIU + Catastro */}
            <div className="space-y-4 lg:col-span-7">
              <div className="grid grid-cols-1 gap-3">
                {CIIU_ACTIVITIES.map((act) => (
                  <div
                    key={act.code}
                    data-t2-item
                    className={`flex flex-col justify-between gap-2 rounded-xl p-5 sm:flex-row sm:items-center sm:gap-5 ${
                      act.primary
                        ? "bg-module-02/[0.08]"
                        : "bg-surface/45"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-sm font-bold"
                          style={{ color: MODULE_ACCENT }}
                        >
                          {act.code}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {act.role}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground/92">
                        {act.shortTitle}
                      </p>
                    </div>
                    {act.primary && (
                      <CheckCircle2
                        className="size-5 shrink-0"
                        style={{ color: MODULE_ACCENT }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Dato visual del catastro RUC */}
              <div
                data-t2-item
                className="flex items-center gap-5 border-l-2 border-module-02/60 pl-5 pt-1"
              >
                <span
                  className="text-4xl font-bold"
                  style={{ color: MODULE_ACCENT }}
                >
                  {FACTURA_SRI_VISUAL.catastroCount}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Empresas reales comparadas en el catastro RUC
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {FACTURA_SRI_VISUAL.catastroSplit}
                  </p>
                </div>
              </div>
            </div>

            {/* Derecha: Comprobante visual del Facturador SRI */}
            <div
              data-t2-item
              className="flex flex-col justify-between gap-6 rounded-2xl bg-surface/65 p-7 lg:col-span-5"
            >
              <div className="flex items-center justify-between border-b border-border/75 pb-4">
                <div>
                  <span
                    className="text-xs font-bold"
                    style={{ color: MODULE_ACCENT }}
                  >
                    Facturador SRI · Comprobante
                  </span>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Emisión practicada · {FACTURA_SRI_VISUAL.date}
                  </p>
                </div>
                <span className="text-xs font-semibold" style={{ color: MODULE_ACCENT }}>
                  IVA {FACTURA_SRI_VISUAL.ivaRate}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Concepto</span>
                  <span className="font-medium text-foreground">
                    {FACTURA_SRI_VISUAL.concept}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {FACTURA_SRI_VISUAL.subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>IVA ({FACTURA_SRI_VISUAL.ivaRate})</span>
                  <span className="font-semibold text-foreground">
                    {FACTURA_SRI_VISUAL.iva}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-t border-border/80 pt-5">
                <span className="text-xs font-semibold text-muted-foreground">
                  Total comprobante
                </span>
                <span
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  style={{ color: MODULE_ACCENT }}
                >
                  {FACTURA_SRI_VISUAL.total}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onPreview(invoice)}
                className="editorial-action cursor-pointer"
              >
                Ver comprobante del Facturador SRI
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * 02 / 04 — COMPROBANTES COMERCIALES E IVA (CASO INDUMETAL S.A.)
       * ================================================================ */}
      <section
        id="escena-iva"
        data-t2-scene
        aria-labelledby="t2-s2-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="t2-s2-heading"
            titleBold="Documentación e IVA"
            lead="La práctica de INDUMETAL S.A. relaciona seis comprobantes con la liquidación del IVA. El expediente también contiene una práctica del Formulario 2011 en el portal del SRI."
            objective="Reconocer qué documentos modifican la liquidación del IVA y visualizar el crédito tributario obtenido."
          />

          {/* 6 documentos comerciales trabajados en el caso INDUMETAL S.A. */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                6 comprobantes · Caso {INDUMETAL_IVA_VISUAL.company}
              </span>
              <span className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: MODULE_ACCENT }}
                  />
                  Afecta cálculo de IVA
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-muted-foreground/50" />
                  Respaldo operativo
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {INDUMETAL_DOCS.map((item) => (
                <div
                  key={item.name}
                  data-t2-item
                  className={`rounded-xl p-4 ${
                    item.affectsIva
                      ? "bg-module-02/[0.07]"
                      : "bg-surface/40"
                  }`}
                >
                  <span
                    className="block text-lg font-bold"
                    style={{
                      color: item.affectsIva
                        ? MODULE_ACCENT
                        : "var(--muted-foreground)",
                    }}
                  >
                    {item.amount}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-foreground/90">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 border-t border-border pt-8">
            <h3 className="type-feature">
              Del comprobante <EditorialSerif className="text-module-02">al cálculo.</EditorialSerif>
            </h3>
            <dl className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              <div className="space-y-2">
                <dt className="type-subheading">IVA de compras</dt>
                <dd className="max-w-[60ch] text-muted-foreground">
                  La factura de compra registra una base de{" "}
                  {INDUMETAL_IVA_VISUAL.purchasesBase}. Al aplicar la tarifa
                  del {FACTURA_SRI_VISUAL.ivaRate} usada en el ejercicio se
                  obtiene <strong>USD {INDUMETAL_IVA_VISUAL.purchasesIvaFormatted}</strong>.
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="type-subheading">IVA de ventas netas</dt>
                <dd className="max-w-[60ch] text-muted-foreground">
                  A la venta de USD 720,00 se le restan USD 180,00 de la nota
                  de crédito y se le suman USD 30,00 de la nota de débito.
                  La base queda en {INDUMETAL_IVA_VISUAL.netSalesBase}. El IVA
                  pasa de USD 108,00 a{" "}
                  <strong>USD {INDUMETAL_IVA_VISUAL.netSalesIvaFormatted}</strong>
                  {" "}al restar USD 27,00 y sumar USD 4,50.
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="type-subheading">Guía de remisión y retención</dt>
                <dd className="max-w-[60ch] text-muted-foreground">
                  La guía respalda el traslado de bienes. En la práctica se
                  registra por separado una retención didáctica de USD 21,00,
                  equivalente al 1 % de la base de compra.
                </dd>
              </div>
              <div className="space-y-2">
                <dt className="type-subheading">Resultado de la liquidación</dt>
                <dd className="max-w-[60ch] text-muted-foreground">
                  El crédito a favor se obtiene al restar USD{" "}
                  {INDUMETAL_IVA_VISUAL.netSalesIvaFormatted} de IVA en ventas
                  a USD {INDUMETAL_IVA_VISUAL.purchasesIvaFormatted} de IVA en
                  compras. La diferencia es{" "}
                  <strong>{INDUMETAL_IVA_VISUAL.taxCreditFormatted}</strong>.
                </dd>
              </div>
            </dl>
            <a
              className="editorial-action"
              href={indumetal.url + "#page=8"}
              target="_blank"
              rel="noreferrer"
            >
              Ver la matriz y los documentos de la Tarea 08
            </a>
          </div>

          {/* Barras visuales comparativas: IVA Compras vs IVA Ventas */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[17rem_1fr_5.5rem] sm:gap-5">
              <div>
                <span className="text-sm font-semibold text-foreground">
                  IVA en adquisiciones
                </span>
                <span className="block text-xs text-muted-foreground">
                  Base gravada {INDUMETAL_IVA_VISUAL.purchasesBase}
                </span>
              </div>
              <div className="h-5 overflow-hidden rounded-full bg-surface-subtle">
                <div
                  data-t2-bar
                  data-width="100%"
                  style={{ width: "100%" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
                />
              </div>
              <span className="text-base font-bold text-foreground tabular-nums sm:text-right">
                {INDUMETAL_IVA_VISUAL.purchasesIvaFormatted}
              </span>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[17rem_1fr_5.5rem] sm:gap-5">
              <div>
                <span className="text-sm font-semibold text-foreground">
                  IVA generado en ventas netas
                </span>
                <span className="block text-xs text-muted-foreground">
                  Base neta {INDUMETAL_IVA_VISUAL.netSalesBase}
                </span>
              </div>
              <div className="h-5 overflow-hidden rounded-full bg-surface-subtle">
                <div
                  data-t2-bar
                  data-width={`${(
                    (INDUMETAL_IVA_VISUAL.netSalesIva /
                      INDUMETAL_IVA_VISUAL.purchasesIva) *
                    100
                  ).toFixed(1)}%`}
                  style={{
                    width: `${(
                      (INDUMETAL_IVA_VISUAL.netSalesIva /
                        INDUMETAL_IVA_VISUAL.purchasesIva) *
                      100
                    ).toFixed(1)}%`,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                />
              </div>
              <span className="text-base font-bold text-foreground tabular-nums sm:text-right">
                {INDUMETAL_IVA_VISUAL.netSalesIvaFormatted}
              </span>
            </div>
          </div>

          {/* Resultado destacado de crédito tributario */}
          <div
            data-t2-item
            className="flex flex-col justify-between gap-4 border-y border-border/80 py-7 sm:flex-row sm:items-baseline"
          >
            <div className="space-y-1">
              <p className="text-lg font-bold text-foreground sm:text-xl">
                Crédito tributario a favor del contribuyente
              </p>
              <p className="text-sm text-muted-foreground">
                Resultado del caso INDUMETAL S.A.
              </p>
            </div>
            <div
              className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
              style={{ color: MODULE_ACCENT }}
            >
              {INDUMETAL_IVA_VISUAL.taxCreditFormatted}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="type-subheading">Formulario 2011 en el portal del SRI</h3>
            <p className="max-w-[68ch] text-muted-foreground">
              La Tarea 09 muestra una declaración sustitutiva de IVA del
              período agosto de 2026. La captura usa los importes propios de
              esa práctica del portal. La matriz de la Tarea 08 conserva el
              cálculo de INDUMETAL.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={() => onPreview(ivaForm)}
                className="editorial-action cursor-pointer"
              >
                Ver captura de la Tarea 09
              </button>
              <a className="editorial-action" href={ape02.url + "#page=31"} target="_blank" rel="noreferrer">
                Ver formulario completo en el APE 02
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * 03 / 04 — MARCA SENADI Y COMERCIO EXTERIOR TECNOLÓGICO
       * ================================================================ */}
      <section
        id="escena-marca-comercio"
        data-t2-scene
        aria-labelledby="t2-s3-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="t2-s3-heading"
            titleBold="Marca y"
            titleItalic="comercio exterior"
            lead="Actividades complementarias de la Unidad II: protección del signo distintivo ante el SENADI y panorama de importaciones tecnológicas en Ecuador."
            objective="Integrar la propiedad intelectual de la marca y el contexto de importación tecnológica de la PYME."
          />

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Izquierda: Sello visual de Registro de Marca SENADI */}
            <div
              data-t2-item
              className="flex flex-col justify-between gap-6 rounded-2xl bg-module-02/[0.07] p-7 lg:col-span-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: MODULE_ACCENT }}
                  >
                    <ShieldCheck className="size-3.5" />
                    Simulación SENADI
                  </span>
                  <span className="text-xs text-muted-foreground">
                    15 sep 2026
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {SENADI_VISUAL.applicant}
                  </p>
                  <div className="mt-1 flex items-baseline gap-2 text-3xl font-bold tracking-tight text-foreground">
                    <span>{SENADI_VISUAL.sign}</span>
                  </div>
                </div>

                <div className="border-y border-border/70 py-4">
                  <div
                    className="text-4xl font-bold tracking-tight"
                    style={{ color: MODULE_ACCENT }}
                  >
                    {SENADI_VISUAL.niceClass}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {SENADI_VISUAL.niceSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {SENADI_VISUAL.pillars.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-foreground/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Derecha: Barras animadas del Top 5 importaciones Ecuador 2024 */}
            <div
              data-t2-item
              className="flex flex-col justify-between gap-6 rounded-2xl bg-surface/45 p-7 lg:col-span-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-foreground">
                  Top 5 importaciones tecnológicas de Ecuador (2024)
                </h3>
                <span className="text-xs text-muted-foreground">
                  WITS / OMC · USD
                </span>
              </div>

              <div className="space-y-4">
                {ECUADOR_TECH_IMPORTS_2024.map((item) => (
                  <div
                    key={item.rank}
                    className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[12.5rem_1fr_6.5rem] sm:gap-4"
                  >
                    <div>
                      <span className="text-sm font-semibold text-foreground">
                        {item.product}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {item.origin}
                      </span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-surface-subtle">
                      <div
                        data-t2-bar
                        data-width={`${item.shareWidthPct}%`}
                        style={{
                          width: `${item.shareWidthPct}%`,
                          backgroundColor: MODULE_ACCENT,
                        }}
                        className="h-full rounded-full opacity-90"
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground tabular-nums sm:text-right">
                      {item.valueUsd}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * 04 / 04 — OBLIGACIONES LABORALES DE LAS PYMES (TAREA 12 + /nomina)
       * ================================================================ */}
      <section
        id="escena-laboral-pyme"
        data-t2-scene
        aria-labelledby="t2-s4-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="t2-s4-heading"
            titleBold="Obligaciones laborales para pymes"
            lead="Cierre de la Unidad II: simulación completa de contratación del Analista de Base de Datos para KhipuTech Cía. Ltda., desde verificaciones hasta el aviso IESS."
            objective="Aplicar los requisitos formales de vinculación inicial de personal en una PYME tecnológica."
          />

          {/* Línea horizontal conectada de 4 pasos */}
          <div className="relative">
            <div
              data-hiring-line
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-px md:block"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--module-02) 50%, transparent)",
              }}
            />

            <ol className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6 md:pt-4">
              {PYME_HIRING_STEPS.map((item) => (
                <li key={item.step} data-t2-item className="relative space-y-3">
                  <div
                    className="type-editorial-numeral flex size-8 items-center justify-center text-2xl text-module-02"
                  >
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.shortNote}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* 4 cifras clave de la contratación simulada */}
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {PYME_HIRE_KPIS.map((kpi) => (
              <div
                key={kpi.label}
                data-t2-item
                className="space-y-1.5 border-l pl-5"
                style={{
                  borderColor:
                    "color-mix(in oklch, var(--module-02) 45%, transparent)",
                }}
              >
                <div className="text-2xl font-bold text-foreground sm:text-3xl">
                  {kpi.value}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>

          {/* Puente visual limpio hacia el Módulo 03 (/nomina) */}
          <div
            data-t2-item
            className="flex flex-col justify-between gap-4 rounded-xl bg-module-03/[0.07] px-6 py-5 sm:flex-row sm:items-center"
          >
            <div className="space-y-1">
              <p
                className="text-xs font-bold"
                style={{ color: "var(--module-03)" }}
              >
                Continuidad temática · Módulo 03
              </p>
              <p className="text-sm text-foreground/90">
                Salarios, horas extras, beneficios sociales y roles de pago se
                desarrollan en <strong>Remuneraciones y nómina</strong>.
              </p>
            </div>

            <Link
              to="/nomina"
              className="group inline-flex shrink-0 items-center gap-2 text-xs font-semibold transition-colors hover:bg-surface"
              style={{ color: "var(--module-03)" }}
            >
              <span>Ver Módulo 03</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * CIERRE — GALERÍA VISUAL DE LOS 8 DOCUMENTOS ORIGINALES (CARDS PDF)
       * ================================================================ */}
      <section
        id="documentos-tributacion"
        data-t2-scene
        aria-labelledby="t2-docs-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-12">
          <div className="space-y-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="t2-docs-heading"
                data-scene-reveal
                className="type-display"
              >
                Consulta{" "}
                <EditorialSerif
                  optical="display"
                  className="font-normal"
                >
                  cada trabajo.
                </EditorialSerif>
              </h2>

              <p
                data-scene-reveal
                className="text-xs text-muted-foreground"
              >
                8 archivos originales · 1 expediente APE 02 + 7 evidencias
              </p>
            </div>
          </div>

          {/* Galería visual con portadas reales de los 8 PDFs */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRIBUTACION_DOCUMENTS.map((doc) => (
              <article
                key={doc.id}
                data-t2-item
                className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                  doc.isIntegrator
                    ? "border-module-02/50 bg-surface/85 hover:border-module-02"
                    : "border-border/80 bg-surface/55 hover:border-border-strong hover:bg-surface/80"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onPreview(doc)}
                  aria-label={`Visualizar ${doc.fileName}`}
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden border-b border-border/70 bg-white text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={doc.thumbnailUrl}
                    alt={`Portada de ${doc.fileName}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>

                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex text-xs font-bold ${
                          doc.isIntegrator
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                        style={
                          doc.isIntegrator
                            ? { color: MODULE_ACCENT }
                            : undefined
                        }
                      >
                        {doc.documentType}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {doc.pages} {doc.pages === 1 ? "pág." : "págs."}
                      </span>
                    </div>

                    <h3 className="type-subheading">
                      {doc.shortLabel}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {doc.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3.5">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      style={{ color: MODULE_ACCENT }}
                    >
                      <Eye className="size-3.5" />
                      <span>Ver PDF</span>
                    </button>

                    <a
                      href={doc.url}
                      download={doc.fileName}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <Download className="size-3.5" />
                      <span>Descargar</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
