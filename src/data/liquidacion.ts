import ape04Url from "@/assets/pdfs/Trabajos Parcial 2/APE 04.pdf?url";
import liquidaciones12Url from "@/assets/pdfs/Trabajos Parcial 2/Liquidaciones_Laborales_David_Josue_Barragan_Pozo.pdf?url";
import laboralHackUrl from "@/assets/pdfs/Trabajos Parcial 2/Grupo2-Laboral Hackâ__Gincana digital de legislación laboral.pdf?url";
import videoDespidoUrl from "@/assets/pdfs/Trabajos Parcial 2/Video despido.pdf?url";

import thumbApe04 from "@/assets/thumbnails/unidad-4/ape-04.png";
import thumbLiquidaciones12 from "@/assets/thumbnails/unidad-4/liquidaciones-12.png";
import thumbLaboralHack from "@/assets/thumbnails/unidad-4/laboral-hack.png";
import thumbVideoDespido from "@/assets/thumbnails/unidad-4/video-despido.png";

import imgHeroDashboard from "@/assets/thumbnails/unidad-4/pazysalvo-hero-dashboard.png";
import imgUnidades from "@/assets/thumbnails/unidad-4/pazysalvo-unidades.png";
import imgAppCalculo from "@/assets/thumbnails/unidad-4/ape04-app-calculo.png";
import imgCertificadoPys from "@/assets/thumbnails/unidad-4/ape04-certificado-pys.png";
import imgLiquidacionPdf from "@/assets/thumbnails/unidad-4/ape04-liquidacion-pdf.png";

export type LiquidacionDocType =
  | "Informe principal"
  | "Práctica de casos"
  | "Gamificación"
  | "Evidencia audiovisual";

export interface LiquidacionDocument {
  id: string;
  code: string;
  shortLabel: string;
  title: string;
  description: string;
  fileName: string;
  relativePath: string;
  url: string;
  thumbnailUrl: string;
  unit: string;
  partial: string;
  documentType: LiquidacionDocType;
  date: string;
  pages: number;
  caseContext: string;
  relationToApe: string;
  isIntegrator?: boolean;
}

export interface ClearanceUnitStep {
  step: string;
  unit: string;
  verification: string;
}

export interface Ape04EvidenceVisual {
  id: string;
  tabLabel: string;
  figure: string;
  title: string;
  caption: string;
  imageUrl: string;
  aspectHint: "landscape" | "portrait";
}

export interface HypotheticalBreakdownRow {
  item: string;
  formulaNote: string;
  amount: string;
  isDeduction?: boolean;
}

export interface ScenarioComparisonBar {
  cause: string;
  netTotal: string;
  widthPct: number;
  highlight?: boolean;
}

export interface SolvedLiquidationCase {
  number: string;
  scenario: string;
  region: "Costa" | "Sierra" | "Oriente";
  period: string;
  salary: string;
  total: string;
  widthPct: number;
  mainDriver: string;
  hasIndemnityOrDesahucio: boolean;
}

export interface LaboralHackRun {
  member: string;
  score: number;
  time: string;
  note: string;
}

/** Captura principal de portada (Figura 1 de APE 04.pdf, 1440×900 nativa) */
export const LIQUIDACION_HERO_VISUAL = {
  imageUrl: imgHeroDashboard,
  alt: "Aplicación web PazySalvo — Expedientes de salida laboral (APE 04)",
  caption: "PazySalvo · Expediente EXP-2026-0001 (5/5 unidades aprobadas)",
} as const;

/**
 * Catálogo de los 4 archivos PDF originales de la Unidad IV.
 * Todos permanecen intactos en `src/assets/pdfs/Trabajos Parcial 2/`.
 */
