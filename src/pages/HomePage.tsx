import { HomeBentoDashboard } from "@/components/home/HomeBentoDashboard";

/**
 * Página principal — Dashboard Bento integrador de KhipuTech.
 * Centraliza los cuatro módulos con sus capturas reales, cifras verificadas,
 * estructura semestral y accesos directos a las aplicaciones desarrolladas.
 */
export function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <HomeBentoDashboard />
    </div>
  );
}
