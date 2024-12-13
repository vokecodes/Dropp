import React, { useState } from "react";
import ChefDashboardLayout from "../../../components/ChefDashboardLayout";
import TabMenu from "../../../components/TabMenu";
import { ORDERS_MENU } from "../../../utils/Globals";
import PageTitle from "../../../components/PageTitle";
import ChefBusiness from "../../../components/ChefBusiness";
import ChefPayment from "../../../components/ChefPayment";
import ChefPersonal from "../../../components/ChefPersonal";
import QsrDashboardLayout from "../../../components/QsrDashboardLayout";

const ordersMenu = [
  ORDERS_MENU.PERSONAL,
  ORDERS_MENU.MY_BUSINESS,
  ORDERS_MENU.PAYMENT,
];

const SuperAdminSettings = () => {
  const [selectedOrder, setSelectedOrder] = useState(ORDERS_MENU.PERSONAL);

  return (
    <>
      <QsrDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="Account settings" />
          <div className="my-10">
            <TabMenu
              containerExtraClasses="lg:w-2/3"
              ordersMenu={ordersMenu}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              textExtraClasses="w-1/2 text-base"
            />
          </div>

          <div className="bg-white rounded-3xl p-10">
            {selectedOrder === ordersMenu[0] && <ChefPersonal />}

            {selectedOrder === ordersMenu[1] && <ChefBusiness />}

            {selectedOrder === ordersMenu[2] && <ChefPayment />}
          </div>
        </div>
      </QsrDashboardLayout>
    </>
  );
};

export default SuperAdminSettings;
