import CryptoMarketOverview from "../components/CryptoMarketOverview";
import CryptoTable from "../components/CryptoTable";
import TrendingSearchCryptos from "../components/TrendingSearchCryptos";

function Home() {
  return (
    <main>
      <CryptoMarketOverview />
      <CryptoTable />
      <TrendingSearchCryptos />
    </main>
  );
}

export default Home;
