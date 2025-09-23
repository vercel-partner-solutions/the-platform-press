import { ImageResponse } from 'next/og'
import { getArticleBySlug } from '@/lib/cms'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000000',
          }}
        >
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#ffffff' }}>
            Article Not Found
          </div>
        </div>
      ),
      { ...size }
    )
  }

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
          }}
        >
          {article.title}
        </h1>
      </div>
    ),
    {
      ...size,
    }
  )
}
