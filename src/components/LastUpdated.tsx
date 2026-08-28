interface LastUpdatedProps {
  date: string // e.g. "2026-03-17"
}

export default function LastUpdated({ date }: LastUpdatedProps) {
  const formatted = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <p className="text-xs text-gray-600 mt-2">
      This page was last reviewed and updated on {formatted}
    </p>
  )
}
