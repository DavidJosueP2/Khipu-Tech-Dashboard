import guiaApe02Url from "@/assets/pdfs/Trabajos Parcial 1/Guia Ape 02.pdf?url";
import tarea06Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 06 Unidad 1.pdf?url";
import tarea07Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 07 Unidad 1.pdf?url";
import tarea08Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 08 Unidad 1.pdf?url";
import tarea09Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 09 Unidad 1.pdf?url";
import tarea10Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 10 Unidad 1.pdf?url";
import tarea11Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 11 Unidad 1.pdf?url";
import tarea12Url from "@/assets/pdfs/Trabajos Parcial 1/TAREA 12 Unidad 1.pdf?url";

import thumbApe02 from "@/assets/thumbnails/unidad-2/guia-ape-02.png";
import thumbTarea06 from "@/assets/thumbnails/unidad-2/tarea-06.png";
import thumbTarea07 from "@/assets/thumbnails/unidad-2/tarea-07.png";
import thumbTarea08 from "@/assets/thumbnails/unidad-2/tarea-08.png";
import thumbTarea09 from "@/assets/thumbnails/unidad-2/tarea-09.png";
import thumbTarea10 from "@/assets/thumbnails/unidad-2/tarea-10.png";
import thumbTarea11 from "@/assets/thumbnails/unidad-2/tarea-11.png";
import thumbTarea12 from "@/assets/thumbnails/unidad-2/tarea-12.png";

export type TributacionCategory =
  | "formalizacion"
  | "comprobantes-iva"
  | "marca-comercio"
  | "laboral-pyme"
  | "expediente-ape";

export interface TributacionDocument {
  id: string;
  code: string;
  shortLabel: string;
  title: string;
  description: string;
  fileName: string;
  relativePath: string;
  url: string;
  thumbnailUrl: string;
  category: TributacionCategory;
  unit: string;
  partial: string;
  documentType: "Informe principal" | "Evidencia";
  date: string;
  pages: number;
  caseContext: string;
  relationToApe: string;
  isIntegrator?: boolean;
}

export interface CiiuActivity {
  code: string;
  role: string;
  shortTitle: string;
  primary?: boolean;
}

export interface CommercialDocChip {
  name: string;
  amount: string;
  affectsIva: boolean;
}

export interface ImportProductItem {
  rank: string;
  product: string;
  valueUsd: string;
  shareWidthPct: number;
  origin: string;
}

export interface HiringStepItem {
  step: string;
  label: string;
  shortNote: string;
}

/**
 * Catálogo de los ocho PDF originales de la Unidad II con miniaturas reales de portada.
 * Todos los archivos PDF permanecen intactos en `src/assets/pdfs/Trabajos Parcial 1/`.
 */
