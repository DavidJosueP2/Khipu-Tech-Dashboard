import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";

import type { ModuleId } from "@/data/platform";
import { prefersReducedMotion } from "@/lib/motion";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { LivingTerrain } from "@/components/visuals/LivingTerrain";

interface ModuleCoverProps {
  module: ModuleId;
  title: string;
  emphasis: string;
  description: ReactNode;
  target: string;
  action?: string;
  children?: ReactNode;
}

export function ModuleCover({
  module,
  title,
  emphasis,
  description,
  target,
  action = "Explorar módulo",
  children,
}: ModuleCoverProps) {
  const headingId = "portada-modulo-" + module;

  return (
    <section className="atlas-cover" aria-labelledby={headingId}>
      <LivingTerrain variant={module} />
      <div className="editorial-container">
        <div className="atlas-cover__copy">
          <h1 id={headingId} className="type-cover">
            {title}{" "}
            <EditorialSerif className="atlas-cover__emphasis">{emphasis}</EditorialSerif>
          </h1>
          <p className="editorial-lead">{description}</p>
          <div className="atlas-cover__actions">
            <button
              type="button"
              className="editorial-action cursor-pointer"
              onClick={() => document.getElementById(target)?.scrollIntoView({
                behavior: prefersReducedMotion() ? "instant" : "smooth",
                block: "start",
              })}
            >
              {action}
              <ArrowDown className="size-4" aria-hidden="true" />
            </button>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
