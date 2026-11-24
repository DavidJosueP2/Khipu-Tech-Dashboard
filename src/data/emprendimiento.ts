import guiaApe01Url from "@/assets/pdfs/Trabajos Parcial 1/Guia Ape 01.pdf?url";
import tarea01Url from "@/assets/pdfs/Trabajos Parcial 1/Tarea 01 Unidad 1.pdf?url";
import tarea02Url from "@/assets/pdfs/Trabajos Parcial 1/Tarea 02 Unidad 1.pdf?url";
import tarea03Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 03 Unidad 1.pdf?url";
import tarea04Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 04 Unidad 1.pdf?url";
import tarea05Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 05 Unidad 1.pdf?url";

import thumbApe01 from "@/assets/thumbnails/unidad-1/guia-ape-01.png";
import thumbTarea01 from "@/assets/thumbnails/unidad-1/tarea-01.png";
import thumbTarea02 from "@/assets/thumbnails/unidad-1/tarea-02.png";
import thumbTarea03 from "@/assets/thumbnails/unidad-1/tarea-03.png";
import thumbTarea04 from "@/assets/thumbnails/unidad-1/tarea-04.png";
import thumbTarea05 from "@/assets/thumbnails/unidad-1/tarea-05.png";

export interface AcademicDocument {
  id: string;
  phaseNumber: string;
  shortLabel: string;
  title: string;
  fileName: string;
  relativePath: string;
  url: string;
  thumbnailUrl: string;
  documentType: "Informe principal" | "Evidencia";
  unit: string;
  partial: string;
  date: string;
  pages: number;
  relationToApe: string;
  summary: string;
  isIntegrator?: boolean;
}

export interface OpportunityAlternative {
  number: string;
  title: string;
  audience: string;
  status: "selected" | "evaluated";
  rationale: string;
}

export interface KeyValueRow {
  label: string;
  value: string;
}

export interface CanvasBlock {
  number: string;
  name: string;
  detail: string;
  highlights: readonly string[];
}

export interface FodaQuadrant {
  category: "Fortalezas" | "Debilidades" | "Oportunidades" | "Amenazas";
  scope: "INTERNO" | "EXTERNO";
  tone: "emerald" | "amber" | "sky" | "rose";
  tags: readonly string[];
  summary: string;
}

export interface FodaStrategy {
  label: string;
  code: "FO" | "DO" | "FA" | "DA";
  decision: string;
}

export interface SurveyMetric {
  value: string;
  numericTarget: number;
  decimals: number;
  suffix: string;
  label: string;
}

export interface CompetitorEntry {
  name: string;
  plansUrl: string;
  priceHeadline: string;
  priceSubtext: string;
  offering: string;
  strength: string;
}

export interface OperationalStep {
  step: string;
  name: string;
  activity: string;
}

export interface CostBarItem {
  label: string;
  amount: number;
  formatted: string;
  detail?: string;
}

/**
 * Catálogo original de los seis PDF de la Unidad I con vista previa real de portada.
 * Todos los archivos PDF permanecen intactos en `src/assets/pdfs/Trabajos Parcial 1/`.
 */
