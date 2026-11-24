import terminationMaterial from "@/assets/pdfs/Materia Unidad IV/4.1 Terminación_del_Contrato_Laboral Normativa Ecuatoriana.pdf?url";
import dismissalMaterial from "@/assets/pdfs/Materia Unidad IV/4.3 Desahucio_y_Despido_Intempestivo.pdf?url";
import { ChapterHeader } from "@/components/emprendimiento/ChapterHeader";
import { getLiquidacionDoc } from "@/data/liquidacion";

const CAUSES = [
  {
    title: "Contrato, acuerdo y conclusión del trabajo",
    detail:
      "La unidad distingue las causas legalmente previstas en el contrato, el acuerdo de ambas partes y la conclusión de la obra, el período o el servicio contratado.",
    example: "Caso de acuerdo mutuo",
    page: 3,
  },
  {
    title: "Desahucio del trabajador",
    detail:
      "La persona trabajadora comunica su decisión de terminar el contrato. Los casos prácticos muestran cómo se incorpora la bonificación por desahucio y se desglosan los haberes pendientes.",
    example: "Caso de desahucio",
    page: 4,
  },
  {
    title: "Despido intempestivo",
    detail:
      "La terminación parte del empleador sin causa legal justificada en el caso estudiado. La práctica muestra la indemnización por despido como rubro separado de los demás conceptos del finiquito.",
    example: "Caso de despido intempestivo",
    page: 2,
  },
  {
    title: "Visto bueno",
    detail:
      "La unidad estudia solicitudes del empleador y del trabajador ante la autoridad laboral. Los casos resueltos muestran resultados distintos según quién solicita el visto bueno y la causal analizada.",
    example: "Caso de visto bueno del trabajador",
    page: 10,
  },
  {
    title: "Otros hechos previstos",
    detail:
      "El material incluye la muerte o incapacidad del empleador y la extinción de su persona jurídica bajo determinadas condiciones. También estudia la muerte o incapacidad permanente y total del trabajador y la fuerza mayor que impide continuar el trabajo.",
    example: "Caso de fuerza mayor",
    page: 8,
  },
] as const;

export function LiquidacionCausalesSection() {
  const cases = getLiquidacionDoc("liquidaciones-12");

  return (
    <section
      id="escena-causales"
      aria-labelledby="causales-heading"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="editorial-container space-y-10">
        <ChapterHeader
          headingId="causales-heading"
          titleBold="Formas de"
          titleItalic="terminación laboral."
          lead="La Unidad IV parte de las causales del artículo 169 del Código del Trabajo ecuatoriano y estudia, por separado, cómo identificar un despido intempestivo."
          objective="Identificar quién inicia la salida y por qué permite interpretar los rubros que aparecen en el finiquito."
        />

        <dl className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {CAUSES.map((cause) => (
            <div key={cause.title} className="space-y-3 border-t border-border pt-5">
              <dt className="type-subheading">{cause.title}</dt>
              <dd className="max-w-[62ch] space-y-3 text-muted-foreground">
                <p>{cause.detail}</p>
                <a
                  className="editorial-action"
                  href={cases.url + "#page=" + cause.page}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cause.example}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a
            className="editorial-action"
            href="https://www.trabajo.gob.ec/wp-content/uploads/downloads/2024/01/CODIGO_DEL_TRABAJO.pdf#page=66"
            target="_blank"
            rel="noreferrer"
          >
            Código del Trabajo · Causales de terminación
            <span className="sr-only"> (abre en una pestaña nueva)</span>
          </a>
          <a className="editorial-action" href={terminationMaterial + "#page=4"} target="_blank" rel="noreferrer">
            Material de causales
          </a>
          <a className="editorial-action" href={dismissalMaterial + "#page=4"} target="_blank" rel="noreferrer">
            Material de desahucio y despido
          </a>
          <a className="editorial-action" href="#escena-caso-ape04">
            Ver el cálculo del caso hipotético
          </a>
        </div>
      </div>
    </section>
  );
}
