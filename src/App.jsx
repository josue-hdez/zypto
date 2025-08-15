import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import CoinPage from "./pages/CoinPage/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<CoinPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
