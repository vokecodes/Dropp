import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { MenuItemProps } from "../utils/Interfaces";
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";
import { BASE_API_URL } from "../_redux/urls";

const MenuItem = ({
  icon,
  title,
  active,
  to,
  newTab,
  beta,
  pro,
}: MenuItemProps) => {
  const { user } = useSelector(
    (state: any) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  const [showPro, setShowPro] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${BASE_API_URL}/pro-enquiry`, {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      });

      console.log(data);
      setShowPro(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {pro ? (
        <div onClick={() => setShowPro(true)}>
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
            {/* {pro && (
              <div className="ms-5 bg-yellow-400 rounded-full w-12 h-8 flex items-center justify-center">
                <p className="text-black text-sm font_medium">PRO</p>
              </div>
            )} */}
          </div>
        </div>
      ) : (
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
                <p className="text-black text-sm font_medium fw-semibold">
                  Beta
                </p>
              </div>
            )}
          </div>
        </Link>
      )}

      <Modal
        open={showPro}
        onClose={() => setShowPro(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-80 h-48 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <h3 className="text-center font_bold text-2xl black2">
            Upgrade to Pro to get acessy
          </h3>
          <div className="mt-5 flex justify-center" role="status">
            <Button
              title="Request Upgrade"
              loading={loading}
              onClick={handleRequest}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MenuItem;
