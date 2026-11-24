import { EditorialSerif } from "@/components/typography/EditorialSerif";

interface ChapterHeaderProps {
  /** Ej: "03 / 04 · MÓDULO 01 · IDENTIDAD Y DIRECCIÓN" */
  eyebrow: string;
  /** Parte en Plus Jakarta Sans Bold */
  titleBold: string;
  /** Parte en Apparel Display Italic (o fallback uniforme si lleva tilde) */
  titleItalic: string;
  /** Breve narrativa contextual de 1 a 2 líneas */
  lead: string;
  /** Objetivo específico de la escena */
  objective: string;
  /** ID accesible para aria-labelledby */
  headingId?: string;
  /** Variable CSS del matiz de acento del módulo (por defecto var(--primary)) */
  accentVar?: string;
}

/**
 * Encabezado editorial de capítulo reutilizable para las presentaciones
 * visuales de los módulos.
 */
export function ChapterHeader({
  eyebrow,
  titleBold,
  titleItalic,
  lead,
  objective,
  headingId,
  accentVar = "var(--primary)",
}: ChapterHeaderProps) {
  return (
    <header className="max-w-3xl space-y-4">
      <p
        data-scene-reveal
        className="font-mono text-[0.72rem] font-medium tracking-[0.2em] uppercase"
        style={{ color: accentVar }}
      >
        {eyebrow}
      </p>

      <h2
        id={headingId}
        data-scene-reveal
        className="text-[clamp(2.2rem,4.6vw,3.9rem)] leading-[1.04] font-bold tracking-[-0.03em] text-foreground"
      >
        <span>{titleBold} </span>
        <EditorialSerif
          optical="display"
          className="font-normal"
          style={{ color: accentVar }}
        >
          {titleItalic}
        </EditorialSerif>
      </h2>

      <p
        data-scene-reveal
        className="max-w-2xl text-base leading-relaxed text-foreground/85 md:text-lg"
      >
        {lead}
      </p>

      <div
        data-scene-reveal
        className="flex flex-wrap items-center gap-3 pt-1 text-sm text-muted-foreground"
      >
        <span
          className="inline-flex items-center rounded-full border px-3 py-0.5 font-mono text-[0.65rem] font-semibold tracking-[0.16em] uppercase"
          style={{
            borderColor: `color-mix(in oklch, ${accentVar} 40%, transparent)`,
            backgroundColor: `color-mix(in oklch, ${accentVar} 14%, transparent)`,
            color: accentVar,
          }}
        >
          Objetivo
        </span>
        <span className="text-foreground/85">{objective}</span>
      </div>
    </header>
  );
}
