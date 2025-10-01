import OpengraphImage from "@/components/opengraph-image";
import { getCategoryBySlug } from "@/lib/cms";

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return await OpengraphImage({ title: "Category Not Found" });
  }

  return await OpengraphImage({
    title: category.title,
    bottomText: `Stay updated with the latest ${category.title} news`,
  });
}
