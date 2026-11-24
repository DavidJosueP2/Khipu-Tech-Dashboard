import { ROTATION_CYCLE } from "@/data/emprendimiento";

/**
 * Composición visual editorial vinculada al funcionamiento real de KhipuTech Rotación:
 * flujo secuencial de cuatro hitos (registro por lotes -> monitoreo -> alerta -> acción)
 * sin recurrir a tarjetas pesadas ni elementos decorativos genéricos.
 */
export function RotationFlowVisual() {
  return (
    <div className="space-y-4 border-l border-border/90 pl-6">
      <p className="type-overline text-primary">Flujo operativo del producto</p>

      <ol className="space-y-4">
        {ROTATION_CYCLE.map((item) => (
          <li key={item.step} className="relative space-y-0.5">
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[1.72rem] size-2 rounded-full border border-primary bg-background"
            />
            <div className="flex items-baseline gap-2.5">
              <span className="type-editorial-numeral text-lg text-primary">
                {item.step}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {item.title}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {item.detail}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
