import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { AtlasHighlight } from "@/data/platform";
import {
  AtlasContext,
  type AtlasContextValue,
} from "@/context/atlas-context";

/**
 * Proveedor liviano de contexto de navegación para KhipuTech.
 * Limpia cualquier atributo heredado de temas anteriores y mantiene una sola
 * estética editorial blanco cálido en toda la plataforma.
 */
export function AtlasProvider({ children }: { children: ReactNode }) {
  const [activeHighlight, setActiveHighlight] =
    useState<AtlasHighlight>("home");

  useEffect(() => {
    document.documentElement.removeAttribute("data-theme");
    try {
      window.localStorage.removeItem("atlas-academico-surface-theme");
    } catch {
      // Ignorar si el almacenamiento no está disponible
    }
  }, []);

  const value = useMemo<AtlasContextValue>(
    () => ({
      activeHighlight,
      setActiveHighlight,
    }),
    [activeHighlight]
  );

  return (
    <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>
  );
}
