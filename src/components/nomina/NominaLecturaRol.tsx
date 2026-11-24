import remunerationMaterial from "@/assets/pdfs/Materia Unidad III/3.4 Remuneraciones caso UBIKAR.pdf?url";
import benefitsMaterial from "@/assets/pdfs/Materia Unidad III/3.5 Otros beneficios laborales normativa Ecuatoriana.pdf?url";
import { ResourceLinks } from "@/components/layout/ResourceLinks";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { PAYROLL_EXERCISE_META, PAYROLL_SIMULATOR_URL } from "@/data/nomina";
import { PAYROLL_BENEFIT_RESOURCES } from "@/data/publicResources";

const payrollResources = [
  {
    label: "Simulador salarial del proyecto",
    url: PAYROLL_SIMULATOR_URL,
    description: "Prueba el cálculo del rol con sueldo, horas con recargo, aportes y beneficios en el simulador del APE 03.",
  },
  ...PAYROLL_BENEFIT_RESOURCES,
];

export function NominaLecturaRol({ reportUrl }: { reportUrl: string }) {
  return (
    <section
      id="lectura-rol-de-pago"
      aria-labelledby="lectura-rol-heading"
      className="space-y-8 border-t border-border pt-9"
    >
      <h3 id="lectura-rol-heading" className="type-feature">
        Del sueldo <EditorialSerif className="text-module-03">al rol de pago.</EditorialSerif>
      </h3>
      <dl className="grid gap-x-12 gap-y-7 sm:grid-cols-2">
        <div className="space-y-2">
          <dt className="type-subheading">Sueldo y materia gravada</dt>
          <dd className="max-w-[60ch] text-muted-foreground">
            El caso UBIKAR parte de las funciones y del mínimo sectorial de cada
            cargo. En la planilla de TechInstall, el sueldo base y los recargos
            registrados forman la materia gravada del ejercicio.
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="type-subheading">Horas suplementarias y extraordinarias</dt>
          <dd className="max-w-[60ch] text-muted-foreground">
            El APE 03 registra los dos tipos de horas como novedades del período.
            El ejercicio aplica recargos del 50 % y del 100 %, respectivamente,
            y suma <strong>{PAYROLL_EXERCISE_META.overtimeTotal}</strong> en
            horas con recargo para seis colaboradores.
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="type-subheading">Beneficios sociales</dt>
          <dd className="max-w-[60ch] text-muted-foreground">
            La planilla distingue el décimo tercero, el décimo cuarto, los
            fondos de reserva y la provisión de vacaciones. El informe indica
            qué beneficios se pagan en el mes y cuáles se acumulan o provisionan.
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="type-subheading">Líquido a recibir y costo patronal</dt>
          <dd className="max-w-[60ch] text-muted-foreground">
            El rol individual desglosa ingresos, beneficios pagados y
            descuentos, entre ellos el aporte personal al IESS y la retención
            de renta cuando corresponde. El costo patronal incluye los aportes
            del empleador y las provisiones del período.
          </dd>
        </div>
      </dl>

      <div className="space-y-4 border-t border-border pt-6">
        <p className="editorial-aside">
          <EditorialSerif optical="text">Un ejemplo del caso UBIKAR.</EditorialSerif>
        </p>
        <p className="max-w-[68ch] text-muted-foreground">
          Con un sueldo de <strong>USD 622,00</strong>, el ejemplo obtiene{" "}
          <strong>USD 563,22 de líquido antes de otros descuentos</strong> al
          restar USD 58,78 de aporte personal. Con el aporte patronal y las
          provisiones de décimos que considera el ejercicio, el costo estimado
          del puesto es de <strong>USD 783,35</strong>.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a className="editorial-action" href={remunerationMaterial + "#page=11"} target="_blank" rel="noreferrer">
            Ejemplo UBIKAR
          </a>
          <a className="editorial-action" href={benefitsMaterial + "#page=2"} target="_blank" rel="noreferrer">
            Material de beneficios sociales
          </a>
          <a className="editorial-action" href={reportUrl + "#page=43"} target="_blank" rel="noreferrer">
            Ver boleta individual del APE 03
          </a>
        </div>
      </div>

      <ResourceLinks
        title="Herramientas para calcular el rol de pago"
        links={payrollResources}
        heading="h4"
      />
    </section>
  );
}
