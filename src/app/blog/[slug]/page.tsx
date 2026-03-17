import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS, getBlogPostBySlug, getRelatedPosts, PILLARS } from '@/data/blog-posts'
import { ALL_BLOG_CONTENT } from '@/data/blog-content'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  return ALL_BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Local Emergency Locksmith`,
    description: post.excerpt,
    alternates: { canonical: `${SITE_CONFIG.domain}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const content = ALL_BLOG_CONTENT[slug]
  if (!content) notFound()

  const related = getRelatedPosts(slug, 4)
  const pillar = PILLARS.find((p) => p.slug === post.pillarSlug)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Ross',
      jobTitle: 'Locksmith',
      worksFor: {
        '@type': 'LocalBusiness',
        name: 'Local Emergency Locksmith',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Local Emergency Locksmith',
      url: SITE_CONFIG.domain,
    },
    keywords: post.keywords.join(', '),
  }

  const faqSchema = content.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_CONFIG.domain}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_CONFIG.domain}/blog/${slug}` },
    ],
  }

  // Parse markdown-ish content into sections
  const sections = content.body.split('\n## ').map((section, i) => {
    if (i === 0) return section
    return '## ' + section
  })

  return (
    <>
      <SchemaMarkup schema={articleSchema} />
      {faqSchema && <SchemaMarkup schema={faqSchema} />}
      <SchemaMarkup schema={breadcrumbSchema} />

      <nav className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#FFB800]">Home</Link>
        <span className="mx-2">&rsaquo;</span>
        <Link href="/blog" className="hover:text-[#FFB800]">Blog</Link>
        <span className="mx-2">&rsaquo;</span>
        {pillar && (
          <>
            <Link href={`/blog#${pillar.slug}`} className="hover:text-[#FFB800]">{pillar.name}</Link>
            <span className="mx-2">&rsaquo;</span>
          </>
        )}
        <span className="text-gray-800 font-medium truncate max-w-xs inline-block align-bottom">{post.title}</span>
      </nav>

      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Pillar tag */}
          {pillar && (
            <Link
              href={`/blog#${pillar.slug}`}
              className="inline-block bg-[#F7F7F5] text-[#0F1B2D] text-xs font-bold px-3 py-1 rounded-full mb-4 hover:bg-[#FFB800] transition-colors"
            >
              {pillar.name}
            </Link>
          )}

          <div className="text-sm text-gray-400 mb-4">
            {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' · '}{post.readTime}
            {' · '}By Ross, Local Emergency Locksmith
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-[#FFB800] pl-4">
            {post.excerpt}
          </p>

          {/* Quick CTA */}
          <div className="bg-[#0F1B2D] text-white rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm">
              Need help now? Call Ross directly — 24/7, no call centre.
            </p>
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="bg-[#FFB800] text-[#0F1B2D] font-black px-5 py-2 rounded-lg text-sm text-center hover:bg-[#FFC933] transition-colors"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>

          <div className="prose prose-lg max-w-none">
            {sections.map((section, i) => {
              const lines = section.split('\n')
              return (
                <div key={i} className="mb-8">
                  {lines.map((line, j) => {
                    if (line.startsWith('## ')) {
                      return <h2 key={j} className="text-2xl font-black text-gray-900 mt-8 mb-4">{line.replace('## ', '')}</h2>
                    }
                    if (line.startsWith('### ')) {
                      return <h3 key={j} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('### ', '')}</h3>
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <p key={j} className="font-bold text-gray-900 mb-2">{line.replace(/\*\*/g, '')}</p>
                    }
                    if (line.match(/^\*\*[^*]+\*\*/)) {
                      // Line starts with bold text followed by more text
                      const parts = line.split(/\*\*/g)
                      return (
                        <p key={j} className="text-gray-700 leading-relaxed mb-3">
                          {parts.map((part, k) =>
                            k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                          )}
                        </p>
                      )
                    }
                    if (line.startsWith('- ')) {
                      return <li key={j} className="text-gray-700 ml-4 mb-1">{line.replace('- ', '')}</li>
                    }
                    if (line.match(/^\d+\. /)) {
                      return <li key={j} className="text-gray-700 ml-4 mb-2 list-decimal">{line.replace(/^\d+\. /, '')}</li>
                    }
                    if (line.startsWith('| ')) {
                      // Simple table rendering
                      if (line.startsWith('|---') || line.startsWith('| ---')) return null
                      const cells = line.split('|').filter(Boolean).map(c => c.trim())
                      return (
                        <div key={j} className="flex gap-4 py-2 border-b border-gray-100 text-sm text-gray-700">
                          {cells.map((cell, k) => (
                            <span key={k} className={k === 0 ? 'flex-1 font-medium' : 'w-24 text-right'}>{cell}</span>
                          ))}
                        </div>
                      )
                    }
                    if (line.trim() === '') return <div key={j} className="mb-4" />
                    return <p key={j} className="text-gray-700 leading-relaxed mb-4">{line}</p>
                  })}
                </div>
              )
            })}
          </div>

          {/* FAQ */}
          {content.faqs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {content.faqs.map((faq) => (
                  <div key={faq.q} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="font-bold text-gray-900 mb-2">{faq.q}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author bio */}
          <div className="mt-12 bg-[#F7F7F5] rounded-xl p-6 border border-gray-200">
            <p className="font-bold text-[#0F1B2D] mb-2">About the Author</p>
            <p className="text-gray-700 text-sm leading-relaxed">
              I&apos;m Ross, a local independent locksmith covering Coventry, Nuneaton, Rugby, Leamington Spa,
              Warwick, and all surrounding areas. I&apos;ve been working as a locksmith in the Coventry area
              for years and I&apos;ve seen every type of lock problem there is. If you need a locksmith, call
              me on{' '}
              <a href={`tel:${SITE_CONFIG.phoneTel}`} className="font-bold hover:underline">
                {SITE_CONFIG.phone}
              </a>{' '}
              — I&apos;m available 24/7.
            </p>
          </div>

          {/* Related posts */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
            <div className="space-y-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block text-[#0F1B2D] hover:underline text-sm"
                >
                  &rarr; {p.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      <CTABlock />
    </>
  )
}