export const EMPRENDIMIENTO_DOCUMENTS: readonly AcademicDocument[] = [
  {
    id: "ape-01",
    phaseNumber: "06",
    shortLabel: "Plan de negocios (informe y anexo completo)",
    title: "Plan de Negocios Integral — KhipuTech (Guía APE N.° 1)",
    fileName: "Guia Ape 01.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/Guia Ape 01.pdf",
    url: guiaApe01Url,
    thumbnailUrl: thumbApe01,
    documentType: "Informe principal",
    unit: "Unidad I",
    partial: "Primer Parcial",
    date: "05 sep 2026",
    pages: 22,
    relationToApe: "Consolida e integra las Tareas 01 a 05 en un documento maestro",
    summary:
      "Informe de guía práctica · 22 págs. Integra oportunidad, Canvas, perfil estratégico, mercado, encuesta a 17 participantes, operación y estudio económico.",
    isIntegrator: true,
  },
  {
    id: "tarea-01",
    phaseNumber: "01",
    shortLabel: "TAREA 01 · Del problema a la oportunidad",
    title: "Taller: De un problema a una oportunidad de negocio",
    fileName: "Tarea 01 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/Tarea 01 Unidad 1.pdf",
    url: tarea01Url,
    thumbnailUrl: thumbTarea01,
    documentType: "Evidencia",
    unit: "Unidad I",
    partial: "Primer Parcial",
    date: "12 ago 2026",
    pages: 2,
    relationToApe: "Taller inicial de detección de problemas y oportunidad en software",
    summary:
      "Identificación de tres problemáticas reales en Ambato, análisis de impacto y formulación inicial problema–cliente–solución–valor.",
  },
  {
    id: "tarea-02",
    phaseNumber: "02",
    shortLabel: "TAREA 02 · Modelo CANVAS",
    title: "Business Model Canvas — KhipuTech",
    fileName: "Tarea 02 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/Tarea 02 Unidad 1.pdf",
    url: tarea02Url,
    thumbnailUrl: thumbTarea02,
    documentType: "Evidencia",
    unit: "Unidad I",
    partial: "Primer Parcial",
    date: "18 ago 2026",
    pages: 1,
    relationToApe: "Base directa del Cuadro 3 (Business Model Canvas) en Guia Ape 01.pdf",
    summary:
      "Los nueve bloques del modelo de negocio de KhipuTech: propuesta de valor, canales, suscripción SaaS, socios y costos.",
  },
  {
    id: "tarea-03",
    phaseNumber: "03",
    shortLabel: "TAREA 03 · Perfil estratégico",
    title: "Ficha de aplicación: Perfil Estratégico",
    fileName: "TAREA 03 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 03 Unidad 1.pdf",
    url: tarea03Url,
    thumbnailUrl: thumbTarea03,
    documentType: "Evidencia",
    unit: "Unidad I",
    partial: "Primer Parcial",
    date: "19 ago 2026",
    pages: 4,
    relationToApe: "Base de identidad visual, misión, visión y FODA en Guia Ape 01.pdf",
    summary:
      "Identidad KhipuTech, símbolo ortogonal, paleta corporativa, misión, visión 2031, análisis FODA y estrategias FO/DO/FA/DA.",
  },
  {
    id: "tarea-04",
    phaseNumber: "04",
    shortLabel: "TAREA 04 · Mercado y operación",
    title: "Taller: Mercado y Operación del Emprendimiento",
    fileName: "TAREA 04 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 04 Unidad 1.pdf",
    url: tarea04Url,
    thumbnailUrl: thumbTarea04,
    documentType: "Evidencia",
    unit: "Unidad I",
    partial: "Primer Parcial",
    date: "25 ago 2026",
    pages: 3,
    relationToApe: "Base de mercado, competencia y operación (Cuadros 5–9) en Guia Ape 01.pdf",
    summary:
      "Cliente objetivo en Ambato y Tungurahua, comparativa frente a Contífico y Dora.ec, oferta comercial y proceso operativo en cinco etapas.",
  },
  {
    id: "tarea-05",
    phaseNumber: "05",
    shortLabel: "TAREA 05 · Viabilidad financiera",
    title: "Plantilla automatizada: Estudio Económico y Viabilidad Financiera",
    fileName: "TAREA 05 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 05 Unidad 1.pdf",
    url: tarea05Url,
    thumbnailUrl: thumbTarea05,
    documentType: "Evidencia",
    unit: "Unidad I",
    partial: "Primer Parcial",
    date: "26 ago 2026",
    pages: 3,
    relationToApe: "Base de los cuadros financieros (Cuadros 10–14) en Guia Ape 01.pdf",
    summary:
      "Inversión inicial de USD 2.900, costos mensuales de USD 2.256, proyección de 200 clientes a USD 20 y resultado mensual de USD 1.744.",
  },
] as const;

