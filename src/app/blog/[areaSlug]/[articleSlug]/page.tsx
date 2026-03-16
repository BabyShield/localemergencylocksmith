import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AREAS, getAreaBySlug, getAreaNeighbours } from '@/data/areas'
import {
  ARTICLE_TEMPLATES,
  getArticleBySlug,
  renderTemplate,
  getIntroVariant,
} from '@/data/articles'
import { SITE_CONFIG } from '@/data/config'
import CTABlock from '@/components/CTABlock'
import SchemaMarkup from '@/components/SchemaMarkup'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const params: { areaSlug: string; articleSlug: string }[] = []
  for (const area of AREAS) {
    for (const article of ARTICLE_TEMPLATES) {
      params.push({ areaSlug: area.slug, articleSlug: article.slug })
    }
  }
  return params
}

interface Props {
  params: Promise<{ areaSlug: string; articleSlug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { areaSlug, articleSlug } = await params
  const area = getAreaBySlug(areaSlug)
  const article = getArticleBySlug(articleSlug)
  if (!area || !article) return {}

  const title = renderTemplate(article.titleTemplate, area)
  const description = renderTemplate(article.metaTemplate, area)
  const url = `${SITE_CONFIG.domain}/blog/${areaSlug}/${articleSlug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { areaSlug, articleSlug } = await params
  const area = getAreaBySlug(areaSlug)
  const article = getArticleBySlug(articleSlug)

  if (!area || !article) notFound()

  const neighbours = getAreaNeighbours(area)
  const intro = renderTemplate(getIntroVariant(article, area.region), area)
  const pageTitle = renderTemplate(article.titleTemplate, area)
  const pageUrl = `${SITE_CONFIG.domain}/blog/${areaSlug}/${articleSlug}`

  // FAQ schema — last 3 sections
  const faqSections = article.sections.slice(-3)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.domain },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_CONFIG.domain}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${area.name} Articles`,
        item: `${SITE_CONFIG.domain}/blog/${areaSlug}/locked-out-at-night`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: pageTitle,
        item: pageUrl,
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: pageTitle,
    url: pageUrl,
    datePublished: '2026-03-01',
    dateModified: '2026-03-01',
    author: {
      '@type': 'Person',
      name: 'Local Emergency Locksmith',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Local Emergency Locksmith',
      url: SITE_CONFIG.domain,
    },
    description: renderTemplate(article.metaTemplate, area),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSections.map((section) => ({
      '@type': 'Question',
      name: renderTemplate(section.headingTemplate, area),
      acceptedAnswer: {
        '@type': 'Answer',
        text: renderTemplate(section.paragraphs[0], area),
      },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <SchemaMarkup schema={articleSchema} />
      <SchemaMarkup schema={faqSchema} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 py-3 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link href="/blog" className="hover:text-green-700">
          Blog
        </Link>
        <span className="mx-2">›</span>
        <Link
          href={`/blog/${areaSlug}/locked-out-at-night`}
          className="hover:text-green-700"
        >
          {area.name}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">{pageTitle}</span>
      </nav>

      {/* Hero */}
      <section
        className="py-12 px-4 text-white"
        style={{ background: 'linear-gradient(135deg, #1B5E20, #2E7D32)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-green-700 text-green-100 text-xs font-semibold px-3 py-1 rounded-full">
              {area.postcode}
            </span>
            <span className="bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              ⏱ {area.responseTime} response
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight">{pageTitle}</h1>
          <p className="text-green-100 text-lg leading-relaxed max-w-3xl">{intro}</p>
          <div className="mt-6">
            <a
              href={`tel:${SITE_CONFIG.phoneTel}`}
              className="inline-flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-black text-lg transition-colors shadow-lg"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-orange-100">
                Call Now — 24/7
              </span>
              <span className="text-2xl">{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Main content */}
          <article className="lg:col-span-2 space-y-10">
            {article.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-4">
                  {renderTemplate(section.headingTemplate, area)}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((para, j) => (
                    <p key={j} className="text-gray-700 leading-relaxed">
                      {renderTemplate(para, area)}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Local context callout */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h2 className="text-lg font-black text-green-900 mb-3">
                About {area.name} ({area.postcode})
              </h2>
              <p className="text-green-800 leading-relaxed">{area.uniqueContent}</p>
            </div>

            {/* CTA inline */}
            <div className="bg-gray-900 text-white rounded-xl p-6 text-center">
              <p className="font-bold text-lg mb-3">
                {renderTemplate(article.ctaTemplate, area)}
              </p>
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="inline-flex flex-col items-center bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-black text-xl transition-colors shadow"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-orange-100">
                  Call Now — Free Quote
                </span>
                <span className="text-2xl">{SITE_CONFIG.phone}</span>
              </a>
              <p className="text-gray-400 text-sm mt-3">
                No VAT · No Call-Out Fee · Price Confirmed Before I Start
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="mt-10 lg:mt-0 space-y-6">
            {/* Also useful */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-4">
                Also Useful
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href={`/areas/${areaSlug}`}
                    className="text-green-700 hover:underline font-medium"
                  >
                    Emergency Locksmith in {area.name} →
                  </Link>
                </li>
                {article.relatedServiceSlugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/services/${slug}`}
                      className="text-green-700 hover:underline font-medium capitalize"
                    >
                      {slug.replace(/-/g, ' ')} →
                    </Link>
                  </li>
                ))}
                {article.relatedArticleSlugs.map((slug) => {
                  const related = getArticleBySlug(slug)
                  if (!related) return null
                  return (
                    <li key={slug}>
                      <Link
                        href={`/blog/${areaSlug}/${slug}`}
                        className="text-green-700 hover:underline font-medium"
                      >
                        {renderTemplate(related.titleTemplate, area)} →
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Quick info */}
            <div className="bg-green-800 text-white rounded-xl p-5">
              <h3 className="text-sm font-black uppercase tracking-wide mb-4 text-green-100">
                {area.name} — Key Facts
              </h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>
                  <span className="font-bold text-white">Postcode:</span> {area.postcode}
                </li>
                <li>
                  <span className="font-bold text-white">Response:</span>{' '}
                  {area.responseTime}
                </li>
                <li>
                  <span className="font-bold text-white">Lockout from:</span> £59
                </li>
                <li>
                  <span className="font-bold text-white">Lock change from:</span> £69
                </li>
                <li>
                  <span className="font-bold text-white">VAT:</span> None
                </li>
                <li>
                  <span className="font-bold text-white">Call-out fee:</span> None
                </li>
              </ul>
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="block mt-4 bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-lg font-black transition-colors"
              >
                {SITE_CONFIG.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Nearby areas */}
      {neighbours.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-black text-gray-900 mb-6">
              Also Covering Nearby Areas
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {neighbours.map((neighbour) => (
                <Link
                  key={neighbour.slug}
                  href={`/blog/${neighbour.slug}/${articleSlug}`}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:border-green-700 hover:text-green-800 transition-colors text-center"
                >
                  {neighbour.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock
        heading={`Locked out in ${area.name}? Call me now.`}
        subtext={`I cover ${area.name} and ${area.postcode}. ${area.responseTime} typical response. From £59, no VAT, no call-out fee.`}
      />
    </>
  )
}
