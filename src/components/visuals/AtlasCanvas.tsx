import { useRef } from "react";

import { useAtlas } from "@/context/atlas-context";
import type { AtlasHighlight, ModuleId } from "@/data/platform";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

const HIGHLIGHT_LIGHTING: Record<
  AtlasHighlight,
  { color: string; x: string; y: string; secondaryX: string; secondaryY: string }
> = {
  home: {
    color: "var(--primary)",
    x: "76%",
    y: "24%",
    secondaryX: "18%",
    secondaryY: "78%",
  },
  modules: {
    color: "var(--primary)",
    x: "26%",
    y: "42%",
    secondaryX: "82%",
    secondaryY: "64%",
  },
  semester: {
    color: "var(--accent-warm)",
    x: "68%",
    y: "62%",
    secondaryX: "22%",
    secondaryY: "30%",
  },
  "01": {
    color: "var(--module-01)",
    x: "72%",
    y: "28%",
    secondaryX: "20%",
    secondaryY: "72%",
  },
  "02": {
    color: "var(--module-02)",
    x: "70%",
    y: "44%",
    secondaryX: "26%",
    secondaryY: "24%",
  },
  "03": {
    color: "var(--module-03)",
    x: "66%",
    y: "50%",
    secondaryX: "24%",
    secondaryY: "76%",
  },
  "04": {
    color: "var(--module-04)",
    x: "74%",
    y: "56%",
    secondaryX: "20%",
    secondaryY: "34%",
  },
};

const BG_NODES: ReadonlyArray<{
  id: ModuleId;
  cx: number;
  cy: number;
  accent: string;
}> = [
  { id: "01", cx: 215, cy: 235, accent: "var(--module-01)" },
  { id: "02", cx: 565, cy: 415, accent: "var(--module-02)" },
  { id: "03", cx: 935, cy: 305, accent: "var(--module-03)" },
  { id: "04", cx: 1245, cy: 595, accent: "var(--module-04)" },
];

const FAR_CONTOURS = [
  "M -80 120 C 180 65, 340 240, 620 175 C 880 115, 1080 10, 1520 95",
  "M -80 165 C 195 110, 360 285, 645 215 C 905 150, 1110 55, 1520 140",
  "M -80 212 C 215 158, 385 335, 675 260 C 930 192, 1135 102, 1520 190",
  "M -80 264 C 235 208, 415 390, 705 310 C 960 240, 1165 155, 1520 245",
  "M -80 320 C 260 265, 445 450, 740 365 C 990 295, 1195 210, 1520 305",
  "M -80 382 C 285 330, 480 515, 775 425 C 1025 352, 1225 272, 1520 370",
  "M -80 450 C 310 398, 520 580, 815 492 C 1060 415, 1255 340, 1520 442",
  "M -80 524 C 340 474, 560 648, 855 562 C 1095 486, 1285 415, 1520 520",
  "M -80 606 C 370 558, 600 722, 895 638 C 1135 564, 1315 496, 1520 605",
];

const NEAR_CONTOURS = [
  "M -60 760 C 190 675, 420 545, 710 615 C 980 680, 1185 495, 1510 420",
  "M -60 808 C 210 725, 445 595, 735 662 C 1005 726, 1215 545, 1510 475",
  "M -60 858 C 235 776, 470 646, 765 712 C 1030 775, 1245 598, 1510 532",
  "M 110 940 C 350 845, 580 715, 865 782 C 1110 840, 1300 680, 1520 615",
  "M 280 960 C 495 882, 715 778, 975 836 C 1185 882, 1355 752, 1520 702",
  "M 520 -40 C 690 85, 845 145, 1040 120 C 1220 96, 1355 215, 1520 335",
  "M 620 -40 C 785 72, 925 122, 1110 92 C 1275 64, 1395 168, 1520 278",
];

/**
 * Lienzo cartográfico dinámico del Atlas Académico.
 * Combina curvas topográficas SVG en capas con parallax suave al scroll,
 * cuatro nodos conectados y cambios de iluminación ambiental según sección/módulo activo.
 */
