// const BASE_URL = "https://api.coingecko.com/api/v3/global";
// const INIT = {
//   method: "GET",
//   headers: {
//     "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
//   },
// };

export async function getCryptoGlobalMarketData() {
  // const response = await fetch(BASE_URL, INIT);
  const response = await fetch(
    "http://localhost:3000/crypto_global_market_data"
  );

  if (!response.ok)
    throw new Error("Failed fetching crypto global market data");

  // const { data } = await response.json();
  const data = await response.json();

  return data;
}
