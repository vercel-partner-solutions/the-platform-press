export async function GET() {

  // Stock symbols
  const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"];
  
  const stocks = stockSymbols.map(symbol => {
    const delta = getRandomDelta();
    return {
      symbol,
      change: Number((delta * 100).toFixed(2)), // Percentage change
      isPositive: delta >= 0
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
// Generate random delta between -0.05 and +0.05 (5% change max)
function getRandomDelta() {
  return (Math.random() - 0.5) * 0.1; // Range: -0.05 to +0.05
}


