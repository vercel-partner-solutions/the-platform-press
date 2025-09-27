import OpengraphImage from "@/components/opengraph-image";
import { getDictionary } from "@/dictionaries";

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return await OpengraphImage({
    title: t.Homepage.description,
  });
}
