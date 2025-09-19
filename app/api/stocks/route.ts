export async function GET() {
  const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
  const stocks = stockSymbols.map((symbol) => {
    const delta = getRandomDelta();

    return {
      symbol,
      change: Number(delta.toFixed(4)),
      isPositive: delta >= 0,
    };
  });

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
function getRandomDelta() {
  return (Math.random() - 0.5) * 0.1;
}
