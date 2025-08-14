// const BASE_URL = "https://api.coingecko.com/api/v3/coins";
// const INIT = {
//   method: "GET",
//   headers: {
//     "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
//   },
// };

// export async function getCoinsListWithMarketData(itemsPerPage, currentPage) {
export async function getCoinsListWithMarketData() {
  // const response = await fetch(
  //   `${BASE_URL}/markets?vs_currency=usd&per_page=${itemsPerPage}&page=${currentPage}&price_change_percentage=1h,24h,7d`,
  //   INIT
  // );
  const response = await fetch(
    "http://localhost:3000/coins_list_with_market_data"
  );

  if (!response.ok)
    throw new Error("Failed fetching coins list with market data");

  const data = await response.json();

  return data;
}
