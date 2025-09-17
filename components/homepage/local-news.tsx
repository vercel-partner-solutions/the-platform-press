import { getLocation } from "@/hooks/server/getLocation";
import { getArticles } from "@/lib/cms";
import LocalNewsSection from "./local-news-section";

async function LocalNewsContent() {
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
    <LocalNewsSection articles={localArticles} location={userLocation.city} />
  );
}

export default function LocalNews() {
  return <LocalNewsContent />;
}
