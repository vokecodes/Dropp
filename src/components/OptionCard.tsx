const OptionCard = ({ image, title, description, onClick }) => {
  return (
    <div
      className="bg-white p-3 lg:p-6 rounded-2xl flex flex-row items-center my-5 cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={title} />
      <div className="ml-4 lg:mx-10">
        <h3 className="text-md lg:text-2xl text-black font_bold whitespace-pre-line">
          {title}
        </h3>
        <p className="text-xs lg:text-sm font_medium text_gray mt-3">
          {description}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#C5C5C5"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default OptionCard;
