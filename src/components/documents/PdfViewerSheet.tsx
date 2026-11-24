import { Download, ExternalLink, FileText } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * Interfaz estructural mínima aceptada por el visor lateral de PDF.
 * Compatible con todos los módulos sin duplicar tipos ni exigir miniaturas.
 */
export interface ViewerDocument {
  title: string;
  fileName: string;
  relativePath: string;
  url: string;
  documentType: string;
  unit: string;
  date: string;
  pages: number;
  relationToApe: string;
}

interface PdfViewerSheetProps {
  document: ViewerDocument | null;
  onClose: () => void;
}

/**
 * Panel editorial lateral reutilizable para visualizar embebido, abrir en
 * pestaña nueva y descargar los archivos PDF originales sin alterarlos.
 */
export function PdfViewerSheet({ document, onClose }: PdfViewerSheetProps) {
  return (
    <Sheet
      open={document !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-4xl"
      >
        {document && (
          <>
            <SheetHeader className="border-b border-border px-6 py-5 pr-14 text-left">
              <div className="flex flex-wrap items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] text-primary uppercase">
                <span>{document.documentType}</span>
                <span aria-hidden="true" className="text-border-strong">
                  ·
                </span>
                <span className="text-muted-foreground">
                  {document.unit} · {document.pages}{" "}
                  {document.pages === 1 ? "página" : "páginas"} · {document.date}
                </span>
              </div>

              <SheetTitle className="mt-1 text-base leading-snug font-semibold text-foreground sm:text-lg">
                {document.title}
              </SheetTitle>

              <SheetDescription className="text-xs text-muted-foreground">
                {document.relationToApe} · Archivo original:{" "}
                <code className="text-[0.72rem] text-foreground/85">
                  {document.fileName}
                </code>
              </SheetDescription>

              <div className="flex flex-wrap items-center gap-2.5 pt-3">
                <a
                  href={document.url}
                  download={document.fileName}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Download className="size-3.5" />
                  <span>Descargar PDF</span>
                </a>

                <a
                  href={document.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-4 text-xs font-medium text-foreground transition-colors hover:border-border-strong hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <ExternalLink className="size-3.5 text-primary" />
                  <span>Abrir en pestaña nueva</span>
                </a>
              </div>
            </SheetHeader>

            <div className="relative flex-1 bg-surface-subtle">
              <iframe
                src={document.url}
                title={`Vista previa de ${document.fileName}`}
                className="h-full w-full border-0"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface px-6 py-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem]">
                <FileText className="size-3.5 text-primary" />
                {document.relativePath}
              </span>
              <span>
                Si tu navegador bloquea la vista embebida, usa «Abrir en pestaña
                nueva» o «Descargar PDF».
              </span>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
