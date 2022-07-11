import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Market from "../pages/Market";

const Navigation = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/market" element={<Market />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default Navigation;
