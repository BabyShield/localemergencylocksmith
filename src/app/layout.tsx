import type { Metadata } from 'next'
import './globals.css'
import StickyHeader from '@/components/StickyHeader'
import MobileCallBar from '@/components/MobileCallBar'
import TrustStrip from '@/components/TrustStrip'
import Footer from '@/components/Footer'
import { SITE_CONFIG } from '@/data/config'

const CRITICAL_RENDER_CSS = `
body.site-system-font{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
.defer-render{content-visibility:auto;contain-intrinsic-size:auto 800px}
@media print{.defer-render{content-visibility:visible;contain-intrinsic-size:none}}
`

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F1B2D" />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        {/* Keep first-paint typography and below-fold rendering independent of
            the external stylesheet cache. These rules are mirrored globally. */}
        <style
          data-critical-render-css="true"
          dangerouslySetInnerHTML={{ __html: CRITICAL_RENDER_CSS }}
        />
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
      <body className="site-system-font antialiased bg-white text-gray-900">
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
