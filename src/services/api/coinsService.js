const BASE_URL = "https://api.coingecko.com/api/v3/coins";
const init = {
  method: "GET",
  headers: {
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
};

export async function getCoinsListWithMarketData(
  itemsPerPage = 10,
  currentPage = 1
) {
  const response = await fetch(
    `${BASE_URL}/markets?vs_currency=usd&per_page=${itemsPerPage}&page=${currentPage}`,
    init
  );

  if (!response.ok)
    throw new Error("Failed to fetch coins list with market data");

  return response.json();
}

export async function getCoinDataById(id) {
  const response = await fetch(`${BASE_URL}/${id}`, init);

  if (!response.ok) throw new Error("Failed to fetch coin data by id");

  return response.json();
}

export async function getCoinHistoricalChartDataById(id, days = 1) {
  const response = await fetch(
    `${BASE_URL}/${id}/market_chart?vs_currency=usd&days=${days}`,
    init
  );

  if (!response.ok)
    throw new Error("Failed to fetch coin historical chart data by id");

  const { prices } = await response.json();

  return prices;
}

export async function getCoinOHLCChartDataById(id, days = 1) {
  const response = await fetch(
    `${BASE_URL}/${id}/ohlc?vs_currency=usd&days=${days}`,
    init
  );

  if (!response.ok)
    throw new Error("Failed to fetch coin ohlc chart data by id");

  return response.json();
}
