import ape03Url from "@/assets/pdfs/Trabajos Parcial 2/APE 03.pdf?url";
import modosProduccionUrl from "@/assets/pdfs/Trabajos Parcial 2/Barragan Modos de producción.pdf?url";
import infografiaJuridicoUrl from "@/assets/pdfs/Trabajos Parcial 2/Infografia Caso Juridico Laboral.pdf?url";
import avancePreliminarUrl from "@/assets/pdfs/Trabajos Parcial 2/Contratación laboral, deberes y derechos.pdf?url";

import thumbApe03 from "@/assets/thumbnails/unidad-3/ape-03.png";
import thumbModos from "@/assets/thumbnails/unidad-3/modos-produccion.png";
import thumbInfografia from "@/assets/thumbnails/unidad-3/infografia-juridico.png";
import thumbAvancePreliminar from "@/assets/thumbnails/unidad-3/avance-preliminar-ape-03.png";
import imgOrganigrama from "@/assets/thumbnails/unidad-3/ape03-organigrama.png";
import imgAppSimulador from "@/assets/thumbnails/unidad-3/ape03-app-simulador.png";
import imgAppResumen from "@/assets/thumbnails/unidad-3/ape03-app-resumen.png";
import imgAppBoleta from "@/assets/thumbnails/unidad-3/ape03-app-boleta.png";

export type NominaDocType =
  | "Informe principal"
  | "Trabajo complementario"
  | "Infografía"
  | "Avance preliminar";

export interface NominaDocument {
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
  documentType: NominaDocType;
  date: string;
  pages: number;
  caseContext: string;
  relationToApe: string;
  isIntegrator?: boolean;
  isPreliminary?: boolean;
}

export interface RegimeComparisonItem {
  regime: string;
  modality: string;
  schedule: string;
  iessRates: string;
  stabilityNote: string;
}

export interface AnalyzedContractCase {
  number: string;
  institution: string;
  role: string;
  regime: string;
  remuneration: string;
  stability: string;
}

export interface FictionalContractCheck {
  caseLabel: string;
  employer: string;
  regime: string;
  finding: string;
  verdict: string;
}

export interface ProductionModeItem {
  mode: string;
  control: string;
  organization: string;
  workerRisk: string;
}

export interface ManabiCantonBar {
  canton: string;
  contracts: string;
  widthPct: number;
}

export interface OrganigramaRoleGroup {
  role: string;
  level: string;
  regime: string;
  reportsTo: string;
  headcount: string;
  responsibility: string;
  isValidationProfile?: boolean;
}

export interface PayrollRow {
  role: string;
  collaborator: string;
  baseSalary: string;
  taxableBase: string;
  iessPersonal: string;
  incomeTax: string;
  thirteenth: string;
  fourteenth: string;
  reserveFunds: string;
  netPay: string;
  employerCost: string;
  isPublicTest?: boolean;
}

export interface IessReconciliationRow {
  concept: string;
  rate: string;
  amount: string;
  basis: string;
  widthPct: number;
}

export interface AppEvidenceScreen {
  id: string;
  figure: string;
  title: string;
  scope: string;
  caption: string;
  imageUrl: string;
  pageRef: string;
}

/**
 * Catálogo documental de los 4 archivos PDF originales de la Unidad III.
 * Los archivos permanecen intactos en `src/assets/pdfs/Trabajos Parcial 2/`.
 */
