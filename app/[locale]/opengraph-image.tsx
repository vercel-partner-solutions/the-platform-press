import { ImageResponse } from 'next/og'
import { getDictionary } from '@/dictionaries'

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getDictionary(locale)

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
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '50px',
          }}
        >
          The Platform Press
        </div>

        {/* Main title */}
        <h1
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#ffffff',
            lineHeight: '1.1',
            textAlign: 'center',
            marginBottom: '30px',
          }}
        >
          Latest News & Analysis
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: '28px',
            color: '#cccccc',
            lineHeight: '1.4',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          {t.Homepage.description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
