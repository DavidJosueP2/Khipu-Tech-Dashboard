export interface ExternalResource {
  label: string;
  url: string;
  description: string;
}

const companyFormation = {
  label: "Constitución electrónica de compañías · Supercias",
  url: "https://www.supercias.gob.ec/portalscvs/portalConstitucionElectronica.html",
  description: "Inicia la constitución en línea y consulta el proceso para una compañía de responsabilidad limitada.",
};

const corporateRuc = {
  label: "RUC de sociedades · SRI",
  url: "https://www.sri.gob.ec/ruc-sociedades",
  description: "Revisa cómo se obtiene el RUC de una sociedad y cuándo corresponde actualizar sus datos.",
};

const municipalPatent = {
  label: "Patente municipal · GAD Ambato",
  url: "https://ambato.gob.ec/accesos-a-servicios/",
  description: "Busca en el apartado Financiero los requisitos del registro inicial de patente y los accesos para renovarla o cerrarla.",
};

export const BUSINESS_SETUP_RESOURCES: readonly ExternalResource[] = [
  companyFormation,
  corporateRuc,
  municipalPatent,
  {
    label: "Permiso de funcionamiento · Bomberos Ambato",
    url: "https://bomberosambato.gob.ec/servicios-2/",
    description: "Consulta el proceso y los requisitos cuando el establecimiento necesita un permiso de Bomberos.",
  },
];

export const RUC_LOOKUP_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Consulta pública de RUC · SRI",
    url: "https://srienlinea.sri.gob.ec/facturacion-internet/consultas/publico/ruc-datos1.jspa",
    description: "Busca un contribuyente inscrito por RUC, razón social o nombre comercial y revisa su estado y actividad económica.",
  },
  {
    label: "Buscador de actividades CIIU · INEC",
    url: "https://aplicaciones2.ecuadorencifras.gob.ec/SIN/",
    description: "Abre la clasificación CIIU para contrastar los códigos y descripciones de las actividades del taller.",
  },
];

export const INVOICING_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Abrir el Facturador SRI",
    url: "https://facturadorsri.sri.gob.ec/portal-facturadorsri-internet/pages/inicio.html",
    description: "Accede al aplicativo oficial para generar facturas, notas de crédito y débito, comprobantes de retención y guías de remisión.",
  },
  {
    label: "Guía del Facturador SRI",
    url: "https://www.sri.gob.ec/facturador-sri",
    description: "Consulta los requisitos de uso y descarga el manual de configuración y emisión de comprobantes.",
  },
  {
    label: "Verificar un comprobante electrónico · SRI",
    url: "https://srienlinea.sri.gob.ec/comprobantes-electronicos-internet/publico/validezComprobantes.jsf",
    description: "Consulta la validez de un comprobante emitido con su clave de acceso o número de autorización.",
  },
];

export const VAT_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Tarifas y base imponible del IVA · SRI",
    url: "https://www.sri.gob.ec/impuesto-al-valor-agregado-iva",
    description: "Consulta qué tarifa corresponde a la operación y revisa la base imponible antes de aplicar el cálculo del ejercicio.",
  },
  {
    label: "Formulario e instructivos de IVA · SRI",
    url: "https://www.sri.gob.ec/formularios-e-instructivos",
    description: "En el apartado de IVA encontrarás el formato de declaración, el tutorial y la guía de llenado de los casilleros.",
  },
  {
    label: "Calendario tributario · SRI",
    url: "https://www.sri.gob.ec/calendario-responsabilidades-tributarias",
    description: "Consulta los vencimientos de las declaraciones y pagos según el tipo de obligación y contribuyente.",
  },
  {
    label: "Declarar IVA en SRI en Línea",
    url: "https://srienlinea.sri.gob.ec/tuportal-internet/",
    description: "Ingresa con tu clave y abre Declaraciones → Declaración de Impuestos → Elaboración y envío de declaraciones. Allí seleccionas la obligación y el período.",
  },
  {
    label: "Calculadora de multas e intereses · SRI",
    url: "https://www.sri.gob.ec/web/intersri/calculadora-tributaria",
    description: "Estima cargos por presentación tardía al seleccionar el impuesto, el período fiscal y la fecha de declaración.",
  },
];