export const LIQUIDACION_DOCUMENTS: readonly LiquidacionDocument[] = [
  {
    id: "ape-04",
    code: "APE 04",
    shortLabel: "Automatización PazySalvo y liquidación laboral",
    title: "Automatización del paz y salvo y la liquidación laboral — APE 04",
    description:
      "Aplicación web, caso hipotético, certificado de paz y salvo y liquidación en PDF.",
    fileName: "APE 04.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 2/APE 04.pdf",
    url: ape04Url,
    thumbnailUrl: thumbApe04,
    unit: "Unidad IV",
    partial: "Segundo Parcial",
    documentType: "Informe principal",
    date: "19 nov 2026",
    pages: 18,
    caseContext: "PazySalvo · Comercializadora Andina del Centro S.A.",
    relationToApe: "Informe integrador principal de la Unidad IV (Anexos A–E)",
    isIntegrator: true,
  },
  {
    id: "liquidaciones-12",
    code: "12 CASOS",
    shortLabel: "Doce casos resueltos de liquidaciones laborales",
    title: "Práctica de liquidaciones laborales — 12 casos resueltos",
    description:
      "Desahucio, despido intempestivo, acuerdo mutuo, obra, fallecimiento, extinción, fuerza mayor y visto bueno.",
    fileName: "Liquidaciones_Laborales_David_Josue_Barragan_Pozo.pdf",
    relativePath:
      "src/assets/pdfs/Trabajos Parcial 2/Liquidaciones_Laborales_David_Josue_Barragan_Pozo.pdf",
    url: liquidaciones12Url,
    thumbnailUrl: thumbLiquidaciones12,
    unit: "Unidad IV",
    partial: "Segundo Parcial",
    documentType: "Práctica de casos",
    date: "11 nov 2026",
    pages: 12,
    caseContext: "12 escenarios en Costa, Sierra y Oriente",
    relationToApe: "Práctica individual de aplicación (Temas 4.1 y 4.3)",
  },
  {
    id: "laboral-hack",
    code: "GAMIFICACIÓN",
    shortLabel: "Laboral Hack UTA y Gincana digital",
    title: "Laboral Hack — Gincana digital de legislación laboral (Grupo 2)",
    description:
      "Resultados del escape room (85/100 y 95/100) y Kahoot sobre Arts. 169–183 CT.",
    fileName:
      "Grupo2-Laboral Hackâ__Gincana digital de legislación laboral.pdf",
    relativePath:
      "src/assets/pdfs/Trabajos Parcial 2/Grupo2-Laboral Hackâ__Gincana digital de legislación laboral.pdf",
    url: laboralHackUrl,
    thumbnailUrl: thumbLaboralHack,
    unit: "Unidad IV",
    partial: "Segundo Parcial",
    documentType: "Gamificación",
    date: "10 nov 2026",
    pages: 10,
    caseContext: "Escape room Laboral Hack UTA + Kahoot (Grupo 2)",
    relationToApe: "Evidencia de gamificación de Unidad IV (Temas 4.1 y 4.2)",
  },
  {
    id: "video-despido",
    code: "VIDEO",
    shortLabel: "Video sobre despido laboral (Enlace y QR)",
    title: "Evidencia audiovisual — Video sobre despido laboral",
    description:
      "Hoja institucional con código QR y enlace a Google Drive.",
    fileName: "Video despido.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 2/Video despido.pdf",
    url: videoDespidoUrl,
    thumbnailUrl: thumbVideoDespido,
    unit: "Unidad IV",
    partial: "Segundo Parcial",
    documentType: "Evidencia audiovisual",
    date: "28 oct 2026",
    pages: 1,
    caseContext: "Google Drive + código QR",
    relationToApe: "Evidencia audiovisual complementaria (Temas 4.1 / 4.3)",
  },
] as const;

export function getLiquidacionDoc(id: string): LiquidacionDocument {
  const found = LIQUIDACION_DOCUMENTS.find((d) => d.id === id);
  if (!found) {
    throw new Error(`Documento de Unidad IV no encontrado: ${id}`);
  }
  return found;
}

