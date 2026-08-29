import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StickyHeader from '@/components/StickyHeader'
import MobileCallBar from '@/components/MobileCallBar'
import TrustStrip from '@/components/TrustStrip'
import Footer from '@/components/Footer'
import SchemaMarkup from '@/components/SchemaMarkup'
import { GOOGLE_REVIEWS, SITE_CONFIG } from '@/data/config'
import { SERVICES } from '@/data/services'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900'],
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Locksmith Coventry | Local 24/7 Service | From £59',
  description:
    'Local locksmith in Coventry for lockouts, door lock repairs, replacements, uPVC locks and security upgrades. Available 24/7 from £59; no VAT or call-out fee.',
  metadataBase: new URL(SITE_CONFIG.domain),
  openGraph: {
    siteName: 'Local Emergency Locksmith',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const globalSchema = {
  '@context': 'https://schema.org',
  '@type': 'Locksmith',
  '@id': `${SITE_CONFIG.domain}/#business`,
  name: 'Local Emergency Locksmith',
  url: SITE_CONFIG.domain,
  telephone: SITE_CONFIG.phoneTel,
  email: SITE_CONFIG.email,
  description:
    'Local locksmith serving Coventry and Warwickshire for lockouts, door lock repairs, replacements, uPVC locks, boarding up and security upgrades. Available 24/7.',
  priceRange: '££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  image: `${SITE_CONFIG.domain}/og-image.png`,
  founder: {
    '@type': 'Person',
    name: 'Ross',
    jobTitle: 'Locksmith',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coventry',
    addressRegion: 'West Midlands',
    addressCountry: 'GB',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  // Keep the global business entity concise. Individual area pages describe
  // the full 78-location coverage with their own Place-based Service schema.
  areaServed: [
    'Coventry',
    'Nuneaton',
    'Bedworth',
    'Rugby',
    'Leamington Spa',
    'Warwick',
    'Kenilworth',
    'Stratford-upon-Avon',
  ].map(name => ({ '@type': 'Place', name })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Services',
    itemListElement: SERVICES.map(service => ({
      '@type': 'Offer',
      name: service.name,
      description: service.description,
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: String(service.priceFrom),
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
        description: 'Advertised starting price; the final price depends on the diagnosed scope and agreed parts.',
      },
      url: `${SITE_CONFIG.domain}/services/${service.slug}`,
    })),
  },
  sameAs: [GOOGLE_REVIEWS.profileUrl],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_CONFIG.domain}/#website`,
  name: 'Local Emergency Locksmith',
  url: SITE_CONFIG.domain,
  publisher: { '@id': `${SITE_CONFIG.domain}/#business` },
  inLanguage: 'en-GB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F1B2D" />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <SchemaMarkup schema={globalSchema} />
        <SchemaMarkup schema={websiteSchema} />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className="font-[var(--font-inter)] antialiased bg-white text-gray-900">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <StickyHeader />
        <TrustStrip />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  )
}
