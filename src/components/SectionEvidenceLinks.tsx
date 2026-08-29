import type { EvidenceSource } from '@/data/locksmith-evidence'

interface SectionEvidenceLinksProps {
  section: 'intro' | 'local-angle' | 'local-evidence' | 'preparation' | 'checks' | 'faqs'
  sourceIds: string[]
  sources: EvidenceSource[]
}

export default function SectionEvidenceLinks({
  section,
  sourceIds,
  sources,
}: SectionEvidenceLinksProps) {
  const sourceById = new Map(sources.map(source => [source.id, source]))
  const sectionSources = sourceIds.map(sourceId => {
    const source = sourceById.get(sourceId)
    if (!source) throw new Error(`Missing evidence source ${sourceId} for section ${section}`)
    return source
  })

  return (
    <details
      data-evidence-section={section}
      data-evidence-source-ids={sourceIds.join(' ')}
      className="mt-5 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm"
    >
      <summary className="cursor-pointer font-bold text-[#0F1B2D] marker:text-[#FFB800]">
        Evidence links for this section ({sectionSources.length})
      </summary>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Evidence sources used in this section">
        {sectionSources.map(source => (
          <li key={source.id}>
            <a
              href={`#evidence-source-${source.id}`}
              className="inline-flex rounded-full border border-[#FFB800]/50 bg-[#FFF9E8] px-3 py-1.5 font-semibold text-[#5F4300] underline decoration-[#FFB800] underline-offset-2 hover:border-[#FFB800]"
            >
              {source.publisher}: {source.title}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
