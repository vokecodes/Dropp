import React from "react";
import { InputProps } from "../utils/Interfaces";

const TextArea = ({
  placeholder,
  name,
  onChange,
  password,
  error,
  extraClasses,
  value,
  disabled,
}: any) => {
  return (
    <div className="relative my-5">
      <textarea
        // placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        rows={4}
        className={`block w-full rounded-xl border gray_border_color input_text font_medium py-4 pl-8 pr-4 sm:text-sm outline-none ${extraClasses}`}
      />
      <label className="placeholder_text_container absolute left-5 top-4 pointer-events-none">
        <p className="placeholder_text text-base input_text input_placeholder">
          {placeholder}
        </p>
      </label>
      {password && (
        <div className=" right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      )}
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default TextArea;
