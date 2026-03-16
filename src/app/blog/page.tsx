import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { ARTICLE_TEMPLATES } from '@/data/articles'

export const metadata: Metadata = {
  title: 'Locksmith Blog — Tips & Advice | Local Emergency Locksmith Coventry',
  description:
    'Locksmith tips, security advice, and guides for Coventry and Warwickshire homeowners. How to stay secure, what to do in a lockout, and more.',
  alternates: {
    canonical: `${SITE_CONFIG.domain}/blog`,
  },
}

export const BLOG_POSTS = [
  {
    slug: 'emergency-locksmith-cost-coventry-2026',
    title: 'How Much Does an Emergency Locksmith Cost in Coventry in 2026?',
    excerpt:
      'Wondering what a locksmith really costs in Coventry? Here are the actual prices — no vague ranges, no "call for a quote". Honest costs for every common job.',
    date: '2026-03-01',
    readTime: '6 min read',
  },
  {
    slug: 'locked-out-late-night-coventry',
    title: 'Locked Out Late at Night in Coventry? Here Is Exactly What to Do',
    excerpt:
      "It's midnight. You're locked out. Here is a step-by-step guide for what to do — and what not to do — if you're locked out of your home in Coventry at night.",
    date: '2026-03-08',
    readTime: '5 min read',
  },
  {
    slug: 'bs3621-locks-explained',
    title: 'BS3621 Locks Explained — Why Your Home Insurance May Require One',
    excerpt:
      'Does your home insurance require a BS3621 lock? Many policies do — and many homeowners don\'t have one. Here\'s what it means and how to check.',
    date: '2026-03-15',
    readTime: '7 min read',
  },
  {
    slug: 'upvc-door-lock-needs-replacing',
    title: 'How to Tell If Your uPVC Door Lock Needs Replacing (Not Just Fixing)',
    excerpt:
      "A stiff uPVC door isn't always a broken lock. Here's how to tell whether you need a repair, a replacement, or just a door adjustment.",
    date: '2026-03-22',
    readTime: '5 min read',
  },
  {
    slug: 'locksmith-wont-give-price-on-phone',
    title: 'Why You Should Never Use a Locksmith Who Won\'t Give a Price on the Phone',
    excerpt:
      "Rogue locksmith scams cost UK homeowners millions every year. Here's exactly what to look for — and how to avoid being ripped off when you're locked out.",
    date: '2026-03-29',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <>
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Blog</span>
      </nav>

      <section className="py-12 px-4 text-white" style={{ background: '#0F1B2D' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            Locksmith Tips & Security Advice
          </h1>
          <p className="text-gray-300 text-lg">
            Honest advice from a Coventry locksmith — no fluff, no corporate waffle.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#FFB800] hover:shadow-sm transition-all"
              >
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' · '}{post.readTime}
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#0F1B2D]">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#0F1B2D] font-semibold hover:underline text-sm"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by area */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Browse Articles by Area
          </h2>
          <p className="text-gray-600 mb-8">
            Every article is tailored to your specific area — with local response times, postcodes, and pricing.
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
                { slug: 'atherstone', name: 'Atherstone' },
                { slug: 'warwick', name: 'Warwick' },
                { slug: 'solihull', name: 'Solihull' },
                { slug: 'tile-hill', name: 'Tile Hill' },
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
              Article Topics (All Areas)
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
                        Available for all {78} covered areas
                      </p>
                    </div>
                    <Link
                      href={`/blog/coventry-city-centre/${article.slug}`}
                      className="text-[#0F1B2D] font-semibold hover:underline text-sm whitespace-nowrap"
                    >
                      Read example →
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
