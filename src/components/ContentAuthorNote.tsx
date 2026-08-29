import Link from 'next/link'
import { LOCKSMITH_AUTHOR_SCHEMA } from '@/data/config'

interface ContentAuthorNoteProps {
  reviewedOn: string
  label?: string
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

export default function ContentAuthorNote({
  reviewedOn,
  label = 'Guide',
}: ContentAuthorNoteProps) {
  return (
    <p
      data-content-author="true"
      data-content-author-id={LOCKSMITH_AUTHOR_SCHEMA['@id']}
      data-content-reviewed-on={reviewedOn}
      className="text-sm text-gray-500 mt-3"
    >
      {label} by{' '}
      <Link
        href="/about"
        prefetch={false}
        className="font-bold text-[#0F1B2D] underline decoration-[#FFB800] underline-offset-2 hover:text-[#8A5A00]"
      >
        Ross
      </Link>
      , locksmith. Content reviewed{' '}
      <time dateTime={reviewedOn}>{formatDate(reviewedOn)}</time>.
    </p>
  )
}