export function getEmprendimientoDoc(id: string): AcademicDocument {
  const doc = EMPRENDIMIENTO_DOCUMENTS.find((d) => d.id === id);
  if (!doc) {
    throw new Error(`Documento de Unidad I no encontrado: ${id}`);
  }
  return doc;
}

/** Capítulo 01 — Tres problemáticas comparadas en Guia Ape 01.pdf (p. 6) */
export const OPPORTUNITY_ALTERNATIVES: readonly OpportunityAlternative[] = [
  {
    number: "01",
    title: "Pérdidas por productos próximos a caducar",
    audience: "Farmacias, minimarkets, tiendas de abarrotes y distribuidoras",
    status: "selected",
    rationale:
      "Seleccionada por su impacto financiero directo, urgencia operativa cotidiana y alto potencial para una solución SaaS B2B escalable.",
  },
  {
    number: "02",
    title: "Inseguridad en desplazamientos cotidianos",
    audience: "Ciudadanos y peatones en zonas urbanas",
    status: "evaluated",
    rationale:
      "Evaluada en la fase exploratoria inicial; descartada frente a la viabilidad comercial recurrente del segmento minorista.",
  },
  {
    number: "03",
    title: "Costos del transporte diario",
    audience: "Estudiantes y trabajadores con movilidad diaria",
    status: "evaluated",
    rationale:
      "Analizada como problemática del entorno, pero con menor capacidad de monetización y diferenciación B2B que el control de mermas.",
  },
] as const;

/** Flujo funcional del producto KhipuTech Rotación (Cuadro 2 de Guia Ape 01.pdf) */
export const ROTATION_CYCLE: readonly { step: string; title: string; detail: string }[] = [
  {
    step: "01",
    title: "Registro por lotes",
    detail: "Escaneo móvil de códigos de barras y fecha de vencimiento al ingreso.",
  },
  {
    step: "02",
    title: "Monitoreo de vida útil",
    detail: "Semaforización continua y trazabilidad centralizada en la nube.",
  },
  {
    step: "03",
    title: "Alerta anticipada",
    detail: "Notificaciones automáticas vía WhatsApp Business, correo o SMS.",
  },
  {
    step: "04",
    title: "Acción preventiva",
    detail: "Reportes oportunos para devoluciones a proveedores u ofertas antes del vencimiento.",
  },
] as const;

/** Capítulo 02 — Business Model Canvas completo (Cuadro 3 de Guia Ape 01.pdf) */
export const CANVAS_BLOCKS: Record<
  | "partners"
  | "activities"
  | "resources"
  | "value"
  | "relationships"
  | "channels"
  | "segments"
  | "costs"
  | "revenue",
  CanvasBlock
