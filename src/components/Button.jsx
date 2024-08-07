import Spinner from "./Spinner";

const Button = ({
  title,
  showIcon,
  extraClasses,
  onClick,
  loading,
  disabled,
  bgColor,
}) => {
  return (
    <button
      type="submit"
      className={`inline-flex items-center justify-center px-10 py-2 whitespace-nowrap text-base text-white shadow-sm cursor-pointer ${extraClasses} rounded-xl ${
        disabled ? "bg_disabled" : bgColor ? bgColor : "primary_bg_color"
      }  font_medium
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : title}
      {!loading && (
        <>
          {showIcon && (
            // <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   fill="none"
            //   viewBox="0 0 24 24"
            //   strokeWidth="1.5"
            //   stroke="currentColor"
            //   className="w-6 h-6 ml-2"
            // >
            //   <path
            //     strokeLinecap="round"
            //     strokeLinejoin="round"
            //     d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            //   />
            // </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width={16}
              height={16}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
