import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS, getBlogPostBySlug, getRelatedPosts, PILLARS } from '@/data/blog-posts'
import { ALL_BLOG_CONTENT } from '@/data/blog-content'
import { BLOG_CONTENT_UPDATED, BLOG_CTA_BY_PILLAR, BLOG_CTA_BY_SLUG, BLOG_META_DESCRIPTIONS, BLOG_SEARCH_TITLES } from '@/data/blog-seo'
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
  const searchTitle = BLOG_SEARCH_TITLES[slug] ?? post.title
  const metaDescription = BLOG_META_DESCRIPTIONS[slug] ?? post.excerpt
  return {
    title: searchTitle,
    description: metaDescription,
    keywords: post.keywords.join(', '),
    alternates: { canonical: `${SITE_CONFIG.domain}/blog/${slug}` },
    openGraph: {
      title: searchTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.date,
      url: `${SITE_CONFIG.domain}/blog/${slug}`,
      images: [{ url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(post.title)}`, width: 1200, height: 630 }],
    },
  }
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // First split on markdown links [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let keyIdx = 0

  while ((match = linkPattern.exec(text)) !== null) {
    // Text before this link
    if (match.index > lastIndex) {
      parts.push(...renderBoldSegments(text.slice(lastIndex, match.index), keyIdx))
      keyIdx += 10
    }
    const linkText = match[1]
    const url = match[2]
    if (url.startsWith('/')) {
      parts.push(
        <Link key={`link-${keyIdx++}`} href={url} className="text-[#0F1B2D] underline font-semibold hover:text-[#FFB800] transition-colors">
          {linkText}
        </Link>
      )
    } else {
      parts.push(
        <a key={`link-${keyIdx++}`} href={url} target="_blank" rel="noopener noreferrer" className="text-[#0F1B2D] underline font-semibold hover:text-[#FFB800] transition-colors">
          {linkText}
        </a>
      )
    }
    lastIndex = match.index + match[0].length
  }

  // Remaining text after last link
  if (lastIndex < text.length) {
    parts.push(...renderBoldSegments(text.slice(lastIndex), keyIdx))
  }

  return parts.length === 1 ? parts[0] : parts
}

function renderBoldSegments(text: string, startKey: number): React.ReactNode[] {
  const boldParts = text.split(/\*\*/g)
  return boldParts.map((part, k) =>
    k % 2 === 1
      ? <strong key={`b-${startKey}-${k}`}>{part}</strong>
      : <span key={`t-${startKey}-${k}`}>{part}</span>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const content = ALL_BLOG_CONTENT[slug]
  if (!content) notFound()

  const related = getRelatedPosts(slug, 4)
  const pillar = PILLARS.find((p) => p.slug === post.pillarSlug)
  const serviceCta = BLOG_CTA_BY_SLUG[slug] ?? BLOG_CTA_BY_PILLAR[post.pillarSlug]
  const citations = Array.from(
    new Set(Array.from(content.body.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g), match => match[1]))
  )

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_CONFIG.domain}/blog/${slug}`,
    datePublished: post.date,
    dateModified: BLOG_CONTENT_UPDATED[slug] ?? post.date,
    image: { '@type': 'ImageObject', url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(post.title)}`, width: 1200, height: 630 },
    author: {
      '@type': 'Person',
      name: 'Ross',
      jobTitle: 'Locksmith',
      worksFor: { '@id': `${SITE_CONFIG.domain}/#business` },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Local Emergency Locksmith',
      url: SITE_CONFIG.domain,
      logo: { '@type': 'ImageObject', url: `${SITE_CONFIG.domain}/icon-512.png`, width: 512, height: 512 },
    },
    articleSection: pillar?.name || 'Locksmith Advice',
    keywords: post.keywords.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_CONFIG.domain}/blog/${slug}` },
    ...(citations.length > 0 ? { citation: citations } : {}),
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

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Home</span></Link>
            <meta itemProp="position" content="1" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <Link href="/blog" prefetch={false} itemProp="item" className="hover:text-[#FFB800]"><span itemProp="name">Blog</span></Link>
            <meta itemProp="position" content="2" />
          </li>
          <span className="mx-2" aria-hidden="true">›</span>
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <span><span itemProp="name" className="text-gray-800 font-medium truncate max-w-xs inline-block align-bottom">{post.title}</span></span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
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
                      return (
                        <p key={j} className="text-gray-700 leading-relaxed mb-3">
                          {renderInlineMarkdown(line)}
                        </p>
                      )
                    }
                    if (line.startsWith('- ')) {
                      return <li key={j} className="text-gray-700 ml-4 mb-1">{renderInlineMarkdown(line.replace('- ', ''))}</li>
                    }
                    if (line.match(/^\d+\. /)) {
                      return <li key={j} className="text-gray-700 ml-4 mb-2 list-decimal">{renderInlineMarkdown(line.replace(/^\d+\. /, ''))}</li>
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
                    return <p key={j} className="text-gray-700 leading-relaxed mb-4">{renderInlineMarkdown(line)}</p>
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
              I&apos;m Ross, the independent locksmith behind Local Emergency Locksmith. These guides
              separate cited standards and public guidance from the checks that can only be made at
              the actual door. If you need a locksmith in one of the listed coverage locations, call me on{' '}
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
          {/* One contextual commercial destination plus the area directory.
              This avoids repeating all 78 area links on every article. */}
          {serviceCta && (
            <div className="mt-10 bg-[#0F1B2D] rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">{serviceCta.heading}</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {serviceCta.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={serviceCta.href} className="text-[#FFB800] text-sm font-bold hover:underline">
                  {serviceCta.label} &rarr;
                </Link>
                <Link href="/areas" className="text-white text-sm font-bold hover:underline">
                  Check all areas covered &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABlock />
    </>
  )
}