> = {
  partners: {
    number: "08",
    name: "Socios clave",
    detail:
      "Proveedores de nube, servicios de notificación y gremios comerciales locales.",
    highlights: [
      "Infraestructura AWS / Azure",
      "API WhatsApp Business",
      "Cámaras de comercio y farmacias",
    ],
  },
  activities: {
    number: "07",
    name: "Actividades clave",
    detail:
      "Desarrollo continuo de la plataforma, emisión fiable de alertas y soporte directo.",
    highlights: [
      "Evolución del software y App móvil",
      "Alertas por WhatsApp, correo y SMS",
      "Onboarding y soporte técnico",
    ],
  },
  resources: {
    number: "06",
    name: "Recursos clave",
    detail:
      "Infraestructura cloud, equipo de ingeniería y propiedad intelectual del sistema.",
    highlights: [
      "Código fuente y algoritmos de alerta",
      "Bases de datos y nube escalable",
      "Equipo de desarrollo, soporte y ventas",
    ],
  },
  value: {
    number: "02",
    name: "Propuesta de valor",
    detail:
      "Reducir pérdidas económicas ocasionadas por productos caducados mediante alertas automáticas, trazabilidad por lotes y gestión anticipada de devoluciones o promociones.",
    highlights: [
      "Reducción directa de mermas",
      "Trazabilidad por lote y fecha",
      "Alertas tempranas multicanal",
      "Menos horas en revisión manual",
    ],
  },
  relationships: {
    number: "04",
    name: "Relaciones con clientes",
    detail:
      "Acompañamiento cercano en la adopción y autoservicio guiado en el panel web.",
    highlights: [
      "Capacitación inicial de carga",
      "Soporte rápido vía WhatsApp y Zoom",
      "Panel interactivo con tutoriales",
    ],
  },
  channels: {
    number: "03",
    name: "Canales",
    detail:
      "Captación presencial focalizada en comercios locales y entrega digital web/móvil.",
    highlights: [
      "Visitas directas en Ambato",
      "Demostraciones en línea y pauta",
      "App móvil para escaneo en percha",
    ],
  },
  segments: {
    number: "01",
    name: "Segmentos de clientes",
    detail:
      "Propietarios, administradores y encargados de inventario de comercios con perecibles.",
    highlights: [
      "Farmacias independientes y medianas",
      "Minimarkets y tiendas de abarrotes",
      "Distribuidoras de alimentos perecibles",
    ],
  },
  costs: {
    number: "09",
    name: "Estructura de costos",
    detail:
      "Servidores cloud, bases de datos, pasarela de pago, API de mensajería, talento humano de desarrollo y ventas, publicidad digital y comisiones.",
    highlights: [
      "Operación mensual: USD 210",
      "Talento humano: USD 2.046",
      "Total mensual: USD 2.256",
    ],
  },
  revenue: {
    number: "05",
    name: "Fuentes de ingresos",
    detail:
      "Suscripción SaaS mensual o anual según volumen de productos o sucursales, complementada con tarifa opcional por carga inicial y capacitación personalizada.",
    highlights: [
      "Suscripción base: USD 20 / mes",
      "Escala según sucursales / volumen",
      "Onboarding personalizado opcional",
    ],
  },
};

/** Capítulo 03A — Identidad, Misión y Visión (Cuadro 1 y Perfil Estratégico de Guia Ape 01.pdf) */
export const STRATEGIC_IDENTITY = {
  mission:
    "Impulsar la transformación digital de empresas mediante software a medida, arquitectura en la nube e ingeniería de datos, ofreciendo soluciones robustas, escalables y seguras que optimicen operaciones críticas y generen valor sostenible.",
  vision:
    "Para 2031, ser una firma referente de ingeniería de software y arquitectura de datos en la región andina, reconocida por su excelencia técnica, solidez metodológica y soluciones de alto impacto empresarial.",
  pillars: [
    { label: "Azul Medianoche", detail: "#0B192C · Solidez y confianza", swatch: "#0B192C" },
    { label: "Aguamarina", detail: "#00D2D3 · Innovación y flujo", swatch: "#00D2D3" },
    { label: "Raíz Khipu", detail: "Registro andino trasladado a la nube", swatch: "#E2C275" },
  ] as const,
} as const;

