// @ts-nocheck
import React from "react";
import BannerCard from "../../components/BannerCard";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import styles from "./Home.module.scss";

const ChefDashboard = () => {
  return (
    <>
      <ChefDashboardLayout>
        <div style={{ width: "100%", margin: " 1rem 2rem" }}>
          <h1 className="text-1.5xl text-black font_medium">My Home</h1>
          <div className={styles.parentBanner}>
            <div className={styles.banner}>
              <BannerCard
                bgExtraClasses=""
                text1="Balance"
                text2="N56,000"
                text3="withdraw >"
              />
            </div>
          </div>
        </div>
        {/* <div className="w-full px-6 py-4" style={{}}>
          <h1 className="text-1.5xl text-black font_medium">My Home</h1>
          <div className="my-5 flex">
            <div className="w-3/5 mr-5">
              <div className={styles.parentBanner}>
              <div className={styles.banner}>
                <BannerCard
                  bgExtraClasses=""
                  text1="Balance"
                  text2="N56,000"
                  text3="withdraw >"
                />
              </div>
              </div>
              
              <div className="my-5">
                <div className="bg-white rounded-2xl p-5"></div>
              </div>
              <div>
                <BannerCard
                  backgroundImage="/images/learning_banner.svg"
                  bgExtraClasses=""
                  text1="Balance"
                  text2="N56,000"
                  text3="withdraw >"
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5"></div>
          </div>
        </div> */}
      </ChefDashboardLayout>
    </>
  );
};

export default ChefDashboard;