export const TRADEMARK_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Instructivo de registro de signos distintivos · SENADI",
    url: "https://www.derechosintelectuales.gob.ec/wp-content/uploads/2026/01/Instructivo-para-Registro-de-Signos-Distintivos-2026.pdf",
    description: "Abre el PDF con los pasos para habilitar la cuenta, preparar los documentos y presentar la solicitud de marca.",
  },
  {
    label: "Búsqueda fonética · SENADI",
    url: "https://buscadores.derechosintelectuales.gob.ec/genfonex/login.xhtml",
    description: "Solicita una búsqueda de nombres similares antes de registrar la marca. El portal pide usuario y comprobante de pago.",
  },
  {
    label: "Casillero virtual y seguimiento · SENADI",
    url: "https://www.derechosintelectuales.gob.ec/senadi-en-linea/",
    description: "Crea el casillero para gestionar notificaciones y encuentra el acceso a la consulta de trámites de signos distintivos.",
  },
  {
    label: "Solicitudes en Línea · SENADI",
    url: "https://registro.propiedadintelectual.gob.ec/solicitudes/",
    description: "Accede con tu cuenta al sistema donde se ingresa la solicitud real de registro de la marca.",
  },
  {
    label: "Tasas y descuentos · SENADI",
    url: "https://www.derechosintelectuales.gob.ec/tarifario-senadi/",
    description: "Consulta el valor de la búsqueda y del registro, junto con los descuentos aplicables bajo Signos Distintivos.",
  },
  {
    label: "Botón de pago en línea · SENADI",
    url: "https://botondepago.derechosintelectuales.gob.ec/pagosenadi/login.xhtml",
    description: "Accede al servicio de pago tras generar el comprobante del trámite que vas a realizar.",
  },
  {
    label: "Clasificación de Niza · OMPI",
    url: "https://www.wipo.int/es/web/classification-nice",
    description: "Consulta las clases de productos y servicios. La clase 42 es la que se usa para los servicios tecnológicos del ejercicio.",
  },
  {
    label: "Base Mundial de Datos sobre Marcas · OMPI",
    url: "https://branddb.wipo.int/",
    description: "Amplía la búsqueda de antecedentes en las colecciones de marcas de los países y sistemas participantes.",
  },
];

export const IMPORT_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Arancel nacional · SENAE",
    url: "https://mesadeservicios.aduana.gob.ec/arancel/",
    description: "Busca el producto por descripción o subpartida y revisa los tributos y medidas asociados a la importación.",
  },
  {
    label: "Guía para importar · SENAE",
    url: "https://www.aduana.gob.ec/servicio-al-ciudadano/para-importar/",
    description: "Consulta los pasos de importación y las bases de cálculo de los tributos al comercio exterior.",
  },
  {
    label: "Portal ECUAPASS · SENAE",
    url: "https://ecuapass.aduana.gob.ec/",
    description: "Accede al sistema que utilizan los operadores para gestionar declaraciones y trámites aduaneros.",
  },
  {
    label: "Estadísticas comerciales de Ecuador · WITS",
    url: "https://wits.worldbank.org/countrysnapshot/es/ECU",
    description: "Explora las importaciones y exportaciones de Ecuador por año, socio comercial y producto.",
  },
];

const sutEmployerUrl = "https://sut.trabajo.gob.ec/contratos-web/mrl/loginContratos.xhtml";
const iessEmployerPortal = "https://www.iess.gob.ec/empleador-web/";

export const HIRING_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Registro de contratos · SUT",
    url: sutEmployerUrl,
    description: "Ingresa con la cuenta del empleador al Sistema Único de Trabajo para registrar la información del contrato.",
  },
  {
    label: "Aviso de entrada · IESS",
    url: iessEmployerPortal,
    description: "Ingresa con tu clave de empleador y usa la sección de avisos para registrar la afiliación del trabajador.",
  },
];

