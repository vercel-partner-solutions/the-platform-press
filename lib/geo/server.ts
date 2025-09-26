import { headers } from "next/headers";

export async function getLocation(): Promise<{
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}> {
  if (process.env.NODE_ENV === "development") {
    return {
      country: "US",
      region: "CA",
      city: "San Francisco",
      timezone: "America/Los_Angeles",
    };
  }
  const h = await headers();

  const getDecoded = (name: string) => {
    const value = h.get(name);
    return value ? decodeURIComponent(value) : undefined;
  };

  return {
    country: getDecoded("x-vercel-ip-country"),
    region: getDecoded("x-vercel-ip-country-region"),
    city: getDecoded("x-vercel-ip-city"),
    timezone: getDecoded("x-vercel-ip-timezone") || "UTC",
  };
}
