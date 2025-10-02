import { unstable_cacheLife as cacheLife } from "next/cache";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getLocation } from "@/lib/geo/server";
import { getWeather, renderWeatherIcon } from "@/lib/weather";

export async function Today({ locale }: { locale: string }) {
  return (
    <div className="hidden md:flex flex-col justify-self-start">
      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-1">
        <Suspense fallback={<Skeleton className="w-[118px] h-5" />}>
          <DateDisplay locale={locale} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-10 h-5" />}>
          <Weather locale={locale} />
        </Suspense>
      </div>
      <span className="text-sm font-medium text-neutral-700">
        Today's Paper
      </span>
    </div>
  );
}

async function Weather({ locale }: { locale: string }) {
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
}

async function DateDisplay({ locale }: { locale: string }) {
  const location = await getLocation();
  const formattedDate = await getFormattedDate(locale, location.timezone);
  return <span>{formattedDate}</span>;
}

async function getFormattedDate(locale: string, timezone?: string) {
  "use cache: remote";
  cacheLife("hours");

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  if (timezone) {
    options.timeZone = timezone;
  }

  return new Date().toLocaleDateString(locale, options);
}
