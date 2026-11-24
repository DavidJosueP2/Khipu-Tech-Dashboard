import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { useAtlas } from "@/context/atlas-context";
import { MODULES, type ModuleDefinition, type ModuleId } from "@/data/platform";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import {
  animateSvgPathDraw,
  gsap,
  useGSAP,
  withResponsiveMotion,
} from "@/lib/motion";

interface NodeLayout {
  id: ModuleId;
  /** Coordenadas SVG en viewBox 0..460 */
  x: number;
  y: number;
  /** Porcentaje para superponer botones accesibles */
  leftPct: string;
  topPct: string;
  align: "left" | "right";
}

const NODE_POSITIONS: Record<ModuleId, NodeLayout> = {
  "01": { id: "01", x: 118, y: 112, leftPct: "25.6%", topPct: "24.3%", align: "left" },
  "02": { id: "02", x: 356, y: 124, leftPct: "77.4%", topPct: "27.0%", align: "right" },
  "03": { id: "03", x: 344, y: 348, leftPct: "74.8%", topPct: "75.6%", align: "right" },
  "04": { id: "04", x: 108, y: 336, leftPct: "23.5%", topPct: "73.0%", align: "left" },
};

/**
 * Elemento gráfico central del Hero: constelación cartográfica interactiva
 * que conecta los cuatro módulos alrededor del eje común del semestre.
 */
