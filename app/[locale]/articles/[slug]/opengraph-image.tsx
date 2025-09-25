import OpengraphImage from '@/components/opengraph-image'
import { getArticleBySlug } from '@/lib/cms'

export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return await OpengraphImage({ title: 'Article Not Found' })
  }

  return await OpengraphImage({ title: article.title })
}
