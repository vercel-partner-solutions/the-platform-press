import { useFormatter } from "next-intl";
import { useState, useEffect } from "react";

const stocks = [
    { name: "S&P 500", value: 0.021, },
    { name: "Nasdaq", value: -0.0455, },
    { name: "Dow", value: 0.0125, },
];

export function StockTicker({ isCompact = false }: { isCompact?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const formatter = useFormatter();

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % stocks.length);
                setIsVisible(true);
            }, 300);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const current = stocks[currentIndex];

    return (
        <div
            className={`transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                } ${isCompact ? "text-xs" : "text-sm"} font-medium text-neutral-700`}
        >
            {current.name}{" "}
            <span className={`${current.value > 0 ? "text-green-600" : "text-red-600"}`}>
                {current.value > 0 ? "+" : "-"}
                {formatter.number(Math.abs(current.value), { style: "percent", minimumSignificantDigits: 3, maximumSignificantDigits: 3 })}
            </span>
        </div>
    );
}