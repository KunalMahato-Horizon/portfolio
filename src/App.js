import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuildingLoader from "./components/BuildingLoader";
import Home from "./pages/Home";
import Portfolio from "./pages/PortfolioPage";
import About from "./pages/About";

// Safely unwraps default or named module exports to prevent the "got: object" crash
const SafeLoader = BuildingLoader?.BuildingLoader || BuildingLoader?.default || BuildingLoader;
const SafeHome = Home?.Home || Home?.default || Home;
const SafePortfolio = Portfolio?.Portfolio || Portfolio?.PortfolioPage || Portfolio?.default || Portfolio;
const SafeAbout = About?.About || About?.default || About;

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#09090b] min-h-screen text-white">
      {/* Loader overlay */}
      {loading && <SafeLoader onComplete={() => setLoading(false)} />}

      {/* Main App Content */}
      <div
        className={`transition-all duration-1000 ease-out ${
          loading
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
      >
        <Router>
          <Routes>
            <Route path="/" element={<SafeHome />} />
            <Route path="/portfolio" element={<SafePortfolio />} />
            <Route path="/about" element={<SafeAbout />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;