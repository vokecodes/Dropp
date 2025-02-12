// @ts-nocheck
import { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import Button from "./Button";
import OutlineButton from "./OutlineButton";
import ColoredSpinner from "./ColoredSpinner";
import { formatPrice } from "../utils/formatMethods";
import {
  deleteSubscriptionMenu,
  showHideSubscriptionMenu,
  subChefDeleteSubscriptionMenu,
  subChefShowHideSubscriptionMenu,
} from "../_redux/subscriptionMenu/subscriptionMenuAction";

const SubscriptionChefMenuCard = ({
  menu,
  onClickEdit,
  onClickCopy,
  user,
}: any) => {
  const dispatch = useAppDispatch();
  const { loading, hideLoading, subscriptionError} = useSelector(
    (state: any) => ({
      loading: state.subscriptionMenu.loading,
      hideLoading: state.subscriptionMenu.hideLoading,
      subscriptionError: state.subscriptionMenu.error,
    }),
    shallowEqual
  );

  const [selectedMenu, setSelectedMenu] = useState();

  const [selectedMenuToDelete, setSelectedMenuToDelete] = useState();

  const handleSHowHideMenu = async () => {
    setSelectedMenu(menu?._id);
    if (user === "subChef") {
      await dispatch(
        subChefShowHideSubscriptionMenu(
          {
            hide: !menu?.hide,
          },
          menu?._id
        )
      );
    } else {
      await dispatch(
        showHideSubscriptionMenu(
          {
            hide: !menu?.hide,
          },
          menu?._id
        )
      );
    }
    setTimeout(() => {
      setSelectedMenu("");
    }, 1200);
  };

  return (
    <div className="bg-white shadow rounded-xl w-full h-full relative">
      <div className="absolute mt-5 ml-5 z-10">
        <div className="yellow_bg w-40 h-10 rounded-2xl flex items-center justify-center">
          <p className="text-sm text-black font_medium text-center">
            Subscription
          </p>
        </div>
      </div>
      <div>
        <div
          className="z-30 bg-white w-10 h-10 rounded-full absolute right-3 top-3 flex self-end items-center justify-center cursor-pointer"
          onClick={() => handleSHowHideMenu()}
        >
          {menu?._id === selectedMenu && hideLoading ? (
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
          ₦{formatPrice(menu?.price)}
        </h6>
        <p className="text-gray-400 text-sm truncate mt-1 mb-3">
          {menu?.description}
        </p>
        <div className="w-full flex flex-row items-center justify-between gap-x-2 lg:gap-x-5">
          <Button
            title={"Edit"}
            extraClasses="!w-1/2 !px-6"
            disabled={menu?.hide}
            onClick={onClickEdit}
          />

          <Button
            title={"Duplicate"}
            extraClasses="!w-1/2 !px-6"
            disabled={menu?.hide}
            onClick={onClickCopy}
          />
        </div>

        {user !== "subChef" && (
          <OutlineButton
            title="Delete"
            disabled={menu?.hide}
            loading={selectedMenuToDelete === menu?._id}
            extraClasses="!w-full !mx-auto rounded-full px-8 py-2 mt-2"
            onClick={() => {
              setSelectedMenuToDelete(menu?._id);
              if (user === "subChef") {
                dispatch(subChefDeleteSubscriptionMenu(menu?._id));
              } else {
                dispatch(deleteSubscriptionMenu(menu?._id));
              }
              setTimeout(() => {
                setSelectedMenuToDelete();
              }, 1200);
            }}
          />
        )}
        
        {(subscriptionError) && (
          <p className="my-2 text-xs text-center text-red-600">
            {Array.isArray(subscriptionError) && subscriptionError[1] == menu?._id ? subscriptionError[0] : subscriptionError?.error}
          </p>
        )}

      </div>
    </div>
  );
};

export default SubscriptionChefMenuCard;
