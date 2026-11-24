import { useEffect, useRef } from "react";

import { gsap, MEDIA_QUERIES } from "@/lib/motion";

import type { TerrainVariant } from "./terrain-mesh";
import { createTerrainRenderer, type TerrainCamera } from "./terrain-renderer";
import { createTerrainFallback } from "./terrain-fallback";

export function LivingTerrain({ variant = "home" }: { variant?: TerrainVariant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const fallbackCanvas = fallbackRef.current;
    const terrain = canvas?.parentElement;
    const cover = terrain?.closest<HTMLElement>(".atlas-cover");
    if (!canvas || !fallbackCanvas || !terrain || !cover) return;

    const camera: TerrainCamera = { travel: 0, x: 0, y: 0 };
    const compact = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    let renderer: ReturnType<typeof createTerrainRenderer> | undefined;
    let fallback: ReturnType<typeof createTerrainFallback> | undefined;
    let frame = 0;
    let visible = true;
    let attempted = false;
    let columns = 0;
    let rows = 0;

    const draw = () => {
      frame = 0;
      if (!visible || document.hidden || !columns || !rows) return;

      if (canvas.width !== columns) canvas.width = columns;
      if (canvas.height !== rows) canvas.height = rows;

      if (!attempted) {
        attempted = true;
        try {
          const gl = canvas.getContext("webgl2", {
            alpha: false,
            antialias: true,
            preserveDrawingBuffer: true,
          });
          if (gl && !gl.isContextLost()) {
            renderer = createTerrainRenderer(gl, variant, compact.matches);
            renderer.render(camera);
            if (gl.getError() !== gl.NO_ERROR) throw new Error("Error al dibujar la malla.");
            canvas.setAttribute("data-atlas-rendered", "");
            return;
          }
        } catch (error) {
          renderer?.dispose();
          renderer = undefined;
          if (import.meta.env.DEV) console.warn("El Atlas usará Canvas 2D.", error);
        }
      }

      if (renderer) {
        renderer.render(camera);
        return;
      }

      if (!fallback) {
        const context = fallbackCanvas.getContext("2d");
        if (!context) return;
        fallback = createTerrainFallback(context, variant);
      }

      const scale = Math.min(1, Math.sqrt(320_000 / (columns * rows)));
      const width = Math.max(1, Math.round(columns * scale));
      const height = Math.max(1, Math.round(rows * scale));
      if (!fallbackCanvas.hasAttribute("data-atlas-rendered") ||
          fallbackCanvas.width !== width || fallbackCanvas.height !== height) {
        fallbackCanvas.width = width;
        fallbackCanvas.height = height;
        fallback(width, height);
        fallbackCanvas.setAttribute("data-atlas-rendered", "");
      }
      fallbackCanvas.style.transform = camera.travel || camera.x || camera.y
        ? "translate(" + camera.x * -7 + "px, " + (camera.y * -6 - camera.travel * 12) +
          "px) scale(" + (1.035 + camera.travel * 0.055) + ")"
        : "";
    };

    const requestDraw = () => {
      if (frame || !visible || document.hidden || !columns || !rows) return;
      frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      const pixelLimit = compact.matches ? 560_000 : 1_200_000;
      const scale = Math.min(window.devicePixelRatio || 1, 1.45, Math.sqrt(pixelLimit / (width * height)));
      columns = Math.max(1, Math.round(width * scale));
      rows = Math.max(1, Math.round(height * scale));
      requestDraw();
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      renderer = undefined;
      canvas.removeAttribute("data-atlas-rendered");
      requestDraw();
    };

    const onContextRestored = () => {
      attempted = false;
      requestDraw();
    };

    const sizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) requestDraw();
    });

    sizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    document.addEventListener("visibilitychange", requestDraw);
    compact.addEventListener("change", resize);
    resize();

    const motion = gsap.matchMedia(cover);
    motion.add(
      {
        allowed: MEDIA_QUERIES.motionAllowed,
        finePointer: "(min-width: 768px) and (pointer: fine)",
      },
      ({ conditions }) => {
        if (!conditions?.allowed) return;

        const outgoing = terrain.nextElementSibling;
        const next = cover.nextElementSibling;
        const nextScene = next?.matches("section") ? next : next?.firstElementChild;
        const incoming = nextScene?.matches("section") ? nextScene.firstElementChild : nextScene;
        const transition = gsap.timeline({
          defaults: { duration: 1, ease: "none" },
          onUpdate: requestDraw,
          scrollTrigger: {
            trigger: cover,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 0.55,
          },
        });

        transition.to(camera, { travel: 1 }, 0);
        if (outgoing) transition.to(outgoing, { y: -42, opacity: 0.67 }, 0);
        if (incoming) transition.fromTo(incoming, { y: 26, opacity: 0.76 }, { y: 0, opacity: 1 }, 0);

        const moveOptions = { duration: 0.64, ease: "power2.out", onUpdate: requestDraw };
        const moveX = gsap.quickTo(camera, "x", moveOptions);
        const moveY = gsap.quickTo(camera, "y", moveOptions);
        const release = () => {
          moveX(0);
          moveY(0);
        };

        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch" || !visible) return;
          const bounds = canvas.getBoundingClientRect();
          if (!bounds.width || !bounds.height || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            release();
            return;
          }
          moveX(gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
          moveY(gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
        };

        if (conditions.finePointer) {
          cover.addEventListener("pointermove", move, { passive: true });
          cover.addEventListener("pointerleave", release);
          cover.addEventListener("pointercancel", release);
        }

        return () => {
          transition.scrollTrigger?.kill();
          cover.removeEventListener("pointermove", move);
          cover.removeEventListener("pointerleave", release);
          cover.removeEventListener("pointercancel", release);
          camera.travel = camera.x = camera.y = 0;
          requestDraw();
        };
      }
    );

    return () => {
      motion.revert();
      cancelAnimationFrame(frame);
      renderer?.dispose();
      canvas.removeAttribute("data-atlas-rendered");
      fallbackCanvas.removeAttribute("data-atlas-rendered");
      fallbackCanvas.style.removeProperty("transform");
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      document.removeEventListener("visibilitychange", requestDraw);
      compact.removeEventListener("change", resize);
    };
  }, [variant]);

  return (
    <div className="atlas-terrain" data-terrain={variant} aria-hidden="true">
      <canvas ref={canvasRef} />
      <canvas ref={fallbackRef} />
    </div>
  );
}
