import CryptoMarketOverview from "../components/CryptoMarketOverview";
import CoinsTable from "../components/CoinsTable";
import TrendingCoins from "../components/TrendingCoins";

function Home() {
  return (
    <main>
      <CryptoMarketOverview />
      <CoinsTable />
      <TrendingCoins />
    </main>
  );
}

export default Home;
