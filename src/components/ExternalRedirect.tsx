import React, { useEffect } from "react";
import Preloader from "./Preloader";

const ExternalRedirect = ({ url }: any) => {
  useEffect(() => {
    // Redirect to the external link when the component mounts
    window.location.href = url;
  }, [url]);

  // This component doesn't render anything visible to the DOM
  return <Preloader />;
};

export default ExternalRedirect;
