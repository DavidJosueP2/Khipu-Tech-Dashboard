/**
 * Metadatos centralizados de la plataforma KhipuTech Rotación.
 * Basados estrictamente en `docs/clasificacion-documental.md` y `Guia Ape 01.pdf`.
 * Conserva los nombres reales de los casos prácticos propios de cada unidad.
 */

export type ModuleId = "01" | "02" | "03" | "04";

export type AtlasHighlight = "home" | "modules" | "semester" | ModuleId;

export interface MixedTitleComposition {
  /** Fragmento en Plus Jakarta Sans Bold antes de la palabra serif italic */
  before?: string;
  /** Palabra o sintagma destacado en Apparel Display Italic (exclusivamente italic) */
  serifItalic: string;
  /** Fragmento en Plus Jakarta Sans Bold después de la palabra serif italic */
  after?: string;
}

export interface ModuleDefinition {
  id: ModuleId;
  slug: "emprendimiento" | "tributacion" | "nomina" | "liquidacion";
  path: `/${string}`;
  navLabel: string;
  fullName: string;
  titleComposition: MixedTitleComposition;
  unit: string;
  unitNumber: "I" | "II" | "III" | "IV";
  partial: "Primer Parcial" | "Segundo Parcial";
  periodLabel: string;
  developmentStage: string;
  accentVar: string;
  iconName: "compass" | "landmark" | "users" | "scale";
  projectCase: string;
  apeReference: string;
  apeCount: number;
  workCount: number;
  totalDeliverables: number;
  shortDescription: string;
  scopeSummary: string;
  keyTopics: readonly string[];
}

export interface NavItem {
  id: "inicio" | ModuleId;
  label: string;
  number?: ModuleId;
  path: string;
}

export interface SemesterUnitItem {
  unitLabel: string;
  unitNumber: "I" | "II" | "III" | "IV";
  title: string;
  referenceDocsCount: number;
  deliverablesCount: number;
  apeFile: string;
  worksLabel: string;
  moduleId: ModuleId;
  modulePath: string;
  moduleName: string;
  synthesis: string;
}

export interface SemesterPartial {
  id: "parcial-1" | "parcial-2";
  index: "P1" | "P2";
  name: string;
  timeframe: string;
  deliverablesTotal: number;
  apeTotal: number;
  summary: string;
  units: readonly SemesterUnitItem[];
}

export const BRAND = {
  company: "KhipuTech",
  product: "KhipuTech",
  taglineBefore: "Control inteligente de lotes y alertas tempranas ",
  taglineItalic: "antes de que caduque tu inventario.",
  shortDescription:
    "Plataforma SaaS en la nube y aplicación móvil para farmacias, minimarkets y distribuidoras que sustituye el control manual por trazabilidad automatizada y prevención de mermas.",
  originNote:
    "Fusión de Khipu —sistema andino de registro y organización de información— y Tech —ingeniería de software escalable en la nube.",
} as const;

export const INSTITUTION = {
  university: "Universidad Técnica de Ambato",
  shortUniversity: "UTA",
  faculty: "Facultad de Ingeniería en Sistemas, Electrónica e Industrial",
  shortFaculty: "FISEI",
  program: "Carrera de Software",
  level: 'Octavo "A"',
  course: "Emprendimiento y Legislación Laboral",
  cycle: "Julio – Diciembre 2026",
  professor: "Ing. María Francisca Cazorla Logroño, Mg.",
  team: [
    "David Josué Barragán Pozo",
    "José Gabriel Manzano Bahamonde",
    "Maybelline Estefanía Navarro Pazmiño",
    "Johan Gabriel Rodríguez Núñez",
  ] as const,
  metrics: {
    modulesCount: 4,
    apeGuidesCount: 4,
    studentDeliverablesCount: 22,
    ordinaryAndEvidenceCount: 18,
    referenceMaterialsCount: 21,
    totalPdfCatalogCount: 43,
    partialsCount: 2,
    unitsCount: 4,
  } as const,
} as const;

