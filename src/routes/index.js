import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import AuthRoutes from "../pages/auth/AuthRoutes";

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.auth,
});

export default connect(mapStateToProps, {})(Navigation);
