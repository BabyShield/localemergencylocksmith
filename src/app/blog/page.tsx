import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { ARTICLE_TEMPLATES } from '@/data/articles'
import { ALL_BLOG_POSTS, PILLARS } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Locksmith Blog — Tips, Security Advice & Guides | Local Emergency Locksmith Coventry',
  description:
    'Expert locksmith advice for Coventry and Warwickshire homeowners. Lock types, security guides, honest pricing, uPVC door help, and seasonal tips — from a working locksmith.',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/blog`,
  },
}

export default function BlogPage() {
  return (
    <>
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <span className="text-gray-800 font-medium">Blog</span>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Locksmith Tips & Security Advice
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Honest advice from a Coventry locksmith — no fluff, no corporate waffle.
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

      {/* Browse by area (Plan 2 articles) */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Browse Local Area Guides
          </h2>
          <p className="text-gray-600 mb-8">
            Every area guide is tailored to your specific location — with local response times, postcodes, and pricing.
          </p>

          {/* Major area quick links */}
          <div className="mb-10">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-wide mb-4">
              Popular Areas
            </h3>
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
                  href={`/blog/${area.slug}/locked-out-at-night`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:border-[#FFB800] hover:text-[#0F1B2D] transition-colors text-center"
                >
                  {area.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Article topics */}
          <div>
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-wide mb-4">
              Area Article Topics
            </h3>
            <div className="space-y-3">
              {ARTICLE_TEMPLATES.map((article) => (
                <div
                  key={article.slug}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#FFB800] hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-900">
                        {article.titleTemplate.replace(/\{area\}/g, '[Your Area]')}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Available for all 78 covered areas
                      </p>
                    </div>
                    <Link
                      href={`/blog/coventry-city-centre/${article.slug}`}
                      className="text-[#0F1B2D] font-semibold hover:underline text-sm whitespace-nowrap"
                    >
                      Read example &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
