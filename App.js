import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HousePricePredictor from "./HousePricePredictor";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HousePricePredictor />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
