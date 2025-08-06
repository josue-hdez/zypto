const BASE_URL = "https://api.coingecko.com/api/v3/search/trending";

export async function getTrendingSearchList() {
  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch trending search list");

  const { coins } = await response.json();

  return coins.map((coin) => coin.item);
}
