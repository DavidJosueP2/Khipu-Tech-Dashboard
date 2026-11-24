import type { ComponentPropsWithoutRef } from "react";
import { cn } from "cn";

/**
 * Caracteres no soportados o marcados con sello ornamental "DEMO" en los archivos
 * locales de Fontspring DEMO Apparel / Apparel Display:
 * - Diacríticos españoles y comillas/guiones tipográficos.
 * - Dígitos (por el dígito "4" sustituido por sello DEMO; se uniforma toda cifra).
 * - Símbolos ASCII marcados con sello DEMO.
 */
const UNSAFE_DEMO_GLYPH_REGEX =
  /[áéíóúÁÉÍÓÚñÑüÜ¿¡–—«»0-9!"#$%&'()*+\-/<=>@[\]^_`{|}~]/;

export interface EditorialSerifProps extends ComponentPropsWithoutRef<"span"> {
  /** Texto del fragmento serif. Debe pasarse como cadena para validar cobertura de glifos. */
  children: string;
  /** Óptica deseada: 'display' (Apparel Display Italic) o 'text' (Apparel Italic). */
  optical?: "display" | "text";
  /** Peso itálico real disponible en Apparel: 300, 400 o 700. */
  weight?: "light" | "regular" | "bold";
}

const WEIGHT_CLASS: Record<NonNullable<EditorialSerifProps["weight"]>, string> = {
  light: "font-light",
  regular: "font-normal",
  bold: "font-bold",
};

/**
 * Renderiza fragmentos editoriales EXCLUSIVAMENTE en serif italic.
 *
 * Salvaguarda tipográfica (Etapa 3 §1.2):
 * - Si el fragmento contiene únicamente caracteres limpios de Apparel DEMO,
 *   renderiza 100 % con Apparel / Apparel Display Italic.
 * - Si el fragmento incluye tildes, «ñ», cifras o signos con sello DEMO, aplica
 *   `--font-role-serif-complete` al fragmento completo para evitar cualquier
 *   mezcla de glifos distintos o aparición del sello DEMO.
 */
export function EditorialSerif({
  children,
  optical = "display",
  weight = "regular",
  className,
  ...props
}: EditorialSerifProps) {
  const needsCompleteFallback = UNSAFE_DEMO_GLYPH_REGEX.test(children);

  const familyClass = needsCompleteFallback
    ? "serif-complete-italic"
    : optical === "display"
      ? "serif-display-italic"
      : "serif-editorial-italic";

  return (
    <span
      data-serif-mode={needsCompleteFallback ? "complete-fallback" : `apparel-${optical}`}
      className={cn(familyClass, WEIGHT_CLASS[weight], className)}
      {...props}
    >
      {children}
    </span>
  );
}