export const PAYROLL_BENEFIT_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Salario Básico Unificado 2026 · Ministerio del Trabajo",
    url: "https://www.trabajo.gob.ec/wp-content/uploads/downloads/2026/01/ACUERDO-MINISTERIAL-MDT-2025-195.pdf",
    description: "Consulta el acuerdo ministerial que fija el salario básico del año de los ejercicios de nómina.",
  },
  {
    label: "Calcular el décimo tercero · Ministerio del Trabajo",
    url: "https://calculadoras.trabajo.gob.ec/tercero",
    description: "Estima la décima tercera remuneración con los datos del período que pide la herramienta.",
  },
  {
    label: "Calcular el décimo cuarto · Ministerio del Trabajo",
    url: "https://calculadoras.trabajo.gob.ec/cuarto",
    description: "Estima el décimo cuarto según el período y la región que corresponde al trabajador.",
  },
  {
    label: "Jornada y recargos · Ministerio del Trabajo",
    url: "https://www.trabajo.gob.ec/5-cual-es-la-jornada-maxima-de-trabajo-para-el-personal-sujeto-al-codigo-del-trabajo-y-cuando-procede-el-pago-por-horas-suplementarias-y-extraordinarias/",
    description: "Consulta cuándo proceden las horas suplementarias y extraordinarias antes de aplicar el recargo al rol.",
  },
  {
    label: "Tasas de aportación · IESS",
    url: "https://iess.gob.ec/es/web/empleador/tasas-de-aportacion",
    description: "Consulta las tasas de aporte personal y patronal según el tipo de afiliación.",
  },
  {
    label: "Fondos de reserva · IESS",
    url: "https://www.iess.gob.ec/web/afiliado/fondos-de-reserva",
    description: "Revisa el derecho al fondo de reserva y cómo se solicita su acumulación en el IESS.",
  },
  {
    label: "Consulta de planillas del empleador · IESS",
    url: "https://www.iess.gob.ec/empleador-web/pages/consultas/consultaPlanillas.jsf",
    description: "Ingresa con la clave del empleador para consultar las planillas de aportes y contrastarlas con el rol de pago.",
  },
  {
    label: "Tabla de impuesto a la renta · SRI",
    url: "https://www.sri.gob.ec/impuesto-renta",
    description: "Consulta la tabla de personas naturales del ejercicio fiscal para el cálculo de la retención en nómina.",
  },
  {
    label: "Proyección de gastos personales · SRI",
    url: "https://www.sri.gob.ec/formularios-e-instructivos",
    description: "Busca el formulario de proyección de gastos personales para el cálculo de la retención en relación de dependencia.",
  },
];

export const LIQUIDATION_RESOURCES: readonly ExternalResource[] = [
  {
    label: "Calcular la liquidación · Ministerio del Trabajo",
    url: "https://calculadoras.trabajo.gob.ec/liquidaciones",
    description: "Estima los haberes e indemnizaciones que correspondan con las fechas, remuneración y causal de terminación del caso.",
  },
  {
    label: "Requisitos del acta de finiquito · Ministerio del Trabajo",
    url: "https://www.trabajo.gob.ec/wp-content/uploads/2025/06/ACUERDO-MINISTERIAL-MDT-2025-053.pdf#page=3",
    description: "Consulta en el artículo 6 del acuerdo los requisitos para subir el acta firmada y el comprobante de pago.",
  },
  {
    label: "Registrar el acta de finiquito · SUT",
    url: sutEmployerUrl,
    description: "Accede con la cuenta del empleador para registrar el finiquito y cargar sus respaldos.",
  },
  {
    label: "Aviso de salida · IESS",
    url: iessEmployerPortal,
    description: "Ingresa con tu clave de empleador y registra el aviso de salida en el sistema del IESS.",
  },
];
