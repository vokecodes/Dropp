import * as React from "react";
import { GoogleButtonProps } from "../utils/Interfaces";

const GoogleButton = ({ extraClasses }: GoogleButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg google_bg px-10 py-4 text-base font-medium text-white shadow-sm cursor-pointer ${extraClasses}`}
    >
      <img src="/images/google.svg" alt="google" />
      <span className="ml-3">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