/** 01 — Herramienta PazySalvo: capturas reales (sin márgenes de documento) y flujo */
export const PAZYSALVO_META = {
  externalLinks: [
    {
      label: "Abrir PazySalvo",
      url: "https://pazysalvo.madebyjohan.xyz/",
    },
    {
      label: "Repositorio en GitHub",
      url: "https://github.com/kiramman-mp3/sistema-paz-y-salvo-laboral",
    },
  ] as const,
  clearanceUnits: [
    {
      step: "01",
      unit: "Jefatura inmediata",
      verification: "Informe final y entrega del cargo",
    },
    {
      step: "02",
      unit: "Tecnologías (TI)",
      verification: "Devolución de equipos y bloqueo de cuentas",
    },
    {
      step: "03",
      unit: "Bodega y activos",
      verification: "Bienes asignados, credenciales y llaves",
    },
    {
      step: "04",
      unit: "Contabilidad",
      verification: "Anticipos, préstamos y caja chica",
    },
    {
      step: "05",
      unit: "Talento Humano",
      verification: "Vacaciones, aviso IESS y emisión PDF",
    },
  ] as readonly ClearanceUnitStep[],
  gallery: [
    {
      id: "calculo",
      tabLabel: "Cálculo y causales",
      figure: "Figura 7 · APE 04",
      title: "Motor de liquidación y comparador por causa",
      caption:
        "Calcula haberes, deducciones y valor neto en tiempo real comparando cada causal del Art. 169 CT.",
      imageUrl: imgAppCalculo,
      aspectHint: "landscape",
    },
    {
      id: "unidades",
      tabLabel: "Paz y salvo 5/5",
      figure: "Figura 5 · APE 04",
      title: "Verificación aprobada en las cinco unidades",
      caption:
        "El certificado oficial solo se emite cuando las cinco áreas registran aprobación y evidencias.",
      imageUrl: imgUnidades,
      aspectHint: "landscape",
    },
    {
      id: "certificado",
      tabLabel: "Certificado PDF",
      figure: "Anexo A · Figura 13",
      title: "Certificado de paz y salvo generado",
      caption:
        "Documento generado automáticamente con jsPDF e integrado al expediente digital en ZIP.",
      imageUrl: imgCertificadoPys,
      aspectHint: "portrait",
    },
    {
      id: "liquidacion",
      tabLabel: "Liquidación PDF",
      figure: "Anexo B · Figura 15",
      title: "Liquidación de haberes con anexo de vacaciones",
      caption:
        "Incluye desglose completo, neto en letras, cuatro firmas y control de períodos vacacionales.",
      imageUrl: imgLiquidacionPdf,
      aspectHint: "portrait",
    },
  ] as readonly Ape04EvidenceVisual[],
} as const;

/** 02 — Caso hipotético validado en APE 04 (Tablas 4, 5 y 6) */
export const APE04_HYPOTHETICAL_CASE = {
  employer: "Comercializadora Andina del Centro S.A.",
  worker: "Diego Fernando Sánchez Mora · Analista de Sistemas",
  metaLine: "Ambato (Sierra) · 4 años, 9 meses · Sueldo USD 1.050,00 · 26,25 días de vacaciones",
  sbuExerciseNote: "SBU del ejercicio académico 2026: USD 482,00 (Acuerdo MDT-2025-195).",
  netAmount: "USD 3.999,40",
  causeLabel: "Desahucio presentado por el trabajador",
  breakdown: [
    {
      item: "Remuneración pendiente",
      formulaNote: "30 días · octubre 2026",
      amount: "$1.050,00",
    },
    {
      item: "Décimo tercer sueldo",
      formulaNote: "330 / 360 días",
      amount: "$962,50",
    },
    {
      item: "Décimo cuarto sueldo",
      formulaNote: "90 / 360 · SBU $482",
      amount: "$120,50",
    },
    {
      item: "Vacaciones no gozadas",
      formulaNote: "26,25 días pendientes",
      amount: "$918,75",
    },
    {
      item: "Bonificación por desahucio",
      formulaNote: "25 % × 4,75 años",
      amount: "$1.246,88",
    },
    {
      item: "Aporte personal IESS (9,45 %)",
      formulaNote: "Deducción",
      amount: "−$99,23",
      isDeduction: true,
    },
    {
      item: "Anticipo de remuneración",
      formulaNote: "Autorizado 14/10/2026",
      amount: "−$200,00",
      isDeduction: true,
    },
  ] as readonly HypotheticalBreakdownRow[],
  scenarioComparison: [
    {
      cause: "Despido intempestivo",
      netTotal: "USD 9.249,40",
      widthPct: 100,
    },
    {
      cause: "Visto bueno del trabajador",
      netTotal: "USD 8.002,52",
      widthPct: 86.5,
    },
    {
      cause: "Desahucio del trabajador (caso base)",
      netTotal: "USD 3.999,40",
      widthPct: 43.2,
      highlight: true,
    },
    {
      cause: "Visto bueno del empleador / acuerdo",
      netTotal: "USD 2.752,52",
      widthPct: 29.8,
    },
  ] as readonly ScenarioComparisonBar[],
} as const;