export const NOMINA_DOCUMENTS: readonly NominaDocument[] = [
  {
    id: "ape-03",
    code: "APE 03",
    shortLabel: "Informe definitivo APE 03 · TechInstall Solutions",
    title: "Contratación laboral, deberes y derechos — Informe definitivo APE 03",
    description:
      "Informe integrador definitivo (25 oct 2026): análisis de 7 contratos, organigrama funcional, planilla mensual consolidada (12 registros), conciliación IESS y capturas web/móvil de la app.",
    fileName: "APE 03.pdf",
    relativePath: "src/assets/pdfs/Trabajos Parcial 2/APE 03.pdf",
    url: ape03Url,
    thumbnailUrl: thumbApe03,
    unit: "Unidad III",
    partial: "Segundo Parcial",
    documentType: "Informe principal",
    date: "25 oct 2026",
    pages: 44,
    caseContext: "TechInstall Solutions (RUC 1790000000001)",
    relationToApe:
      "Informe integrador definitivo de la Unidad III (Anexos 1 al 5)",
    isIntegrator: true,
  },
  {
    id: "avance-preliminar-ape-03",
    code: "AVANCE APE 03",
    shortLabel: "Avance preliminar APE 03 — 20 de octubre de 2026",
    title: "Avance preliminar APE 03 — 20 de octubre de 2026",
    description:
      "Evidencia histórica del avance previo del proyecto: contiene la plantilla inicial PEA N.º 3 y capturas preliminares del sistema, posteriormente consolidados en el APE 03 definitivo.",
    fileName: "Contratación laboral, deberes y derechos.pdf",
    relativePath:
      "src/assets/pdfs/Trabajos Parcial 2/Contratación laboral, deberes y derechos.pdf",
    url: avancePreliminarUrl,
    thumbnailUrl: thumbAvancePreliminar,
    unit: "Unidad III",
    partial: "Segundo Parcial",
    documentType: "Avance preliminar",
    date: "20 oct 2026",
    pages: 30,
    caseContext: "Entrega previa consolidada en APE 03.pdf",
    relationToApe:
      "Avance preliminar APE 03 — 20 de octubre de 2026 (evidencia histórica; no es un segundo APE)",
    isPreliminary: true,
  },
  {
    id: "modos-produccion",
    code: "CONTRATOS Y MDT",
    shortLabel: "Contratos (CT, LOSEP, LOES), modos de producción y Manabí",
    title:
      "Análisis comparativo de contratos, matriz de modos de producción y mercado laboral de Manabí",
    description:
      "Tres contratos comparados (Código del Trabajo, LOSEP y LOES), matriz de cinco modos de producción y análisis MDT de 143.918 contratos vigentes en Manabí.",
    fileName: "Barragan Modos de producción.pdf",
    relativePath:
      "src/assets/pdfs/Trabajos Parcial 2/Barragan Modos de producción.pdf",
    url: modosProduccionUrl,
    thumbnailUrl: thumbModos,
    unit: "Unidad III",
    partial: "Segundo Parcial",
    documentType: "Trabajo complementario",
    date: "07 oct 2026",
    pages: 6,
    caseContext: "Análisis contractual y contexto MDT (Manabí)",
    relationToApe:
      "Trabajo complementario de Unidad III (Temas 3.1 y 3.2; análisis contractual y contexto)",
  },
  {
    id: "infografia-juridico",
    code: "CASO JURÍDICO",
    shortLabel: "Infografía · Vulneración contractual y retención de pago",
    title:
      "Caso jurídico-laboral: vulneración contractual y retención de pago",
    description:
      "Síntesis jurisprudencial sobre exigencias sobrevinientes y tutela del derecho al trabajo (Art. 33 CRE), Causas 18335-2025-00201G y 2942-25-EP.",
    fileName: "Infografia Caso Juridico Laboral.pdf",
    relativePath:
      "src/assets/pdfs/Trabajos Parcial 2/Infografia Caso Juridico Laboral.pdf",
    url: infografiaJuridicoUrl,
    thumbnailUrl: thumbInfografia,
    unit: "Unidad III",
    partial: "Segundo Parcial",
    documentType: "Infografía",
    date: "14 oct 2026",
    pages: 1,
    caseContext: "Causas 18335-2025-00201G y 2942-25-EP",
    relationToApe:
      "Evidencia complementaria del contexto jurídico laboral (Unidad III)",
  },
] as const;

export function getNominaDoc(id: string): NominaDocument {
  const found = NOMINA_DOCUMENTS.find((doc) => doc.id === id);
  if (!found) {
    throw new Error(`Documento de Unidad III no encontrado: ${id}`);
  }
  return found;
}

