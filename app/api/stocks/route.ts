export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en-US';

  // Base USD prices
  const baseStocks = [
    { symbol: "AAPL", basePrice: getRandomPrice(170, 190) },
    { symbol: "GOOGL", basePrice: getRandomPrice(120, 140) },
    { symbol: "MSFT", basePrice: getRandomPrice(300, 330) },
    { symbol: "AMZN", basePrice: getRandomPrice(130, 150) },
    { symbol: "TSLA", basePrice: getRandomPrice(250, 280) },
  ];

  // Currency conversion rates (realistic approximations)
  const currencyRates: Record<string, number> = {
    "en-US": 1,      // USD base
    "es": 0.92,      // EUR (1 USD ≈ 0.92 EUR)
    "zh": 7.25       // CNY (1 USD ≈ 7.25 CNY)
  };

  const rate = currencyRates[locale] || 1;
  
  const stocks = baseStocks.map(stock => ({
    symbol: stock.symbol,
    price: Number((stock.basePrice * rate).toFixed(2))
  }));

  const responseBody = {
    timestamp: new Date().toISOString(),
    stocks,
  };

  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
//Random price (reasonable variance)
function getRandomPrice(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}