/** Capítulo 03B — Matriz FODA y cruces estratégicos (Cuadro 4 de Guia Ape 01.pdf) */
export const FODA_QUADRANTS: readonly FodaQuadrant[] = [
  {
    category: "Fortalezas",
    scope: "INTERNO",
    tone: "emerald",
    tags: [
      "Arquitectura escalable en la nube",
      "Integración de datos",
      "Metodologías ágiles",
      "Adaptación a medida",
    ],
    summary:
      "Capacidad técnica propia del equipo de Ingeniería en Software para construir soluciones robustas y personalizadas.",
  },
  {
    category: "Debilidades",
    scope: "INTERNO",
    tone: "amber",
    tags: [
      "Reconocimiento inicial limitado",
      "Portafolio corporativo naciente",
      "Capacidad comercial acotada",
    ],
    summary:
      "Al iniciar operaciones, requiere casos de éxito verificables y presupuesto focalizado para prospección B2B.",
  },
  {
    category: "Oportunidades",
    scope: "EXTERNO",
    tone: "sky",
    tags: [
      "Digitalización de comercios locales",
      "Demanda de software especializado",
      "Modernización cloud en PYMES",
    ],
    summary:
      "Crece la necesidad de sustituir revisiones manuales y hojas de cálculo por plataformas especializadas.",
  },
  {
    category: "Amenazas",
    scope: "EXTERNO",
    tone: "rose",
    tags: [
      "Competencia de ERP consolidados",
      "Resistencia a invertir en software",
      "Herramientas genéricas de bajo costo",
    ],
    summary:
      "Consultoras establecidas y la inercia hacia procesos tradicionales pueden frenar la adopción inicial.",
  },
] as const;

export const FODA_STRATEGIES: readonly FodaStrategy[] = [
  {
    code: "FO",
    label: "Fortaleza + Oportunidad",
    decision:
      "Desarrollar paquetes ágiles de modernización en la nube e integración de APIs para pymes con entregas rápidas.",
  },
  {
    code: "DO",
    label: "Debilidad + Oportunidad",
    decision:
      "Ejecutar pruebas piloto de 14 días y casos de estudio iniciales que construyan reputación verificable.",
  },
  {
    code: "FA",
    label: "Fortaleza + Amenaza",
    decision:
      "Diferenciarse mediante especialización técnica, alertas preventivas y seguridad frente a plantillas genéricas.",
  },
  {
    code: "DA",
    label: "Debilidad + Amenaza",
    decision:
      "Consolidar alianzas con cámaras de comercio y contratos recurrentes de soporte que aseguren flujo estable.",
  },
] as const;

/** Capítulo 03C — Resultados reales de la encuesta (Figuras 9–11 de Guia Ape 01.pdf, 17 respuestas) */
export const SURVEY_KPI_METRICS: readonly SurveyMetric[] = [
  {
    value: "17",
    numericTarget: 17,
    decimals: 0,
    suffix: "",
    label: "respuestas procesadas en el sondeo de validación de mercado",
  },
  {
    value: "82,4 %",
    numericTarget: 82.4,
    decimals: 1,
    suffix: " %",
    label: "son propietarios, administradores o encargados de inventario",
  },
  {
    value: "70,6 %",
    numericTarget: 70.6,
    decimals: 1,
    suffix: " %",
    label: "prioriza alertas automáticas directas a WhatsApp o correo",
  },
  {
    value: "64,7 %",
    numericTarget: 64.7,
    decimals: 1,
    suffix: " %",
    label: "considera justo pagar entre USD 15 y USD 20 mensuales",
  },
] as const;

export const COMPETITIVE_COMPARISON = {
  featured: {
    name: "KhipuTech",
    priceHeadline: "USD 20",
    priceSubtext: "al mes · rango $15–$35 según sucursales",
    description:
      "Plataforma SaaS en la nube y aplicación móvil enfocada 100 % en trazabilidad por lotes, escaneo en percha, alertas por WhatsApp/SMS y gestión oportuna de devoluciones u ofertas.",
  },
  competitors: [
    {
      name: "Contífico",
      plansUrl: "https://www.siigo.com/ec/planes/",
      priceHeadline: "Desde USD 25",
      priceSubtext: "hasta USD 75 al mes",
      offering: "Cloud ERP/POS orientado a facturación electrónica y contabilidad general.",
      strength: "Posicionamiento consolidado y reportes tributarios en Ecuador.",
    },
    {
      name: "Dora.ec",
      plansUrl: "https://dora.ec/precios.php",
      priceHeadline: "Desde USD 19",
      priceSubtext: "hasta USD 49 al mes",
      offering: "Software contable, facturación electrónica e inventario general en línea.",
      strength: "Configuración inicial ágil para microempresas y puntos de venta.",
    },
  ] as readonly CompetitorEntry[],
} as const;

