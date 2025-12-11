import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
// Image metadata
export const alt = 'ShockTank Arena - AI Startup Battle';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: 'linear-gradient(to bottom right, #09090b, #18181b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          position: 'relative',
        }}
      >
        {/* Background Grid Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: 0.3,
          }}
        />

        {/* Abstract Glow */}
        <div 
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, rgba(0,0,0,0) 70%)',
                filter: 'blur(40px)',
            }}
        />

        {/* Icon & Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #EAB308, #CA8A04)',
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            boxShadow: '0 0 40px rgba(234,179,8,0.4)',
            marginBottom: '40px',
          }}
        >
             <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" stroke="none" />
            </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <h1
            style={{
                fontSize: '84px',
                fontWeight: 900,
                background: 'linear-gradient(to bottom, #FFFFFF, #E2E8F0)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 8px rgba(0,0,0,0.5)',
            }}
            >
            ShockTank
            </h1>
            <h1
            style={{
                fontSize: '84px',
                fontWeight: 900,
                color: '#EAB308',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textShadow: '0 4px 8px rgba(234, 179, 8, 0.2)',
            }}
            >
            Arena
            </h1>
        </div>
        
        <p
            style={{
                fontSize: '32px',
                color: '#94A3B8',
                marginTop: '32px',
                fontWeight: 500,
            }}
        >
            Where AI Startups Rise, Pivot, and Survive
        </p>

        {/* Footer Tag */}
        <div 
            style={{
                position: 'absolute',
                bottom: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255,255,255,0.05)',
                padding: '12px 24px',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.1)',
            }}
        >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
            <span style={{ color: '#E2E8F0', fontSize: '20px', fontWeight: 600 }}>v1.0 Public Beta</span>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
