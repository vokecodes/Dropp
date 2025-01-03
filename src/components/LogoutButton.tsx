import { useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useAppDispatch } from "../redux/hooks";
import { logOutUserAccount } from "../_redux/auth/authAction";

const LogoutButton = ({ admin, cashier }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePressLogout = () => dispatch(logOutUserAccount(navigate, admin, cashier));

  return (
    <div
      className="flex items-center my-2 pl-10 py-2 cursor-pointer"
      onClick={() => handlePressLogout()}
    >
      <BsBoxArrowLeft size={24} color={"#787878"} />
      <p className="ml-3 text-base no-underline gray_color font_medium">
        Log Out
      </p>
    </div>
  );
};

export default LogoutButton;
