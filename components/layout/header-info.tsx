"use client"

import type React from "react"

import { useState } from "react"
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react"
import type { LucideProps } from "lucide-react"
import { useFormatter, useNow } from "next-intl"

interface WeatherData {
  temperature: number
  condition: "Sunny" | "Cloudy" | "Rainy" | "Snowy"
}

const weatherIcons: { [key: string]: React.ComponentType<LucideProps> } = {
  Sunny: Sun,
  Cloudy: Cloud,
  Rainy: CloudRain,
  Snowy: CloudSnow,
}

// Mock function to simulate fetching weather data
async function getMockWeather(): Promise<WeatherData> {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
  const conditions: WeatherData["condition"][] = ["Sunny", "Cloudy", "Rainy"]
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
  const randomTemp = Math.floor(Math.random() * (85 - 65 + 1) + 65) // Temp between 65 and 85

  return {
    temperature: randomTemp,
    condition: randomCondition,
  }
}

export default function HeaderInfo() {
  const date = useNow()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  const formatter = useFormatter()

  const dateTime = formatter.dateTime(date, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const WeatherIcon = weather ? weatherIcons[weather.condition] : null

  return (
    <div className="flex items-center gap-4 text-xs text-neutral-600">
      <span>{dateTime}</span>
      <div className="h-4 w-px bg-neutral-200" />
      {loading ? (
        <div className="flex items-center gap-2 animate-pulse">
          <div className="w-4 h-4 bg-neutral-200 rounded-full"></div>
          <div className="w-8 h-3 bg-neutral-200 rounded"></div>
        </div>
      ) : (
        weather &&
        WeatherIcon && (
          <div className="flex items-center gap-2">
            <WeatherIcon size={16} className="text-neutral-500" />
            <span>{weather.temperature}°F</span>
          </div>
        )
      )}
    </div>
  )
}
