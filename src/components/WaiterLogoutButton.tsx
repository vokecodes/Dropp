import { useNavigate } from "react-router-dom";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useAppDispatch } from "../redux/hooks";
import { logoutWaiter } from "../_redux/waiter/waiterSlice";

const WaiterLogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePressLogout = () => {
    dispatch(logoutWaiter());
    navigate("/waiter");
  };

  return (
    <div
      className="flex items-center my-2 pl-3 lg:pl-10 py-2 cursor-pointer"
      onClick={() => handlePressLogout()}
    >
      <BsBoxArrowLeft size={24} color={"#787878"} />
      <p className="ml-3 text-base no-underline gray_color font_medium">
        Log Out
      </p>
    </div>
  );
};

export default WaiterLogoutButton;
