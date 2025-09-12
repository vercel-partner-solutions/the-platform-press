import { Suspense } from "react";
import { getLocalNews } from "@/lib/cms";
import LocalNewsSection from "./local-news-section";
import LocalNewsLoading from "./local-news-loading";

// Simulate getting user location (in a real app, this would use geolocation API or IP-based detection)
async function getUserLocation(): Promise<string> {
  // Simulate API delay for location detection
  await new Promise((resolve) => setTimeout(resolve, 300));

  // For demo purposes, randomly return different cities
  const cities = ["San Francisco", "New York"];
  return cities[Math.floor(Math.random() * cities.length)];
}

async function LocalNewsContent() {
  const userLocation = await getUserLocation();
  const localArticles = await getLocalNews(userLocation);

  return <LocalNewsSection articles={localArticles} location={userLocation} />;
}

export default function LocalNews() {
  return (
    <Suspense fallback={<LocalNewsLoading />}>
      <LocalNewsContent />
    </Suspense>
  );
}
