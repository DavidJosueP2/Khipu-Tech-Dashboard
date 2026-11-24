import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AtlasProvider } from "@/context/AtlasContext";
import { PlatformLayout } from "@/components/layout/PlatformLayout";
import { HomePage } from "@/pages/HomePage";
import { EmprendimientoPage } from "@/pages/EmprendimientoPage";
import { TributacionPage } from "@/pages/TributacionPage";
import { NominaPage } from "@/pages/NominaPage";
import { LiquidacionPage } from "@/pages/LiquidacionPage";

export function App() {
  return (
    <BrowserRouter>
      <AtlasProvider>
        <Routes>
          <Route element={<PlatformLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/emprendimiento" element={<EmprendimientoPage />} />
            <Route path="/tributacion" element={<TributacionPage />} />
            <Route path="/nomina" element={<NominaPage />} />
            <Route path="/liquidacion" element={<LiquidacionPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AtlasProvider>
    </BrowserRouter>
  );
}

export default App;
