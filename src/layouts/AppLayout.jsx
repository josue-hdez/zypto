import { Outlet } from "react-router";
import MarketStats from "../components/MarketStats";

function AppLayout() {
  const year = new Date().toLocaleDateString("en-US", { year: "numeric" });

  return (
    <>
      <header>
        <MarketStats />
        <div className="border-bottom">
          <div className="container">
            <h1 className="text-xl lg:text-3xl">Zypto</h1>
          </div>
        </div>
      </header>
      <Outlet />
      <footer className="border-bottom">
        <div className="container">
          <h2 className="text-xl">Zypto</h2>
          <span>© {year} Zypto</span>
        </div>
      </footer>
    </>
  );
}

export default AppLayout;
