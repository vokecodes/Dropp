const Preloader = () => {
  return (
    <div
      //   wire:loading
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-300 opacity-75 flex flex-col items-center justify-center"
    >
      {/* <div className="preloaderSpinner ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div> */}
      <svg
        className="animate-spin -ml-1 mr-3 h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-75"
          cx="12"
          cy="12"
          r="10"
          stroke="#fff"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="#06c167"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {/* <h2 className="text-center text-white text-xl font-semibold">
        Loading...
      </h2> */}
    </div>
  );
};

export default Preloader;
