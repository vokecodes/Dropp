import React, { useState } from "react";
import CompanyDashboardLayout from "./CompanyDashboardLayout";
import TabMenu from "../../components/TabMenu";
import { COMPANY_SETTINGS } from "../../utils/Globals";
import PageTitle from "../../components/PageTitle";
import CompanyPayment from "./CompanyPayment";
import CompanyPersonal from "./CompanyPersonal";

const ordersMenu = [
  COMPANY_SETTINGS.COMPANY_PROFILE,
  COMPANY_SETTINGS.COMPANY_CARD,
];

const CompanySettings = () => {
  const [selectedOrder, setSelectedOrder] = useState(COMPANY_SETTINGS.COMPANY_PROFILE);

  return (
    <>
      <CompanyDashboardLayout>
        <div className="w-full h-full px-6 py-4">
          <PageTitle title="Account settings" extraClasses="lg:ml-7"/>
          <div className="my-10">
            <TabMenu
              containerExtraClasses="w-full lg:ml-5 lg:w-2/4"
              ordersMenu={ordersMenu}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              textExtraClasses="w-1/3 text-xs md:text-base whitespace-nowrap text-center px-1"
            />
          </div>

          <div className="bg-white rounded-3xl lg:mx-5 p-10 lg:w-5/6">
            {selectedOrder === ordersMenu[0] && <CompanyPersonal />}

            {selectedOrder === ordersMenu[1] && <CompanyPayment />}
          </div>
        </div>
      </CompanyDashboardLayout>
    </>
  );
};

export default CompanySettings;