/** Recursos gráficos reales extraídos selectivamente de APE 03.pdf e Infografía */
export const NOMINA_VISUAL_ASSETS = {
  organigrama: imgOrganigrama,
  infografia: thumbInfografia,
} as const;

/** 03.01 — Tabla 1 de APE 03: Resumen comparativo de regímenes laborales */
export const REGIME_SUMMARY: readonly RegimeComparisonItem[] = [
  {
    regime: "Código del Trabajo (Privado)",
    modality: "Contrato indefinido (prueba hasta 90 días)",
    schedule: "40 h/sem ordinarias",
    iessRates: "9,45 % personal · 11,15 % patronal",
    stabilityNote: "Estabilidad relativa; despido genera indemnización",
  },
  {
    regime: "LOSEP (Carrera Pública)",
    modality: "Nombramiento permanente",
    schedule: "40 h/sem (Art. 25 LOSEP)",
    iessRates: "11,45 % personal · 9,15 % patronal",
    stabilityNote: "Estabilidad absoluta; remoción solo por sumario",
  },
  {
    regime: "LOSEP / LOEP (Ocasionales)",
    modality: "Servicios ocasionales a plazo",
    schedule: "40 h/sem o jornadas especiales",
    iessRates: "11,45 % personal · 9,15 % patronal",
    stabilityNote: "Sin estabilidad ni indemnización al cierre fiscal",
  },
  {
    regime: "Código Civil (Consultoría)",
    modality: "Servicios profesionales con RUC",
    schedule: "Sin horario ni subordinación",
    iessRates: "Sin aporte patronal (voluntario)",
    stabilityNote: "Riesgo de simulación si hay horario u órdenes",
  },
] as const;

/** 03.01 — Anexo 1 de APE 03: Los 7 contratos reales analizados (Tablas 2 y 3) */
export const SEVEN_CONTRACTS: readonly AnalyzedContractCase[] = [
  {
    number: "01",
    institution: "Ministerio de Educación (Distrito 06D04 Colta-Guamote)",
    role: "Servidor Público 7 · Administrador de Circuito",
    regime: "LOSEP · Acción de Personal (Carrera)",
    remuneration: "USD 1.676,00",
    stability: "Permanente / Estabilidad absoluta",
  },
  {
    number: "02",
    institution: "ESPOCH Gasolinera Politécnica E.P.",
    role: "Gerente General (Nivel Jerárquico Superior)",
    regime: "LOEP Art. 22 · Libre remoción",
    remuneration: "USD 2.034,00",
    stability: "Libre remoción sin indemnización",
  },
  {
    number: "03",
    institution: "ESPOCH Gasolinera Politécnica E.P.",
    role: "Contadora General (SP5)",
    regime: "LOSEP Art. 58 / LOEP · Servicios ocasionales",
    remuneration: "USD 1.212,00",
    stability: "Plazo fijo (mar–dic 2022) · Sin estabilidad",
  },
  {
    number: "04",
    institution: "Universidad Técnica de Ambato (UTA — FISEI)",
    role: "Profesor/a Ocasional (Tiempo Completo 40 h)",
    regime: "LOES / Reglamento de Carrera CES",
    remuneration: "USD 2.000,00",
    stability: "Plazo fijo (ago–dic 2026) · No titular",
  },
  {
    number: "05",
    institution: "E.P. de Movilidad Rutas de Riobamba (EPMRR)",
    role: "Ejecutor de Procesos (Servicios Vehiculares)",
    regime: "LOEP / LOSEP Art. 58 · Ocasional",
    remuneration: "USD 675,00",
    stability: "Plazo fijo (jun–dic 2026) · Sin estabilidad",
  },
  {
    number: "06",
    institution: "Ministerio de Ambiente y Energía (MAE)",
    role: "Guardaparque (SP Apoyo 4 · Jornadas 20x10 / 10x5)",
    regime: "LOSEP Art. 58 · Oficio MDT",
    remuneration: "USD 733,00",
    stability: "Plazo fijo (abr–dic 2026) · Sin estabilidad",
  },
  {
    number: "07",
    institution: "CORPOAMBATO (Ambato y Tungurahua)",
    role: "Coordinadora de Proyectos (Consultora externa)",
    regime: "Código Civil · Servicios profesionales",
    remuneration: "Honorarios + IVA (con RUC)",
    stability: "Civil sin beneficios ni estabilidad laboral",
  },
] as const;

