import { Link } from "react-router-dom";
import { MenuItemProps } from "../utils/Interfaces";

const MenuItem = ({ icon, title, active, to, newTab, beta }: MenuItemProps) => {
  return (
    <div>
      <Link to={to} target={newTab ? "_blank" : ""}>
        <div
          className={`flex items-center my-2 pl-10 py-2 cursor-pointer ${
            active && "bg_menu"
          }`}
        >
          {icon}
          <p
            className={`ml-3 text-base no-underline ${
              active ? "text-black font_bold" : "gray_color font_medium"
            }`}
          >
            {title}
          </p>
          {beta && (
            <div className="ms-5 bg-yellow-400 rounded-full w-12 h-8 flex items-center justify-center">
              <p className="text-black text-sm fw-semibold">Beta</p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MenuItem;
