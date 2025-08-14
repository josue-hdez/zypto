import { Outlet } from "react-router";
import MarketStats from "../components/MarketStats";

function AppLayout() {
  return (
    <>
      <header>
        <MarketStats />
      </header>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default AppLayout;
