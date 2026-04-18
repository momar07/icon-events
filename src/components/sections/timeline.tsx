interface TimelineEntry {
  year: number;
  title: string;
  description: string;
}

interface TimelineSectionProps {
  title: string;
  entries: TimelineEntry[];
}

export function TimelineSection({ title, entries }: TimelineSectionProps) {
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => a.year - b.year);

  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="heading-2 neon-text-pink mb-12 text-center">{title}</h2>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#FF006E] via-[#00D9FF] to-[#FF006E] md:left-1/2" />

          {sorted.map((entry, index) => (
            <div
              key={index}
              className={`relative mb-12 flex items-start ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#00D9FF] bg-[#0A0E27] md:left-1/2">
                <div className="h-3 w-3 rounded-full bg-[#00D9FF]" />
              </div>

              {/* Content */}
              <div className={`ml-12 w-full rounded-lg border border-[#252B4A] bg-[#1A1F3A] p-6 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <span className="mb-2 inline-block rounded-full bg-[#00D9FF]/10 px-3 py-1 text-sm font-bold text-[#00D9FF]">
                  {entry.year}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-[#F5F7FA]">{entry.title}</h3>
                <p className="text-sm text-[#A0AEC0]">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
