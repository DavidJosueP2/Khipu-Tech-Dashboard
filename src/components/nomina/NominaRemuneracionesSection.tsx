import { useRef } from "react";
import { Eye, Info } from "lucide-react";

import {
  getNominaDoc,
  IESS_RECONCILIATION,
  PAYROLL_EXERCISE_META,
  PAYROLL_ROWS,
  PAYROLL_TOTALS_ROW,
  type NominaDocument,
} from "@/data/nomina";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

const MODULE_ACCENT = "var(--module-03)";

interface NominaRemuneracionesProps {
  onPreview: (doc: NominaDocument) => void;
}

/**
 * Escena 03.03 — Remuneraciones, beneficios sociales y conciliación IESS.
 * Sección protagonista del Módulo 03 basada fielmente en las Tablas 9 y 10 de APE 03.pdf.
 */
export function NominaRemuneracionesSection({
  onPreview,
}: NominaRemuneracionesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ape03 = getNominaDoc("ape-03");

  useGSAP(
    () =>
      withResponsiveMotion(sectionRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        animateEditorialReveal("[data-scene-reveal]", {
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        animateDocumentListStagger("[data-m3-pay-item]", {
          stagger: 0.07,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        const bars = gsap.utils.toArray<HTMLElement>("[data-m3-pay-bar]");
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
                trigger: bar.closest("[data-m3-bars-group]") ?? bar,
                start: "top 78%",
                once: true,
              },
            }
          );
        });
      }),
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="escena-remuneraciones"
      aria-labelledby="m3-s3-heading"
      className="border-t border-border/70 py-20 md:py-28"
    >
      <div className="space-y-16">
        <ChapterHeader
          headingId="m3-s3-heading"
          accentVar={MODULE_ACCENT}
          eyebrow="03.03 · MÓDULO 03 · PLANILLA CONSOLIDADA Y CONCILIACIÓN IESS"
          titleBold="Remuneraciones"
          titleItalic="y beneficios"
          lead="Liquidación mensual automatizada de los doce registros del ejercicio académico de TechInstall Solutions: sueldos base, horas con recargo, aportes al IESS, retención IR, beneficios sociales y costo patronal."
          objective="Mostrar con transparencia el doble balance financiero (trabajador y empleador) y su conciliación exacta ante el IESS."
        />

        {/* Parámetros declarados del ejercicio académico (SBU $482 identificado como dato del ejercicio) */}
        <div
          data-m3-pay-item
          className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-module-03/35 bg-module-03/[0.07] px-5 py-4 text-xs"
        >
          <div className="flex items-start gap-3">
            <Info
              className="mt-0.5 size-4 shrink-0"
              style={{ color: MODULE_ACCENT }}
            />
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground">
                Parámetro del ejercicio académico: SBU{" "}
                <span className="font-mono" style={{ color: MODULE_ACCENT }}>
                  {PAYROLL_EXERCISE_META.sbuExerciseValue}
                </span>
              </p>
              <p className="text-muted-foreground">
                {PAYROLL_EXERCISE_META.sbuExerciseBasis} · Tabla IR:{" "}
                {PAYROLL_EXERCISE_META.irBasis}.
              </p>
            </div>
          </div>

          <span className="font-mono text-[0.7rem] text-muted-foreground">
            {PAYROLL_EXERCISE_META.totalRecords} ·{" "}
            {PAYROLL_EXERCISE_META.recordsSplit}
          </span>
        </div>

        {/* Triple balance monumental (Trabajador · IESS · Empleador) */}
        <div className="grid grid-cols-1 gap-8 border-y border-border/80 py-8 md:grid-cols-3">
          <div
            data-m3-pay-item
            className="space-y-1.5 border-l-2 pl-5"
            style={{ borderColor: MODULE_ACCENT }}
          >
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Balance del colaborador
            </span>
            <p className="font-mono text-3xl font-bold tracking-tight text-foreground tabular-nums sm:text-4xl">
              {PAYROLL_EXERCISE_META.netPaid}
            </p>
            <p className="text-xs text-muted-foreground">
              Líquido neto transferido · Base {PAYROLL_EXERCISE_META.basePayroll}{" "}
              + {PAYROLL_EXERCISE_META.overtimeTotal} horas extras
            </p>
          </div>

          <div
            data-m3-pay-item
            className="space-y-1.5 border-l-2 pl-5"
            style={{ borderColor: "var(--primary)" }}
          >
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Seguridad social (IESS)
            </span>
            <p
              className="font-mono text-3xl font-bold tracking-tight tabular-nums sm:text-4xl"
              style={{ color: "var(--primary)" }}
            >
              {PAYROLL_EXERCISE_META.iessTotal}
            </p>
            <p className="text-xs text-muted-foreground">
              Total exigible en planilla única (aportes personal, patronal y
              fondos)
            </p>
          </div>

          <div
            data-m3-pay-item
            className="space-y-1.5 border-l-2 pl-5"
            style={{ borderColor: "var(--accent-warm)" }}
          >
            <span className="font-mono text-[0.68rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Costo laboral patronal
            </span>
            <p
              className="font-mono text-3xl font-bold tracking-tight tabular-nums sm:text-4xl"
              style={{ color: "var(--accent-warm)" }}
            >
              {PAYROLL_EXERCISE_META.employerTotalCost}
            </p>
            <p className="text-xs text-muted-foreground">
              Incluye aportes patronales, décimos, fondos y vacaciones (
              {PAYROLL_EXERCISE_META.vacationsProvision})
            </p>
          </div>
        </div>

        {/* Composición visual animada del costo patronal mensual */}
        <div data-m3-bars-group className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-bold tracking-wide text-foreground uppercase">
              Composición del costo mensual integral (USD 17.189,48)
            </h3>
            <span className="font-mono text-xs text-muted-foreground">
              {PAYROLL_EXERCISE_META.overtimeNote}
            </span>
          </div>

          <div className="space-y-4">
            {PAYROLL_EXERCISE_META.costCompositionBars.map((bar, idx) => (
              <div
                key={bar.label}
                className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[21rem_1fr_7.5rem] sm:gap-5"
              >
                <span className="text-xs font-medium text-foreground/90">
                  {bar.label}
                </span>
                <div className="h-3.5 overflow-hidden rounded-full bg-surface-subtle">
                  <div
                    data-m3-pay-bar
                    data-width={`${bar.widthPct}%`}
                    style={{
                      width: `${bar.widthPct}%`,
                      backgroundColor:
                        idx === 0
                          ? MODULE_ACCENT
                          : idx === 1
                            ? "var(--primary)"
                            : "var(--accent-warm)",
                    }}
                    className="h-full rounded-full opacity-90"
                  />
                </div>
                <span className="font-mono text-xs font-bold text-foreground tabular-nums sm:text-right">
                  {bar.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabla 9 original de APE 03: Planilla consolidada de 12 registros */}
        <div data-m3-pay-item className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Planilla consolidada de remuneraciones (Tabla 9 · APE 03, pág. 24)
              </h3>
              <p className="text-xs text-muted-foreground">
                Diez colaboradores de TechInstall Solutions más dos perfiles
                públicos de validación (LOSEP / LOEP). Cifras literales del
                informe.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onPreview(ape03)}
              className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs font-medium transition-colors hover:text-foreground"
              style={{ color: MODULE_ACCENT }}
            >
              <Eye className="size-3.5" />
              <span>Consultar en APE 03.pdf</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border/80 bg-surface/40">
            <table className="w-full min-w-[64rem] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 bg-surface/75 font-mono text-[0.64rem] tracking-wider text-muted-foreground uppercase">
                  <th className="px-4 py-3.5 font-semibold">
                    Cargo / Colaborador
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Sueldo base
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Mat. gravada
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    IESS pers.
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Ret. IR
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Décimo 3.º
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Décimo 4.º
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Fondos res.
                  </th>
                  <th className="px-3 py-3.5 text-right font-semibold">
                    Líquido
                  </th>
                  <th className="px-4 py-3.5 text-right font-semibold">
                    Costo patronal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/55">
                {PAYROLL_ROWS.map((row) => (
                  <tr
                    key={`${row.role}-${row.collaborator}`}
                    className={`transition-colors hover:bg-surface/70 ${
                      row.isPublicTest ? "bg-accent-warm/[0.04]" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-foreground">
                        {row.role}
                      </span>
                      <span className="text-[0.7rem] text-muted-foreground">
                        {row.collaborator}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-foreground/85">
                      {row.baseSalary}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-foreground">
                      {row.taxableBase}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {row.iessPersonal}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {row.incomeTax}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-foreground/85">
                      {row.thirteenth}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-foreground/85">
                      {row.fourteenth}
                    </td>
                    <td className="px-3 py-3 text-right font-mono tabular-nums text-foreground/85">
                      {row.reserveFunds}
                    </td>
                    <td
                      className="px-3 py-3 text-right font-mono font-bold tabular-nums"
                      style={{ color: MODULE_ACCENT }}
                    >
                      {row.netPay}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold tabular-nums text-foreground">
                      {row.employerCost}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-module-03/45 bg-surface/85 font-mono text-xs font-bold text-foreground">
                  <td className="px-4 py-3.5 uppercase">
                    Totales consolidados (12 registros)
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.baseSalary}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.taxableBase}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.iessPersonal}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.incomeTax}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.thirteenth}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.fourteenth}
                  </td>
                  <td className="px-3 py-3.5 text-right tabular-nums">
                    {PAYROLL_TOTALS_ROW.reserveFunds}
                  </td>
                  <td
                    className="px-3 py-3.5 text-right tabular-nums"
                    style={{ color: MODULE_ACCENT }}
                  >
                    {PAYROLL_TOTALS_ROW.netPay}
                  </td>
                  <td
                    className="px-4 py-3.5 text-right tabular-nums"
                    style={{ color: "var(--accent-warm)" }}
                  >
                    {PAYROLL_TOTALS_ROW.employerCost}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-col gap-1 text-[0.72rem] text-muted-foreground sm:flex-row sm:justify-between">
            <p>
              <strong className="text-foreground">*</strong> Acumulación
              voluntaria solicitada por el colaborador ·{" "}
              <strong className="text-foreground">**</strong> Sin fondo de
              reserva en el primer año continuo (Art. 196 CT).
            </p>
            <p>
              Los totales corresponden al conjunto de prueba de 12 registros del
              Anexo 3.
            </p>
          </div>
        </div>

        {/* Tabla 10 original de APE 03: Conciliación con el IESS */}
        <div
          data-m3-bars-group
          className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-border/80 bg-surface/45 p-7 lg:grid-cols-12"
        >
          <div className="space-y-4 lg:col-span-8">
            <div>
              <h3 className="text-base font-bold text-foreground">
                Conciliación de aportaciones con el IESS (Tabla 10 · APE 03, pág.
                25)
              </h3>
              <p className="text-xs text-muted-foreground">
                Desglose por tasa legal del ejercicio simulado, listo para
                contrastar con la planilla oficial del IESS.
              </p>
            </div>

            <div className="space-y-3.5">
              {IESS_RECONCILIATION.map((row) => (
                <div
                  key={row.concept}
                  className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[16.5rem_1fr_6rem] sm:gap-4"
                >
                  <div>
                    <span className="text-xs font-semibold text-foreground">
                      {row.concept}
                    </span>
                    <span className="block font-mono text-[0.66rem] text-muted-foreground">
                      Tasa {row.rate} · {row.basis}
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-surface-subtle">
                    <div
                      data-m3-pay-bar
                      data-width={`${row.widthPct}%`}
                      style={{
                        width: `${row.widthPct}%`,
                        backgroundColor: MODULE_ACCENT,
                      }}
                      className="h-full rounded-full opacity-90"
                    />
                  </div>
                  <span className="font-mono text-sm font-bold text-foreground tabular-nums sm:text-right">
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-2 border-t border-border/70 pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <span className="font-mono text-[0.68rem] font-bold tracking-[0.18em] text-muted-foreground uppercase">
              Total exigible ante el IESS
            </span>
            <p
              className="font-mono text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
              style={{ color: MODULE_ACCENT }}
            >
              {PAYROLL_EXERCISE_META.iessTotal}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Planilla única mensual de aportes personales, patronales y fondos
              de reserva devengados para el ejercicio de 12 registros.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
