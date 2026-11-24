import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useAtlas } from "@/context/atlas-context";
import { MODULES } from "@/data/platform";
import { TopNav } from "@/components/navigation/TopNav";
import { Footer } from "@/components/layout/Footer";
import {
  animateRouteEnter,
  ScrollTrigger,
  useGSAP,
  withMotionMedia,
} from "@/lib/motion";

/**
 * Contenedor maestro minimalista de KhipuTech.
 * Superficie blanco cálido completamente limpia, sin patrones ni elementos
 * decorativos de fondo que compitan con el contenido.
 */
export function PlatformLayout() {
  const location = useLocation();
  const { setActiveHighlight } = useAtlas();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const matchedModule = MODULES.find((m) => m.path === location.pathname);
    setActiveHighlight(matchedModule ? matchedModule.id : "home");

    const frame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, setActiveHighlight]);

  useGSAP(
    () => {
      if (location.pathname === "/") return;
      return withMotionMedia(mainRef.current, () => {
        if (mainRef.current) {
          animateRouteEnter(mainRef.current);
        }
      });
    },
    { scope: mainRef, dependencies: [location.pathname] }
  );

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <TopNav />

      <main className="flex flex-1 flex-col">
        <div
          ref={mainRef}
          key={location.pathname}
          className="flex flex-1 flex-col"
        >
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
