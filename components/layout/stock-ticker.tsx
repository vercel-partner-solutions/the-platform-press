import { getFormatter } from "next-intl/server";

const stocks = [
  { name: "S&P 500", value: 0.021 },
  { name: "Nasdaq", value: -0.0455 },
  { name: "Dow", value: 0.0125 },
];

export async function StockTicker() {
  const formatter = await getFormatter();
  return (
    <div className="relative text-sm font-medium text-neutral-700 text-center">
      <div className="cycling-container relative h-16 flex items-center justify-center">
        {stocks.map((stock, index) => (
          <div
            className="cycling-item absolute inset-0 flex items-center justify-center font-light text-foreground opacity-0"
            style={{ animationDelay: `${index * 3.33}s` }}
            key={stock.name}
          >
            <div className="flex items-center gap-4">
              <span>{stock.name}</span>
              <span
                className={stock.value >= 0 ? "text-green-500" : "text-red-500"}
              >
                {stock.value >= 0 ? "+" : ""}
                {formatter.number(stock.value, {
                  style: "percent",
                  minimumSignificantDigits: 3,
                  maximumSignificantDigits: 3,
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
