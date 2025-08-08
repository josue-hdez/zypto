// const BASE_URL = "https://api.coingecko.com/api/v3/global";
const BASE_URL = "http://localhost:3000/crypto_global_market_data";

export async function getCryptoGlobalMarketData() {
  // const response = await fetch(`${BASE_URL}`, {
  // method: "GET",
  // headers: {
  // "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  // },
  // });
  const response = await fetch(BASE_URL);

  if (!response.ok)
    throw new Error("Failed to fetch crypto global market data");

  // const { data } = await response.json();
  const data = await response.json();

  return data;
}
