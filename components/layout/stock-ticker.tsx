import { getLocale } from "next-intl/server";

type ApiStock = { symbol: string; price: number };

async function getStocks(locale: string): Promise<ApiStock[]> {
  try {
    // In a server component, we need to use the full URL
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/stocks?locale=${locale}`, { 
      cache: "no-store",
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.stocks) ? data.stocks : [];
  } catch {
    return [];
  }
}

function formatPrice(price: number, locale: string) {
  const currencyMap: Record<string, string> = {
    "en-US": "USD",
    "es": "EUR", 
    "zh": "CNY"
  };
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyMap[locale] || "USD"
  }).format(price);
}

export async function StockTicker() {
  const locale = await getLocale();
  const stocks = await getStocks(locale);

  if (stocks.length === 0) {
    return (
      <div className="relative text-sm font-medium text-neutral-700 text-center">
        <div className="h-16 flex items-center justify-center text-foreground/60">
          Loading…
        </div>
      </div>
    );
  }

  // Total duration of animation
  // The delay between each item is the total duration divided by the number of items
  const totalDuration = 10; 
  
  return (
    <div className="relative text-sm font-medium text-neutral-700 text-center">
      <div className="relative h-16 flex items-center justify-center overflow-hidden">
        {stocks.map((stock, index) => (
          <div
            key={stock.symbol}
            className="cycling-item absolute inset-0 flex items-center justify-center font-light text-foreground opacity-0 will-change-opacity"
            style={{ 
              animationDelay: `${index * (totalDuration / stocks.length)}s`,
              animationFillMode: 'both'
            }}
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