export const MODULES: readonly ModuleDefinition[] = [
  {
    id: "01",
    slug: "emprendimiento",
    path: "/emprendimiento",
    navLabel: "Emprendimiento",
    fullName: "Emprendimiento",
    titleComposition: {
      serifItalic: "Emprendimiento",
      after: " empresarial",
    },
    unit: "Unidad I",
    unitNumber: "I",
    partial: "Primer Parcial",
    periodLabel: "Agosto – Septiembre 2026",
    developmentStage: "Etapa 4",
    accentVar: "var(--module-01)",
    iconName: "compass",
    projectCase: "KhipuTech",
    apeReference: "Guia Ape 01.pdf",
    apeCount: 1,
    workCount: 5,
    totalDeliverables: 6,
    shortDescription:
      "Formulación de oportunidad de negocio, Business Model Canvas, perfil estratégico, estudio de mercado, operación y viabilidad financiera de KhipuTech.",
    scopeSummary:
      "Consolida las cinco fases de diseño empresarial integradas en el Plan de Negocios de la Guía APE 01.",
    keyTopics: [
      "Oportunidad de negocio",
      "Business Model Canvas",
      "Perfil estratégico y FODA",
      "Mercado y operación",
      "Viabilidad financiera",
    ],
  },
  {
    id: "02",
    slug: "tributacion",
    path: "/tributacion",
    navLabel: "Tributación",
    fullName: "Obligaciones tributarias",
    titleComposition: {
      before: "Obligaciones ",
      serifItalic: "tributarias",
    },
    unit: "Unidad II",
    unitNumber: "II",
    partial: "Primer Parcial",
    periodLabel: "Septiembre 2026",
    developmentStage: "Etapa 5",
    accentVar: "var(--module-02)",
    iconName: "landmark",
    projectCase: "KhipuTech Cía. Ltda. e INDUMETAL S.A.",
    apeReference: "Guia Ape 02.pdf",
    apeCount: 1,
    workCount: 7,
    totalDeliverables: 8,
    shortDescription:
      "Formalización RUC y CIIU, emisión en Facturador SRI, comprobantes y declaración de IVA (caso INDUMETAL S.A.), registro de marca SENADI e importaciones tecnológicas.",
    scopeSummary:
      "Reúne los procedimientos tributarios y trámites de formalización consolidados en la Guía APE 02 junto con la práctica inicial de contratación PYME.",
    keyTopics: [
      "RUC y actividades CIIU",
      "Facturador SRI",
      "Comprobantes y declaración de IVA",
      "Registro de marca SENADI",
      "Importaciones tecnológicas",
    ],
  },
  {
    id: "03",
    slug: "nomina",
    path: "/nomina",
    navLabel: "Nómina",
    fullName: "Remuneraciones y nómina",
    titleComposition: {
      serifItalic: "Remuneraciones",
      after: " y nómina",
    },
    unit: "Unidad III",
    unitNumber: "III",
    partial: "Segundo Parcial",
    periodLabel: "Octubre 2026",
    developmentStage: "Etapa 6",
    accentVar: "var(--module-03)",
    iconName: "users",
    projectCase: "TechInstall Solutions",
    apeReference: "APE 03.pdf",
    apeCount: 1,
    workCount: 3,
    totalDeliverables: 4,
    shortDescription:
      "Regímenes de contratación laboral en Ecuador, modos de producción, análisis jurisprudencial, orgánico funcional y automatización de roles de pago y aportes IESS (caso TechInstall Solutions).",
    scopeSummary:
      "Integra el análisis comparativo de siete contratos laborales, evidencias normativas y la herramienta de remuneraciones de la APE 03.",
    keyTopics: [
      "Regímenes CT, LOSEP, LOEP y LOES",
      "Orgánico funcional",
      "Salarios y horas extras",
      "Beneficios sociales e IESS",
      "Roles de pago automatizados",
    ],
  },
  {
    id: "04",
    slug: "liquidacion",
    path: "/liquidacion",
    navLabel: "Liquidación",
    fullName: "Liquidación laboral",
    titleComposition: {
      before: "Liquidación ",
      serifItalic: "laboral",
    },
    unit: "Unidad IV",
    unitNumber: "IV",
    partial: "Segundo Parcial",
    periodLabel: "Octubre – Noviembre 2026",
    developmentStage: "Etapa 7",
    accentVar: "var(--module-04)",
    iconName: "scale",
    projectCase: "Expediente Digital y Paz y Salvo",
    apeReference: "APE 04.pdf",
    apeCount: 1,
    workCount: 3,
    totalDeliverables: 4,
    shortDescription:
      "Causales de terminación del contrato (Arts. 169–183 CT), protección por enfermedad no profesional, 12 casos resueltos de liquidación y automatización web del paz y salvo.",
    scopeSummary:
      "Centraliza las prácticas de cálculo de liquidaciones, evidencias de legislación laboral y la herramienta documental de la APE 04.",
    keyTopics: [
      "Formas de terminación laboral",
      "Desahucio y despido intempestivo",
      "12 casos de liquidación",
      "Automatización de paz y salvo",
      "Expediente y certificados PDF",
    ],
  },
] as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "inicio", label: "Inicio", path: "/" },
  ...MODULES.map((mod) => ({
    id: mod.id,
    number: mod.id,
    label: mod.navLabel,
    path: mod.path,
  })),
];

