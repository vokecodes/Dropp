import React, { useEffect, useState } from "react";
import { GiCook } from "react-icons/gi";
import ChefCard from "../ChefCard";
import SubscriptionMenuCard from "../SubscriptionMenuCard";
import ExploreMenuCard from "../ExploreMenuCard";
import ChefShopMenuCard from "../ChefShopMenuCard";
import { Link } from "react-router-dom";
import { formatBusinessNameLink } from "../../utils/formatMethods";
import { addCartChef } from "../../_redux/cart/cartAction";
import { useAppDispatch } from "../../redux/hooks";

const Meals = ({
  title,
  chefs,
  selectedView,
  selectedRegion,
  selectedLocation,
  selectedDelivery,
  selectedPrice,
  searchText,
  handleAddToBag,
  cartMenu,
  handleIncrement,
  handleDecrement,
  selectedMealQuantityReached,
  showMinimumQuantityReached,
  addMenuError,
  setSelectedChef,
  selectedFilter,
}: any) => {
  const dispatch = useAppDispatch();

  const abovePrice = selectedPrice?.label?.includes("Above");

  const splitPrice = selectedPrice?.value?.includes("-");

  const price = splitPrice
    ? selectedPrice?.value?.split("-")
    : selectedPrice?.value;

  // FILTERS START

  // SEARCH CHEF FILTER
  const searchedChefs =
    (selectedView === "Chefs" && searchText !== "") || searchText
      ? chefs?.filter((chef: any) =>
          chef?.business?.businessName
            .toLowerCase()
            .includes(searchText.toLowerCase())
        )
      : chefs;

  // SEARCH MEALS FILTER
  const searchedMeals =
    (selectedView === "Meals" && searchText !== "") || searchText
      ? chefs
          ?.map((chef: any) => ({
            ...chef,
            menu: chef.menu.filter((m: any) =>
              m.foodName?.toLowerCase().includes(searchText.toLowerCase())
            ),
          }))
          .filter((chef: any) => chef.menu.length > 0)
      : chefs;

  // REGION FILTER
  const filteredRegion =
    selectedRegion === "all"
      ? searchedMeals
      : searchedMeals?.filter((c: any) => {
          if (selectedRegion !== "all") {
            return (
              c?.business?.businessSpecialisation?.length > 0 &&
              c?.business?.businessSpecialisation?.includes(selectedRegion)
            );
          }

          return false;
        });

  // SAME REGION FILTER BUG FIX
  const filteredSameRegion = !selectedFilter
    ? filteredRegion
    : filteredRegion?.filter((c: any) => {
        let sameRegion =
          selectedRegion === "all" ||
          c?.business?.businessSpecialisation?.includes(selectedRegion);

        if (selectedLocation && sameRegion) {
          return c?.profile?.address === selectedLocation;
        }

        return false;
      });

  // DELIVERY FILTER
  const deliveryFilter =
    selectedDelivery && selectedDelivery?.value !== "all"
      ? filteredSameRegion
          ?.map((chef: any) => ({
            ...chef,
            menu: chef.menu.filter((c: any) =>
              c.closeDate.includes(selectedDelivery?.value)
            ),
          }))
          .filter((chef: any) => chef.menu.length > 0)
      : filteredSameRegion;

  // PRICE FILTER
  const priceFilter =
    selectedPrice && selectedPrice?.value !== "all"
      ? deliveryFilter
          ?.map((chef: any) => ({
            ...chef,
            menu: chef?.menu?.filter((m: any) =>
              splitPrice
                ? m.price >= parseInt(price[0]) && m.price <= parseInt(price[1])
                : abovePrice
                ? m.price >= parseInt(price)
                : m.price < parseInt(price)
            ),
          }))
          .filter((chef: any) => chef.menu.length > 0)
      : deliveryFilter;

  const filteredChefs = priceFilter;

  // FILTERS END

  const handleSelectChef = (chef: any) => {
    setSelectedChef(chef);
    dispatch(addCartChef(chef));
  };

  return (
    <div>
      <h1 className="mt-5 text-2xl secondary_text_color font_bold">{title}</h1>
      <div className="flex flex-row flex-wrap">
        {chefs && chefs.length > 0 ? (
          <>
            {selectedRegion === "all" &&
            !selectedDelivery &&
            !selectedLocation &&
            !selectedPrice &&
            searchText === "" ? (
              <>
                {selectedView === "Chefs" && (
                  <>
                    {chefs?.map((chef: any, i: number) => (
                      <div key={i} className="w-full lg:w-[32%] mr-2">
                        <ChefCard key={chef?._id} chef={chef} />
                      </div>
                    ))}
                  </>
                )}

                {selectedView === "Meals" && (
                  <>
                    {chefs?.map((chef: any, i: number) => (
                      <div className="w-full mt-5 overflow-hidden" key={i}>
                        <Link
                          to={formatBusinessNameLink(
                            chef?.business?.businessName?.trim()
                          )}
                        >
                          <div className="flex items-center">
                            <div>
                              {chef?.profile?.image ? (
                                <img
                                  src={chef?.profile?.image}
                                  alt="chef"
                                  className="w-12 h-12 rounded-full object-cover"
                                />
                              ) : (
                                <GiCook
                                  color="#e85666"
                                  className="w-12 h-12 rounded-full"
                                />
                              )}
                            </div>
                            <div>
                              <h1 className="ml-2 text-2xl font_medium secondary_text_color">
                                {chef?.business?.businessName}
                              </h1>
                            </div>
                          </div>
                        </Link>
                        <div
                          className="w-full pl-1 flex basis-0 whitespace-nowrap overflow-x-auto"
                          // style={{ width: "1142px" }}
                        >
                          {chef?.menu?.length > 0 &&
                            chef?.menu?.map((menu: any, i: any) => (
                              <div
                                key={i}
                                className="w-72 grow-0 shrink-0 basis-72 lg:basis-72 mr-2 mb-5"
                              >
                                <ChefShopMenuCard
                                  menu={menu}
                                  onClickAddToBag={() => {
                                    handleSelectChef(chef);
                                    handleAddToBag(menu, chef);
                                  }}
                                  inCart={cartMenu?.find(
                                    (m: any) => m.foodName === menu.foodName
                                  )}
                                  cartMenu={cartMenu}
                                  handleIncrement={handleIncrement}
                                  handleDecrement={handleDecrement}
                                  selectedMealQuantityReached={
                                    selectedMealQuantityReached
                                  }
                                  showMinimumQuantityReached={
                                    showMinimumQuantityReached
                                  }
                                  addMenuError={addMenuError}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {selectedView === "Chefs" && (
                  <>
                    {searchedChefs && searchedChefs?.length > 0 ? (
                      <>
                        {searchedChefs?.map((chef: any, i: number) => (
                          <div key={i} className="w-full lg:w-[32%] mr-2">
                            <ChefCard key={chef?._id} chef={chef} />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="mt-7 flex flex-col items-center">
                        <h2 className="text-xl input_text mb-3">
                          No{" "}
                          {selectedView === "Chefs" ? "homechefs" : "homemeals"}{" "}
                          for the selected filter.
                        </h2>
                      </div>
                    )}
                  </>
                )}

                {selectedView === "Meals" && (
                  <>
                    {filteredChefs && filteredChefs?.length > 0 ? (
                      <>
                        {filteredChefs?.map((chef: any, i: number) => (
                          <div
                            className={`w-full mt-5 overflow-hidden ${
                              chef?.menu?.length > 0 ? "" : "hidden"
                            }`}
                            key={i}
                          >
                            <Link
                              to={formatBusinessNameLink(
                                chef?.business?.businessName?.trim()
                              )}
                            >
                              <h2>Something</h2>
                              <div className="flex items-center">
                                <div>
                                  {chef?.profile?.image ? (
                                    <img
                                      src={chef?.profile?.image}
                                      alt="chef"
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                  ) : (
                                    <GiCook
                                      color="#e85666"
                                      className="w-12 h-12 rounded-full"
                                    />
                                  )}
                                </div>
                                <div>
                                  <h1 className="ml-2 text-2xl font_medium secondary_text_color">
                                    {chef?.business?.businessName}
                                  </h1>
                                </div>
                              </div>
                            </Link>
                            <div
                              className="w-full pl-1 flex basis-0 whitespace-nowrap overflow-x-auto"
                              // style={{ width: "1142px" }}
                            >
                              {chef?.menu?.length > 0 &&
                                chef?.menu?.map((menu: any, i: any) => (
                                  <div
                                    key={i}
                                    className="w-72 grow-0 shrink-0 basis-72 lg:basis-72 mr-2 mb-5"
                                  >
                                    <ChefShopMenuCard
                                      menu={menu}
                                      onClickAddToBag={() => {
                                        handleSelectChef(chef);
                                        handleAddToBag(menu, chef);
                                      }}
                                      inCart={cartMenu?.find(
                                        (m: any) => m.foodName === menu.foodName
                                      )}
                                      cartMenu={cartMenu}
                                      handleIncrement={handleIncrement}
                                      handleDecrement={handleDecrement}
                                      selectedMealQuantityReached={
                                        selectedMealQuantityReached
                                      }
                                      showMinimumQuantityReached={
                                        showMinimumQuantityReached
                                      }
                                      addMenuError={addMenuError}
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="mt-7 flex flex-col items-center">
                        <h2 className="text-xl input_text mb-3">
                          No{" "}
                          {selectedView === "Chefs" ? "homechefs" : "homemeals"}{" "}
                          for the selected filter.
                        </h2>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="text-xl input_text mb-3">
              No {selectedView === "Chefs" ? "homechefs" : "homemeals"}{" "}
              available.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meals;
