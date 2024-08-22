// @ts-nocheck
import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import OutlineButton from "../../components/OutlineButton";
import { useAppDispatch } from "../../redux/hooks";
import { getDineInMenus } from "../../_redux/dinningMenu/dinningMenuAction";
import MenuCard from "../../components/MenuCard";
import { Link, useNavigate } from "react-router-dom";
import { CHEF_ROUTES } from "../../routes/routes";
import LogoutButton from "../../components/LogoutButton";

const KitchenMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { dinningMenu } = useSelector(
    (state: any) => ({
      dinningMenu: state.dinningMenu.dinningMenu,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getDineInMenus());
  }, []);

  return (
    <>
      <div className="lg:mx-5 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between px-2 md:px-0 py-6 md:justify-start gap-y-3 md:gap-y-0 md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Homemade</span>
              <img className="h-6 w-auto" src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <div className="flex flex-row items-center justify-between md:justify-end gap-x-3 shrink-0">
            <OutlineButton
              title="Order Board"
              onClick={() => navigate(CHEF_ROUTES.linkKitchen)}
            />
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-4">
        <div className="bg-white rounded-2xl w-full py-10 md:px-5 md:mt-3">
          {dinningMenu && dinningMenu?.length > 0 ? (
            <div className="flex lg:inline-flex flex-row w-full flex-wrap gap-y-4">
              {dinningMenu?.map((menu: any) => (
                <div key={menu?._id} className="lg:w-[23%] lg:mr-5">
                  <MenuCard menu={menu} mode={"dineIn"} kitchen />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-xl input_text mb-3">
                You have not added a menu.
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KitchenMenu;
