import React, { useEffect } from "react";
import ReactGA from "react-ga4";
import TagManager from "react-gtm-module";
import Hotjar from "@hotjar/browser";
import AppRoutes from "./routes";

const tagManagerArgs = {
  gtmId: import.meta.env.VITE_GTM_ID || "",
};

function App() {
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE__GA_ID || "e2");
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });
    TagManager.initialize(tagManagerArgs);
    Hotjar.init(
      Number(import.meta.env.VITE_HOTJAR_SITE_ID),
      Number(import.meta.env.VITE__HOTJAR_VERSION)
    );
  }, []);

  return <AppRoutes />;
}

export default App;
