import React, { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { CiUser } from "react-icons/ci";
import Hotjar from "@hotjar/browser";
import BannerCard from "../../components/BannerCard";
import CheckItem from "../../components/CheckItem";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import DOrderCard from "../../components/DOrderCard";
import PageTitle from "../../components/PageTitle";
import { useAppDispatch } from "../../redux/hooks";
import { CHEF_ROUTES } from "../../routes/routes";
import { getBusiness } from "../../_redux/business/businessAction";
import { getPayment } from "../../_redux/payment/paymentAction";
import {
  getChefRestaurantWalletAccount,
  getChefWalletAccount,
  getProfileChefAccount,
  getProfileUserAccount,
} from "../../_redux/user/userAction";
import { getCustomerWallet } from "../../_redux/wallet/walletAction";
import { getChefOrders } from "../../_redux/order/orderAction";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import DOWalletCard from "../../components/DOWalletCard";

const ChefDashboard = () => {
  const dispatch = useAppDispatch();
  const { user, business, payment, wallet, restaurantWallet, orders } =
    useSelector(
      (state: any) => ({
        user: state.user.user,
        business: state.business.business,
        payment: state.payment.payment,
        wallet: state.user.wallet,
        orders: state.orders.orders,
        restaurantWallet: state.user.restaurantWallet,
      }),
      shallowEqual
    );

  useEffect(() => {
    dispatch(getProfileChefAccount());
    dispatch(getBusiness());
    dispatch(getPayment());
    dispatch(getChefWalletAccount());
    dispatch(getChefRestaurantWalletAccount());
    dispatch(getChefOrders());
  }, []);

  useEffect(() => {
    Hotjar.identify(user?._id, {
      first_name: user?.firstName,
      last_name: user?.lastName,
    });
  }, [user]);

  const checkItems = [
    // {
    //   title: "Add a profile picture",
    //   checked: user?.image,
    //   to: CHEF_ROUTES.linkChefSettings,
    // },
    {
      title: "Update personal info",
      checked: user?.image && user?.phoneNumber && user?.address && user?.bio,
      to: CHEF_ROUTES.linkChefSettings,
    },
    {
      title: "Add a business",
      checked: business,
      to:
        user?.image && user?.phoneNumber && user?.address && user?.bio
          ? CHEF_ROUTES.linkChefSettings
          : "",
    },
    {
      title: "Add a payment",
      checked: payment,
      to: business ? CHEF_ROUTES.linkChefSettings : "",
    }
  ];

  return (
    <>
      <ChefDashboardLayout>
        <div className="w-full px-6 py-4" style={{}}>
          <div className="lg:flex">
            <div className="lg:w-9/12 lg:mr-5">
              <PageTitle title="My Home" />
              <div className="mt-5">
                <BannerCard
                  backgroundImage="/images/dashboard_banner.svg"
                  bgExtraClasses="p-7 lg:p-10 bg-cover bg-no-repeat min-w-full h-66"
                  textContainerClasses="pl-5 lg:pl-10 py-10"
                  text1="Balance"
                  text1ExtraClasses="text-base text-white font_regular"
                  text2={
                    wallet
                      ? `${
                          formatRemoteAmountKobo(
                            restaurantWallet?.balance
                              ? wallet?.balance + restaurantWallet?.balance
                              : wallet?.balance
                          ).naira
                        }${
                          formatRemoteAmountKobo(
                            restaurantWallet?.balance
                              ? wallet?.balance + restaurantWallet?.balance
                              : wallet?.balance
                          ).kobo
                        }`
                      : ""
                  }
                  text2ExtraClasses="text-2xl lg:text-5xl text-white font_bold mt-3 mb-5"
                  noShowRightIcon
                  // text3="Withdraw"
                  // text3ExtraClasses="text-lg text-white font_regular"
                  // iconColor="#fff"
                  iconSize={24}
                  iconExtraClasses="ml-2"
                />
              </div>
              {user?.isRestaurant && (
                <div className="my-5 lg:flex justify-between">
                  <div className="lg:w-[48%] mb-2 lg:mb-0">
                    <DOWalletCard
                      title="Online orders:"
                      amount={wallet?.balance}
                    />
                  </div>
                  <div className="lg:w-[48%]">
                    <DOWalletCard
                      title="Dine-in orders:"
                      amount={restaurantWallet?.balance}
                    />
                  </div>
                </div>
              )}
              <div className="my-5 flex justify-between">
                <DOrderCard
                  title="New orders"
                  total={
                    orders?.filter((o: any) => o.status === "processed")?.length
                  }
                  to={CHEF_ROUTES.linkChefOrders}
                />
                <DOrderCard
                  title="Completed orders"
                  total={
                    orders?.filter((o: any) => o.status === "completed")?.length
                  }
                  to={CHEF_ROUTES.linkChefOrders}
                />
              </div>
              <div>
                <BannerCard
                  backgroundImage="/images/learning_banner.png"
                  bgExtraClasses="p-4 lg:p-8 bg-cover bg-no-repeat h-72"
                  textContainerClasses="pl-10 py-10"
                  text1="Learning & Resources"
                  text1ExtraClasses="text-2xl lg:text-4xl text-black"
                  text2="Learning and resources"
                  text2ExtraClasses="text-xl lg:text-2xl text-black mt-3 mb-10"
                  text3="Show tips"
                  text3ExtraClasses="text-xl lg:text-2xl text-black"
                  text3Link="https://drive.google.com/file/d/1kxkI7Vlzcyiu7ELe5JL4AJCvo8XqNLET/view"
                  iconColor="#000"
                  iconSize={24}
                  iconExtraClasses="ml-2"
                />
              </div>
            </div>
            <div className="lg:w-3/12 mt-10 lg:mt-0 bg-white rounded-2xl pt-2">
              <div>
                <div className="flex items-center p-3 bg_menu rounded-2xl mb-2 mx-2">
                  <div className="flex items-center mr-5 border-4 rounded-full">
                    {user?.image ? (
                      <img
                        src={user?.image}
                        alt="chef"
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <CiUser className="w-12 h-12 p-2" color="#06c167" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-black font_bold">
                      Hi {user?.firstName},
                    </p>
                    <p className="text-xs text-black font_regular">
                      {user?.virtualKitchenVisit
                        ? "Profile Verification Completed."
                        : "Complete your profile."}
                    </p>
                  </div>
                </div>
              </div>
              {checkItems?.map((item, i) => (
                <CheckItem
                  key={i}
                  title={item?.title}
                  checked={item?.checked}
                  to={item?.to}
                  // external={item?.external}
                  // type={item?.type}
                />
              ))}
            </div>
          </div>
        </div>
      </ChefDashboardLayout>
    </>
  );
};

export default ChefDashboard;
