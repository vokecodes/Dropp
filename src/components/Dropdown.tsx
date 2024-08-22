import CreatableSelect from "react-select/creatable";
import { DropdownProps } from "../utils/Interfaces";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  isMulti,
  error,
}: DropdownProps) => {
  return (
    <div className="my-5">
      <label className="placeholder_text_container pointer-events-none">
        <p className="placeholder_text text-sm input_text input_placeholder">
          {label}
        </p>
      </label>

      <CreatableSelect
        isClearable
        // escapeClearsValue
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Dropdown;