/** 03.01 — Trabajo complementario: Barragan Modos de producción.pdf */
export const COMPLEMENTARY_CONTRACTS_CHECK: readonly FictionalContractCheck[] = [
  {
    caseLabel: "Caso 1 · Código del Trabajo",
    employer: "Novandes Servicios Corporativos S.A. (privada)",
    regime: "Indefinido con prueba (USD 500)",
    finding:
      "Jornada de 47,5 h/sem excede las 40 h legales; difiere afiliación IESS y exige 2 años para vacaciones.",
    verdict: "Posible incumplimiento",
  },
  {
    caseLabel: "Caso 2 · LOSEP",
    employer: "Gobierno Autónomo Municipal (GAD)",
    regime: "Nombramiento provisional (USD 850)",
    finding:
      "Jornada efectiva de 9,5 h/día, limita vacaciones a 15 días (LOSEP prevé 30) y no precisa causal del art. 17.",
    verdict: "Posible incumplimiento",
  },
  {
    caseLabel: "Caso 3 · LOES",
    employer: "Universidad pública (Personal académico)",
    regime: "Docente no titular ocasional (oct 2026–mar 2027)",
    finding:
      "Fija 48 h semanales frente a 40 h de tiempo completo e incluye renuncia anticipada de derechos.",
    verdict: "Posible incumplimiento",
  },
] as const;

export const PRODUCTION_MODES: readonly ProductionModeItem[] = [
  {
    mode: "Comunidad primitiva",
    control: "Uso colectivo (clan)",
    organization: "Cooperativo por edad y habilidad",
    workerRisk: "Escasez y baja protección sanitaria",
  },
  {
    mode: "Esclavismo",
    control: "Dueños de esclavos y élites",
    organization: "Trabajo forzado sin retribución",
    workerRisk: "Pérdida de libertad y cero derechos",
  },
  {
    mode: "Feudalismo",
    control: "Señores feudales y nobleza",
    organization: "Feudos; renta y tributos",
    workerRisk: "Dependencia y tributos elevados",
  },
  {
    mode: "Capitalismo",
    control: "Capital y empresas privadas",
    organization: "Contratos salariales y mercado",
    workerRisk: "Desempleo o precariedad salarial",
  },
  {
    mode: "Socialismo",
    control: "Estado, sociedad o cooperativas",
    organization: "Planificación pública o colectiva",
    workerRisk: "Burocracia o menor autonomía",
  },
] as const;

export const MANABI_MDT_STATS = {
  totalContracts: "143.918",
  totalCompanies: "18.936",
  menShare: "66 %",
  menCount: "94.966",
  womenShare: "34 %",
  womenCount: "48.952",
  indefiniteCount: "87.963",
  adultsOver29Share: "54,12 %",
  youth18to29Share: "45,68 %",
  cantons: [
    { canton: "Manta", contracts: "58.659", widthPct: 100 },
    { canton: "Portoviejo", contracts: "37.084", widthPct: 63.2 },
    { canton: "Montecristi", contracts: "11.152", widthPct: 19 },
    { canton: "Chone", contracts: "7.220", widthPct: 12.3 },
  ] as readonly ManabiCantonBar[],
} as const;

