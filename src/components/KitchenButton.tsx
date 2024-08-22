import { ButtonProps } from "../utils/Interfaces";
import ColoredSpinner from "./ColoredSpinner";

const KitchenButton = ({
  title,
  showIcon,
  extraClasses,
  onClick,
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`inline-flex items-center justify-center font_bold w-full rounded-lg border-1 py-3 text-sm ${extraClasses}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <ColoredSpinner /> : title}
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      )}
    </button>
  );
};

export default KitchenButton;
