import { NextRequest, NextResponse } from 'next/server'
import { AREAS } from '@/data/areas'
import { SITE_CONFIG } from '@/data/config'

export const dynamic = 'force-static'

export async function GET(req: NextRequest) {
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>`
  
  const citations = AREAS.map((area) => `
    <business>
      <name>Local Emergency Locksmith</name>
      <category>Locksmith</category>
      <url>${SITE_CONFIG.domain}/areas/${area.slug}</url>
      <telephone>${SITE_CONFIG.phoneTel}</telephone>
      <address>
        <street>Emergency Response Unit</street>
        <city>${area.name}</city>
        <region>${area.region || 'West Midlands'}</region>
        <postcode>${area.postcode}</postcode>
        <country>UK</country>
      </address>
      ${area.lat && area.lng ? `
      <geo>
        <latitude>${area.lat}</latitude>
        <longitude>${area.lng}</longitude>
      </geo>` : ''}
      <hours>${SITE_CONFIG.hours}</hours>
      <description>Emergency locksmith serving ${area.name} directly. 15-30 minute target response. No VAT. No call-out fee.</description>
    </business>
  `).join('')

  const xmlData = `${xmlHeader}\n<citations>\n${citations}</citations>`

  return new NextResponse(xmlData, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}
