import React, { useEffect, useState } from "react";
import RestaurantShopMenuCard from "./RestaurantShopMenuCard";

const RestaurantMeal = ({
  category,
  selectedCategory,
  searchText,
  chef,
  cartMenu,
  addMenuError,
  handleIncrement,
  handleDecrement,
  showMinimumQuantityReached,
  selectedMealQuantityReached,
  handleAddToBag,
  chefRecommendedMenu,
}: any) => {

  const [recommendedIds, setRecommendedIds] = useState([...chefRecommendedMenu?.map((cm: any) => cm._id)]);

  useEffect(() => {
    setRecommendedIds([...chefRecommendedMenu?.map((cm: any) => cm._id)])
  }, [chef])

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-y-4 lg:gap-4 justify-start items-center p-2 w-full h-fit">
      {!searchText ? (
        <>
          {chef?.menu &&
            chef?.menu?.length > 0 &&
            chef?.menu
              ?.filter((m: any) => {
                if (
                  selectedCategory !== "All" &&
                  recommendedIds?.includes(m._id) &&
                  m.category === selectedCategory
                ) {
                  return m;
                }

                if (selectedCategory === "All" && recommendedIds?.includes(m._id)) {
                  return m;
                }

                return false;
              })
              ?.map((menu: any) => (
                <div
                  key={menu._id}
                  className="w-full grow-0 shrink-0 lg:m-0"
                >
                  <RestaurantShopMenuCard
                    chefName={chef?.business?.businessName}
                    menu={menu}
                    onClickAddToBag={() => handleAddToBag(menu)}
                    inCart={cartMenu?.find((m: any) => m._id === menu._id)}
                    searchText={searchText}
                    cartMenu={cartMenu}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    popular={chefRecommendedMenu?.find(
                      (cm: any) => cm._id === menu._id
                    )}
                  />
                </div>
              ))}
          
          {chef?.menu &&
            chef?.menu?.length > 0 &&
            chef?.menu
              ?.filter((m: any) => {
                if (
                  selectedCategory !== "All" &&
                  !recommendedIds?.includes(m._id) &&
                  m.category === selectedCategory
                ) {
                  return m;
                }

                if (selectedCategory === "All" && !recommendedIds?.includes(m._id)) {
                  return m;
                }

                return false;
              })
              ?.map((menu: any) => (
                <div
                  key={menu._id}
                  className="w-full grow-0 shrink-0 lg:m-0"
                >
                  <RestaurantShopMenuCard
                    chefName={chef?.business?.businessName}
                    menu={menu}
                    onClickAddToBag={() => handleAddToBag(menu)}
                    inCart={cartMenu?.find((m: any) => m._id === menu._id)}
                    searchText={searchText}
                    cartMenu={cartMenu}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    popular={chefRecommendedMenu?.find(
                      (cm: any) => cm._id === menu._id
                    )}
                  />
                </div>
              ))}
        </>
      ) : (
        <>
          {chef?.menu &&
            chef?.menu?.length > 0 &&
            chef?.menu?.filter((m: any) => {
              if (
                selectedCategory !== "All" &&
                m.category === selectedCategory &&
                recommendedIds?.includes(m._id) &&
                m.foodName?.toLowerCase()?.includes(searchText.toLowerCase())
              ) {
                return m;
              }
              if (
                selectedCategory === "All" &&
                recommendedIds?.includes(m._id) &&
                (m.category
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase()) ||
                  m.foodName?.toLowerCase()?.includes(searchText.toLowerCase()))
              ) {
                return m;
              }

              return false;
            }).length > 0 &&
            chef?.menu
              ?.filter((m: any) => {
                if (
                  selectedCategory !== "All" &&
                  m.category === selectedCategory &&
                  recommendedIds?.includes(m._id) &&
                  m.foodName?.toLowerCase()?.includes(searchText.toLowerCase())
                ) {
                  return m;
                }

                if (
                  selectedCategory === "All" &&
                  recommendedIds?.includes(m._id) &&
                  (m.category
                    ?.toLowerCase()
                    ?.includes(searchText.toLowerCase()) ||
                    m.foodName
                      ?.toLowerCase()
                      ?.includes(searchText.toLowerCase()))
                ) {
                  return m;
                }

                return false;
              })
              ?.map((menu: any) => (
                <div
                  key={menu._id}
                  className="w-full grow-0 shrink-0 lg:m-0"
                >
                  <RestaurantShopMenuCard
                    chefName={chef?.business?.businessName}
                    menu={menu}
                    onClickAddToBag={() => handleAddToBag(menu)}
                    inCart={cartMenu?.find(
                      (m: any) => m.foodName === menu.foodName
                    )}
                    searchText={searchText}
                    cartMenu={cartMenu}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    popular={chefRecommendedMenu?.find(
                      (cm: any) => cm._id === menu._id
                    )}
                  />
                </div>
              ))}
          
          {chef?.menu &&
            chef?.menu?.length > 0 &&
            chef?.menu?.filter((m: any) => {
              if (
                selectedCategory !== "All" &&
                m.category === selectedCategory &&
                !recommendedIds?.includes(m._id) &&
                m.foodName?.toLowerCase()?.includes(searchText.toLowerCase())
              ) {
                return m;
              }
              if (
                selectedCategory === "All" &&
                !recommendedIds?.includes(m._id) &&
                (m.category
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase()) ||
                  m.foodName?.toLowerCase()?.includes(searchText.toLowerCase()))
              ) {
                return m;
              }

              return false;
            }).length > 0 &&
            chef?.menu
              ?.filter((m: any) => {
                if (
                  selectedCategory !== "All" &&
                  m.category === selectedCategory &&
                  !recommendedIds?.includes(m._id) &&
                  m.foodName?.toLowerCase()?.includes(searchText.toLowerCase())
                ) {
                  return m;
                }

                if (
                  selectedCategory === "All" &&
                  !recommendedIds?.includes(m._id) &&
                  (m.category
                    ?.toLowerCase()
                    ?.includes(searchText.toLowerCase()) ||
                    m.foodName
                      ?.toLowerCase()
                      ?.includes(searchText.toLowerCase()))
                ) {
                  return m;
                }

                return false;
              })
              ?.map((menu: any) => (
                <div
                  key={menu._id}
                  className="w-full grow-0 shrink-0 lg:m-0"
                >
                  <RestaurantShopMenuCard
                    chefName={chef?.business?.businessName}
                    menu={menu}
                    onClickAddToBag={() => handleAddToBag(menu)}
                    inCart={cartMenu?.find(
                      (m: any) => m.foodName === menu.foodName
                    )}
                    searchText={searchText}
                    cartMenu={cartMenu}
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    selectedMealQuantityReached={selectedMealQuantityReached}
                    showMinimumQuantityReached={showMinimumQuantityReached}
                    addMenuError={addMenuError}
                    popular={chefRecommendedMenu?.find(
                      (cm: any) => cm._id === menu._id
                    )}
                  />
                </div>
              ))}
        </>
      )}
    </div>
  );
};

export default RestaurantMeal;
