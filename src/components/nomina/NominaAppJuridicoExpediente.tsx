import { useRef } from "react";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Eye,
  Scale,
} from "lucide-react";

import {
  APP_DOCUMENTED_CAPABILITIES,
  APP_EVIDENCE_SCREENS,
  APP_EXTERNAL_LINKS,
  AUTOMATION_FLOW_STEPS,
  CASO_JURIDICO_DATA,
  getNominaDoc,
  NOMINA_DOCUMENTS,
  NOMINA_VISUAL_ASSETS,
  type NominaDocument,
} from "@/data/nomina";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import {
  animateDocumentListStagger,
  animateEditorialReveal,
  animateRuleDraw,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

const MODULE_ACCENT = "var(--module-03)";
const LEGAL_ACCENT = "var(--accent-warm)";

interface NominaClosingProps {
  onPreview: (doc: NominaDocument) => void;
}

/**
 * Escenas 03.04 (Automatización de nómina — evidencias web y móvil),
 * 03.05 (Contexto jurídico laboral — Infografía) y
 * 03.06 (Expediente documental — 4 PDF originales con portadas reales).
 */
export function NominaAppJuridicoExpediente({
  onPreview,
}: NominaClosingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ape03 = getNominaDoc("ape-03");
  const infografiaDoc = getNominaDoc("infografia-juridico");

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed }) => {
        if (!motionAllowed) return;

        const scenes = gsap.utils.toArray<HTMLElement>("[data-m3-closing]");
        scenes.forEach((scene) => {
          const reveals = scene.querySelectorAll("[data-scene-reveal]");
          if (reveals.length > 0) {
            animateEditorialReveal(reveals, {
              stagger: 0.08,
              scrollTrigger: { trigger: scene, start: "top 80%", once: true },
            });
          }

          const items = scene.querySelectorAll("[data-m3-card]");
          if (items.length > 0) {
            animateDocumentListStagger(items, {
              stagger: 0.07,
              scrollTrigger: { trigger: scene, start: "top 78%", once: true },
            });
          }
        });

        animateRuleDraw("[data-m3-flow-line]", {
          duration: 0.95,
          scrollTrigger: {
            trigger: "#escena-automatizacion",
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
       * 03.04 — AUTOMATIZACIÓN DE NÓMINA (WEB Y MÓVIL · ANEXOS 4 Y 5)
       * ================================================================ */}
      <section
        id="escena-automatizacion"
        data-m3-closing
        aria-labelledby="m3-s4-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="m3-s4-heading"
            titleBold="Nómina"
            titleItalic="automatizada"
            lead="Evidencias documentadas en escritorio y móvil de la herramienta web desarrollada durante el semestre para parametrizar, procesar y emitir los roles de pago de TechInstall Solutions."
            objective="Presentar el flujo automatizado, sus pantallas reales y los enlaces originales documentados en el APE 03."
          />

          {/* Flujo horizontal de 5 pasos (Figura 1 de APE 03) */}
          <div className="relative">
            <div
              data-m3-flow-line
              aria-hidden="true"
              className="absolute inset-x-0 top-0 hidden h-px lg:block"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--module-03) 50%, transparent)",
              }}
            />
            <ol className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5 lg:pt-4">
              {AUTOMATION_FLOW_STEPS.map((item) => (
                <li key={item.step} data-m3-card className="relative space-y-2.5">
                  <div
                    className="type-editorial-numeral flex size-8 items-center justify-center text-2xl text-module-03"
                  >
                    {item.step}
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Capturas reales del Anexo 4 (Escritorio y Móvil) */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {APP_EVIDENCE_SCREENS.map((screen) => (
              <article
                key={screen.id}
                data-m3-card
                className="group flex flex-col overflow-hidden rounded-2xl bg-surface/55 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onPreview(ape03)}
                  aria-label={`Ver ${screen.title} en APE 03.pdf`}
                  className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden border-b border-border/70 bg-white p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <img
                    src={screen.imageUrl}
                    alt={`${screen.title} — ${screen.figure}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>

                <div className="space-y-2 p-5">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span
                      className="font-semibold"
                      style={{ color: MODULE_ACCENT }}
                    >
                      {screen.figure}
                    </span>
                    <span className="text-muted-foreground">{screen.scope}</span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">
                    {screen.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {screen.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Funcionalidades documentadas + Enlaces originales del Anexo 5 */}
          <div className="grid grid-cols-1 gap-8 border-t border-border/70 pt-8 lg:grid-cols-12">
            <div data-m3-card className="space-y-3 lg:col-span-7">
              <p className="text-xs font-semibold text-muted-foreground">
                Funcionalidades documentadas en el informe
              </p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {APP_DOCUMENTED_CAPABILITIES.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/85"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-3.5 shrink-0"
                      style={{ color: MODULE_ACCENT }}
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div data-m3-card className="space-y-3 lg:col-span-5">
              <p className="text-xs font-semibold text-muted-foreground">
                Accesos originales registrados (Anexo 5 · pág. 44)
              </p>
              <div className="space-y-2.5">
                {APP_EXTERNAL_LINKS.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between gap-4 rounded-xl bg-module-03/[0.07] px-4 py-3 transition-colors hover:bg-module-03/[0.13]"
                  >
                    <div>
                      <span className="block text-xs font-bold text-foreground">
                        {link.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {link.url.replace("https://", "")}
                      </span>
                    </div>
                    <ExternalLink
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: MODULE_ACCENT }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * 03.05 — CONTEXTO JURÍDICO LABORAL (INFOGRAFÍA COMPLEMENTARIA)
       * ================================================================ */}
      <section
        id="escena-juridico"
        data-m3-closing
        aria-labelledby="m3-s5-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-14">
          <ChapterHeader
            headingId="m3-s5-heading"
            titleBold="Contexto jurídico"
            titleItalic="laboral"
            lead={CASO_JURIDICO_DATA.subtitle}
            objective="Resguardar el análisis de vulneración contractual, exigencias sobrevinientes y tutela del derecho al trabajo documentado en la infografía."
          />

          <div className="grid grid-cols-1 items-start gap-10 rounded-2xl bg-accent-warm/[0.045] p-6 md:p-9 lg:grid-cols-12">
            {/* Izquierda: Vista previa real de la infografía */}
            <div data-m3-card className="space-y-3 lg:col-span-5">
              <button
                type="button"
                onClick={() => onPreview(infografiaDoc)}
                aria-label="Abrir Infografia Caso Juridico Laboral.pdf"
                className="group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-white p-2 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <img
                  src={NOMINA_VISUAL_ASSETS.infografia}
                  alt="Infografía original Caso Jurídico-Laboral: Vulneración contractual y retención de pago"
                  loading="lazy"
                  className="w-full rounded-md object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>

              <a
                href={CASO_JURIDICO_DATA.pitchUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground"
                style={{ color: LEGAL_ACCENT }}
              >
                <span>Enlace al pitch de exposición (registrado en la infografía)</span>
                <ExternalLink className="size-3.5" />
              </a>
            </div>

            {/* Derecha: Expediente jurídico fiel a la infografía (sin inventar sentencia) */}
            <div className="space-y-7 lg:col-span-7">
              {/* Causas y monto pretendido */}
              <div
                data-m3-card
                className="grid grid-cols-1 gap-4 border-b border-border/75 pb-6 sm:grid-cols-2"
              >
                <div className="space-y-2">
                  <p
                    className="inline-flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: LEGAL_ACCENT }}
                  >
                    <Scale className="size-3.5" />
                    Causas identificadas
                  </p>
                  {CASO_JURIDICO_DATA.cases.map((c) => (
                    <div key={c.number}>
                      <span className="block text-sm font-bold text-foreground">
                        {c.number}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {c.court}
                      </span>
                    </div>
                  ))}
                  <p className="pt-1 text-xs text-muted-foreground">
                    <strong className="text-foreground">Partes:</strong>{" "}
                    {CASO_JURIDICO_DATA.parties}
                  </p>
                </div>

                <div className="flex flex-col justify-center border-t border-border/60 pt-4 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {CASO_JURIDICO_DATA.claimedStatus}
                  </span>
                  <span
                    className="mt-1 text-3xl font-bold tracking-tight tabular-nums sm:text-4xl"
                    style={{ color: LEGAL_ACCENT }}
                  >
                    {CASO_JURIDICO_DATA.claimedAmount}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {CASO_JURIDICO_DATA.pendingClaims}
                  </p>
                </div>
              </div>

              {/* Hechos del caso */}
              <div data-m3-card className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {CASO_JURIDICO_DATA.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="space-y-1 border-l-2 border-accent-warm/45 pl-3.5"
                  >
                    <h3 className="text-xs font-bold text-foreground">
                      {fact.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {fact.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Derechos y sustento legal */}
              <div data-m3-card className="space-y-2.5">
                <p className="text-xs font-semibold text-muted-foreground">
                  Derechos vulnerados y fundamento legal
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {CASO_JURIDICO_DATA.rightsAndBasis.map((item) => (
                    <div
                      key={item.code}
                      className="rounded-lg bg-background/50 px-3.5 py-2.5"
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: LEGAL_ACCENT }}
                      >
                        {item.code}
                      </span>
                      <p className="mt-0.5 text-xs text-foreground/85">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regla de oro registrada en la infografía */}
              <blockquote
                data-m3-card
                className="editorial-aside serif-complete-italic leading-relaxed text-foreground/90"
                style={{ borderColor: LEGAL_ACCENT }}
              >
                <span className="not-italic font-semibold text-foreground">
                  Regla de oro contractual:{" "}
                </span>
                {CASO_JURIDICO_DATA.goldenRule}
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
       * 03.06 — EXPEDIENTE DOCUMENTAL (4 PDF ORIGINALES EN CARDS VISUALES)
       * ================================================================ */}
      <section
        id="documentos-nomina"
        data-m3-closing
        aria-labelledby="m3-docs-heading"
        className="border-t border-border/70 py-20 md:py-28"
      >
        <div className="space-y-12">
          <div className="space-y-4">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2
                id="m3-docs-heading"
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
                4 archivos originales · APE 03 definitivo, avance preliminar y 2
                trabajos complementarios
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {NOMINA_DOCUMENTS.map((doc) => (
              <article
                key={doc.id}
                data-m3-card
                className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
                  doc.isIntegrator
                    ? "border-module-03/55 bg-surface/85 hover:border-module-03"
                    : doc.isPreliminary
                      ? "border-dashed border-border-strong bg-surface/45 hover:border-module-03/50"
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

                  <div className="flex items-center justify-between gap-2 border-t border-border/70 pt-3.5 text-xs">
                    <button
                      type="button"
                      onClick={() => onPreview(doc)}
                      className="inline-flex cursor-pointer items-center gap-1.5 font-semibold transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      style={{ color: MODULE_ACCENT }}
                    >
                      <Eye className="size-3.5" />
                      <span>Ver PDF</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`Abrir ${doc.fileName} en nueva pestaña`}
                        className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>Pestaña</span>
                      </a>
                      <a
                        href={doc.url}
                        download={doc.fileName}
                        className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Download className="size-3.5" />
                        <span>Descargar</span>
                      </a>
                    </div>
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
