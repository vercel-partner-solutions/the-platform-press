import type { Locale } from "next-intl";
import { getVercelGeoHeaders } from "@/lib/headers";

interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  unit: "C" | "F";
}

type WeatherCondition = "Sunny" | "Cloudy" | "Rainy" | "Snowy";

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
  };
}

interface GeocodingResponse {
  results?: Array<{
    latitude: number;
    longitude: number;
  }>;
}

const WEATHER_ICONS: Record<WeatherCondition, string> = {
  Sunny: "☀️",
  Cloudy: "☁️",
  Rainy: "🌧️",
  Snowy: "❄️",
} as const;

// Weather code mapping based on Open-Meteo documentation
// https://open-meteo.com/en/docs#weathercode
const WEATHER_CODE_MAP: Array<{
  codes: number[];
  condition: WeatherCondition;
}> = [
    { codes: [0], condition: "Sunny" },
    { codes: [1, 2, 3, 45, 46, 47, 48], condition: "Cloudy" },
    {
      codes: [
        51, 52, 53, 54, 55, 56, 57, 61, 62, 63, 64, 65, 66, 67, 80, 81, 82, 95,
        96, 99,
      ],
      condition: "Rainy",
    },
    { codes: [71, 72, 73, 74, 75, 76, 77], condition: "Snowy" },
  ];

function mapWeatherCodeToCondition(weatherCode: number): WeatherCondition {
  for (const { codes, condition } of WEATHER_CODE_MAP) {
    if (codes.includes(weatherCode)) {
      return condition;
    }
  }
  return "Cloudy";
}

export function renderWeatherIcon(condition: WeatherCondition): string {
  return WEATHER_ICONS[condition] || "🌤️";
}

async function getCoordinatesFromCity(
  city: string,
): Promise<{ latitude: number; longitude: number } | null> {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

  const response = await fetch(geocodingUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch geocoding data");
  }

  const data: GeocodingResponse = await response.json();
  if (!data.results?.length) {
    return null;
  }

  return {
    latitude: data.results[0].latitude,
    longitude: data.results[0].longitude,
  };
}

function getTemperatureUnit(locale: Locale): "celsius" | "fahrenheit" {
  if (locale === "en-US") return "fahrenheit";
  return "celsius";
}

function getTemperatureSymbol(locale: Locale): "C" | "F" {
  if (locale === "en-US") return "F";
  return "C";
}

async function getWeatherFromCoordinates(
  latitude: number,
  longitude: number,
  locale: Locale,
): Promise<WeatherData> {
  const temperatureUnit = getTemperatureUnit(locale);
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=${temperatureUnit}`;

  const response = await fetch(weatherUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: OpenMeteoResponse = await response.json();

  return {
    temperature: Math.round(data.current.temperature_2m),
    condition: mapWeatherCodeToCondition(data.current.weather_code),
    unit: getTemperatureSymbol(locale),
  };
}

export async function getWeather(locale: string): Promise<WeatherData | null> {
  try {
    const { city } = await getVercelGeoHeaders();
    if (!city) return null;

    const coordinates = await getCoordinatesFromCity(city);
    if (!coordinates) return null;

    return await getWeatherFromCoordinates(
      coordinates.latitude,
      coordinates.longitude,
      locale,
    );
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