export const SEMESTER_PARTIALS: readonly SemesterPartial[] = [
  {
    id: "parcial-1",
    index: "P1",
    name: "Primer Parcial",
    timeframe: "Agosto – Septiembre 2026",
    deliverablesTotal: 14,
    apeTotal: 2,
    summary:
      "Concepción empresarial y evaluación económica de KhipuTech (Unidad I), seguidas de sus obligaciones tributarias, registrales y trámites de formalización (Unidad II).",
    units: [
      {
        unitLabel: "Unidad I",
        unitNumber: "I",
        title: "Plan de negocios para PYMES",
        referenceDocsCount: 6,
        deliverablesCount: 6,
        apeFile: "Guia Ape 01.pdf",
        worksLabel: "Tareas 01 a 05",
        moduleId: "01",
        modulePath: "/emprendimiento",
        moduleName: "Emprendimiento",
        synthesis:
          "Oportunidad, Canvas, perfil estratégico, mercado/operación y estudio económico integrados en KhipuTech.",
      },
      {
        unitLabel: "Unidad II",
        unitNumber: "II",
        title: "Obligaciones tributarias y trámites de formalización",
        referenceDocsCount: 6,
        deliverablesCount: 8,
        apeFile: "Guia Ape 02.pdf",
        worksLabel: "Tareas 06 a 12",
        moduleId: "02",
        modulePath: "/tributacion",
        moduleName: "Obligaciones tributarias",
        synthesis:
          "RUC y CIIU, Facturador SRI, caso INDUMETAL S.A., declaración de IVA, marca SENADI, importaciones y contratación PYME.",
      },
    ],
  },
  {
    id: "parcial-2",
    index: "P2",
    name: "Segundo Parcial",
    timeframe: "Octubre – Noviembre 2026",
    deliverablesTotal: 8,
    apeTotal: 2,
    summary:
      "Marco jurídico-laboral, estructuras salariales y automatización de nómina (Unidad III), cerrando con la terminación contractual y liquidaciones documentales (Unidad IV).",
    units: [
      {
        unitLabel: "Unidad III",
        unitNumber: "III",
        title: "Contratación laboral, deberes, derechos y remuneraciones",
        referenceDocsCount: 5,
        deliverablesCount: 4,
        apeFile: "APE 03.pdf",
        worksLabel: "3 entregables y análisis normativos",
        moduleId: "03",
        modulePath: "/nomina",
        moduleName: "Remuneraciones y nómina",
        synthesis:
          "Modos de producción, análisis jurisprudencial, comparativa de siete regímenes y aplicación de roles de pago (TechInstall Solutions).",
      },
      {
        unitLabel: "Unidad IV",
        unitNumber: "IV",
        title: "Terminación del contrato y automatización de liquidaciones",
        referenceDocsCount: 4,
        deliverablesCount: 4,
        apeFile: "APE 04.pdf",
        worksLabel: "3 prácticas y evidencias",
        moduleId: "04",
        modulePath: "/liquidacion",
        moduleName: "Liquidación laboral",
        synthesis:
          "Arts. 169–183 CT, gincana digital, 12 liquidaciones resueltas y plataforma web de paz y salvo con generación de PDF.",
      },
    ],
  },
] as const;

export function getModuleBySlug(
  slug: ModuleDefinition["slug"]
): ModuleDefinition {
  const found = MODULES.find((m) => m.slug === slug);
  if (!found) {
    throw new Error(`Módulo no registrado: ${slug}`);
  }
  return found;
}

export function getAdjacentModules(id: ModuleId): {
  previous: ModuleDefinition | null;
  next: ModuleDefinition | null;
} {
  const idx = MODULES.findIndex((m) => m.id === id);
  return {
    previous: idx > 0 ? MODULES[idx - 1] : null,
    next: idx >= 0 && idx < MODULES.length - 1 ? MODULES[idx + 1] : null,
  };
}
