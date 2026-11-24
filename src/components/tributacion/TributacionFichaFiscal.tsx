import formalizationMaterial from "@/assets/pdfs/Materia Unidad II/2.1 Obligaciones tributarias de emprendedores.pdf?url";
import { EditorialSerif } from "@/components/typography/EditorialSerif";
import { getTributacionDoc, KHIPUTECH_TAX_PROFILE } from "@/data/tributacion";

export function TributacionFichaFiscal() {
  const registration = getTributacionDoc("tarea-06");
  const trademark = getTributacionDoc("tarea-10");
  const profile = KHIPUTECH_TAX_PROFILE;

  return (
    <section
      aria-labelledby="ficha-fiscal-heading"
      className="space-y-8 border-t border-border pt-8"
    >
      <div className="space-y-3">
        <h3 id="ficha-fiscal-heading" className="type-feature">
          Identidad <EditorialSerif className="text-module-02">tributaria.</EditorialSerif>
        </h3>
        <p className="editorial-lead">
          Datos de KhipuTech consignados en la simulación de registro de marca
          de la Unidad II.
        </p>
      </div>

      <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <dt className="type-caption text-muted-foreground">RUC simulado</dt>
          <dd className="break-all text-2xl font-bold text-module-02 tabular-nums sm:text-4xl">
            {profile.simulatedRuc}
          </dd>
        </div>
        <div className="space-y-1">
          <dt className="type-caption text-muted-foreground">Razón social</dt>
          <dd className="type-subheading">{profile.legalName}</dd>
        </div>
        <div className="space-y-1">
          <dt className="type-caption text-muted-foreground">Forma societaria del proyecto</dt>
          <dd className="font-semibold">{profile.companyType}</dd>
        </div>
        <div className="space-y-1">
          <dt className="type-caption text-muted-foreground">Domicilio consignado</dt>
          <dd className="max-w-[42ch]">{profile.address}</dd>
        </div>
        <div className="space-y-1 sm:col-span-2">
          <dt className="type-caption text-muted-foreground">Actividad del proyecto</dt>
          <dd>Desarrollo y suministro de software empresarial en la nube.</dd>
        </div>
      </dl>

      <div className="grid gap-x-12 gap-y-7 border-t border-border pt-6 md:grid-cols-2">
        <div className="space-y-3">
          <h4 className="type-subheading">Constitución y trámites complementarios</h4>
          <p className="max-w-[56ch] text-muted-foreground">
            La Unidad II distingue la forma societaria, el alta tributaria y la
            protección de marca. En este proyecto, la forma Cía. Ltda. figura
            en la simulación y la solicitud de marca se trabajó en la clase 42.
            El acto constitutivo, los socios y sus aportes, el nombramiento de
            representación y el régimen fiscal quedan pendientes de respaldo
            oficial.
          </p>
          <p className="max-w-[56ch] text-muted-foreground">
            El material también identifica la patente municipal y la revisión
            de Bomberos entre los trámites que se evalúan según la actividad
            y el establecimiento.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="type-subheading">Obligaciones que revisamos en clase</h4>
          <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
            <li>Mantener actualizada la información del RUC.</li>
            <li>Emitir comprobantes de venta por las operaciones.</li>
            <li>Presentar las declaraciones que correspondan.</li>
            <li>Conservar los registros y comprobantes de respaldo.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        <a className="editorial-action" href={trademark.url + "#page=2"} target="_blank" rel="noreferrer">
          Ver formulario SENADI con el RUC simulado
        </a>
        <a className="editorial-action" href={registration.url + "#page=1"} target="_blank" rel="noreferrer">
          Ver taller de RUC y CIIU
        </a>
        <a className="editorial-action" href={formalizationMaterial + "#page=4"} target="_blank" rel="noreferrer">
          Material de formalización
        </a>
      </div>
    </section>
  );
}
