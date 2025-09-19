import { getArticles } from "@/lib/cms";
import { getLocation } from "@/lib/geo/server";
import LocalNewsSection from "./local-news-section";

async function LocalNewsContent({ locale }: { locale: string }) {
  const userLocation = await getLocation();
  const localArticles = await getArticles({
    category: "Local",
    location: userLocation.city,
    limit: 3,
  });

  if (!userLocation.city) {
    return null;
  }

  return (
    <LocalNewsSection articles={localArticles} location={userLocation.city} locale={locale} />
  );
}

export default function LocalNews({ locale }: { locale: string }) {
  return <LocalNewsContent locale={locale} />;
}
