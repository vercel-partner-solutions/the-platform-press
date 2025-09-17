import { Suspense } from "react";
import { getArticles } from "@/lib/cms";
import LocalNewsLoading from "./local-news-loading";
import LocalNewsSection from "./local-news-section";

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
  const localArticles = await getArticles({
    category: "Local",
    location: userLocation,
    limit: 3,
  });

  return <LocalNewsSection articles={localArticles} location={userLocation} />;
}

export default function LocalNews() {
  return (
    <Suspense fallback={<LocalNewsLoading />}>
      <LocalNewsContent />
    </Suspense>
  );
}
