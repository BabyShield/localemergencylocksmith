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
  name: 'Local Emergency Locksmith',
  url: SITE_CONFIG.domain,
  telephone: SITE_CONFIG.phoneTel,
  email: SITE_CONFIG.email,
  description:
    'Emergency locksmith serving Coventry and Warwickshire. No VAT, no call-out fee, 15-30 minute response.',
  priceRange: '££',
  currenciesAccepted: 'GBP',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
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
    { '@type': 'City', name: 'Rugby' },
    { '@type': 'City', name: 'Leamington Spa' },
    { '@type': 'City', name: 'Warwick' },
    { '@type': 'City', name: 'Stratford-upon-Avon' },
    { '@type': 'City', name: 'Kenilworth' },
    { '@type': 'City', name: 'Bedworth' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Locksmith Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Emergency Lockout',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '59',
          priceCurrency: 'GBP',
          minPrice: '59',
        },
      },
      {
        '@type': 'Offer',
        name: 'Lock Change',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '69',
          priceCurrency: 'GBP',
          minPrice: '69',
        },
      },
      {
        '@type': 'Offer',
        name: 'uPVC Lock Repair',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '59',
          priceCurrency: 'GBP',
          minPrice: '59',
        },
      },
    ],
  },
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
