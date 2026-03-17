import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StickyHeader from '@/components/StickyHeader'
import MobileCallBar from '@/components/MobileCallBar'
import TrustStrip from '@/components/TrustStrip'
import Footer from '@/components/Footer'
import SchemaMarkup from '@/components/SchemaMarkup'
import { SITE_CONFIG } from '@/data/config'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900'],
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Emergency Locksmith Coventry | 24/7 | No VAT | Call Now',
    template: '%s | Local Emergency Locksmith',
  },
  description:
    'Emergency locksmith in Coventry & Warwickshire. 15-30 min response, no VAT, no call-out fee. Call 07735 336175 now — available 24/7, 365 days.',
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
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
}

const globalSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Locksmith'],
  '@id': `${SITE_CONFIG.domain}/#business`,
  name: 'Local Emergency Locksmith',
  url: SITE_CONFIG.domain,
  telephone: SITE_CONFIG.phoneTel,
  email: SITE_CONFIG.email,
  description:
    'Emergency locksmith serving Coventry and Warwickshire. No VAT, no call-out fee, 15-30 minute response. Available 24/7, 365 days a year.',
  priceRange: '££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  image: `${SITE_CONFIG.domain}/og-image.png`,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4068,
    longitude: -1.5197,
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
  areaServed: [
    { '@type': 'City', name: 'Coventry' },
    { '@type': 'City', name: 'Nuneaton' },
    { '@type': 'City', name: 'Bedworth' },
    { '@type': 'City', name: 'Rugby' },
    { '@type': 'City', name: 'Leamington Spa' },
    { '@type': 'City', name: 'Warwick' },
    { '@type': 'City', name: 'Stratford-upon-Avon' },
    { '@type': 'City', name: 'Kenilworth' },
    { '@type': 'City', name: 'Solihull' },
    { '@type': 'City', name: 'Southam' },
    { '@type': 'City', name: 'Atherstone' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Emergency Lockout',
        description: 'Emergency door opening — non-destructive entry when possible. Available 24/7.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '59',
          priceCurrency: 'GBP',
          minPrice: '59',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Lock Change & Replacement',
        description: 'Replace any lock type — Yale, mortice, euro cylinder, multipoint. Includes new lock and fitting.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '69',
          priceCurrency: 'GBP',
          minPrice: '69',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'uPVC Door Lock Repair',
        description: 'Repair or replace uPVC door lock mechanisms, cylinders, and handles.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '59',
          priceCurrency: 'GBP',
          minPrice: '59',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Emergency Boarding Up',
        description: 'Emergency board-up service after break-ins or damage. Same-day response.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '79',
          priceCurrency: 'GBP',
          minPrice: '79',
          valueAddedTaxIncluded: true,
        },
      },
      {
        '@type': 'Offer',
        name: 'Lock Upgrade (BS3621 / Anti-Snap)',
        description: 'Upgrade to insurance-approved BS3621 deadlocks or anti-snap euro cylinders.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '79',
          priceCurrency: 'GBP',
          minPrice: '79',
          valueAddedTaxIncluded: true,
        },
      },
    ],
  },
  sameAs: [
    'https://www.facebook.com/localemergencylocksmith',
  ],
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <SchemaMarkup schema={globalSchema} />
        <SchemaMarkup schema={websiteSchema} />
      </head>
      <body className="font-[var(--font-inter)] antialiased bg-white text-gray-900">
        <StickyHeader />
        <TrustStrip />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  )
}