/** 03.02 — Anexo 2 de APE 03: Estructura orgánica de TechInstall Solutions (Tabla 8) */
export const ORGANIGRAMA_ROLES: readonly OrganigramaRoleGroup[] = [
  {
    role: "Gerente / Propietario",
    level: "Nivel A · Jefatura",
    regime: "Código del Trabajo",
    reportsTo: "Directorio / Asamblea de Socios",
    headcount: "1 trabajador",
    responsibility:
      "Representación legal, dirección estratégica, aprobación de contratos tecnológicos y políticas salariales.",
  },
  {
    role: "Administrador / Contador",
    level: "Nivel B1 · Supervisión",
    regime: "Código del Trabajo",
    reportsTo: "Gerente / Propietario",
    headcount: "1 trabajador",
    responsibility:
      "Gestión administrativa y financiera, liquidación de haberes, declaraciones tributarias y conciliación IESS.",
  },
  {
    role: "Supervisor de instalaciones",
    level: "Nivel B3 · Supervisión",
    regime: "Código del Trabajo",
    reportsTo: "Administrador / Contador",
    headcount: "2 trabajadores",
    responsibility:
      "Coordinación de cuadrillas de campo, aseguramiento de calidad en fibra y cableado, fiscalización operativa.",
  },
  {
    role: "Operaciones de instalaciones",
    level: "Nivel C2 · Operación",
    regime: "Código del Trabajo",
    reportsTo: "Supervisor de instalaciones",
    headcount: "3 trabajadores",
    responsibility:
      "Tendido de cableado estructurado, fusión de fibra óptica, configuración de hardware y soporte en sitio.",
  },
  {
    role: "Auxiliar de guardalmacén",
    level: "Nivel E2 · Soporte",
    regime: "Código del Trabajo",
    reportsTo: "Administrador / Contador",
    headcount: "3 trabajadores",
    responsibility:
      "Recepción, catalogación, control de inventarios y despacho de herramientas, cables y equipos de prueba.",
  },
  {
    role: "Perfiles institucionales de prueba",
    level: "Validación del software",
    regime: "LOSEP (Grado 5) · LOEP (Grado 19)",
    reportsTo: "Gerencia General / Soporte",
    headcount: "2 perfiles de prueba",
    responsibility:
      "Asistente Administrativa (LOSEP) y Analista de Sistemas (LOEP) incluidos para auditar aportes públicos y escalas.",
    isValidationProfile: true,
  },
] as const;

/** 03.03 — Resultados reales de nómina consolidada (APE 03, págs. 3–5 y 23–25) */
export const PAYROLL_EXERCISE_META = {
  company: "TechInstall Solutions",
  ruc: "1790000000001",
  sbuExerciseValue: "USD 482,00",
  sbuExerciseBasis:
    "Dato del ejercicio académico 2026 (Acuerdo Ministerial MDT-2025-195 registrado en APE 03)",
  irBasis: "Resolución SRI N.º NAC-DGERCGC25-00000043",
  totalRecords: "12 registros",
  recordsSplit: "10 puestos operativos PYME + 2 perfiles públicos de validación",
  basePayroll: "USD 12.539,00",
  overtimeTotal: "USD 126,00",
  overtimeNote:
    "Horas suplementarias (50 %) y extraordinarias (100 %) documentadas en 6 colaboradores operativos",
  taxablePayroll: "USD 12.665,00",
  netPaid: "USD 13.083,72",
  iessTotal: "USD 3.588,64",
  employerTotalCost: "USD 17.189,48",
  vacationsProvision: "USD 527,71",
  costCompositionBars: [
    {
      label: "Remuneración gravada (sueldos + USD 126,00 horas extras)",
      value: "USD 12.665,00",
      widthPct: 73.7,
    },
    {
      label: "Provisiones legales (décimos, fondos de reserva y vacaciones)",
      value: "USD 3.179,23",
      widthPct: 18.5,
    },
    {
      label: "Aporte patronal IESS (privado 11,15 % + público 9,15 %)",
      value: "USD 1.345,25",
      widthPct: 7.8,
    },
  ] as const,
} as const;