export function AtlasConstellation() {
  const navigate = useNavigate();
  const { setActiveHighlight } = useAtlas();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedId, setFocusedId] = useState<ModuleId | null>(null);

  const activeModule: ModuleDefinition | null = focusedId
    ? MODULES.find((m) => m.id === focusedId) ?? null
    : null;

  useGSAP(
    () =>
      withResponsiveMotion(containerRef.current, ({ motionAllowed, isDesktop }) => {
        if (!motionAllowed) return;

        const paths = gsap.utils.toArray<SVGGeometryElement>(
          "[data-constellation-path]"
        );
        paths.forEach((path, idx) => {
          animateSvgPathDraw(path, {
            delay: 0.2 + idx * 0.08,
            duration: 0.95,
          });
        });

        gsap.fromTo(
          "[data-constellation-node]",
          { scale: 0.86, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.35,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );

        // Rotación orbital imperceptible del anillo graduado exterior
        gsap.to("[data-constellation-ring='outer']", {
          rotation: 360,
          transformOrigin: "230px 230px",
          duration: 110,
          repeat: -1,
          ease: "none",
        });

        if (isDesktop) {
          gsap.to(containerRef.current, {
            y: -26,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 20%",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      }),
    { scope: containerRef }
  );

  const handleActivate = (id: ModuleId) => {
    setFocusedId(id);
    setActiveHighlight(id);
  };

  const handleReset = () => {
    setFocusedId(null);
    setActiveHighlight("home");
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[26.5rem]"
      onMouseLeave={handleReset}
    >
      {/* Diagrama cartográfico SVG */}
      <svg
        viewBox="0 0 460 460"
        className="h-full w-full overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        {/* Anillos meridianos graduados */}
        <g data-constellation-ring="outer">
          <circle
            cx="230"
            cy="230"
            r="204"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="2 7"
            strokeOpacity="0.7"
          />
          {/* Marcas cardinales */}
          <line x1="230" y1="18" x2="230" y2="30" stroke="var(--primary)" strokeWidth="1.2" />
          <line x1="230" y1="430" x2="230" y2="442" stroke="var(--primary)" strokeWidth="1.2" />
          <line x1="18" y1="230" x2="30" y2="230" stroke="var(--primary)" strokeWidth="1.2" />
          <line x1="430" y1="230" x2="442" y2="230" stroke="var(--primary)" strokeWidth="1.2" />
        </g>

        <circle
          cx="230"
          cy="230"
          r="158"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <circle
          cx="230"
          cy="230"
          r="92"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* Ejes cartesianos finos */}
        <line
          x1="48"
          y1="230"
          x2="412"
          y2="230"
          stroke="var(--border)"
          strokeWidth="0.75"
          strokeOpacity="0.65"
        />
        <line
          x1="230"
          y1="48"
          x2="230"
          y2="412"
          stroke="var(--border)"
          strokeWidth="0.75"
          strokeOpacity="0.65"
        />

        {/* Trayectorias curvas que conectan los 4 módulos en secuencia */}
        <path
          data-constellation-path
          d="M 118 112 Q 230 62 356 124"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity={focusedId === "01" || focusedId === "02" ? 0.95 : 0.42}
          style={{ transition: "stroke-opacity 0.35s ease" }}
        />
        <path
          data-constellation-path
          d="M 356 124 Q 402 236 344 348"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity={focusedId === "02" || focusedId === "03" ? 0.95 : 0.42}
          style={{ transition: "stroke-opacity 0.35s ease" }}
        />
        <path
          data-constellation-path
          d="M 344 348 Q 226 398 108 336"
          stroke="var(--primary)"
          strokeWidth="1.2"
          strokeOpacity={focusedId === "03" || focusedId === "04" ? 0.95 : 0.42}
          style={{ transition: "stroke-opacity 0.35s ease" }}
        />
        <path
          data-constellation-path
          d="M 108 336 Q 62 224 118 112"
          stroke="var(--border-strong)"
          strokeWidth="1"
          strokeDasharray="3 5"
          strokeOpacity="0.65"
        />

        {/* Radios de conexión al centro común */}
        {MODULES.map((mod) => {
          const pos = NODE_POSITIONS[mod.id];
          const isFocused = focusedId === mod.id;
          return (
            <line
              key={mod.id}
              data-constellation-path
              x1="230"
              y1="230"
              x2={pos.x}
              y2={pos.y}
              stroke={isFocused ? mod.accentVar : "var(--border-strong)"}
              strokeWidth={isFocused ? "1.6" : "0.9"}
              strokeOpacity={isFocused ? 0.95 : 0.45}
              style={{ transition: "stroke 0.35s ease, stroke-opacity 0.35s ease" }}
            />
          );
        })}

        {/* Halo visual en el nodo enfocado */}
        {MODULES.map((mod) => {
          const pos = NODE_POSITIONS[mod.id];
          const isFocused = focusedId === mod.id;
          return (
            <g key={`ring-${mod.id}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isFocused ? 30 : 21}
                stroke={mod.accentVar}
                strokeWidth="1"
                strokeOpacity={isFocused ? 0.85 : 0.25}
                style={{ transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Núcleo central informativo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex max-w-[11.5rem] flex-col items-center text-center">
          {activeModule ? (
            <>
              <span
                className="type-overline text-[0.625rem] transition-colors"
                style={{ color: activeModule.accentVar }}
              >
                {activeModule.unit} · {activeModule.partial}
              </span>
              <span className="mt-1 text-sm font-semibold text-foreground">
                {activeModule.fullName}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {activeModule.totalDeliverables} entregables · {activeModule.apeReference}
              </span>
            </>
          ) : (
            <>
              <span className="type-overline text-[0.625rem] text-primary">
                Atlas Semestral
              </span>
              <EditorialSerif
                optical="display"
                className="mt-0.5 text-[1.75rem] leading-tight text-foreground"
              >
                cuatro nodos
              </EditorialSerif>
              <span className="mt-1 text-[0.72rem] leading-snug text-muted-foreground">
                Seleccione un nodo para acceder al módulo
              </span>
            </>
          )}
        </div>
      </div>

      {/* Cuatro nodos interactivos accesibles */}
      {MODULES.map((mod) => {
        const pos = NODE_POSITIONS[mod.id];
        const isFocused = focusedId === mod.id;
        return (
          <button
            key={mod.id}
            type="button"
            data-constellation-node
            onMouseEnter={() => handleActivate(mod.id)}
            onFocus={() => handleActivate(mod.id)}
            onBlur={handleReset}
            onClick={() => navigate(mod.path)}
            aria-label={`Ir al Módulo ${mod.id}: ${mod.fullName} (${mod.unit})`}
            style={{
              left: pos.leftPct,
              top: pos.topPct,
              borderColor: isFocused ? mod.accentVar : "var(--border-strong)",
            }}
            className="group absolute flex size-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-background/90 backdrop-blur-xs transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span
              className="type-editorial-numeral text-lg transition-colors"
              style={{ color: isFocused ? mod.accentVar : "var(--foreground)" }}
            >
              {mod.id}
            </span>

            {/* Etiqueta flotante limpia en escritorio */}
            <span
              className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-xs font-medium transition-opacity duration-300 sm:flex sm:items-center sm:gap-1 ${
                pos.align === "left" ? "right-[calc(100%+0.75rem)]" : "left-[calc(100%+0.75rem)]"
              } ${isFocused ? "opacity-100 text-foreground" : "opacity-75 text-muted-foreground"}`}
            >
              <span>{mod.navLabel}</span>
              <ArrowUpRight
                className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: mod.accentVar }}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
