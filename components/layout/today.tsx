import { getFormatter, getNow } from "next-intl/server";

export async function Today() {
  const weather = await getMockWeather();
  const format = await getFormatter();
  const dateTime = await getNow();

  const intlDate = format.dateTime(dateTime, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hidden md:flex flex-col justify-self-start">
      <div className="flex items-center gap-2 text-sm text-neutral-600 mb-1">
        <span>{intlDate}</span>
        <span>
          {renderWeatherIcon(weather.condition)} {weather.temperature}
        </span>
      </div>
      <span className="text-sm font-medium text-neutral-700">
        Today's Paper
      </span>
    </div>
  );
}

interface WeatherData {
  temperature: number;
  condition: "Sunny" | "Cloudy" | "Rainy" | "Snowy";
}

async function getMockWeather(): Promise<WeatherData> {
  new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  const conditions: WeatherData["condition"][] = ["Sunny", "Cloudy", "Rainy"];
  const randomCondition =
    conditions[Math.floor(Math.random() * conditions.length)];
  const randomTemp = Math.floor(Math.random() * (85 - 65 + 1) + 65); // Temp between 65 and 85

  return {
    temperature: randomTemp,
    condition: randomCondition,
  };
}

function renderWeatherIcon(condition: WeatherData["condition"]) {
  switch (condition) {
    case "Sunny":
      return "☀️";
    case "Cloudy":
      return "☁️";
    case "Rainy":
      return "🌧️";
    case "Snowy":
      return "❄️";
    default:
      return "🌤️";
  }
}
