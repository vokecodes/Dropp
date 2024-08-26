import AutoComplete from "react-google-autocomplete";

const AutoCompleteInput = (props: any) => {
  const { placeholder, onSelect, error, defaultValue } = props;

  return (
    <div className="relative my-5 z-50">
      <AutoComplete
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
        defaultValue={defaultValue}
        onPlaceSelected={onSelect}
        className={`block w-full rounded-xl border gray_border_color input_text font_medium py-4 pl-8 pr-4 sm:text-sm outline-none`}
        language="en"
        options={{
          types: ["geocode"],
          componentRestrictions: { country: "ng" },
        }}
        // {...props}
      />
      <label className="placeholder_text_container absolute left-5 top-4 pointer-events-none">
        <p className="placeholder_text text-base input_text input_placeholder">
          {placeholder}
        </p>
      </label>
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default AutoCompleteInput;
