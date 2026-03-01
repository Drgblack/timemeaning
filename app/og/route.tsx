import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const type = searchParams.get('type') || 'result'
  const phrase = searchParams.get('phrase') || ''
  const resolved = searchParams.get('resolved') || ''
  const timezone = searchParams.get('timezone') || ''
  const ambiguous = searchParams.get('ambiguous') === 'true'
  const title = searchParams.get('title') || ''
  const description = searchParams.get('description') || ''
  const section = searchParams.get('section') || 'LEARNING CENTRE'
  const totalResolutions = searchParams.get('totalResolutions') || '0'
  const ambiguousCount = searchParams.get('ambiguousCount') || '0'
  const dstCases = searchParams.get('dstCases') || '0'
  const mostSeenAbbr = searchParams.get('mostSeenAbbr') || 'N/A'
  const ghostDates = searchParams.get('ghostDates') || '0'
  
  // Truncate phrase if too long
  const displayPhrase = phrase.length > 60 ? phrase.slice(0, 57) + '...' : phrase
  // Determine resolved text size
  const resolvedSize = resolved.length > 30 ? 58 : 72
  
  if (type === 'easter_egg') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0f0f0d',
            position: 'relative',
          }}
        >
          {/* Center content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'serif', fontSize: 64, color: '#c8922a', textAlign: 'center' }}>
              {title || 'Easter Egg Found'}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 22, color: '#c8922a', marginTop: 24, letterSpacing: '0.12em' }}>
              EASTER EGG DETECTED
            </div>
          </div>
          {/* Bottom right wordmark */}
          <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontFamily: 'serif', fontSize: 24, color: '#f5f0e8' }}>TimeMeaning</div>
            <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#c8922a' }}>timemeaning.com</div>
          </div>
          {/* Bottom amber border */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#c8922a' }} />
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
  
  if (type === 'ghost_date') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a',
            position: 'relative',
          }}
        >
          {/* Center content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'serif', fontSize: 80, color: '#c8922a' }}>
              GHOST DATE
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 36, color: '#f5f0e8', marginTop: 24 }}>
              {phrase || resolved}
            </div>
            <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 28, color: '#f5f0e8', marginTop: 24 }}>
              This moment never existed.
            </div>
          </div>
          {/* Bottom right wordmark */}
          <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontFamily: 'serif', fontSize: 24, color: '#f5f0e8' }}>TimeMeaning</div>
            <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#c8922a' }}>timemeaning.com</div>
          </div>
          {/* Bottom amber border */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#c8922a' }} />
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
  
  if (type === 'article') {
    const displayTitle = title.length > 60 ? title.slice(0, 57) + '...' : title
    const displayDesc = description.length > 80 ? description.slice(0, 77) + '...' : description
    
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a',
            position: 'relative',
          }}
        >
          {/* Top label */}
          <div style={{ position: 'absolute', top: 50, left: 60 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 22, color: '#c8922a', letterSpacing: '0.12em' }}>
              TIMEMEANING — {section.toUpperCase()}
            </div>
          </div>
          {/* Center content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
            <div style={{ fontFamily: 'serif', fontSize: 52, color: '#f5f0e8', textAlign: 'center', lineHeight: 1.2, maxWidth: 1000 }}>
              {displayTitle}
            </div>
            {displayDesc && (
              <div style={{ fontFamily: 'sans-serif', fontSize: 24, color: '#8a8480', marginTop: 24, textAlign: 'center', maxWidth: 900 }}>
                {displayDesc}
              </div>
            )}
          </div>
          {/* Bottom right wordmark */}
          <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontFamily: 'serif', fontSize: 24, color: '#f5f0e8' }}>TimeMeaning</div>
            <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#c8922a' }}>timemeaning.com</div>
          </div>
          {/* Bottom amber border */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#c8922a' }} />
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
  
  if (type === 'stats') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1a1a1a',
            position: 'relative',
          }}
        >
          {/* Top label */}
          <div style={{ position: 'absolute', top: 50, left: 60 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 22, color: '#c8922a', letterSpacing: '0.12em' }}>
              MY TIMEMEANING STATS
            </div>
          </div>
          {/* Center content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: 'serif', fontSize: 72, color: '#c8922a' }}>
              {totalResolutions}
            </div>
            <div style={{ fontFamily: 'serif', fontSize: 28, color: '#f5f0e8', marginTop: 8 }}>
              time references resolved
            </div>
            {/* Stats grid */}
            <div style={{ display: 'flex', gap: 60, marginTop: 48 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 36, color: '#c8922a' }}>{ambiguousCount}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#6a6460' }}>AMBIGUOUS</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 36, color: '#c8922a' }}>{dstCases}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#6a6460' }}>DST CASES</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 36, color: '#c8922a' }}>{mostSeenAbbr}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#6a6460' }}>TOP ABBR</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 36, color: '#c8922a' }}>{ghostDates}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#6a6460' }}>GHOST DATES</div>
              </div>
            </div>
          </div>
          {/* Bottom right wordmark */}
          <div style={{ position: 'absolute', bottom: 40, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontFamily: 'serif', fontSize: 24, color: '#f5f0e8' }}>TimeMeaning</div>
            <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#c8922a' }}>timemeaning.com</div>
          </div>
          {/* Bottom amber border */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#c8922a' }} />
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
  
  // Default: type === 'result'
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1a1a1a',
          position: 'relative',
        }}
      >
        {/* Ambiguous badge - top right */}
        {ambiguous && (
          <div
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              backgroundColor: '#c8922a',
              color: '#1a1a1a',
              fontFamily: 'monospace',
              fontSize: 18,
              padding: '8px 14px',
              fontWeight: 'bold',
              letterSpacing: '0.05em',
            }}
          >
            AMBIGUOUS — SEE ASSUMPTIONS
          </div>
        )}
        
        {/* Top section */}
        <div style={{ padding: '50px 60px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 22, color: '#c8922a', letterSpacing: '0.12em' }}>
            TIMEMEANING — VERIFIED INTERPRETATION
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 26, color: '#8a8480', marginTop: 16 }}>
            "{displayPhrase}"
          </div>
        </div>
        
        {/* Middle section - hero resolved time */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'serif', fontSize: resolvedSize, color: '#f5f0e8', textAlign: 'center' }}>
            {resolved}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 28, color: '#c8922a', marginTop: 20, textAlign: 'center' }}>
            {timezone}
          </div>
        </div>
        
        {/* Bottom section */}
        <div style={{ borderTop: '1px solid #3a3530', margin: '0 60px', padding: '20px 0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {/* Left: data points */}
          <div style={{ fontFamily: 'monospace', fontSize: 20, color: '#6a6460' }}>
            {ambiguous ? 'Ambiguous: Yes' : 'Ambiguous: No'}
          </div>
          {/* Right: wordmark */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ fontFamily: 'serif', fontSize: 24, color: '#f5f0e8' }}>TimeMeaning</div>
            <div style={{ fontFamily: 'monospace', fontSize: 18, color: '#c8922a' }}>timemeaning.com</div>
          </div>
        </div>
        
        {/* Bottom amber border */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: '#c8922a' }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
