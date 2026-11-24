import { useRef } from "react";

import { useAtlas } from "@/context/atlas-context";
import type { AtlasHighlight } from "@/data/platform";
import { gsap, useGSAP, withResponsiveMotion } from "@/lib/motion";

const AMBIENT_STATES: Record<
  AtlasHighlight,
  { accent: string; orb1X: string; orb1Y: string; orb2X: string; orb2Y: string }
> = {
  home: {
    accent: "var(--primary)",
    orb1X: "68%",
    orb1Y: "24%",
    orb2X: "22%",
    orb2Y: "76%",
  },
  modules: {
    accent: "var(--primary)",
    orb1X: "26%",
    orb1Y: "36%",
    orb2X: "78%",
    orb2Y: "68%",
  },
  semester: {
    accent: "var(--accent-warm)",
    orb1X: "72%",
    orb1Y: "58%",
    orb2X: "20%",
    orb2Y: "30%",
  },
  "01": {
    accent: "var(--module-01)",
    orb1X: "70%",
    orb1Y: "26%",
    orb2X: "18%",
    orb2Y: "72%",
  },
  "02": {
    accent: "var(--module-02)",
    orb1X: "68%",
    orb1Y: "42%",
    orb2X: "24%",
    orb2Y: "26%",
  },
  "03": {
    accent: "var(--module-03)",
    orb1X: "66%",
    orb1Y: "48%",
    orb2X: "24%",
    orb2Y: "74%",
  },
  "04": {
    accent: "var(--module-04)",
    orb1X: "72%",
    orb1Y: "54%",
    orb2X: "22%",
    orb2Y: "32%",
  },
};

/**
 * Fondo atmosférico corporativo de KhipuTech Rotación.
 *
 * Combina cuatro capas ligeras inspiradas en la naturaleza real del producto:
 *   1. Profundidad volumétrica difusa (azul medianoche + iluminación aguamarina).
 *   2. Anillos rotacionales translúcidos que evocan la circulación continua de lotes.
 *   3. Filamentos verticales discretos con nodos de registro (referencia al Khipu).
 *   4. Textura granular muy fina (SVG feTurbulence local) y cinco partículas suaves.
 */