/** Capítulo 03D — Proceso operativo en 5 etapas y síntesis (Cuadros 7–9 de Guia Ape 01.pdf) */
export const OPERATIONAL_PROCESS: readonly OperationalStep[] = [
  {
    step: "1",
    name: "Solicitud",
    activity: "Prospección en comercios de Ambato o contacto digital y agenda de demo.",
  },
  {
    step: "2",
    name: "Diagnóstico",
    activity: "Evaluación de volumen y sucursales, alta de cuenta y rangos de alerta.",
  },
  {
    step: "3",
    name: "Carga inicial",
    activity: "Importación CSV o escaneo directo y capacitación al personal operativo.",
  },
  {
    step: "4",
    name: "Operación",
    activity: "Monitoreo diario y emisión automática de alertas antes del vencimiento.",
  },
  {
    step: "5",
    name: "Posventa",
    activity: "Soporte por canales digitales, evolución de funciones y renovación.",
  },
] as const;

export const OPERATIONAL_PILLARS: readonly KeyValueRow[] = [
  {
    label: "Se vende",
    value:
      "Suscripción SaaS + App móvil desde USD 20/mes según volumen o sucursales, con carga inicial opcional.",
  },
  {
    label: "Se necesita",
    value:
      "Equipo fundador de Software, nube AWS/Azure, API de WhatsApp Business, pasarela de pago y promotores locales.",
  },
  {
    label: "Se valida",
    value:
      "Prueba piloto de 14 días en cinco comercios de Ambato y registro simulado de la marca KhipuTech (Clase 42).",
  },
] as const;

/** Capítulo 04 — Estudio económico y viabilidad financiera (Cuadros 10–14 de Guia Ape 01.pdf) */
export const INVESTMENT_BARS: readonly CostBarItem[] = [
  { label: "Equipos y computadoras (3 × $800)", amount: 2400, formatted: "2.400" },
  { label: "Publicidad de lanzamiento", amount: 300, formatted: "300" },
  { label: "Software y licencias iniciales", amount: 100, formatted: "100" },
  { label: "Dominio y sitio web", amount: 50, formatted: "50" },
  { label: "Herramientas y equipos técnicos", amount: 50, formatted: "50" },
] as const;

export const MONTHLY_COST_BARS: readonly CostBarItem[] = [
  {
    label: "Talento humano (4 cargos: 2 devs, soporte y ventas)",
    amount: 2046,
    formatted: "2.046",
  },
  {
    label: "Costos fijos de operación (hosting, internet, licencias, pauta)",
    amount: 180,
    formatted: "180",
  },
  {
    label: "Costos variables (comisiones de cobro y transporte)",
    amount: 30,
    formatted: "30",
  },
] as const;

export const FINANCIAL_SUMMARY = {
  initialInvestment: 2900,
  initialInvestmentFormatted: "USD 2.900",
  monthlyOperatingCosts: 210,
  monthlyTalentCost: 2046,
  monthlyTotalCost: 2256,
  monthlyTotalCostFormatted: "2.256",
  subscriptionPrice: 20,
  projectedClients: 200,
  monthlyRevenue: 4000,
  monthlyRevenueFormatted: "4.000",
  monthlyNetResult: 1744,
  monthlyNetResultFormatted: "USD 1.744",
  marginPercent: "43,6 %",
  paybackMonths: 1.7,
  paybackFormatted: "1,7 meses",
  caveat:
    "Resultado preliminar sujeto a validar directamente en el mercado el precio de suscripción de USD 20 y alcanzar la proyección de 200 clientes mensuales (Cuadro 14, Guía APE 01).",
} as const;
