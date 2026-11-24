import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  FileText,
  Landmark,
  Layers,
  Scale,
  Users,
} from "lucide-react";

import {
  getAdjacentModules,
  getModuleBySlug,
  type ModuleDefinition,
} from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import {
  animateEditorialReveal,
  animateRuleDraw,
  useGSAP,
  withMotionMedia,
} from "@/lib/motion";

const MODULE_ICONS: Record<ModuleDefinition["iconName"], typeof Compass> = {
  compass: Compass,
  landmark: Landmark,
  users: Users,
  scale: Scale,
};

interface ModulePreviewPageProps {
  slug: ModuleDefinition["slug"];
}

/**
 * Vista editorial de transición para los módulos aún no desarrollados (Etapas 5 a 7).
 */
export function ModulePreviewPage({ slug }: ModulePreviewPageProps) {
  const mod = getModuleBySlug(slug);
  const { previous, next } = getAdjacentModules(mod.id);
  const Icon = MODULE_ICONS[mod.iconName];
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withMotionMedia(scopeRef.current, () => {
        animateEditorialReveal("[data-preview-reveal]", { stagger: 0.07 });
        animateRuleDraw("[data-preview-rule]", { delay: 0.14 });
      }),
    { scope: scopeRef, dependencies: [slug] }
  );

  return (
    <div ref={scopeRef} className="editorial-container flex flex-1 flex-col py-12 md:py-20">
      <div
        data-preview-reveal
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-xs font-medium tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Volver al inicio</span>
        </Link>

        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          {mod.unit} · {mod.periodLabel}
        </span>
      </div>

      <div data-preview-rule className="editorial-rule mt-6" />

      <section className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-12 lg:items-end lg:py-16">
        <div className="space-y-6 lg:col-span-8">
          <div data-preview-reveal className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase"
              style={{ color: mod.accentVar }}
            >
              <Icon className="size-3.5" />
              Módulo {mod.id} · {mod.unit}
            </span>
            <span aria-hidden="true" className="text-border-strong">
              /
            </span>
            <span className="type-overline">{mod.partial}</span>
          </div>

          <h1 data-preview-reveal className="type-hero">
            {mod.titleComposition.before && (
              <span>{mod.titleComposition.before}</span>
            )}
            <EditorialSerif
              optical="display"
              className="font-normal"
              style={{ color: mod.accentVar }}
            >
              {mod.titleComposition.serifItalic}
            </EditorialSerif>
            {mod.titleComposition.after && (
              <span>{mod.titleComposition.after}</span>
            )}
          </h1>

          <p
            data-preview-reveal
            className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {mod.shortDescription}
          </p>
        </div>

        <div
          data-preview-reveal
          className="flex items-end justify-start lg:col-span-4 lg:justify-end"
        >
          <span
            aria-hidden="true"
            className="type-editorial-numeral text-[6.5rem] leading-none opacity-85 md:text-[8.5rem]"
            style={{ color: mod.accentVar }}
          >
            {mod.id}
          </span>
        </div>
      </section>

      <div data-preview-rule className="editorial-rule" />

      <section className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-12">
        <div data-preview-reveal className="space-y-4 lg:col-span-5">
          <p className="type-overline">Estado de implementación</p>
          <div className="flex items-start gap-3">
            <Layers
              className="mt-1 size-4 shrink-0"
              style={{ color: mod.accentVar }}
            />
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Estructura y ruta listas · Contenido documental programado para{" "}
                {mod.developmentStage}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {mod.scopeSummary} La consulta documental completa y la
                integración de{" "}
                <span className="font-mono text-xs text-foreground">
                  {mod.apeReference}
                </span>{" "}
                se desarrollarán en la {mod.developmentStage}.
              </p>
            </div>
          </div>
        </div>

        <div
          data-preview-reveal
          className="divide-y divide-border border-t border-border lg:col-span-7 lg:border-t-0"
        >
          <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr]">
            <span className="type-overline">Unidad académica</span>
            <span className="text-sm text-foreground">
              {mod.unit} ({mod.partial})
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr]">
            <span className="type-overline">Caso / proyecto</span>
            <span className="text-sm text-foreground">{mod.projectCase}</span>
          </div>

          <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[12rem_1fr]">
            <span className="type-overline">Inventario asignado</span>
            <span className="inline-flex flex-wrap items-center gap-2 text-sm text-foreground">
              <FileText
                className="size-3.5"
                style={{ color: mod.accentVar }}
              />
              <span>
                {mod.totalDeliverables} documentos ({mod.apeCount} guía APE:{" "}
                <code className="text-xs text-muted-foreground">
                  {mod.apeReference}
                </code>{" "}
                + {mod.workCount} trabajos y evidencias)
              </span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[12rem_1fr]">
            <span className="type-overline">Ejes temáticos</span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {mod.keyTopics.join("  ·  ")}
            </p>
          </div>
        </div>
      </section>

      <nav
        aria-label="Navegación entre módulos"
        className="mt-auto grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-2"
      >
        <div>
          {previous ? (
            <Link
              to={previous.path}
              className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                Módulo anterior
              </span>
              <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                <span
                  className="type-editorial-numeral text-xl"
                  style={{ color: previous.accentVar }}
                >
                  {previous.id}
                </span>
                <span>{previous.fullName}</span>
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                Inicio
              </span>
              <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                KhipuTech
              </span>
            </Link>
          )}
        </div>

        <div className="sm:text-right">
          {next ? (
            <Link
              to={next.path}
              className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end"
            >
              <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
                Siguiente módulo
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="flex items-baseline gap-2.5 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                <span
                  className="type-editorial-numeral text-xl"
                  style={{ color: next.accentVar }}
                >
                  {next.id}
                </span>
                <span>{next.fullName}</span>
              </span>
            </Link>
          ) : (
            <Link
              to="/"
              className="group inline-flex flex-col gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:items-end"
            >
              <span className="inline-flex items-center gap-1.5 text-xs tracking-widest text-muted-foreground uppercase">
                Cierre del recorrido
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                Regresar al inicio
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
