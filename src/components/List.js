const List = ({ name, items }) => {
  return (
    <div className="bg-white px-6 py-4 rounded-2xl flex items-center my-3">
      <div className="flex-1">
        <p className="text-base font_bold">{name}</p>
        <div className="flex">
          <p className="text-sm font-medium font_normal text_item_light_gray">
            {items?.length > 0 &&
              items.slice(0, 2).map((item, i) => (
                <span key={i}>
                  {item.name}
                  {items.slice(0, 2).length !== i + 1 && ", "}
                </span>
              ))}
          </p>
          <button className="bg_shopping h-6 w-16 rounded-full text-xs text_light_orange font_medium">
            +{items?.length - items.slice(0, 2).length} items
          </button>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#918d77"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
};

export default List;
