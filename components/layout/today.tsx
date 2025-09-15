import { useFormatter, useNow } from "next-intl";

const weather = getMockWeather();

export function Today() {
  const format = useFormatter();
  const dateTime = useNow();

  const intlDate = format.dateTime(dateTime, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hidden md:flex flex-col justify-self-start">
      <div className="flex items-center gap-4 text-sm text-neutral-600 mb-1">
        <span>{intlDate}</span>
        <div className="flex items-center gap-1">
          <span>☁️</span>
          <span>{weather.temperature}</span>
        </div>
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

function getMockWeather(): WeatherData {
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
