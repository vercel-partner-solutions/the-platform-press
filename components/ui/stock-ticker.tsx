"use client";

import { useEffect, useState } from "react";

export function StockTicker({ isCompact = false }: { isCompact?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const stocks = [
    { name: "S&P 500", value: "+0.21%", color: "text-green-600" },
    { name: "Nasdaq", value: "+0.45%", color: "text-green-600" },
    { name: "Dow", value: "-0.12%", color: "text-red-600" },
  ];

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
      className={`transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${isCompact ? "text-xs" : "text-sm"} font-medium text-neutral-700`}
    >
      {current.name} <span className={current.color}>{current.value}</span>
    </div>
  );
}
