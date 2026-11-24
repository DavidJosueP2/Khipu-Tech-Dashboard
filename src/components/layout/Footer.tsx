import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { BRAND, INSTITUTION, MODULES } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";

/**
 * Pie editorial de KhipuTech Rotación con créditos académicos del equipo.
 */
export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-background/70 backdrop-blur-xs">
      <div className="editorial-container py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          {/* Marca principal */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-baseline text-3xl tracking-tight">
              <span className="font-bold text-foreground">Khipu</span>
              <EditorialSerif
                optical="display"
                className="font-normal text-primary"
              >
                Tech
              </EditorialSerif>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {BRAND.shortDescription}
            </p>
            <div className="pt-1 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">
                {INSTITUTION.course} · {INSTITUTION.cycle}
              </p>
              <p className="mt-0.5">
                {INSTITUTION.university} · {INSTITUTION.shortFaculty} ·{" "}
                {INSTITUTION.program} ({INSTITUTION.level})
              </p>
            </div>
          </div>

          {/* Módulos */}
          <div className="space-y-3 md:col-span-4">
            <h2 className="type-overline">Módulos de gestión</h2>
            <ul className="divide-y divide-border/70 border-t border-border/70">
              {MODULES.map((mod) => (
                <li key={mod.id}>
                  <Link
                    to={mod.path}
                    className="group flex items-center justify-between py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="flex items-baseline gap-2.5">
                      <span
                        className="type-editorial-numeral text-base"
                        style={{ color: mod.accentVar }}
                      >
                        {mod.id}
                      </span>
                      <span>{mod.fullName}</span>
                    </span>
                    <ArrowUpRight className="size-3.5 opacity-45 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipo */}
          <div className="space-y-3 md:col-span-3">
            <h2 className="type-overline">Equipo desarrollador</h2>
            <ul className="space-y-1.5 border-t border-border/70 pt-3 text-sm text-muted-foreground">
              {INSTITUTION.team.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {BRAND.product} · Plataforma documental integrada sin alteración de
            archivos originales
          </span>
          <span>Docente: {INSTITUTION.professor}</span>
        </div>
      </div>
    </footer>
  );
}
