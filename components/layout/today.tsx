"use cache"

import { getWeather, renderWeatherIcon, type WeatherData } from "@/lib/weather";
import { unstable_cacheLife as cacheLife } from 'next/cache'

const dateOptions = {
  weekday: "long" as const,
  year: "numeric" as const,
  month: "long" as const,
  day: "numeric" as const,
};

export async function Today({ locale }: { locale: string }) {
  cacheLife('hours')
  const weather = await getWeather(locale);
  const dateTime = new Date();

  const safeIntlDate = dateTime.toLocaleDateString("en-US", dateOptions);

  return (
    <div className="hidden md:flex flex-col justify-self-start">
      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-1">
        <span>{safeIntlDate}</span>
        {renderWeather(weather)}
      </div>
      <span className="text-sm font-medium text-neutral-700">
        Today's Paper
      </span>
    </div>
  );
}

const renderWeather = (weather: WeatherData | null) => {
  if (!weather || !weather.condition || !weather.temperature || !weather.unit)
    return null;

  return (
    <span>
      {renderWeatherIcon(weather.condition)} {weather.temperature}°
      {weather.unit}
    </span>
  );
};
