import { BrowserRouter, Route, Routes } from "react-router";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<main></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
