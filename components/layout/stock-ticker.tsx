"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

type ApiStock = { symbol: string; price: number };

export function StockTicker() {
  const [stocks, setStocks] = useState<ApiStock[]>([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const locale = useLocale();

  // Fetch stocks on load and then again every minute
  useEffect(() => {
    let alive = true;

    const fetchStocks = async () => {
      try {
        const res = await fetch(`/api/stocks?locale=${locale}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!alive) return;
        setStocks(Array.isArray(data?.stocks) ? data.stocks : []);
      } catch {}
    };

    fetchStocks();
    const id = setInterval(fetchStocks, 60000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [locale]);

  //cycle through stocks, anticipating changes to number of items in stocks array
  useEffect(() => {
    if (stocks.length === 0) return;

    let alive = true;
    let t1: number | undefined;
    let t2: number | undefined;

    const visibleMs = 5000; 
    const fadeMs = 700;     
    const gapMs = 200;     

    const run = () => {
      t1 = window.setTimeout(() => {
        if (!alive) return;
        setVisible(false);
        t2 = window.setTimeout(() => {
          if (!alive) return;
          setActive((i) => (i + 1) % stocks.length);
          setVisible(true);
          run();
        }, fadeMs + gapMs);
      }, visibleMs);
    };

    setActive(0);
    setVisible(true);
    run();

    return () => {
      alive = false;
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearTimeout(t2);
    };
  }, [stocks.length]);

  const formatPrice = (price: number, locale: string) => {
    const currencyMap: Record<string, string> = {
      "en-US": "USD",
      "es": "EUR", 
      "zh": "CNY"
    };
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyMap[locale] || "USD"
    }).format(price);
  };

  return (
    <div className="relative text-sm font-medium text-neutral-700 text-center">
      <div className="relative h-16 flex items-center justify-center">
        {stocks.map((stock, i) => (
          <div
            key={stock.symbol}
            className={
              "absolute inset-0 flex items-center justify-center font-light text-foreground transition-opacity duration-700 ease-in-out " +
              (i === active && visible ? "opacity-100" : "opacity-0")
            }
          >
            <div className="flex items-center gap-4">
              <span>{stock.symbol}</span>
              <span className="text-neutral-700">{formatPrice(stock.price, locale)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}