"use server";

import type { Stock } from "@/lib/types";
import { unstable_cacheLife as cacheLife } from "next/cache";

function getRandomDelta() {
  return (Math.random() - 0.5) * 0.1;
}

export async function getStocksAction(): Promise<Stock[]> {
  "use cache: remote";
  cacheLife("seconds");

  const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];

  const stocks = stockSymbols.map((symbol) => {
    const delta = getRandomDelta();

    return {
      symbol,
      change: Number(delta.toFixed(4)),
      isPositive: delta >= 0,
    };
  });

  return stocks;
}
