import { Download, Eye, FileText } from "lucide-react";

import type { TributacionDocument } from "@/data/tributacion";

interface DocumentRowProps {
  doc: TributacionDocument;
  onPreview: (doc: TributacionDocument) => void;
}

/**
 * Fila documental editorial (sin tarjeta pesada) para consultar y descargar
 * los PDF originales de la Unidad II conservando su contexto y trazabilidad.
 */
export function DocumentRow({ doc, onPreview }: DocumentRowProps) {
  return (
    <div
      data-t2-doc-row
      className="group grid grid-cols-1 gap-4 py-6 transition-colors hover:bg-surface/35 lg:grid-cols-[6.5rem_1.45fr_1fr_auto] lg:items-center lg:gap-6"
    >
      <div className="space-y-0.5">
        <span
          className="font-mono text-xs font-bold tracking-wider uppercase"
          style={{
            color: doc.isIntegrator
              ? "var(--module-02)"
              : "var(--muted-foreground)",
          }}
        >
          {doc.code}
        </span>
        <span className="block text-[0.7rem] text-muted-foreground">
          {doc.documentType}
        </span>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-sm leading-snug font-semibold text-foreground sm:text-[0.95rem]">
          {doc.title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {doc.description}
        </p>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5 font-mono text-[0.7rem] text-muted-foreground">
          <span className="inline-flex items-center gap-1 text-foreground/80">
            <FileText className="size-3" style={{ color: "var(--module-02)" }} />
            {doc.fileName}
          </span>
          <span>·</span>
          <span>
            {doc.pages} {doc.pages === 1 ? "pág." : "págs."}
          </span>
          <span>·</span>
          <span>{doc.date}</span>
        </p>
      </div>

      <div className="space-y-1 text-xs text-muted-foreground">
        <p className="font-medium text-foreground/85">{doc.caseContext}</p>
        <p className="leading-relaxed">{doc.relationToApe}</p>
      </div>

      <div className="flex items-center gap-2 lg:justify-end">
        <button
          type="button"
          onClick={() => onPreview(doc)}
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-surface-subtle px-3.5 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Eye className="size-3.5" />
          <span>Visualizar</span>
        </button>

        <a
          href={doc.url}
          download={doc.fileName}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Download className="size-3.5" />
          <span>Descargar</span>
        </a>
      </div>
    </div>
  );
}
