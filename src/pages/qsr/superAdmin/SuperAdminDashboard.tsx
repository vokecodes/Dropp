import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Hotjar from "@hotjar/browser";
import BannerCard from "../../../components/BannerCard";
import DOrderCard from "../../../components/DOrderCard";
import PageTitle from "../../../components/PageTitle";
import { useAppDispatch } from "../../../redux/hooks";
import { QSR_ROUTES } from "../../../routes/routes";
import { getBusiness } from "../../../_redux/business/businessAction";
import { getPayment } from "../../../_redux/payment/paymentAction";
import {
  getChefRestaurantWalletAccount,
  getChefWalletAccount,
  getProfileChefAccount,
} from "../../../_redux/user/userAction";
import { getChefOrders } from "../../../_redux/order/orderAction";
import { formatRemoteAmountKobo } from "../../../utils/formatMethods";
import QsrDashboardLayout from "../../../components/QsrDashboardLayout";

const SuperAdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { user, business, payment, wallet, restaurantWallet, orders, dashboard } =
    useSelector(
      (state: any) => ({
        user: state.user.user,
        business: state.business.business,
        payment: state.payment.payment,
        wallet: state.user.wallet,
        orders: state.orders.orders,
        restaurantWallet: state.user.restaurantWallet,
        dashboard: state.user.dashboard,
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

  return (
    <>
      <QsrDashboardLayout>
        <div className="w-full px-6 py-4" style={{}}>
          <div className="lg:flex">
            <div className="w-full lg:mr-5">
              <PageTitle title="My Home" />
              <div className="mt-5">
                <BannerCard
                  backgroundImage="/images/dashboard_banner.svg"
                  bgExtraClasses="p-7 lg:p-10 bg-cover bg-center bg-no-repeat min-w-full h-66"
                  textContainerClasses="pl-10 py-10"
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
                  text2ExtraClasses="text-5xl text-white font_bold mt-3 mb-5"
                  noShowRightIcon
                  // text3="Withdraw"
                  // text3ExtraClasses="text-lg text-white font_regular"
                  // iconColor="#fff"
                  iconSize={24}
                  iconExtraClasses="ml-2"
                />
              </div>
              <div className="my-5 flex justify-between">
                <DOrderCard
                  title="New orders"
                  total={dashboard?.orders || 0}
                  to={QSR_ROUTES.qsrReports}
                />
                <DOrderCard
                  title="Total orders"
                  total={dashboard?.orders || 0}
                  to={QSR_ROUTES.qsrReports}
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
          </div>
        </div>
      </QsrDashboardLayout>
    </>
  );
};

export default SuperAdminDashboard;
