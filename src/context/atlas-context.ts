import { createContext, useContext } from "react";
import type { AtlasHighlight } from "@/data/platform";

export interface AtlasContextValue {
  activeHighlight: AtlasHighlight;
  setActiveHighlight: (highlight: AtlasHighlight) => void;
}

export const AtlasContext = createContext<AtlasContextValue | null>(null);

export function useAtlas(): AtlasContextValue {
  const ctx = useContext(AtlasContext);
  if (!ctx) {
    throw new Error("useAtlas debe utilizarse dentro de <AtlasProvider />");
  }
  return ctx;
}
