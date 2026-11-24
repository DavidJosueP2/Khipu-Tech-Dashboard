import { EditorialSerif } from "@/components/typography/EditorialSerif";

interface ChapterHeaderProps {
  titleBold: string;
  titleItalic?: string;
  lead: string;
  objective: string;
  headingId?: string;
}

export function ChapterHeader({
  titleBold,
  titleItalic,
  lead,
  objective,
  headingId,
}: ChapterHeaderProps) {
  return (
    <header className="space-y-5 md:space-y-6">
      <h2
        id={headingId}
        data-scene-reveal
        className="type-display max-w-[20ch]"
      >
        {titleBold}
        {titleItalic && (
          <>
            {" "}
            <EditorialSerif>{titleItalic}</EditorialSerif>
          </>
        )}
      </h2>

      <p data-scene-reveal className="editorial-lead">
        {lead}
      </p>

      <p data-scene-reveal className="editorial-aside">
        <EditorialSerif optical="text">{objective}</EditorialSerif>
      </p>
    </header>
  );
}
