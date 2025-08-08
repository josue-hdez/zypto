import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<CoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