/** Tabla 9 literal de APE 03.pdf (pág. 24) — sin recalcular ni alterar cifras */
export const PAYROLL_ROWS: readonly PayrollRow[] = [
  {
    role: "Gerente / Propietario",
    collaborator: "Johan Gabriel Rodríguez",
    baseSalary: "$2.800,00",
    taxableBase: "$2.800,00",
    iessPersonal: "$264,60",
    incomeTax: "$164,23",
    thirteenth: "$233,33*",
    fourteenth: "$40,17*",
    reserveFunds: "$233,24*",
    netPay: "$2.371,17",
    employerCost: "$3.735,61",
  },
  {
    role: "Administrador / Contador",
    collaborator: "José Gabriel Manzano",
    baseSalary: "$1.500,00",
    taxableBase: "$1.500,00",
    iessPersonal: "$141,75",
    incomeTax: "$20,17",
    thirteenth: "$125,00",
    fourteenth: "$40,17",
    reserveFunds: "$124,95",
    netPay: "$1.628,20",
    employerCost: "$2.019,87",
  },
  {
    role: "Supervisor de instalaciones (1)",
    collaborator: "David Barragán",
    baseSalary: "$850,00",
    taxableBase: "$871,25",
    iessPersonal: "$82,33",
    incomeTax: "$0,00",
    thirteenth: "$72,60",
    fourteenth: "$40,17",
    reserveFunds: "$72,58",
    netPay: "$974,27",
    employerCost: "$1.190,04",
  },
  {
    role: "Supervisor de instalaciones (2)",
    collaborator: "Andrea Paola Villavicencio",
    baseSalary: "$720,00",
    taxableBase: "$729,00",
    iessPersonal: "$68,89",
    incomeTax: "$0,00",
    thirteenth: "$60,75",
    fourteenth: "$40,17",
    reserveFunds: "$60,73",
    netPay: "$821,76",
    employerCost: "$1.002,31",
  },
  {
    role: "Operaciones de instalaciones (1)",
    collaborator: "Maybeline Navarro",
    baseSalary: "$600,00",
    taxableBase: "$650,00",
    iessPersonal: "$61,42",
    incomeTax: "$0,00",
    thirteenth: "$54,17",
    fourteenth: "$40,17",
    reserveFunds: "$54,14",
    netPay: "$737,06",
    employerCost: "$898,03",
  },
  {
    role: "Operaciones de instalaciones (2)",
    collaborator: "Santiago Andrés Cevallos",
    baseSalary: "$640,00",
    taxableBase: "$664,00",
    iessPersonal: "$62,75",
    incomeTax: "$0,00",
    thirteenth: "$55,33",
    fourteenth: "$40,17",
    reserveFunds: "$55,31",
    netPay: "$752,06",
    employerCost: "$916,52",
  },
  {
    role: "Operaciones de instalaciones (3)",
    collaborator: "Karen Michelle Salazar",
    baseSalary: "$620,00",
    taxableBase: "$635,50",
    iessPersonal: "$60,05",
    incomeTax: "$0,00",
    thirteenth: "$52,96",
    fourteenth: "$40,17",
    reserveFunds: "$52,94",
    netPay: "$721,52",
    employerCost: "$878,91",
  },
  {
    role: "Auxiliar de guardalmacén (1)",
    collaborator: "Luis Fernando Tipán",
    baseSalary: "$500,00",
    taxableBase: "$506,25",
    iessPersonal: "$47,84",
    incomeTax: "$0,00",
    thirteenth: "$42,19",
    fourteenth: "$40,17",
    reserveFunds: "$42,17",
    netPay: "$582,94",
    employerCost: "$708,32",
  },
  {
    role: "Auxiliar de guardalmacén (2)",
    collaborator: "Mayra Alejandra Chicaiza",
    baseSalary: "$482,00",
    taxableBase: "$482,00",
    iessPersonal: "$45,55",
    incomeTax: "$0,00",
    thirteenth: "$40,17",
    fourteenth: "$40,17",
    reserveFunds: "$0,00**",
    netPay: "$516,79",
    employerCost: "$636,16",
  },
  {
    role: "Auxiliar de guardalmacén (3)",
    collaborator: "Pedro Pablo Guamán (LOEP obr.)",
    baseSalary: "$482,00",
    taxableBase: "$482,00",
    iessPersonal: "$45,55",
    incomeTax: "$0,00",
    thirteenth: "$40,17",
    fourteenth: "$40,17",
    reserveFunds: "$0,00**",
    netPay: "$516,79",
    employerCost: "$636,16",
  },
  {
    role: "Asistente Administ. (LOSEP)",
    collaborator: "Lucía Estefanía Mora",
    baseSalary: "$675,00",
    taxableBase: "$675,00",
    iessPersonal: "$77,29",
    incomeTax: "$0,00",
    thirteenth: "$56,25",
    fourteenth: "$40,17",
    reserveFunds: "$56,23",
    netPay: "$750,36",
    employerCost: "$945,66",
    isPublicTest: true,
  },
  {
    role: "Analista Sistemas (LOEP serv.)",
    collaborator: "Daniela Alejandra Ruiz",
    baseSalary: "$2.670,00",
    taxableBase: "$2.670,00",
    iessPersonal: "$305,72",
    incomeTax: "$138,56",
    thirteenth: "$222,50",
    fourteenth: "$40,17",
    reserveFunds: "$222,41",
    netPay: "$2.710,80",
    employerCost: "$3.621,89",
    isPublicTest: true,
  },
] as const;

