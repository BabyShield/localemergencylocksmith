import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import { SITE_CONFIG } from '@/data/config'

export interface Crumb {
  /** Visible label. Also the exact `name` published in BreadcrumbList. */
  name: string
  /** Site-root-relative path, e.g. `/areas/earlsdon`. Use `/` for Home. */
  href: string
}

type CrumbWidth = 'wide' | 'article' | 'narrow'

const WIDTH_CLASS: Record<CrumbWidth, string> = {
  wide: 'max-w-6xl',
  article: 'max-w-4xl',
  narrow: 'max-w-3xl',
}

function absolute(href: string): string {
  return href === '/' ? SITE_CONFIG.domain : `${SITE_CONFIG.domain}${href}`
}

/**
 * One breadcrumb implementation for the whole site.
 *
 * The visible trail and the BreadcrumbList JSON-LD are rendered from the same
 * `items` array, so the two can never drift apart — Google discards breadcrumb
 * markup whose names do not match what a visitor can actually see. Every page
 * outside the homepage passes its own trail; the homepage has none by design.
 */
export default function Breadcrumbs({
  items,
  width = 'wide',
}: {
  items: Crumb[]
  width?: CrumbWidth
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.href),
    })),
  }

  return (
    <>
      <SchemaMarkup schema={schema} />
      <nav
        aria-label="Breadcrumb"
        className="bg-[#F7F7F5] border-b border-gray-200 px-4"
      >
        {/* Narrow screens scroll the trail sideways instead of wrapping it into
            a two-line block that pushes the H1 below the fold. */}
        <ol
          className={`${WIDTH_CLASS[width]} mx-auto flex items-center gap-1 overflow-x-auto whitespace-nowrap py-2.5 text-sm text-gray-500 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        >
          {items.map((crumb, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={crumb.href} className="flex items-center gap-1 shrink-0">
                {index > 0 && (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5 text-gray-300 shrink-0"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    className="font-semibold text-[#0F1B2D] max-w-[16rem] sm:max-w-none truncate"
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    prefetch={false}
                    className="rounded hover:text-[#8A5A00] hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB800] transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
