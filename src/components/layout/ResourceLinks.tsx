import { ArrowUpRight } from "lucide-react";
import type { ExternalResource } from "@/data/publicResources";

interface ResourceLinksProps {
  title: string;
  links: readonly ExternalResource[];
  heading?: "h3" | "h4";
}

export function ResourceLinks({
  title,
  links,
  heading: Heading = "h3",
}: ResourceLinksProps) {
  return (
    <div className="space-y-5 border-t border-border pt-6">
      <Heading className="type-subheading">{title}</Heading>
      <ul role="list" className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
        {links.map(({ label, url, description }) => (
          <li key={url} className="space-y-1.5">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="editorial-action"
            >
              <span>
                {label}
                <span className="sr-only"> (abre en una pestaña nueva)</span>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
            </a>
            <p className="max-w-[55ch] text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
