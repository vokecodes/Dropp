import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Market from "../pages/Market";
import Dashboard from "../pages/Dashboard";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/market" element={<Market />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};

export default Navigation;
