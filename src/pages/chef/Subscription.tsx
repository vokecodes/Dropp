import React, { useRef, useState } from "react";
import Footer from "../../components/landing-page/Footer";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import HomeNav from "../../components/landing-page/HomeNav";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FoodSafety from "../../components/landing-page/FoodSafety";
import Testimonials from "../../components/landing-page/Testimonials";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import TopNav from "../../components/landing-page/TopNav";

const Subscription = () => {
  const navigate = useNavigate();
  const howRef = useRef(null);

  const [counter, setCounter] = useState(3)

  const increment = () => {
    let num = counter;
    setCounter(num+1)
  }
  
  const decrement = () => {
    let num = counter;
    if(num == 1){
      return
    }
    setCounter(num-1)
  }

  const goToExplore = () => {
    navigate(HOME_ROUTES.linkExplore);
    // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
  };
  const goToChefPage = () => navigate(HOME_ROUTES.linkChefLandingPage);

  return (
    <div className="bg-[#17020C] w-full overflow-x-hidden">
      <TopNav
        textUrl={HOME_ROUTES.linkChefLandingPage}
        text="Home Chef"
        login="Login"
        // loginUrl="https://forms.gle/jZNVL3Xt7S3CS9gj8"
        // signUpUrl="https://forms.gle/jZNVL3Xt7S3CS9gj8"
        loginUrl={AUTH_ROUTES.linkCustomerLogin}
        signUpUrl={AUTH_ROUTES.linkCustomerSignUp}
      />
      {/* HERO */}
      <div
        className="relative bg-bottom w-full bg-[#17020C] bg-[url('/public/images/bg-chef.svg')] bg-no-repeat bg-center bg-cover"
        style={{ height: "50rem" }}
      >
        <div className="h-full w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 grid grid-rows-2 lg:grid-rows-1 items-center justify-center pt-14 lg:pt-0">

          <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="flex flex-col items-start justify-center gap-y-2">
              <p className="text-white font_bold font-bold text-4xl lg:text-6xl">A meal plan<br/>that fits</p>
              <p className="italic text-[#E85666] text-4xl lg:text-6xl">your pocket.</p>
              <p className="italic text-[#fbf6f6b3] text-4xl lg:text-6xl">your pocket.</p>
            </div>
          </div>
          
          <div className="flex flex-row items-center justify-center w-full h-full hover:scale-105 transition duration-300 ease-in-out">
            <div className="w-11/12 lg:w-2/3 flex flex-col items-center justify-center gap-y-10 bg-[#4E0B2B] py-4 px-5 rounded-3xl">
              <p className="w-11/12 px-4 py-4 bg-[#5F1337] text-[#C7538A] rounded-3xl shrink-0 text-center text-sm lg:text-base"><span className="font-semibold text-nowrap">10% off your</span> <span className="italic text-nowrap">first month subscription!</span></p>

              <div className="flex flex-col items-center justify-center gap-y-2 w-full text-center">
                <p className="text-[#ffffff]/50 font_bold font-bold text-sm lg:text-lg">Number of meals per week?</p>

                <div className="flex flex-row items-center justify-between bg-white p-2 w-11/12 rounded-xl">
                  <button className="px-4 py-1 bg-[#E85666] text-white rounded-md text-lg button-shine" onClick={() => decrement()}>-</button>
                  <p className="text-md font_bold font-bold">{ counter } meal{counter > 1 && 's'}</p>
                  <button className="px-4 py-1 bg-[#E85666] text-white rounded-md text-lg button-shine" onClick={() => increment()}>+</button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-y-0.5">
                <p className="text-[#E85666] text-4xl font-bold"><span className="font_bold">{formatRemoteAmountKobo(counter * 22630.00).naira}{formatRemoteAmountKobo(counter * 22630.00).kobo}</span></p>
                <p className="text-white text-lg font-semibold">Monthly</p>
              </div>

              <button className="flex flex-row items-center justify-between py-3 px-4 lg:px-8 bg-[#E85666] text-white rounded-lg gap-x-5 text-sm lg:text-md font-semibold button-shine w-full lg:w-3/4 whitespace-nowrap" onClick={() => navigate(AUTH_ROUTES.linkCustomerSignUp)}>
                Create a meal plan!
                <FaArrowRightLong size={20} className="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PACKAGES */}
      <div className="mx-1 lg:mx-5 my-10 rounded-3xl p-8 lg:p-16">
        <h1 className="text-4xl lg:text-5xl text-center text-white font_bold mb-10">
        Setup once - <span className="text-[#DE505F] italic">Enjoy forever!</span>
        </h1>
        
        <div className="w-full">
          <div className="hidden lg:flex w-full  flex-col items-center justify-start gap-y-14 px-10">
            <img src="/images/sub1.png" className="w-full object-cover hover-scale" alt="" />
            <img src="/images/sub2.png" className="w-full object-cover hover-scale" alt="" />
            <img src="/images/sub3.png" className="w-full object-cover hover-scale" alt="" />
          </div>
          
          <div className="lg:hidden w-full flex flex-col items-center justify-start gap-y-10 px-2">
            <img src="/images/subm1.png" className="w-full object-cover hover-scale" alt="" />
            <img src="/images/subm2.png" className="w-full object-cover hover-scale" alt="" />
            <img src="/images/subm3.png" className="w-full object-cover hover-scale" alt="" />
          </div>

          <button className="flex flex-row items-center justify-between py-3 px-4 lg:px-8 bg-[#E85666] text-white rounded-lg gap-x-14 text-sm lg:text-lg font-bold button-shine whitespace-nowrap mx-auto my-14" onClick={() => navigate(AUTH_ROUTES.linkCustomerSignUp)}>
            Create a meal plan!
            <FaArrowRightLong size={20} className="" />
          </button>
        </div>
      </div>

      {/* WHY */}
      <div className="w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <img src="/images/save-img.png" className="w-full lg:w-1/2 object-cover hover:scale-125 ease-in-out duration-300" alt="" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center lg:items-start lg:justify-between auto-cols-min gap-y-5 lg:gap-x-10 w-full lg:w-4/5 mx-auto">
          <div className="text-center w-4/5 mx-auto space-y-2">
            <p className="font-bold font_bold text-xl text-[#E85666]">Flexible meal plan</p>
            <p className=" font_regular text-white">Choose from various meals and restaurants. Hassle-free!</p>
          </div>
          <div className="text-center w-4/5 mx-auto space-y-2">
            <p className="font-bold font_bold text-xl text-[#E85666]">Cancel or edit anytime</p>
            <p className=" font_regular text-white">Change your mind? No worries! Cancel or edit anytime. No extra cost!</p>
          </div>
          <div className="text-center w-4/5 mx-auto space-y-2">
            <p className="font-bold font_bold text-xl text-[#E85666]">Crafted for you</p>
            <p className=" font_regular text-white">Got allergies? Tell your chef for a safe meal. That easy!</p>
          </div>
        </div>

        <button className="flex flex-row items-center justify-between py-3 px-4 lg:px-8 bg-[#E85666] text-white rounded-lg gap-x-14 text-sm lg:text-lg font-bold button-shine whitespace-nowrap mx-auto my-14" onClick={() => navigate(AUTH_ROUTES.linkCustomerSignUp)}>
          Create a meal plan!
          <FaArrowRightLong size={20} className="" />
        </button>
      </div>

      <FoodSafety />

      <Testimonials navigate={navigate} buttonClick={() => goToExplore()} />

      {/* <div className="foodsafety flex gap-x-6 overflow-hidden">
        <h1 className="text-7xl lg:text-6xl font_bold text-[#4E0B2B]">
          street love
        </h1>
        <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
          street love
        </h1>
        <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
          street love
        </h1>
      </div> */}
      <Footer howref={howRef} />
    </div>
  );
};

export default Subscription;
