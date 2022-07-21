import React, { useEffect, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
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
      <ParallaxProvider>
        <Navigation />
      </ParallaxProvider>
    </>
  );
};

export default App;