export function AtlasCanvas() {
  const { activeHighlight } = useAtlas();
  const rootRef = useRef<HTMLDivElement>(null);
  const glowPrimaryRef = useRef<HTMLDivElement>(null);
  const glowSecondaryRef = useRef<HTMLDivElement>(null);

  // Parallax de profundidad y deriva orgánica muy lenta de puntos luminosos
  useGSAP(
    () =>
      withResponsiveMotion(rootRef.current, ({ isDesktop, motionAllowed }) => {
        if (!motionAllowed) return;

        // Deriva ambiental extremadamente sutil de 3 puntos luminosos
        gsap.to("[data-atlas-waypoint='1']", {
          x: 24,
          y: -14,
          opacity: 0.72,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-atlas-waypoint='2']", {
          x: -20,
          y: 18,
          opacity: 0.65,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-atlas-waypoint='3']", {
          x: 16,
          y: 22,
          opacity: 0.6,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Parallax multicapa solo en escritorio para rendimiento fluido en móvil
        if (isDesktop) {
          gsap.to("[data-atlas-layer='far']", {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
            },
          });

          gsap.to("[data-atlas-layer='near']", {
            yPercent: -13,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
            },
          });

          gsap.to("[data-atlas-layer='nodes']", {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          });
        }
      }),
    { scope: rootRef }
  );

  // Transición suave de iluminación ambiental al cambiar de sección o módulo
  useGSAP(
    () => {
      const cfg = HIGHLIGHT_LIGHTING[activeHighlight];
      if (!glowPrimaryRef.current || !glowSecondaryRef.current) return;

      gsap.to(glowPrimaryRef.current, {
        left: cfg.x,
        top: cfg.y,
        duration: 1.05,
        ease: "power2.out",
      });

      gsap.to(glowSecondaryRef.current, {
        left: cfg.secondaryX,
        top: cfg.secondaryY,
        duration: 1.25,
        ease: "power2.out",
      });
    },
    { scope: rootRef, dependencies: [activeHighlight] }
  );

  const activeConfig = HIGHLIGHT_LIGHTING[activeHighlight];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Capa 1: Iluminación ambiental controlada (sin aurora ni neón excesivo) */}
      <div
        ref={glowPrimaryRef}
        className="absolute h-[56vmax] w-[56vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-colors duration-700"
        style={{
          left: activeConfig.x,
          top: activeConfig.y,
          background: `radial-gradient(circle, ${activeConfig.color} 0%, transparent 66%)`,
          opacity: "var(--atlas-glow-opacity)",
        }}
      />
      <div
        ref={glowSecondaryRef}
        className="absolute h-[44vmax] w-[44vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-colors duration-700"
        style={{
          left: activeConfig.secondaryX,
          top: activeConfig.secondaryY,
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: "calc(var(--atlas-glow-opacity) * 0.52)",
        }}
      />

      {/* Capa 2: Retícula cartográfica arquitectónica muy sutil */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="atlas-fade-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="48%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="atlas-ridge" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Meridianos y paralelos discretos */}
        <g stroke="var(--atlas-grid)" strokeWidth="1">
          <line x1="240" y1="0" x2="240" y2="900" />
          <line x1="720" y1="0" x2="720" y2="900" />
          <line x1="1200" y1="0" x2="1200" y2="900" />
          <line x1="0" y1="225" x2="1440" y2="225" />
          <line x1="0" y1="540" x2="1440" y2="540" />
        </g>

        {/* Capa lejana de curvas topográficas */}
        <g
          data-atlas-layer="far"
          style={{ color: "var(--atlas-line-soft)" }}
          stroke="url(#atlas-fade-h)"
          strokeWidth="1"
        >
          {FAR_CONTOURS.map((d, i) => (
            <path
              key={i}
              d={d}
              strokeOpacity={0.55 + (i % 3) * 0.16}
            />
          ))}
        </g>

        {/* Capa cercana de curvas topográficas */}
        <g
          data-atlas-layer="near"
          style={{ color: "var(--atlas-line)" }}
          stroke="url(#atlas-ridge)"
          strokeWidth="1.05"
        >
          {NEAR_CONTOURS.map((d, i) => (
            <path
              key={i}
              d={d}
              strokeOpacity={0.45 + (i % 4) * 0.14}
            />
          ))}
        </g>

        {/* Capa 3: Red de cuatro nodos del Atlas conectados por una trayectoria */}
        <g data-atlas-layer="nodes">
          <path
            d="M 215 235 C 345 340, 440 435, 565 415 C 710 392, 795 290, 935 305 C 1070 320, 1145 485, 1245 595"
            stroke="var(--atlas-line)"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.65"
          />

          {BG_NODES.map((node) => {
            const isHighlighted = activeHighlight === node.id;
            return (
              <g key={node.id}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isHighlighted ? 26 : 14}
                  stroke={node.accent}
                  strokeWidth="1"
                  strokeOpacity={isHighlighted ? 0.55 : 0.22}
                  style={{ transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isHighlighted ? 4 : 2.5}
                  fill={node.accent}
                  fillOpacity={isHighlighted ? 0.9 : 0.45}
                  style={{ transition: "all 0.5s ease" }}
                />
              </g>
            );
          })}

          {/* Puntos luminosos mínimos con deriva lenta */}
          <g data-atlas-waypoint="1" opacity="0.4">
            <circle cx="395" cy="195" r="7" fill="var(--primary)" fillOpacity="0.16" />
            <circle cx="395" cy="195" r="1.8" fill="var(--primary)" />
          </g>
          <g data-atlas-waypoint="2" opacity="0.38">
            <circle cx="775" cy="540" r="8" fill="var(--accent-warm)" fillOpacity="0.14" />
            <circle cx="775" cy="540" r="1.8" fill="var(--accent-warm)" />
          </g>
          <g data-atlas-waypoint="3" opacity="0.35">
            <circle cx="1110" cy="215" r="6" fill="var(--module-03)" fillOpacity="0.16" />
            <circle cx="1110" cy="215" r="1.6" fill="var(--module-03)" />
          </g>
        </g>
      </svg>

      {/* Viñeta muy sutil en bordes superior/inferior para máxima legibilidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 40%, transparent 48%, var(--background) 100%)",
          opacity: 0.72,
        }}
      />
    </div>
  );
}
