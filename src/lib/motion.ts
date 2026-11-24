import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registro único y oficial de plugins GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Tokens globales de movimiento — Atlas Académico.
 * Curvas sobrias con desaceleración editorial (sin rebotes ni distracciones).
 */
export const MOTION_DURATION = {
  micro: 0.2,
  fast: 0.34,
  base: 0.56,
  editorial: 0.78,
  draw: 0.98,
  route: 0.38,
} as const;

export const MOTION_EASE = {
  editorial: "power3.out",
  snappy: "power2.out",
  settle: "expo.out",
  inOut: "power2.inOut",
  linear: "none",
} as const;

export const MOTION_STAGGER = {
  tight: 0.05,
  list: 0.075,
  section: 0.1,
} as const;

export const MOTION_OFFSET = {
  subtle: 12,
  section: 22,
  hero: 28,
  route: 14,
} as const;

export const MEDIA_QUERIES = {
  motionDesktop:
    "(prefers-reduced-motion: no-preference) and (min-width: 1024px)",
  motionMobile:
    "(prefers-reduced-motion: no-preference) and (max-width: 1023px)",
  motionAllowed: "(prefers-reduced-motion: no-preference)",
  motionReduced: "(prefers-reduced-motion: reduce)",
} as const;

export interface MotionConditions {
  isDesktop: boolean;
  isMobile: boolean;
  isReduced: boolean;
  motionAllowed: boolean;
}

/**
 * Helper seguro para detectar preferencia de movimiento reducido.
 */
export function prefersReducedMotion(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia(MEDIA_QUERIES.motionReduced).matches;
}

/**
 * Ejecuta configuración de GSAP + ScrollTrigger con alcance (`scope`) y
 * limpieza automática al desmontar (retorna función de cleanup para `useGSAP`).
 * Simplifica efectos en móvil y los omite si `prefers-reduced-motion` está activo.
 */
export function withResponsiveMotion(
  scope: Element | null | undefined,
  setup: (conditions: MotionConditions) => void | (() => void)
): () => void {
  const mm = gsap.matchMedia(scope ?? undefined);

  mm.add(
    {
      isDesktop: MEDIA_QUERIES.motionDesktop,
      isMobile: MEDIA_QUERIES.motionMobile,
      motionAllowed: MEDIA_QUERIES.motionAllowed,
      isReduced: MEDIA_QUERIES.motionReduced,
    },
    (context) => {
      const c = context.conditions as unknown as MotionConditions;
      return setup(c);
    }
  );

  return () => mm.revert();
}

/**
 * Variante binaria (movimiento permitido vs reducido) con scope y cleanup automático.
 */
export function withMotionMedia(
  scope: Element | null | undefined,
  animate: () => void,
  reducedFallback?: () => void
): () => void {
  return withResponsiveMotion(scope, ({ motionAllowed, isReduced }) => {
    if (motionAllowed) {
      animate();
    } else if (isReduced && reducedFallback) {
      reducedFallback();
    }
  });
}

/**
 * Aparición editorial progresiva con destino garantizado (`opacity: 1, y: 0`).
 */
export function animateEditorialReveal(
  targets: gsap.TweenTarget,
  options?: {
    delay?: number;
    stagger?: number;
    y?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    {
      y: options?.y ?? MOTION_OFFSET.section,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: options?.duration ?? MOTION_DURATION.editorial,
      stagger: options?.stagger ?? MOTION_STAGGER.section,
      delay: options?.delay ?? 0,
      ease: MOTION_EASE.editorial,
      clearProps: "transform,opacity",
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Entrada escalonada para listas documentales e índices con destino garantizado.
 */
export function animateDocumentListStagger(
  targets: gsap.TweenTarget,
  options?: {
    delay?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    {
      y: MOTION_OFFSET.subtle,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: MOTION_DURATION.base,
      stagger: options?.stagger ?? MOTION_STAGGER.list,
      delay: options?.delay ?? 0,
      ease: MOTION_EASE.snappy,
      clearProps: "transform,opacity",
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Trazado horizontal progresivo para divisores editoriales (`scaleX: 0 -> 1`).
 */
export function animateRuleDraw(
  targets: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  return gsap.fromTo(
    targets,
    { scaleX: 0, transformOrigin: "left center" },
    {
      scaleX: 1,
      duration: options?.duration ?? MOTION_DURATION.draw,
      delay: options?.delay ?? 0,
      ease: MOTION_EASE.editorial,
      clearProps: "transform",
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Dibujo progresivo de trayectorias SVG mediante `strokeDashoffset`.
 */
export function animateSvgPathDraw(
  path: SVGGeometryElement,
  options?: {
    delay?: number;
    duration?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  const length = path.getTotalLength();
  return gsap.fromTo(
    path,
    {
      strokeDasharray: length,
      strokeDashoffset: length,
    },
    {
      strokeDashoffset: 0,
      duration: options?.duration ?? MOTION_DURATION.draw,
      delay: options?.delay ?? 0,
      ease: MOTION_EASE.editorial,
      scrollTrigger: options?.scrollTrigger,
    }
  );
}

/**
 * Transición limpia de entrada al cambiar de ruta con destino garantizado.
 */
export function animateRouteEnter(target: gsap.TweenTarget): gsap.core.Tween {
  return gsap.fromTo(
    target,
    {
      y: MOTION_OFFSET.route,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: MOTION_DURATION.route,
      ease: MOTION_EASE.editorial,
      clearProps: "transform,opacity",
    }
  );
}

/**
 * Animación numérica reservada exclusivamente para cifras reales verificadas.
 */
export function animateRealCounter(
  element: HTMLElement,
  targetValue: number,
  options?: {
    duration?: number;
    delay?: number;
    formatter?: (value: number) => string;
    scrollTrigger?: ScrollTrigger.Vars;
  }
): gsap.core.Tween {
  const state = { current: 0 };
  const format =
    options?.formatter ?? ((v: number) => Math.round(v).toString());

  return gsap.to(state, {
    current: targetValue,
    duration: options?.duration ?? 0.95,
    delay: options?.delay ?? 0,
    ease: MOTION_EASE.settle,
    scrollTrigger: options?.scrollTrigger,
    onUpdate: () => {
      element.textContent = format(state.current);
    },
    onComplete: () => {
      element.textContent = format(targetValue);
    },
  });
}

export { gsap, ScrollTrigger, useGSAP };
