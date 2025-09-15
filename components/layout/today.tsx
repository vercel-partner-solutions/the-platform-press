"use client"

import { useFormatter, useLocale, useNow } from "next-intl"
import { useMemo } from "react"

export function Today() {
    const format = useFormatter()
    const locale = useLocale()
    const dateTime = useNow()

    const intlDate = useMemo(
        () =>
            format.dateTime(dateTime, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        [format, dateTime],
    )

    const temperatureData = useMemo(() => {
        const baseTempF = 77 // Base temperature in Fahrenheit

        // More robust locale detection for temperature units
        const usesMetric = !["en-US", "en-LR", "en-MM"].includes(locale)

        if (usesMetric) {
            // Convert F to C: (F - 32) × 5/9
            const tempC = ((baseTempF - 32) * 5) / 9
            return {
                value: format.number(tempC, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                }),
                unit: "°C",
            }
        } else {
            return {
                value: format.number(baseTempF, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                }),
                unit: "°F",
            }
        }
    }, [locale, format])

    return (
        <div className="hidden md:flex flex-col justify-self-start">
            <div className="flex items-center gap-4 text-sm text-neutral-600 mb-1">
                <span>{intlDate}</span>
                <div className="flex items-center gap-1">
                    <span>☁️</span>
                    <span>
                        {temperatureData.value}
                        {temperatureData.unit}
                    </span>
                </div>
            </div>
            <span className="text-sm font-medium text-neutral-700">Today's Paper</span>
        </div>
    )
}
