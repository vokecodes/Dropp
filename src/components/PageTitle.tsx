import { PageTitleProps } from "../utils/Interfaces";

const PageTitle = ({ title, extraClasses }: PageTitleProps) => {
  return (
    <h1 className={`text-2xl text-black font_bold ${extraClasses}`}>{title}</h1>
  );
};

export default PageTitle;