export const TRIBUTACION_DOCUMENTS: readonly TributacionDocument[] = [
  {
    id: "ape-02",
    code: "APE 02",
    shortLabel: "Expediente tributario integral (APE 02)",
    title: "Obligaciones tributarias de una PYME tecnológica (Guía APE N.° 2)",
    description:
      "Informe formal, matriz de 10 obligaciones y Anexo A (41 págs.) con evidencias de Tareas 06 a 11 y Formulario 2011 completo.",
    fileName: "Guia Ape 02.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/Guia Ape 02.pdf",
    url: guiaApe02Url,
    thumbnailUrl: thumbApe02,
    category: "expediente-ape",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Informe principal",
    date: "Sep 2026",
    pages: 41,
    caseContext: "PYME tecnológica e INDUMETAL S.A.",
    relationToApe: "Expediente principal (consolida Tareas 06 a 11 en Anexo A)",
    isIntegrator: true,
  },
  {
    id: "tarea-06",
    code: "TAREA 06",
    shortLabel: "TAREA 06 · RUC y actividades CIIU",
    title: "Taller individual: RUC y formalización",
    description:
      "Simulación de RUC, selección de tres códigos CIIU de software y catastro comparado de cinco empresas reales.",
    fileName: "TAREA 06 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 06 Unidad 1.pdf",
    url: tarea06Url,
    thumbnailUrl: thumbTarea06,
    category: "formalizacion",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "01 sep 2026",
    pages: 8,
    caseContext: "Emprendimiento de software",
    relationToApe: "Integrado en Guia Ape 02.pdf (págs. 5–10)",
  },
  {
    id: "tarea-07",
    code: "TAREA 07",
    shortLabel: "TAREA 07 · Facturador SRI",
    title: "Emisión de factura electrónica — Facturador SRI",
    description:
      "Comprobante electrónico simulado por USD 20,00 + IVA 15 % (USD 3,00) = USD 23,00 en el portal oficial del SRI.",
    fileName: "TAREA 07 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 07 Unidad 1.pdf",
    url: tarea07Url,
    thumbnailUrl: thumbTarea07,
    category: "formalizacion",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "02 sep 2026",
    pages: 3,
    caseContext: "Portal Facturador SRI",
    relationToApe: "Integrado en Guia Ape 02.pdf (págs. 11–13)",
  },
  {
    id: "tarea-08",
    code: "TAREA 08",
    shortLabel: "TAREA 08 · Caso INDUMETAL S.A.",
    title: "Documentos comerciales y declaración del IVA — Caso INDUMETAL S.A.",
    description:
      "Seis comprobantes comerciales (facturas, guía, retención 1 %, notas de crédito/débito) y liquidación de IVA.",
    fileName: "TAREA 08 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 08 Unidad 1.pdf",
    url: tarea08Url,
    thumbnailUrl: thumbTarea08,
    category: "comprobantes-iva",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "08 sep 2026",
    pages: 18,
    caseContext: "INDUMETAL S.A. (Ambato)",
    relationToApe: "Integrado en Guia Ape 02.pdf (págs. 14–30)",
  },
  {
    id: "tarea-09",
    code: "TAREA 09",
    shortLabel: "TAREA 09 · Formulario 2011 SRI",
    title: "Declaración de IVA en SRI Servicios en Línea (Formulario 2011)",
    description:
      "Captura breve (2 págs.) de la declaración sustitutiva de IVA — agosto 2026; versión completa (5 págs.) en APE 02.",
    fileName: "TAREA 09 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 09 Unidad 1.pdf",
    url: tarea09Url,
    thumbnailUrl: thumbTarea09,
    category: "comprobantes-iva",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "09 sep 2026",
    pages: 2,
    caseContext: "SRI Servicios en Línea · Cód. 2011",
    relationToApe: "Versión ampliada (5 págs.) en Guia Ape 02.pdf (págs. 31–35)",
  },
  {
    id: "tarea-10",
    code: "TAREA 10",
    shortLabel: "TAREA 10 · Registro SENADI",
    title: "Simulación del registro de marca ante el SENADI",
    description:
      "Signo mixto KHIPUTECH, búsqueda fonética/visual (SENADI y OMPI), clasificación en Clase 42 de Niza y solicitud.",
    fileName: "TAREA 10 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 10 Unidad 1.pdf",
    url: tarea10Url,
    thumbnailUrl: thumbTarea10,
    category: "marca-comercio",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "15 sep 2026",
    pages: 5,
    caseContext: "KhipuTech Cía. Ltda. · Clase 42",
    relationToApe: "Integrado en Guia Ape 02.pdf (págs. 36–40)",
  },
  {
    id: "tarea-11",
    code: "TAREA 11",
    shortLabel: "TAREA 11 · Top 5 importaciones",
    title: "Top 5 de productos tecnológicos que más importa Ecuador (2024)",
    description:
      "Infografía de comercio exterior tecnológico 2024 (WITS / OMC): smartphones, televisores, convertidores y hardware.",
    fileName: "TAREA 11 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 11 Unidad 1.pdf",
    url: tarea11Url,
    thumbnailUrl: thumbTarea11,
    category: "marca-comercio",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "16 sep 2026",
    pages: 1,
    caseContext: "Ecuador 2024 · WITS / OMC",
    relationToApe: "Integrado en Guia Ape 02.pdf (pág. 41)",
  },
  {
    id: "tarea-12",
    code: "TAREA 12",
    shortLabel: "TAREA 12 · Contratación PYME",
    title: "Aplicación práctica: Contratación de personal para una PYME",
    description:
      "Verificaciones, vacante Encuentra Empleo, simulación de afiliación IESS (USD 1.200) y acuerdo laboral (Tema 2.5).",
    fileName: "TAREA 12 Unidad 1.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 1/TAREA 12 Unidad 1.pdf",
    url: tarea12Url,
    thumbnailUrl: thumbTarea12,
    category: "laboral-pyme",
    unit: "Unidad II",
    partial: "Primer Parcial",
    documentType: "Evidencia",
    date: "22 sep 2026",
    pages: 14,
    caseContext: "KhipuTech Cía. Ltda. · Tema 2.5",
    relationToApe: "Entrega independiente de Unidad II (fuera de APE 02)",
  },
] as const;

export function getTributacionDoc(id: string): TributacionDocument {
  const found = TRIBUTACION_DOCUMENTS.find((d) => d.id === id);
  if (!found) {
    throw new Error(`Documento de Unidad II no encontrado: ${id}`);
  }
  return found;
}

