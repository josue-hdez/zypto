const BASE_URL = "https://api.coingecko.com/api/v3/global";

export async function getCryptoGlobalMarketData() {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
    },
  });

  if (!response.ok)
    throw new Error("Failed to fetch crypto global market data");

  return response.json();
}
