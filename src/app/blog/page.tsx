import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS, PILLARS } from '@/data/blog-posts'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Locksmith Advice & Security Guides | Coventry',
  description:
    'Evidence-led Coventry locksmith guides covering lock standards, costs, uPVC doors, home security, emergencies and property-specific checks.',
  keywords: 'locksmith blog, locksmith tips coventry, home security advice, lock buying guide, upvc door repair guide, locksmith advice warwickshire',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/blog`,
  },
  openGraph: {
    type: 'website',
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    title: 'Locksmith Blog — Tips, Security Advice & Guides',
    description: 'Evidence-led locksmith guidance for Coventry-area households, with sources and property-specific limitations.',
    url: `${SITE_CONFIG.domain}/blog`,
    images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent('Locksmith Tips & Security Advice')}`, width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_CONFIG.domain}/blog` },
  ],
}

export default function BlogPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium">Blog</span></span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Locksmith Tips & Security Advice
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Practical guidance that separates published evidence from property-specific diagnosis.
          </p>
          <p className="text-gray-400 text-sm">
            {ALL_BLOG_POSTS.length} articles across {PILLARS.length} topics
          </p>
        </div>
      </section>

      {/* Quick nav to pillars */}
      <section className="py-6 px-4 bg-[#F7F7F5] border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Jump to topic:</p>
          <div className="flex flex-wrap gap-2">
            {PILLARS.map((pillar) => (
              <a
                key={pillar.slug}
                href={`#${pillar.slug}`}
                className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-[#FFB800] hover:text-[#0F1B2D] transition-colors"
              >
                {pillar.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grouped by pillar */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {PILLARS.map((pillar) => {
            const posts = ALL_BLOG_POSTS.filter((p) => p.pillarSlug === pillar.slug)
            return (
              <div key={pillar.slug} id={pillar.slug} className="mb-16 last:mb-0 scroll-mt-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">{pillar.name}</h2>
                  <p className="text-gray-500 text-sm">{pillar.description}</p>
                </div>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#FFB800] hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                        <div className="flex-1">
                          <div className="text-xs text-gray-400 mb-1.5">
                            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                            {' · '}{post.readTime}
                          </div>
                          <h3 className="text-lg font-black text-gray-900 mb-2">
                            <Link href={`/blog/${post.slug}`} className="hover:text-[#0F1B2D]">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#0F1B2D] font-semibold hover:underline text-sm whitespace-nowrap self-end sm:self-center"
                        >
                          Read &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Need a locksmith now? — links to money pages */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Need a Locksmith Right Now?
          </h2>
          <p className="text-gray-600 mb-8">
            I serve the listed Coventry-area locations 24/7. Call for the current ETA and price basis.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { slug: 'coventry-city-centre', name: 'Coventry City Centre' },
              { slug: 'earlsdon', name: 'Earlsdon' },
              { slug: 'kenilworth', name: 'Kenilworth' },
              { slug: 'leamington-spa', name: 'Leamington Spa' },
              { slug: 'nuneaton', name: 'Nuneaton' },
              { slug: 'rugby', name: 'Rugby' },
              { slug: 'stratford-upon-avon', name: 'Stratford-upon-Avon' },
              { slug: 'bedworth', name: 'Bedworth' },
              { slug: 'warwick', name: 'Warwick' },
              { slug: 'tile-hill', name: 'Tile Hill' },
              { slug: 'canley', name: 'Canley' },
              { slug: 'binley', name: 'Binley' },
            ].map((area) => (
              <Link
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#FFB800] hover:text-[#0F1B2D] transition-colors text-center"
              >
                Locksmith {area.name}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/areas" className="text-[#0F1B2D] font-bold hover:text-[#FFB800] transition-colors text-sm">
              View all areas I cover &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
