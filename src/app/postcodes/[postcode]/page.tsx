import { AREAS } from '@/data/areas'
import { Metadata } from 'next'
import Link from 'next/link'
import StickyHeader from '@/components/StickyHeader'
import Footer from '@/components/Footer'
import { MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const postcodes = new Set(AREAS.map(a => a.postcode.toLowerCase()))
  return Array.from(postcodes).map(postcode => ({
    postcode
  }))
}

export async function generateMetadata({ params }: { params: { postcode: string } }): Promise<Metadata> {
  const { postcode } = params
  const upperPostcode = postcode.toUpperCase()
  
  return {
    title: `Emergency Locksmith ${upperPostcode} | 15 Min Response | 24/7 Coverage`,
    description: `Locked out in ${upperPostcode}? Fast, trusted, and local emergency locksmith servicing all areas in ${upperPostcode}. No call-out fee, BS3621 approved locks.`
  }
}

export default function PostcodePage({ params }: { params: { postcode: string } }) {
  const { postcode } = params
  const upperPostcode = postcode.toUpperCase()
  
  const relevantAreas = AREAS.filter(a => a.postcode.toLowerCase() === postcode)
  
  if (relevantAreas.length === 0) {
    notFound()
  }

  // Construct JSON-LD Schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Emergency Locksmith',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Local Emergency Locksmith',
      'telephone': '07735 336175',
      'priceRange': '££',
      'image': 'https://localemergencylocksmith.co.uk/coventry-locksmith-van.jpg'
    },
    'areaServed': relevantAreas.map(area => ({
      '@type': 'City',
      'name': area.name
    }))
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <StickyHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#0A0A0A] to-[#1A1A1A]"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-sm font-medium tracking-wide">Live GPS Active in {upperPostcode}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Locksmith <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">{upperPostcode}</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              We provide rapid, zero-call-out emergency locksmith services across all {upperPostcode} locations. Selected by local residents for no VAT and guaranteed 15-30 minute responses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="tel:07735336175" className="inline-flex justify-center items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                Call 07735 336175
              </a>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-500" />
                <span>BS3621 Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" />
                <span>24/7 Dispatch</span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md animate-slide-up">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-8 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-6">Need Immediate Access?</h3>
              <p className="text-gray-400 mb-6">Serving all areas in {upperPostcode}. No call-out fees.</p>
              
              <div className="space-y-4">
                <a href="tel:07735336175" className="block w-full bg-sky-500 hover:bg-sky-400 text-white text-center py-4 rounded-lg font-bold text-xl transition-colors">
                  Call Now: 07735 336175
                </a>
                <p className="text-xs text-center text-gray-500 uppercase tracking-wider">
                  Open 24/7 • No Vat • Local Engineer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Areas Covered in <span className="text-sky-400">{upperPostcode}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select your specific area below for rapid dispatch. We have engineered local street-level routing to reach you in record time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relevantAreas.map(area => (
              <Link 
                key={area.slug}
                href={`/areas/${area.slug}`}
                className="group relative p-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-sky-500/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{area.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {area.commonIssues}
                  </p>
                  <div className="flex items-center text-sky-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    View Area Coverage <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Choose Us Across {upperPostcode}?
            </h2>
            <p className="text-lg text-gray-400">
              Unlike national call centres that sub-contract work to distant technicians, we are a genuine local operation serving the {upperPostcode} postcode direct.
            </p>
            <ul className="space-y-4">
              {[
                'Zero Call-Out Fees – Pay only for work done',
                'No VAT Additions – 20% cheaper than VAT registered firms',
                'Insurance Approved – All locks meet BS3621 standards',
                'Non-Destructive Entry – We prioritize saving your lock'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-sky-500 shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
