import { ImageResponse } from 'next/og'

export const contentType = 'image/png'

// Image generation
export default async function Image({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  const { slug } = await params
  const category = decodeURIComponent(slug)

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
          backgroundColor: '#000000',
          padding: '60px',
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '40px',
          }}
        >
          The Platform Press
        </div>

        {/* Main title */}
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffffff',
            lineHeight: '1.1',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          {category}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '24px',
            color: '#cccccc',
            lineHeight: '1.4',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          Latest {category} News & Analysis
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
