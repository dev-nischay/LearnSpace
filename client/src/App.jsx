import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./components/home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