export const PAYROLL_TOTALS_ROW = {
  baseSalary: "$12.539,00",
  taxableBase: "$12.665,00",
  iessPersonal: "$1.263,74",
  incomeTax: "$322,96",
  thirteenth: "$1.055,42",
  fourteenth: "$482,04",
  reserveFunds: "$974,70",
  netPay: "$13.083,72",
  employerCost: "$17.189,48",
} as const;

/** Tabla 10 literal de APE 03.pdf (pág. 25): Conciliación ante el IESS */
export const IESS_RECONCILIATION: readonly IessReconciliationRow[] = [
  {
    concept: "Aporte Patronal Sector Privado",
    rate: "11,15 %",
    amount: "$1.039,18",
    basis: "Código del Trabajo / IESS",
    widthPct: 100,
  },
  {
    concept: "Fondos de Reserva devengados",
    rate: "8,33 %",
    amount: "$979,65",
    basis: "Art. 196 Código del Trabajo",
    widthPct: 94.3,
  },
  {
    concept: "Aporte Personal Sector Privado (10 puestos)",
    rate: "9,45 %",
    amount: "$880,73",
    basis: "Materia gravada privada ($9.320,00)",
    widthPct: 84.8,
  },
  {
    concept: "Aporte Personal Sector Público (2 puestos)",
    rate: "11,45 %",
    amount: "$383,01",
    basis: "Materia gravada pública ($3.345,00)",
    widthPct: 36.9,
  },
  {
    concept: "Aporte Patronal Sector Público",
    rate: "9,15 %",
    amount: "$306,07",
    basis: "LOSEP / LOEP institucional",
    widthPct: 29.5,
  },
] as const;

/** 03.04 — Evidencias de la aplicación automatizada de nómina (Anexos 4 y 5) */
export const AUTOMATION_FLOW_STEPS = [
  {
    step: "1",
    title: "Parámetros legales",
    detail: "SBU del ejercicio ($482), tasas IESS y tabla SRI 2026",
  },
  {
    step: "2",
    title: "Datos del personal",
    detail: "12 registros con validación de cédula (módulo 10) y régimen",
  },
  {
    step: "3",
    title: "Novedades del mes",
    detail: "Horas suplementarias (50 %), extraordinarias (100 %) y ajustes",
  },
  {
    step: "4",
    title: "Cálculo automático",
    detail: "Materia gravada, retenciones, décimos, fondos y provisiones",
  },
  {
    step: "5",
    title: "Triple salida",
    detail: "Boleta colaborador, conciliación IESS y costo patronal",
  },
] as const;