/** 03 — 12 casos literales de `Liquidaciones_Laborales_David_Josue_Barragan_Pozo.pdf` */
export const TWELVE_LIQUIDATION_CASES: readonly SolvedLiquidationCase[] = [
  {
    number: "01",
    scenario: "Desahucio (ejercicio de clase)",
    region: "Costa",
    period: "2016 – 2026",
    salary: "$2.130,00",
    total: "$8.861,23",
    widthPct: 20.9,
    mainDriver: "Bonificación por desahucio $5.297,50",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "02",
    scenario: "Despido intempestivo (ejercicio de clase)",
    region: "Costa",
    period: "2016 – 2026",
    salary: "$2.134,00",
    total: "$32.395,57",
    widthPct: 76.3,
    mainDriver: "Indemnización por despido $23.474,00",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "03",
    scenario: "Terminación por acuerdo de las partes",
    region: "Sierra",
    period: "2016 – 2026",
    salary: "$2.134,00",
    total: "$8.376,46",
    widthPct: 19.7,
    mainDriver: "Bonificación por desahucio $5.335,00",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "04",
    scenario: "Desahucio de una analista",
    region: "Costa",
    period: "2020 – 2026",
    salary: "$1.250,00",
    total: "$2.525,09",
    widthPct: 5.9,
    mainDriver: "Bonificación por desahucio $1.875,00",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "05",
    scenario: "Conclusión de la obra contratada",
    region: "Oriente",
    period: "2024 – 2026",
    salary: "$1.780,00",
    total: "$3.410,79",
    widthPct: 8.0,
    mainDriver: "Décimos, vacaciones y $890,00 en desahucio",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "06",
    scenario: "Fallecimiento del trabajador",
    region: "Sierra",
    period: "2023 – 2026",
    salary: "$948,00",
    total: "$565,84",
    widthPct: 1.8,
    mainDriver: "Solo décimos y vacaciones",
    hasIndemnityOrDesahucio: false,
  },
  {
    number: "07",
    scenario: "Extinción de la persona jurídica empleadora",
    region: "Costa",
    period: "2010 – 2026",
    salary: "$2.400,00",
    total: "$3.378,19",
    widthPct: 8.0,
    mainDriver: "Décimos y vacaciones sin indemnización",
    hasIndemnityOrDesahucio: false,
  },
  {
    number: "08",
    scenario: "Fuerza mayor que imposibilita el trabajo",
    region: "Sierra",
    period: "2025 – 2026",
    salary: "$750,00",
    total: "$232,15",
    widthPct: 1.2,
    mainDriver: "Solo décimos y vacaciones",
    hasIndemnityOrDesahucio: false,
  },
  {
    number: "09",
    scenario: "Visto bueno solicitado por el empleador",
    region: "Costa",
    period: "2022 – 2026",
    salary: "$1.098,00",
    total: "$1.671,84",
    widthPct: 3.9,
    mainDriver: "Décimos y vacaciones sin indemnización",
    hasIndemnityOrDesahucio: false,
  },
  {
    number: "10",
    scenario: "Visto bueno solicitado por el trabajador",
    region: "Oriente",
    period: "2017 – 2026",
    salary: "$1.650,00",
    total: "$21.097,75",
    widthPct: 49.7,
    mainDriver: "Indemnización $16.500,00 + desahucio $3.712,50",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "11",
    scenario: "Despido intempestivo (jefe de operaciones)",
    region: "Sierra",
    period: "2012 – 2026",
    salary: "$2.100,00",
    total: "$42.439,50",
    widthPct: 100,
    mainDriver: "Despido $31.500,00 + desahucio $7.350,00",
    hasIndemnityOrDesahucio: true,
  },
  {
    number: "12",
    scenario: "Desahucio con antigüedad extensa (+20 años)",
    region: "Costa",
    period: "2005 – 2026",
    salary: "$2.800,00",
    total: "$18.481,57",
    widthPct: 43.5,
    mainDriver: "Bonificación por desahucio $14.700,00",
    hasIndemnityOrDesahucio: true,
  },
] as const;

/** 04 — Gamificación (Laboral Hack + Kahoot) y Video sobre despido */
export const GAMIFICATION_DATA = {
  runs: [
    {
      member: "Maybelline Navarro",
      score: 95,
      time: "02:49",
      note: "19 / 20 correctas",
    },
    {
      member: "David Barragán",
      score: 95,
      time: "03:15",
      note: "19 / 20 · sin pistas",
    },
    {
      member: "José Manzano",
      score: 85,
      time: "04:51",
      note: "17 / 20 correctas",
    },
  ] as readonly LaboralHackRun[],
  kahootTitle: "Misión Laboral: Terminación del contrato (Arts. 169–183 CT)",
  kahootUrl:
    "https://play.kahoot.it/v2/lobby?quizId=60fa5760-9148-4f3e-a5e9-47f3dc3e7fe3",
} as const;

export const VIDEO_DESPIDO_DATA = {
  title: "Video sobre despido laboral",
  date: "28 oct 2026",
  driveUrl:
    "https://drive.google.com/file/d/1YEwiOBHODfVTFRRY8--plmEKaFhCMmxY/view?usp=sharing",
  previewImageUrl: thumbVideoDespido,
} as const;
