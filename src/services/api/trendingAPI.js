// const BASE_URL = "https://api.coingecko.com/api/v3/search/trending";
// const INIT = {
//   method: "GET",
//   headers: {
//     "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
//   },
// };

export async function getTrendingSearchList() {
  // const response = await fetch(BASE_URL, INIT);
  const response = await fetch("http://localhost:3000/trending_search_list");

  if (!response.ok) throw new Error("Failed fetching trending search list");

  // const { coins } = await response.json();
  const coins = await response.json();

  // return coins.map(({ item }) => item);
  return coins;
}
