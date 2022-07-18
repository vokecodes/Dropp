import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import Navigation from "./routes/index";
import "./App.css";

const App = () => {
  useEffect(() => {
    // ReactGA.initialize("G-EHK6CS7TX2");
    // ReactGA.send(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <Navigation />
    </>
  );
};

export default App;
