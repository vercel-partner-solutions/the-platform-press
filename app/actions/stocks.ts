"use server";

import type { Stock } from "@/lib/types";

export async function getStocksAction(): Promise<Stock[]> {
  const stocks = [
    { symbol: "AAPL", change: 0.0147, isPositive: true },
    { symbol: "GOOGL", change: -0.0098, isPositive: false },
    { symbol: "MSFT", change: 0.002, isPositive: true },
    { symbol: "AMZN", change: 0.0071, isPositive: true },
    { symbol: "TSLA", change: -0.005, isPositive: false },
  ];

  return stocks;
}
