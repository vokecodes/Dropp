import ColoredSpinner from "./ColoredSpinner";

const OutlineButton = ({
  title,
  showIcon,
  extraClasses,
  onClick,
  loading,
  disabled,
  blackTrue,
}: any) => {
  return (
    <button
      type="submit"
      className={`inline-flex items-center px-10 py-3 justify-center whitespace-nowrap bg-transparent border-2 text-base font_bold text_black shadow-sm cursor-pointer rounded-xl ${ blackTrue ? 'border-black' : 'border-[#313130]' } ${extraClasses}`}
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

export default OutlineButton;
