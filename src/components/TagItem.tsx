import { TagItemProps } from "../utils/Interfaces";

const TagItem = ({ title }: TagItemProps) => {
  return (
    <div className="tertiary_bg_color rounded-full p-3 w-44 flex justify-center items-center mr-5">
      <p className="text-base tertiary_text_color text-center font-bold font_bold">
        {title}
      </p>
    </div>
  );
};

export default TagItem;