export const APP_EVIDENCE_SCREENS: readonly AppEvidenceScreen[] = [
  {
    id: "simulador",
    figure: "Figura 3 · Web y Móvil",
    title: "Inicio público y simulador salarial",
    scope: "Escritorio + Móvil",
    caption:
      "Simulador salarial en vivo abierto al público para estimar remuneración, aportes y beneficios.",
    imageUrl: imgAppSimulador,
    pageRef: "APE 03 · pág. 26",
  },
  {
    id: "resumen",
    figure: "Figura 18 · Web y Móvil",
    title: "Resumen ejecutivo del rol procesado",
    scope: "Escritorio + Móvil",
    caption:
      "Panel mensual con los balances del colaborador, planilla exigible IESS y costo total patronal.",
    imageUrl: imgAppResumen,
    pageRef: "APE 03 · pág. 41",
  },
  {
    id: "boleta",
    figure: "Figura 20 · Web y Móvil",
    title: "Boleta individual de pago",
    scope: "Escritorio + Móvil",
    caption:
      "Comprobante desglosado por trabajador con ingresos, descuentos, beneficios y espacio de constancia.",
    imageUrl: imgAppBoleta,
    pageRef: "APE 03 · pág. 43",
  },
] as const;

export const APP_EXTERNAL_LINKS = [
  {
    label: "Aplicación web en producción",
    subtitle: "Acceso directo al sistema de nómina",
    url: "https://rol-pagos-ecuador.vercel.app/sistema/inicio",
  },
  {
    label: "Simulador salarial público",
    subtitle: "Landing page documentada en Anexo 5",
    url: "https://rol-pagos-ecuador.vercel.app/",
  },
] as const;

export const APP_DOCUMENTED_CAPABILITIES = [
  "Validación algorítmica de cédula ecuatoriana (módulo 10 y provincia)",
  "Parametrización anual del SBU, tasas IESS (privado/público) y tabla IR SRI",
  "Registro de preferencia individual: acumulación o mensualización de décimos y fondos",
  "Visión responsiva documentada en 18 figuras de escritorio y móvil (Anexo 4, págs. 26–43)",
] as const;

/** 03.05 — Contexto jurídico laboral (Infografia Caso Juridico Laboral.pdf) */
export const CASO_JURIDICO_DATA = {
  title: "Vulneración contractual y retención de pago",
  subtitle:
    "Análisis de legalidad en contratación pública, exigencias sobrevinientes y tutela del derecho al trabajo.",
  cases: [
    {
      number: "18335-2025-00201G",
      court: "Unidad Judicial Contencioso Administrativa",
    },
    {
      number: "2942-25-EP",
      court: "Corte Constitucional del Ecuador",
    },
  ] as const,
  parties:
    "Contratista / Consultor Técnico vs. Gobierno Autónomo Descentralizado Municipal",
  claimedAmount: "USD 57.330,34",
  claimedStatus: "Monto de reparación pretendido (pretensiones en trámite)",
  facts: [
    {
      label: "Cumplimiento oportuno",
      detail:
        "El contratista ejecutó y entregó a tiempo la totalidad de la consultoría técnica convenida.",
    },
    {
      label: "Negativa municipal",
      detail:
        "La entidad se negó a recibir el producto y declaró unilateralmente el incumplimiento del consultor.",
    },
    {
      label: "Motivo extracontractual",
      detail:
        "El municipio argumentó la falta de permisos ambientales del MAATE, requisito ajeno al objeto del contrato.",
    },
  ] as const,
  rightsAndBasis: [
    {
      code: "Art. 33 CRE",
      label: "Derecho al trabajo y justa remuneración frente a retención indebida",
    },
    {
      code: "Art. 82 CRE",
      label: "Seguridad jurídica y confianza legítima en las cláusulas pactadas",
    },
    {
      code: "Art. 75 CRE",
      label: "Tutela judicial efectiva, defensa y debido proceso administrativo",
    },
    {
      code: "LOSNCP Arts. 81–82 · COGEP",
      label:
        "Régimen obligatorio de actas de entrega-recepción y nulidad de actos lesivos",
    },
  ] as const,
  pendingClaims:
    "Declaratoria de nulidad de la resolución de incumplimiento, orden inmediata de recepción definitiva, liquidación económica y pago de intereses, daños y costas.",
  goldenRule:
    "Ninguna entidad contratante ni empleador puede exigir arbitrariamente requisitos o trámites externos sobrevinientes que no consten en los pliegos o contrato original para bloquear la recepción y el pago.",
  pitchUrl: "https://share.gemini.google/5nqoOXtFCsts",
} as const;
