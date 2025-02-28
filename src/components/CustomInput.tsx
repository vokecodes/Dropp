import React, { useState } from "react";
import { InputProps } from "../utils/Interfaces";
import ColoredSpinner from "./ColoredSpinner";

const Input = ({
  type,
  placeholder,
  name,
  onChange,
  onBlur,
  password,
  error,
  extraClasses,
  value,
  disabled,
  onInput,
  onClickPassword,
  options,
  onkeyup,
  referralCodeError,
  isReferralCodeLoading,
  container,
  multipleSelect,
  newName,
}: // radioSelected = false,
// radioSetSelected,

InputProps) => {
  const [radioSelectedState, setRadioSelectedState] = useState(false);

  return (
    <div className={`relative my-5 ${container}`}>
      {type !== "dropdown" && type !== "textarea" && type !== "radio" && (
        <input
          type={type}
          value={value ? value : ""}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          onInput={onInput}
          className={`block w-full rounded-xl border gray_border_color input_text font_medium py-4 pl-8 pr-4 sm:text-sm outline-none ${extraClasses}`}
          autoComplete="off"
          onKeyUp={onkeyup}
        />
      )}
      {type === "radio" && (
        <div className="flex items-center justify-between">
          <p className="text-sm">{placeholder}</p>
          <div
            className={`w-10 h-5 rounded-full flex items-center p-1 ${
              radioSelectedState
                ? "bg-primary justify-end"
                : "bg-[#727272] justify-start"
            }`}
            onClick={() => setRadioSelectedState(!radioSelectedState)}
          >
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
        </div>
      )}
      {type === "textarea" && (
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          onInput={onInput}
          className={`block w-full rounded-xl border gray_border_color input_text font_medium py-4 pl-8 pr-4 sm:text-sm outline-none ${extraClasses}`}
          autoComplete="off"
          onKeyUp={onkeyup}
        />
      )}
      {type === "dropdown" && (
        <select
          className={`block w-full rounded-xl border gray_border_color input_text font_medium py-4 pl-8 pr-4 sm:text-sm outline-none ${extraClasses}`}
          onChange={onChange}
          name={name}
          value={value}
          multiple={multipleSelect}
        >
          <option value="select">
            Select{" "}
            {multipleSelect
              ? "tables"
              : newName
              ? newName
              : placeholder
              ? placeholder
              : "a category"}
          </option>
          {options &&
            options?.length > 0 &&
            options?.map((option: any, i: number) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      )}
      {type !== "radio" && (
        <label className="placeholder_text_container absolute left-5 top-4 pointer-events-none">
          <p className="placeholder_text text-base input_text input_placeholder">
            {placeholder}
          </p>
        </label>
      )}
      {password && (
        <div
          className="absolute top-4 right-5 cursor-pointer"
          onClick={onClickPassword}
        >
          {type === "text" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#8E8E8E"
              className="w-6 h-6"
            >
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#8E8E8E"
              className="w-6 h-6"
            >
              <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
              <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
              <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
            </svg>
          )}
        </div>
      )}

      {error && name === "password" ? (
        <p className="text-[12px] font_light text-red-500">
          Password should be a minimum of 8 characters. These includes a capital
          letter, a number and a special character.
        </p>
      ) : error && name !== "password" ? (
        <p className="text-sm text-red-500 text-center">{error}</p>
      ) : null}

      {name === "referralCode" && referralCodeError && (
        <p className="text-sm text-red-500 text-center">{referralCodeError}</p>
      )}
      {name === "referralCode" && isReferralCodeLoading && (
        <div className="absolute right-4 top-5">
          <ColoredSpinner />
        </div>
      )}
    </div>
  );
};

export default Input;
