import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerDashboardLayout from "../../components/CustomerDashboardLayout";
import PageTitle from "../../components/PageTitle";
import TabMenu from "../../components/TabMenu";
import Button from "../../components/Button";
import ChefCard from "../../components/ChefCard";
import {
  getFavouriteChefs,
  getFavouriteMeals,
} from "../../_redux/favourite/favouriteAction";
import { useAppDispatch } from "../../redux/hooks";
import MenuItem from "../../components/MenuItem";
import MenuCard from "../../components/MenuCard";
import { HOME_ROUTES } from "../../routes/routes";
import ChefFavCard from "../../components/ChefFavCard";

const favoritesMenu = ["Chefs", "Meals"];

const Favourite = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { chefError, chefLoading, chefs, mealError, mealLoading, meals } =
    useSelector(
      (state: any) => ({
        chefLoading: state.favourite.chefLoading,
        chefError: state.favourite.chefError,
        chefs: state.favourite.chefs,
        mealLoading: state.favourite.mealLoading,
        mealError: state.favourite.mealError,
        meals: state.favourite.meals,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(getFavouriteChefs());
    dispatch(getFavouriteMeals());
  }, []);

  const goToExplore = () => navigate(HOME_ROUTES.linkExplore);

  const [selectedFavorite, setSelectedFavorite] = useState("Chefs");

  return (
    <>
      <CustomerDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="My Favourites" />
          <div className="my-10">
            <TabMenu
              containerExtraClasses="lg:w-2/3"
              ordersMenu={favoritesMenu}
              selectedOrder={selectedFavorite}
              setSelectedOrder={setSelectedFavorite}
              textExtraClasses="w-1/2 text-base"
            />
          </div>

          <div className="bg-white rounded-3xl px-10 py-5">
            {selectedFavorite === favoritesMenu[0] && (
              <>
                {chefs && chefs?.length > 0 ? (
                  <>
                    <div className="lg:flex flex-row flex-wrap">
                      {chefs?.map((chef: any) => (
                        <div key={chef?._id} className="lg:w-[31%] lg:mr-5">
                          <ChefFavCard chef={chef} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-20">
                      <Button
                        title="Explore home chefs"
                        extraClasses="lg:w-1/3 py-4"
                        onClick={() => goToExplore()}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src="/images/favourite-chef.svg" alt="fav" />
                    <h2 className="text-xl input_text mb-3">
                      You have no favourite chef
                    </h2>
                    <Button
                      title="Explore home chefs"
                      extraClasses="py-4"
                      onClick={() => goToExplore()}
                    />
                  </div>
                )}
              </>
            )}

            {selectedFavorite === favoritesMenu[1] && (
              <>
                {meals && meals?.length > 0 ? (
                  <>
                    <div className="lg:flex flex-row flex-wrap">
                      {meals?.map((meal: any) => (
                        <div
                          key={meal?._id}
                          className="lg:w-[31%] mt-7 lg:mr-5"
                        >
                          <MenuCard menu={meal?.menu} favourite />
                        </div>
                      ))}
                    </div>
                    <div className="mt-20">
                      <Button
                        title="Explore home meals"
                        extraClasses="lg:w-1/3 py-4"
                        onClick={() => goToExplore()}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <img src="/images/empty-order.svg" alt="fav" />
                    <h2 className="text-xl input_text mb-3">
                      You have no favourite meal
                    </h2>
                    <Button
                      title="Explore home meals"
                      extraClasses="py-4"
                      onClick={() => goToExplore()}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CustomerDashboardLayout>
    </>
  );
};

export default Favourite;
