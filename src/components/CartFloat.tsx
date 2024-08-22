import { DELIVERY_COST } from "../_redux/urls";
import { formatPrice } from "../utils/formatMethods";

const CartFloat = ({ chef, cartMenu, cartModal, setCartModal, restaurantcartMenu }: any) => {
  const getDeliveryCost = (chef: any) => {
    let cost;
    if (chef) {
      console.log("here 1");
      if (
        chef?.business?.deliveryCost !== undefined &&
        chef?.business?.deliveryCost !== null
      ) {
        cost = chef?.business?.deliveryCost;
      } else {
        cost = DELIVERY_COST;
      }
    } else {
      cost = DELIVERY_COST;
    }
    return cost;
  };

  const deliveryCost = getDeliveryCost(chef);

  let totalAmount =
    cartMenu
      ?.map(
        (c: any) =>
          (c.discount ? c.price - (c.price / 100) * c.discount : c.price) *
          c.quantity
      )
      .reduce((partialSum: any, a: any) => partialSum + a, 0) + deliveryCost;

  return (
    <>
      {cartMenu?.length > 0 && (
        <>
          {restaurantcartMenu ? (
            <div
              style={{ cursor: "pointer" }}
              className="lg:hidden w-full"
              onClick={() => setCartModal(!cartModal)}
            >
              <div
                className="fixed bottom-10 left-2 right-2 z-50"
              >
                <div className="primary_bg_color rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-2 bottom_cart_length_bg w-10 h-10 flex items-center justify-center rounded-xl">
                      <p className="text-white text-center text-lg font_medium">
                        {cartMenu?.length}
                      </p>
                    </div>
                    <p className="text-white text-lg font_medium">Your Bag</p>
                  </div>
                  <div>
                    <p className="text-white text-lg font_medium">
                      ₦{formatPrice(totalAmount - deliveryCost)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              className="lg:hidden"
              onClick={() => setCartModal(!cartModal)}
            >
              <div
                className="fixed bottom-10 z-50"
                style={{ width: "22rem", left: "2.3rem" }}
              >
                <div className="primary_bg_color rounded-2xl p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-2 bottom_cart_length_bg w-10 h-10 flex items-center justify-center rounded-xl">
                      <p className="text-white text-center text-lg font_medium">
                        {cartMenu?.length}
                      </p>
                    </div>
                    <p className="text-white text-lg font_medium">Your Bag</p>
                  </div>
                  <div>
                    <p className="text-white text-lg font_medium">
                      ₦{formatPrice(totalAmount - deliveryCost)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CartFloat;
