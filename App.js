import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HousePricePredictor from "./src/components/HousePricePredictor";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HousePricePredictor />} />
          {/* You can add additional routes here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
