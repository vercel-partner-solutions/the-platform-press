import { getFormatter, getLocale, getNow } from "next-intl/server";
import { getWeather, renderWeatherIcon, type WeatherData } from "@/lib/weather";

const dateOptions = {
  weekday: "long" as const,
  year: "numeric" as const,
  month: "long" as const,
  day: "numeric" as const,
};

export async function Today() {
  const [weatherResult, formatResult, dateTimeResult] =
    await Promise.allSettled([
      getLocale().then((locale) => getWeather(locale)),
      getFormatter(),
      getNow(),
    ]);

  const weather =
    weatherResult.status === "fulfilled" ? weatherResult.value : null;
  const format =
    formatResult.status === "fulfilled" ? formatResult.value : null;
  const dateTime =
    dateTimeResult.status === "fulfilled" ? dateTimeResult.value : new Date();

  const safeIntlDate =
    format?.dateTime(dateTime, dateOptions) ||
    dateTime.toLocaleDateString("en-US", dateOptions);

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
