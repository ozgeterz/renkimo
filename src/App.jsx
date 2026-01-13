import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage";
import ThankYou from "./components/ThankYou";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ayicik" element={<ProductPage />} />
        <Route path="/tesekkurler" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;
