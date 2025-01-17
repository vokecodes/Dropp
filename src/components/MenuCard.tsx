// @ts-nocheck
import { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Modal from "@mui/material/Modal";
import { useAppDispatch } from "../redux/hooks";
import { deleteMenu, showHideMenu } from "../_redux/menu/menuAction";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import ColoredSpinner from "./ColoredSpinner";
import { formatPrice } from "../utils/formatMethods";
import {
  deleteDineInMenu,
  deleteQsrSubAdminDineInMenu,
  showHideDineInMenu,
  showHideQsrCashierDineInMenu,
  showHideQsrSubAdminDineInMenu,
} from "../_redux/dinningMenu/dinningMenuAction";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaConciergeBell } from "react-icons/fa";

const MenuCard = ({
  menu,
  favourite,
  onClickEdit,
  onClickCopy,
  mode,
  kitchen,
  getChef,
  chefId
}: any) => {
  const dispatch = useAppDispatch();
  const { loading, hideLoading, dinningMenuLoading, dinningMenuHideLoading } =
    useSelector(
      (state: any) => ({
        loading: state.menu.loading,
        hideLoading: state.menu.hideLoading,
        dinningMenuLoading: state.dinningMenu.loading,
        dinningMenuHideLoading: state.dinningMenu.hideLoading,
      }),
      shallowEqual
    );

  const [selectedMenu, setSelectedMenu] = useState();

  const handleSHowHideMenu = async () => {
    setSelectedMenu(menu?._id);
    if (mode === "dineIn") {
      await dispatch(
        showHideDineInMenu(
          {
            hide: !menu?.hide,
          },
          menu?._id
        )
      );
    } else if (mode === "qsrSubAdmin") {
      await dispatch(
        showHideQsrSubAdminDineInMenu(
          {
            hide: !menu?.hide,
          },
          menu?._id
        )
      );
    } else if (mode === "qsrCashier") {
      await dispatch(
        showHideQsrCashierDineInMenu(
          {
            hide: !menu?.hide,
          },
          menu?._id,
          chefId,
          getChef
        )
      );
    } else {
      await dispatch(
        showHideMenu(
          {
            hide: !menu?.hide,
          },
          menu?._id
        )
      );
    }

    setSelectedMenu("");
  };

  const [menuInfoModal, setMenuInfoModal] = useState(false);

  const openMenuInfoModal = () => setMenuInfoModal(true);
  const closeMenuInfoModal = () => setMenuInfoModal(false);

  return (
    <>
      <div className="bg-white shadow rounded-xl w-full h-full relative">
        {menu?.discount && (
          <div className="absolute mt-5 ml-5 z-10">
            <div className="yellow_bg w-40 h-10 rounded-2xl flex items-center justify-center">
              <p className="text-sm text-black font_medium text-center">
                {menu?.discount}% discount applied
              </p>
            </div>
          </div>
        )}
        <div>
          {!favourite && (
            <div
              className="z-30 bg-white w-10 h-10 rounded-full absolute right-3 top-3 flex self-end items-center justify-center cursor-pointer"
              onClick={() => handleSHowHideMenu()}
            >
              {menu?._id === selectedMenu &&
              (hideLoading || dinningMenuHideLoading) ? (
                <ColoredSpinner />
              ) : (
                <>
                  {menu?.hide ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#787878"
                      className="w-6 h-6"
                    >
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#787878"
                      className="w-6 h-6"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </>
              )}
            </div>
          )}
          <div className={`${menu?.hide ? "opacity-50" : ""}`}>
            <img
              src={menu?.images[0]}
              alt="food"
              className="w-full h-60 object-cover rounded-t-xl"
            />
          </div>
        </div>
        <div className={`py-4 px-6 ${menu?.hide ? "opacity-50" : ""}`}>
          <h2 className=" text-black font_bold ">{menu?.foodName}</h2>
          <h6 className="text-lg font_bold primary_txt_color mt-1">
            <span
              className={`${
                menu?.discount ? "line-through primary_light_txt_color" : ""
              }`}
            >
              ₦{formatPrice(menu?.price)}
            </span>{" "}
            {menu?.discount && (
              <span>
                ₦
                {formatPrice(
                  menu?.price - (menu?.price / 100) * menu?.discount
                )}
              </span>
            )}
          </h6>
          <p className="text-gray-400 text-sm truncate mt-1">
            {menu?.description}
          </p>

          <>
            <div className="my-3">
              {!favourite && (
                <>
                  {/* {mode === "dineIn" ? (
                    <div className="w-full flex flex-row items-center justify-between gap-x-5">
                      <Button
                        title="Details"
                        extraClasses="w-full rounded-full mt-2"
                        disabled={menu?.hide}
                        onClick={() => openMenuInfoModal()}
                      />

                      <Button
                        title={"Duplicate"}
                        extraClasses="w-full rounded-full"
                        disabled={menu?.hide}
                        onClick={onClickCopy}
                      />
                    </div>
                  ) : (
                    
                  )} */}

                  {!kitchen && mode !== "qsrCashier" && (
                    <div className="w-full flex flex-row items-center justify-between gap-x-2 lg:gap-x-5">
                      <Button
                        title={favourite ? "Add to bag" : "Edit"}
                        extraClasses="!w-1/2 !px-6"
                        disabled={menu?.hide}
                        onClick={favourite ? () => {} : onClickEdit}
                      />

                      {!favourite && (
                        <Button
                          title={"Duplicate"}
                          extraClasses="!w-1/2 !px-6"
                          disabled={menu?.hide}
                          onClick={onClickCopy}
                        />
                      )}
                    </div>
                  )}

                  {!kitchen && mode !== "qsrCashier" && (
                    <OutlineButton
                      title="Delete"
                      disabled={menu?.hide}
                      loading={mode === "dineIn" ? dinningMenuLoading : loading}
                      extraClasses="!w-full !mx-auto rounded-full px-8 py-2 mt-2"
                      onClick={() =>
                        mode === "dineIn"
                          ? dispatch(deleteDineInMenu(menu?._id))
                          : mode === "qsrSubAdmin" 
                          ? dispatch(deleteQsrSubAdminDineInMenu(menu?._id))
                          : dispatch(deleteMenu(menu?._id))
                      }
                    />
                  )}
                </>
              )}
            </div>
          </>
        </div>
      </div>

      <Modal
        open={menuInfoModal}
        onClose={closeMenuInfoModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        component={"div"}
      >
        <div className="absolute top-1/2 left-1/2 w-11/12 lg:w-1/3 h-4/5 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl my-10 pb-4 outline-none">
          <div>
            <div
              style={{
                backgroundImage: `url(${menu?.images[0]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
              }}
              className="h-72"
            >
              <div className="flex justify-between py-3 px-6 input_text">
                <div className="flex">
                  {menu?.discount && (
                    <div className="yellow_bg w-24 h-10 rounded-3xl flex items-center justify-center">
                      <p className="text-md text-black font_medium text-center">
                        {menu?.discount}% off
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className="rounded-full bg-white flex items-center justify-center w-10 h-10 cursor-pointer"
                  onClick={closeMenuInfoModal}
                >
                  <XMarkIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="mt-3 py-3 px-10">
              <h2 className="card_headerText text-2xl capitalize font_medium">
                {menu?.foodName}
              </h2>
              <h6 className="text-xl font_bold primary_txt_color mt-2">
                <span
                  className={`${
                    menu?.discount ? "line-through primary_light_txt_color" : ""
                  }`}
                >
                  ₦{formatPrice(menu?.price)}
                </span>{" "}
                {menu?.discount && (
                  <span>
                    ₦
                    {formatPrice(
                      menu?.price - (menu?.price / 100) * menu?.discount
                    )}
                  </span>
                )}
              </h6>
            </div>

            <div className="flex flex-row justify-between py-3 px-10 grayBackground">
              <div>
                <h1 className="text-lg font_bold">Portion size</h1>
                <div className="mt-1 flex items-center">
                  <FaConciergeBell fontSize={20} color="#717171" />
                  <p className="input_text ml-2">{menu?.portion}</p>
                </div>
              </div>
            </div>

            <div className="py-3 px-10">
              <div className="mb-3">
                <h2 className="text-lg font_bold">Description</h2>
                <p className="text-gray-400 text-sm text-wrap mt-1">
                  {menu?.description &&
                    `${menu?.description[0].toUpperCase()}${menu?.description.slice(
                      1,
                      menu?.description.length
                    )}.`}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="text-lg font_bold">Main ingredients</h2>

                <p className="text-gray-400 text-sm text-wrap mt-1">
                  {menu?.ingredients &&
                    `${menu?.ingredients[0].toUpperCase()}${menu?.ingredients.slice(
                      1,
                      menu?.ingredients.length
                    )}.`}
                </p>
              </div>
              <div className="mb-3">
                <h2 className="text-lg font_bold">Other notes</h2>
                <p className="text-gray-400 text-sm text-wrap mt-1">
                  {menu?.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MenuCard;