/** Escena 01 / 04 — RUC, CIIU y Facturador SRI */
export const CIIU_ACTIVITIES: readonly CiiuActivity[] = [
  {
    code: "J62010101",
    role: "Actividad principal",
    shortTitle: "Diseño y programación de aplicaciones, bases de datos y web",
    primary: true,
  },
  {
    code: "J62021001",
    role: "Adicional 1",
    shortTitle: "Planificación y diseño de sistemas informáticos integrados",
  },
  {
    code: "J62022001",
    role: "Adicional 2",
    shortTitle: "Gestión y operación de sistemas informáticos de clientes",
  },
] as const;

export const FACTURA_SRI_VISUAL = {
  date: "02 sep 2026",
  concept: "Servicio de plataforma digital",
  subtotal: "USD 20,00",
  iva: "USD 3,00",
  ivaRate: "15 %",
  total: "USD 23,00",
  catastroCount: "5",
  catastroSplit: "3 tecnológicas · 2 manufactura/comercio",
} as const;

/** Escena 02 / 04 — Documentos comerciales e IVA (Caso INDUMETAL S.A.) */
export const INDUMETAL_DOCS: readonly CommercialDocChip[] = [
  { name: "Factura compra", amount: "$2.100", affectsIva: true },
  { name: "Guía remisión", amount: "Traslado", affectsIva: false },
  { name: "Retención 1 %", amount: "$21", affectsIva: false },
  { name: "Factura venta", amount: "$720", affectsIva: true },
  { name: "Nota crédito", amount: "−$180", affectsIva: true },
  { name: "Nota débito", amount: "+$30", affectsIva: true },
] as const;

export const INDUMETAL_IVA_VISUAL = {
  company: "INDUMETAL S.A.",
  purchasesBase: "$2.100,00",
  purchasesIva: 315,
  purchasesIvaFormatted: "315,00",
  netSalesBase: "$570,00",
  netSalesIva: 85.5,
  netSalesIvaFormatted: "85,50",
  taxCreditFormatted: "USD 229,50",
  formNote: "Formulario 2011 · SRI Servicios en Línea · Período agosto 2026",
} as const;

/** Escena 03 / 04 — SENADI e Importaciones Ecuador 2024 */
export const SENADI_VISUAL = {
  applicant: "KhipuTech Cía. Ltda.",
  sign: "KHIPUTECH </>",
  niceClass: "Clase 42",
  niceSubtitle: "Clasificación Internacional de Niza",
  pillars: [
    "Signo mixto (denominativo + isotipo «K»)",
    "Software, plataformas SaaS y nube",
    "Búsqueda en SENADI y OMPI",
  ] as const,
} as const;

export const ECUADOR_TECH_IMPORTS_2024: readonly ImportProductItem[] = [
  {
    rank: "01",
    product: "Smartphones",
    valueUsd: "US$ 413,9 M",
    shareWidthPct: 100,
    origin: "China · Vietnam · Hong Kong",
  },
  {
    rank: "02",
    product: "Televisores",
    valueUsd: "US$ 172,8 M",
    shareWidthPct: 41.7,
    origin: "1,55 M uds · China · Indonesia",
  },
  {
    rank: "03",
    product: "Convertidores estáticos",
    valueUsd: "US$ 95,1 M",
    shareWidthPct: 23,
    origin: "8,73 M uds · China · EE. UU.",
  },
  {
    rank: "04",
    product: "Equipos de datos",
    valueUsd: "US$ 33,8 M",
    shareWidthPct: 8.2,
    origin: "244 mil uds · EE. UU. · Singapur",
  },
  {
    rank: "05",
    product: "Circuitos integrados",
    valueUsd: "US$ 27,2 M",
    shareWidthPct: 6.6,
    origin: "China · Indonesia · Vietnam",
  },
] as const;

/** Escena 04 / 04 — Contratación PYME (TAREA 12 · Tema 2.5) */
export const PYME_HIRING_STEPS: readonly HiringStepItem[] = [
  {
    step: "1",
    label: "Verificaciones",
    shortNote: "Antecedentes penales limpios y filtros legales",
  },
  {
    step: "2",
    label: "Encuentra Empleo",
    shortNote: "Vacante Analista de Base de Datos · 40 h/sem",
  },
  {
    step: "3",
    label: "Afiliación IESS",
    shortNote: "Aviso de entrada desde el primer día (05 oct 2026)",
  },
  {
    step: "4",
    label: "Acuerdo laboral",
    shortNote: "Jornada, remuneración y 15 días de vacaciones",
  },
] as const;

export const PYME_HIRE_KPIS = [
  { value: "USD 1.200", label: "sueldo mensual simulado en aviso IESS" },
  { value: "40 h", label: "jornada semanal completa (lunes a viernes)" },
  { value: "05 oct", label: "fecha de ingreso y afiliación obligatoria día 1" },
  { value: "15 días", label: "vacaciones anuales reconocidas al trabajador" },
] as const;
