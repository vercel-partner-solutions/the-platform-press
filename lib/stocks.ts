export const getStockData = async ({ symbol, series }: { symbol: string, series: string }) => {
    try {
        const url = `https://www.alphavantage.co/query?function=${series}&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
        const response = await fetch(url, {
            next: { revalidate: 300 }
        });

        console.log(response);

        if (!response.ok) {
            throw new Error(`Failed to fetch data for ${symbol}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch data for ${symbol}:`, error);
        throw error;
    }
}

