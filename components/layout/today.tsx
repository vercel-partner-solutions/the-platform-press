import { unstable_cacheLife as cacheLife } from "next/cache";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLocation } from "@/lib/geo/server";
import { getWeather, renderWeatherIcon } from "@/lib/weather";

export function Today({ locale }: { locale: string }) {
  return (
    <div className="hidden md:flex flex-col justify-self-start">
      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-1">
        {renderDate(locale)}
        <Suspense fallback={<Skeleton className="w-10 h-4" />}>
          {renderWeather(locale)}
        </Suspense>
      </div>
      <span className="text-sm font-medium text-neutral-700">
        Today's Paper
      </span>
    </div>
  );
}

const renderWeather = async (locale: string) => {
  const location = await getLocation();
  const weather = await getWeather(locale, location);

  if (!weather || !weather.condition || !weather.temperature || !weather.unit)
    return null;

  return (
    <span>
      {renderWeatherIcon(weather.condition)} {weather.temperature}°
      {weather.unit}
    </span>
  );
};

const dateOptions = {
  weekday: "long" as const,
  year: "numeric" as const,
  month: "long" as const,
  day: "numeric" as const,
};

const renderDate = async (locale: string) => {
  "use cache";
  cacheLife("days");
  const dateTime = new Date();

  const safeIntlDate = dateTime.toLocaleDateString(locale, dateOptions);
  return safeIntlDate;
};
