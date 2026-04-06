import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Dynamic values passed via query
    const title = searchParams.get('title')?.slice(0, 70) || 'Local Emergency Locksmith'
    const subtitle = searchParams.get('subtitle')?.slice(0, 100) || '24/7 Response • No VAT • No Call-Out Fee'
    const phone = searchParams.get('phone') || '07735 336175'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0F1B2D',
            padding: '80px',
            fontFamily: 'Inter',
          }}
        >
          {/* Subtle background decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '600px',
              height: '600px',
              backgroundColor: '#FFB800',
              opacity: 0.1,
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
          
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFB800',
              padding: '10px 24px',
              borderRadius: '999px',
              color: '#0F1B2D',
              fontSize: 28,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '32px',
            }}
          >
            Local Emergency Response
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '24px',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#E5E7EB',
              marginBottom: '64px',
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '24px 48px',
                borderRadius: '24px',
                border: '2px solid rgba(255,184,0,0.3)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 32,
                  color: '#9CA3AF',
                  marginRight: '24px',
                  fontWeight: 600,
                }}
              >
                CALL NOW
              </div>
              <div
                style={{
                  display: 'flex',
                  fontSize: 56,
                  color: '#FFB800',
                  fontWeight: 900,
                }}
              >
                {phone}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
