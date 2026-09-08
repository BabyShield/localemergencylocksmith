import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/Breadcrumbs'
import CTABlock from '@/components/CTABlock'
import FAQSection from '@/components/FAQSection'
import SchemaMarkup from '@/components/SchemaMarkup'
import { SITE_CONFIG } from '@/data/config'
import { ALL_BLOG_POSTS, getBlogPostBySlug, PILLARS } from '@/data/blog-posts'
import { BLOG_TOPICS, getBlogTopic } from '@/data/blog-topics'
import { BLOG_SEARCH_TITLES } from '@/data/blog-seo'
import { BLOG_TOPICS_REVIEWED_ON } from '@/data/content-dates'
import { SERVICES } from '@/data/services'

export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  return BLOG_TOPICS.map(topic => ({ slug: topic.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getBlogTopic(slug)
  if (!topic) return {}

  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    keywords: topic.keywords.join(', '),
    alternates: { canonical: `${SITE_CONFIG.domain}/blog/topic/${slug}` },
    openGraph: {
      type: 'website',
      title: topic.metaTitle,
      description: topic.metaDescription,
      url: `${SITE_CONFIG.domain}/blog/topic/${slug}`,
      images: [
        {
          url: `${SITE_CONFIG.domain}/api/og?title=${encodeURIComponent(topic.h1)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogTopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getBlogTopic(slug)
  if (!topic) notFound()

  const pillar = PILLARS.find(entry => entry.slug === slug)
  if (!pillar) notFound()

  const posts = ALL_BLOG_POSTS
    .filter(post => post.pillarSlug === slug)
    .sort((left, right) => right.date.localeCompare(left.date))

  const startHerePost = getBlogPostBySlug(topic.startHere)
  const relatedServices = topic.services
    .map(serviceSlug => SERVICES.find(service => service.slug === serviceSlug))
    .filter((service): service is NonNullable<typeof service> => service != null)

  const otherTopics = BLOG_TOPICS.filter(entry => entry.slug !== slug)

  // CollectionPage rather than Blog: this page curates and explains an existing
  // set of articles, it does not publish a new one.
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_CONFIG.domain}/blog/topic/${slug}#webpage`,
    url: `${SITE_CONFIG.domain}/blog/topic/${slug}`,
    name: topic.h1,
    description: topic.metaDescription,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${SITE_CONFIG.domain}/#website` },
    publisher: { '@id': `${SITE_CONFIG.domain}/#business` },
    dateModified: BLOG_TOPICS_REVIEWED_ON,
    mainEntity: {
      '@type': 'ItemList',
      name: `${topic.h1} guides`,
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_CONFIG.domain}/blog/${post.slug}`,
        name: BLOG_SEARCH_TITLES[post.slug] ?? post.title,
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: topic.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <SchemaMarkup schema={collectionSchema} />
      <SchemaMarkup schema={faqSchema} />

      <Breadcrumbs
        width="article"
        items={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: topic.breadcrumbName, href: `/blog/topic/${slug}` },
        ]}
      />

      <section className="py-12 px-4 bg-[#0F1B2D] text-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFB800] mb-3">
            Guide topic
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{topic.h1}</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{topic.standfirst}</p>
          <p className="text-gray-400 text-sm mt-5">
            {posts.length} guides in this topic &middot; reviewed{' '}
            <time dateTime={BLOG_TOPICS_REVIEWED_ON}>{formatDate(BLOG_TOPICS_REVIEWED_ON)}</time>
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-5">What this topic covers</h2>
          {topic.intro.map(paragraph => (
            <p key={paragraph.slice(0, 48)} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}

          <div className="rounded-xl border border-[#FFB800]/40 bg-[#FFF9E8] p-6 mt-8">
            <h3 className="font-black text-[#0F1B2D] mb-2">Where these guides stop</h3>
            <p className="text-gray-700 leading-relaxed">{topic.limits}</p>
          </div>

          {startHerePost && (
            <div className="mt-8 rounded-xl border border-gray-200 bg-[#F7F7F5] p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#8A5A00] mb-2">
                Start here
              </h3>
              <p className="text-lg font-black text-[#0F1B2D] mb-2">
                <Link
                  href={`/blog/${startHerePost.slug}`}
                  className="underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
                >
                  {startHerePost.title}
                </Link>
              </p>
              <p className="text-gray-700 leading-relaxed">{topic.startHereReason}</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4 bg-[#F7F7F5]" aria-labelledby="topic-guides-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="topic-guides-heading" className="text-2xl font-black text-[#0F1B2D] mb-2">
            All {posts.length} guides on {pillar.name.toLowerCase()}
          </h2>
          <p className="text-gray-600 mb-8">{pillar.description}</p>

          <div className="space-y-4">
            {posts.map(post => (
              <article
                key={post.slug}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#FFB800] transition-colors"
              >
                <div className="text-xs text-gray-400 mb-1.5">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {' · '}
                  {post.readTime}
                </div>
                <h3 className="text-lg font-black text-[#0F1B2D] mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#8A5A00]">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#0F1B2D] mb-3">
            When reading is not the answer
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            These guides explain the decision. If you already know what you need doing, the service
            pages below carry the published starting price, the scope each price assumes and the
            checks made before any work begins.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServices.map(service => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="block rounded-xl border border-gray-200 bg-[#F7F7F5] p-5 hover:border-[#FFB800] transition-colors"
              >
                <span className="block font-black text-[#0F1B2D] mb-1">{service.shortName}</span>
                <span className="block text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </span>
                <span className="mt-3 inline-block text-sm font-bold text-[#8A5A00]">
                  From &pound;{service.priceFrom} &rarr;
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6">
            Not sure which applies? The{' '}
            <Link
              href="/faq"
              className="font-semibold underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
            >
              frequently asked questions
            </Link>{' '}
            cover scope, pricing and timing, and the{' '}
            <Link
              href="/prices"
              className="font-semibold underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
            >
              full price list
            </Link>{' '}
            shows what each starting price includes.
          </p>
        </div>
      </section>

      <FAQSection
        faqs={topic.faqs}
        heading={`${topic.breadcrumbName} — common questions`}
      />

      <section className="py-12 px-4 bg-white" aria-labelledby="other-topics-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="other-topics-heading" className="text-2xl font-black text-[#0F1B2D] mb-6">
            Other guide topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherTopics.map(other => (
              <Link
                key={other.slug}
                href={`/blog/topic/${other.slug}`}
                className="block rounded-xl border border-gray-200 p-4 hover:border-[#FFB800] transition-colors"
              >
                <span className="block font-bold text-[#0F1B2D] mb-1">{other.h1}</span>
                <span className="block text-sm text-gray-600 leading-relaxed">
                  {other.standfirst}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-6">
            Or browse{' '}
            <Link
              href="/blog"
              className="font-semibold underline decoration-[#FFB800] underline-offset-4 hover:text-[#8A5A00]"
            >
              every locksmith guide
            </Link>{' '}
            in one list.
          </p>
        </div>
      </section>

      <CTABlock
        heading="Need this dealt with rather than explained?"
        subtext="Call and describe the door, the lock and what it is doing. I confirm the current ETA and the price basis before travelling — 24/7, no VAT, no call-out fee."
      />
    </>
  )
}