export function AmbientBackdrop() {
  const { activeHighlight } = useAtlas();
  const rootRef = useRef<HTMLDivElement>(null);
  const orbPrimaryRef = useRef<HTMLDivElement>(null);
  const orbSecondaryRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      withResponsiveMotion(rootRef.current, ({ motionAllowed, isDesktop }) => {
        if (!motionAllowed) return;

        // Respiración atmosférica muy lenta de las capas volumétricas
        gsap.to("[data-ambient-breathe='1']", {
          scale: 1.09,
          xPercent: 4,
          yPercent: -3,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to("[data-ambient-breathe='2']", {
          scale: 1.07,
          xPercent: -4,
          yPercent: 4,
          duration: 23,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Rotación ambiental lenta de los arcos de circulación de productos
        gsap.to("[data-rotation-ring='outer']", {
          rotation: 360,
          transformOrigin: "center center",
          duration: 92,
          repeat: -1,
          ease: "none",
        });

        gsap.to("[data-rotation-ring='inner']", {
          rotation: -360,
          transformOrigin: "center center",
          duration: 68,
          repeat: -1,
          ease: "none",
        });

        // Deriva discreta de partículas de profundidad
        const dust = gsap.utils.toArray<HTMLElement>("[data-ambient-dust]");
        dust.forEach((dot, idx) => {
          gsap.to(dot, {
            y: idx % 2 === 0 ? -18 : 16,
            x: idx % 3 === 0 ? 12 : -10,
            opacity: 0.55,
            duration: 11 + idx * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        // Parallax suave vinculado al scroll en escritorio
        if (isDesktop) {
          gsap.to("[data-backdrop-parallax='rings']", {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
            },
          });

          gsap.to("[data-backdrop-parallax='threads']", {
            yPercent: -5,
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

  // Desplazamiento suave de la iluminación ambiental según sección o módulo activo
  useGSAP(
    () => {
      const cfg = AMBIENT_STATES[activeHighlight];
      if (!orbPrimaryRef.current || !orbSecondaryRef.current) return;

      gsap.to(orbPrimaryRef.current, {
        left: cfg.orb1X,
        top: cfg.orb1Y,
        duration: 1.1,
        ease: "power2.out",
      });

      gsap.to(orbSecondaryRef.current, {
        left: cfg.orb2X,
        top: cfg.orb2Y,
        duration: 1.3,
        ease: "power2.out",
      });
    },
    { scope: rootRef, dependencies: [activeHighlight] }
  );

  const current = AMBIENT_STATES[activeHighlight];

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Capa 1: Gradiente de base arquitectónico */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 80% at 50% -10%, var(--backdrop-depth-a) 0%, transparent 62%), radial-gradient(ellipse 90% 70% at 85% 105%, var(--backdrop-depth-b) 0%, transparent 58%)",
          opacity: 0.65,
        }}
      />

      {/* Capa 2: Volúmenes luminosos orgánicos con deriva ambiental */}
      <div
        ref={orbPrimaryRef}
        data-ambient-breathe="1"
        className="absolute h-[58vmax] w-[58vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-colors duration-700"
        style={{
          left: current.orb1X,
          top: current.orb1Y,
          background: `radial-gradient(circle, ${current.accent} 0%, var(--backdrop-depth-b) 38%, transparent 72%)`,
          opacity: "var(--backdrop-glow-opacity)",
        }}
      />

      <div
        ref={orbSecondaryRef}
        data-ambient-breathe="2"
        className="absolute h-[50vmax] w-[50vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{
          left: current.orb2X,
          top: current.orb2Y,
          background:
            "radial-gradient(circle, var(--backdrop-depth-a) 0%, var(--primary) 30%, transparent 72%)",
          opacity: "calc(var(--backdrop-glow-opacity) * 0.62)",
        }}
      />

      {/* Capa 3: Composición abstracta de KhipuTech Rotación (anillos de flujo + hilos Khipu) */}
      <div
        data-backdrop-parallax="rings"
        className="absolute top-1/2 left-1/2 h-[88vmax] w-[88vmax] -translate-x-1/2 -translate-y-1/2 opacity-85"
      >
        <svg
          viewBox="0 0 900 900"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="khipu-arc-a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={current.accent} stopOpacity="0.48" />
              <stop offset="50%" stopColor={current.accent} stopOpacity="0.06" />
              <stop offset="100%" stopColor={current.accent} stopOpacity="0.32" />
            </linearGradient>
            <linearGradient id="khipu-arc-b" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
              <stop offset="65%" stopColor="var(--primary)" stopOpacity="0.02" />
              <stop offset="100%" stopColor="var(--accent-warm)" stopOpacity="0.24" />
            </linearGradient>
          </defs>

          {/* Halo difuso de rotación de lotes */}
          <g data-rotation-ring="outer">
            <circle
              cx="450"
              cy="450"
              r="360"
              stroke="url(#khipu-arc-a)"
              strokeWidth="1.2"
              strokeDasharray="190 70 95 140"
            />
            <circle
              cx="450"
              cy="450"
              r="312"
              stroke="var(--backdrop-ring)"
              strokeWidth="0.9"
              strokeDasharray="4 14"
            />
            {/* Nodos discretos de flujo rotacional */}
            <circle cx="810" cy="450" r="3" fill={current.accent} fillOpacity="0.55" />
            <circle cx="195" cy="195" r="2.2" fill="var(--primary)" fillOpacity="0.4" />
          </g>

          <g data-rotation-ring="inner">
            <circle
              cx="450"
              cy="450"
              r="242"
              stroke="url(#khipu-arc-b)"
              strokeWidth="1.15"
              strokeDasharray="140 90 60 120"
            />
            <circle cx="450" cy="208" r="2.4" fill="var(--primary)" fillOpacity="0.48" />
            <circle cx="660" cy="570" r="2" fill="var(--accent-warm)" fillOpacity="0.42" />
          </g>
        </svg>
      </div>

      {/* Capa 4: Filamentos verticales discretos con nudos de registro (guiño al Khipu) */}
      <svg
        data-backdrop-parallax="threads"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <g stroke="var(--backdrop-thread)" strokeWidth="1">
          <line x1="128" y1="0" x2="128" y2="900" />
          <line x1="164" y1="0" x2="164" y2="900" strokeOpacity="0.5" />
          <line x1="1276" y1="0" x2="1276" y2="900" strokeOpacity="0.5" />
          <line x1="1312" y1="0" x2="1312" y2="900" />
        </g>

        {/* Pequeños nodos de registro sobre los hilos laterales */}
        <g fill="var(--primary)" fillOpacity="0.34">
          <circle cx="128" cy="240" r="2.5" />
          <circle cx="128" cy="264" r="1.5" />
          <circle cx="164" cy="520" r="2" />
          <circle cx="1312" cy="310" r="2.5" />
          <circle cx="1312" cy="336" r="1.5" />
          <circle cx="1276" cy="645" r="2" />
        </g>
      </svg>

      {/* Capa 5: Cinco partículas atmosféricas discretas (sin saturación) */}
      <div
        data-ambient-dust
        className="absolute top-[22%] left-[18%] size-1.5 rounded-full bg-primary/40 blur-[1px]"
      />
      <div
        data-ambient-dust
        className="absolute top-[36%] right-[22%] size-2 rounded-full bg-primary/30 blur-[2px]"
      />
      <div
        data-ambient-dust
        className="absolute bottom-[28%] left-[32%] size-1.5 rounded-full bg-accent-warm/35 blur-[1px]"
      />
      <div
        data-ambient-dust
        className="absolute top-[64%] right-[30%] size-1 rounded-full bg-foreground/30"
      />
      <div
        data-ambient-dust
        className="absolute bottom-[18%] right-[14%] size-2 rounded-full bg-primary/25 blur-[2px]"
      />

      {/* Capa 6: Textura fina editorial local (SVG fractalNoise) */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: "var(--backdrop-grain-opacity)" }}
      >
        <filter id="khipu-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.78"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#khipu-grain)" />
      </svg>

      {/* Viñeta suave para confort de lectura */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 84% 78% at 50% 44%, transparent 45%, var(--background) 100%)",
          opacity: 0.74,
        }}
      />
    </div>
  );
}
