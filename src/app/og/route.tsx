import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'AI Jobs'
    const description = searchParams.get('description') || 'Find Your Dream Job with AI-Powered Search'
    const type = searchParams.get('type') || 'default'
    
    // Different layouts based on type
    if (type === 'job') {
      const company = searchParams.get('company') || ''
      const location = searchParams.get('location') || ''
      
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0f172a',
              backgroundImage: 'linear-gradient(45deg, #1e293b 0%, #334155 100%)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#3b82f6',
                  marginRight: '16px',
                }}
              >
                🤖 AI Jobs
              </div>
            </div>
            
            {/* Job Title */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                maxWidth: '900px',
                lineHeight: '1.2',
                marginBottom: '24px',
              }}
            >
              {title}
            </div>
            
            {/* Company and Location */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              {company && (
                <div
                  style={{
                    fontSize: '28px',
                    color: '#94a3b8',
                    fontWeight: '600',
                  }}
                >
                  at {company}
                </div>
              )}
              {location && (
                <div
                  style={{
                    fontSize: '24px',
                    color: '#64748b',
                  }}
                >
                  📍 {location}
                </div>
              )}
            </div>
            
            {/* Description */}
            <div
              style={{
                fontSize: '24px',
                color: '#cbd5e1',
                textAlign: 'center',
                maxWidth: '800px',
                lineHeight: '1.4',
              }}
            >
              {description}
            </div>
            
            {/* Footer */}
            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                fontSize: '20px',
                color: '#64748b',
              }}
            >
              ai-jobs.com
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }
    
    // Default layout
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(45deg, #1e293b 0%, #334155 100%)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '60px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginRight: '20px',
              }}
            >
              🤖 AI Jobs
            </div>
          </div>
          
          {/* Main Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              maxWidth: '1000px',
              lineHeight: '1.1',
              marginBottom: '40px',
            }}
          >
            {title}
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: '32px',
              color: '#cbd5e1',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: '1.3',
              marginBottom: '60px',
            }}
          >
            {description}
          </div>
          
          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginBottom: '60px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '32px' }}>🔍</div>
              <div
                style={{
                  fontSize: '20px',
                  color: '#94a3b8',
                  fontWeight: '600',
                }}
              >
                AI Search
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '32px' }}>🏠</div>
              <div
                style={{
                  fontSize: '20px',
                  color: '#94a3b8',
                  fontWeight: '600',
                }}
              >
                Remote Jobs
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '32px' }}>⚡</div>
              <div
                style={{
                  fontSize: '20px',
                  color: '#94a3b8',
                  fontWeight: '600',
                }}
              >
                Fast Matching
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '24px',
              color: '#64748b',
            }}
          >
            ai-jobs.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error'
    console.log(`${errorMessage}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
