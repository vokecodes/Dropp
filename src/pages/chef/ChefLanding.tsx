import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import TopNav from "../../components/landing-page/TopNav";
import Header from "../../components/landing-page/Header";
import { AUTH_ROUTES } from "../../routes/routes";
import LearnAboutChefs from "../../components/landing-page/LearnAboutChefs";
import Footer from "../../components/landing-page/Footer";
import Button from "../../components/Button";
import FAQ from "../../components/landing-page/FAQ";
import TextSlider from "../../components/landing-page/TextSlider";
import { chefData } from "../../utils/Globals";

const newQuestions = [
  {
    question: "What is Homemade?",
    answer:
      "Homemade is a marketplace connecting diners with homemade meals from verified local home chefs.",
  },
  {
    question: "What is cooking on Homemade really like?",
    answer:
      "Cooking on Homemade is easy. You choose your working hours, design your menu, and set your prices. You also receive prompt notifications when customers order, while we handle delivery for you! In addition, you get feedback from your customers that help you serve them better.",
  },
  {
    question: "How does delivery work?",
    answer:
      "Delivery varies, but we'll help you identify the best delivery method available to you. We're here for you every step of the way!",
  },
  {
    question: "How many days a week can I cook?",
    answer:
      "It’s completely up to you! Homemade makes it possible to be your own boss.",
  },
  {
    question: "Once I start, can I take a break from cooking?",
    answer:
      "Of course! You manage your own schedule. If you'd like to take a break, that's completely fine. We'll be here to support you whenever you're ready to come back!",
  },
  {
    question: "How do I get paid?",
    answer:
      "You get paid through your personal homemade wallet, with your earnings available for withdrawal into your bank account at any point in time.",
  },
  {
    question: "Who are Homemade customers?",
    answer:
      "We cater to everyone! Whether you’re craving homemade meals or you want to explore varieties of cuisine’s, our mission is to ensure that you have access to delicious and affordable meals wherever you go. ",
  },
];

const ChefLandingPage = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const whys = [
    {
      icon: "/images/whyIcons/icon1.svg",
      header: "Make Money",
      paragraph:
        "It’s completely free to apply. Many home chefs make around N80,000 per week.",
    },
    {
      icon: "/images/whyIcons/icon2.svg",
      header: "Become your own boss",
      paragraph:
        "Design your own menu, set your own prices, and work when you want. ",
    },
    {
      icon: "/images/whyIcons/icon3.svg",
      header: "Serve happy customers",
      paragraph:
        "We’ll provide you with marketing support so you can share with a wide range of customers.",
    },
    {
      icon: "/images/whyIcons/icon4.svg",
      header: "Get support",
      paragraph:
        "We’ll help you craft a compelling menu, take beautiful photos of your dishes, and provide tips on pricing your menu items.",
    },
    {
      icon: "/images/whyIcons/icon5.svg",
      header: "Everything you need",
      paragraph:
        "We’ll help you with payments, delivery and customer support, so you can focus on what you love: cooking amazing food.",
    },
  ];

  const handleNext = () => {
    if (currentIndex === 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1);
  };

  const goToSignUp = () => {
    navigate(AUTH_ROUTES.linkChefSignUp);
    // window.open("https://forms.gle/JZESyX6oGBMibewy6");
  };

  return (
    <div className="bg-white">
      <TopNav
        textUrl={AUTH_ROUTES.linkChefSignUp}
        text=""
        // login="Login"
        // loginUrl="https://forms.gle/JZESyX6oGBMibewy6"
        // signUpUrl="https://forms.gle/JZESyX6oGBMibewy6"
        // loginUrl={AUTH_ROUTES.linkChefLogin}
        // signUpUrl={AUTH_ROUTES.linkChefSignUp}
      />

      <div className="relative bg-bottom w-full" style={{ height: "40rem" }}>
        <Header
          backgroundImage="/images/chef-header.png"
          bgExtraClasses="pl-10 py-24"
          text1="Make money"
          text2="from your kitchen."
          text1ExtraClasses="text-white text-6xl pb-2 font_bold"
          text4="Sign up to be your own boss and cook whenever you want."
          text4ExtraClasses="w-80 text-white py-3 text-xl font_regular"
          textContainerClasses="py-5 px-5 mt-10"
          buttonTitle="Become a home chef"
          buttonClick={() => goToSignUp()}
        />
      </div>

      <div className="">
        <div className="flex flex-row justify-center items-center py-32">
          <div className="w-4/5 lg:w-3/5 mx-auto  absolute mt-36 lg:flex flex-row items-center gap-10 py-8 px-16 card_bg_color rounded-3xl">
            <div className="lg:w-1/2">
              <img src="/images/aboutUs.png" alt="about-us" className="" />
            </div>
            <div className="lg:w-1/2">
              <p className="text-sm lg:text-base font_medium">
                Homemade is the first legal marketplace for for independent
                chefs in Nigeria. We support chefs and talented home cooks by
                providing necessary tools and a platform to make it easy to
                start selling food from their own kitchens!
              </p>
            </div>
          </div>
        </div>

        <div className="gallery_bg pt-28 pb-10">
          <div className="">
            <h1 className="mt-20 mb-10 font_bold text-center text-white text-4xl">
              Why become a homemade chef?
            </h1>

            <Carousel
              showArrows={false}
              showIndicators={false}
              showStatus={false}
              autoPlay
              stopOnHover
              selectedItem={currentIndex}
            >
              <div className="w-4/5 mx-auto lg:flex justify-left">
                {whys?.slice(0, 3)?.map((why, i) => (
                  <div key={i} className="lg:w-1/3 lg:mr-10">
                    <div
                      className="bg-white p-8 mb-5 lg:mb-0 rounded-2xl"
                      style={{ height: 340 }}
                    >
                      <div className="text-left w-28 h-28 mb-10">
                        <img
                          src={why.icon}
                          alt="card-icon"
                          // className="h-12 w-12"
                        />
                      </div>
                      <h2 className="text-left text-black text-2xl font_medium">
                        {why.header}
                      </h2>
                      <p className="mt-2 text-left text-black text-base font_regular">
                        {why.paragraph}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-4/5 mx-auto lg:flex justify-left">
                {whys?.slice(2)?.map((why, i) => (
                  <div key={i} className="lg:w-1/3 lg:mr-10">
                    <div
                      className="bg-white p-8 mb-5 lg:mb-0 rounded-2xl"
                      style={{ height: 340 }}
                    >
                      <div className="text-left w-28 h-28 mb-10">
                        <img
                          src={why.icon}
                          alt="card-icon"
                          // className="h-12 w-12"
                        />
                      </div>
                      <h2 className="text-left text-black text-2xl font_medium">
                        {why.header}
                      </h2>
                      <p className="mt-2 text-left text-black text-base font_regular">
                        {why.paragraph}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel>
            <div className="flex flex-row gap-7 justify-center items-center mt-5">
              <div onClick={handlePrev} className="cursor-pointer">
                <img
                  src="images/pinkPrev.svg"
                  alt="previous"
                  className="w-8 h-8"
                />
              </div>
              <div onClick={handleNext} className="cursor-pointer">
                <img src="images/pinkNext.svg" alt="next" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <TextSlider />

      <LearnAboutChefs
        data={chefData}
        buttonTitle="Start cooking"
        buttonClick={() => goToSignUp()}
      />
      <div className="card_bg_color mt-20 mb-6 py-24">
        <h1 className="hidden lg:block primary_txt_color font_bold text-4xl text-center">
          How to sell on homemade
        </h1>
        <h1 className="lg:hidden primary_txt_color font_bold text-4xl text-center">
          How to sell on <br /> homemade
        </h1>

        <div className="mt-10 lg:flex flex-row justify-center items-center gap-9 mx-10">
          <div className="lg:mr-10 w-full lg:w-2/5">
            <img
              src="images/howtosell.png"
              alt="stack"
              className="w-full object-cover"
              style={{}}
            />
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="flex flow-row">
              <div>
                <img src="images/check.svg" alt="love" className="w-8" />
              </div>
              <div className="ml-5">
                <h2 className="card_headerText text-2xl font_medium">
                  Submit your application.
                </h2>
                <p className="gray_text_color  w-66 text-1xl mt-1 font_regular">
                  All you need is passion, commitment
                  <br />
                  & answer to few simple questions
                  <br />
                  from us.
                </p>
              </div>
            </div>
            <div className="flex flow-row my-10">
              <div>
                <img src="images/check.svg" alt="love" className="w-8" />
              </div>
              <div className="  ml-5">
                <h2 className="card_headerText text-2xl font_medium">
                  Get approved.
                </h2>
                <p className="gray_text_color  w-66 text-1xl mt-1 font_regular">
                  We’ll walk you through the food <br />
                  safety certification process <br /> and requirements.
                </p>
              </div>
            </div>
            <div className="flex flow-row">
              <div>
                <img src="images/check.svg" alt="love" className="w-8" />
              </div>
              <div className=" ml-5">
                <h2 className="card_headerText text-2xl font_medium">
                  Start cooking.
                </h2>
                <p className="gray_text_color  w-66 text-1xl mt-1 font_regular">
                  We’re committed to your <br />
                  success from day one
                </p>
                <Button
                  title="Get started"
                  showIcon
                  onClick={() => goToSignUp()}
                  extraClasses="w-52 lg:w-66  mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAQ questions={newQuestions} />
      <Footer />
    </div>
  );
};

export default ChefLandingPage;

// import React, { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import TopNav from "../../components/landing-page/TopNav";
// import Header from "../../components/landing-page/Header";
// import { AUTH_ROUTES, CHEF_ROUTES, HOME_ROUTES } from "../../routes/routes";
// import LearnAboutChefs from "../../components/landing-page/LearnAboutChefs";
// import Footer from "../../components/landing-page/Footer";
// import Button from "../../components/Button";
// import FAQ from "../../components/landing-page/FAQ";
// import TextSlider from "../../components/landing-page/TextSlider";
// import { chefData } from "../../utils/Globals";
// import FoodSafety from "../../components/landing-page/FoodSafety";
// import Testimonials from "../../components/landing-page/Testimonials";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";

// const newQuestions = [
//   {
//     question: "What is Homemade?",
//     answer:
//       "Homemade is a marketplace connecting diners with homemade meals from verified local home chefs.",
//   },
//   {
//     question: "What is cooking on Homemade really like?",
//     answer:
//       "Cooking on Homemade is easy. You choose your working hours, design your menu, and set your prices. You also receive prompt notifications when customers order, while we handle delivery for you! In addition, you get feedback from your customers that help you serve them better.",
//   },
//   {
//     question: "How does delivery work?",
//     answer:
//       "Delivery varies, but we'll help you identify the best delivery method available to you. We're here for you every step of the way!",
//   },
//   {
//     question: "How many days a week can I cook?",
//     answer:
//       "It’s completely up to you! Homemade makes it possible to be your own boss.",
//   },
//   {
//     question: "Once I start, can I take a break from cooking?",
//     answer:
//       "Of course! You manage your own schedule. If you'd like to take a break, that's completely fine. We'll be here to support you whenever you're ready to come back!",
//   },
//   {
//     question: "How do I get paid?",
//     answer:
//       "You get paid through your personal homemade wallet, with your earnings available for withdrawal into your bank account at any point in time.",
//   },
//   {
//     question: "Who are Homemade customers?",
//     answer:
//       "We cater to everyone! Whether you’re craving homemade meals or you want to explore varieties of cuisine’s, our mission is to ensure that you have access to delicious and affordable meals wherever you go. ",
//   },
// ];

// const ChefLandingPage = () => {
//   const navigate = useNavigate();
//   const howRef = useRef(null);

//   const [chosenTab, setChosenTab] = useState(1)

//   const goToExplore = () => {
//     navigate(HOME_ROUTES.linkExplore);
//     // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
//   };

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const chefImages = [
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//     "/images/chefDoyin.png",
//   ]

//   const whys = [
//     {
//       icon: "/images/whyIcons/icon1.svg",
//       header: "Make Money",
//       paragraph:
//         "It’s completely free to apply. Many home chefs make around N80,000 per week.",
//     },
//     {
//       icon: "/images/whyIcons/icon2.svg",
//       header: "Become your own boss",
//       paragraph:
//         "Design your own menu, set your own prices, and work when you want. ",
//     },
//     {
//       icon: "/images/whyIcons/icon3.svg",
//       header: "Serve happy customers",
//       paragraph:
//         "We’ll provide you with marketing support so you can share with a wide range of customers.",
//     },
//     {
//       icon: "/images/whyIcons/icon4.svg",
//       header: "Get support",
//       paragraph:
//         "We’ll help you craft a compelling menu, take beautiful photos of your dishes, and provide tips on pricing your menu items.",
//     },
//     {
//       icon: "/images/whyIcons/icon5.svg",
//       header: "Everything you need",
//       paragraph:
//         "We’ll help you with payments, delivery and customer support, so you can focus on what you love: cooking amazing food.",
//     },
//   ];

//   const handleNext = () => {
//     if (currentIndex === 1) return;
//     setCurrentIndex(currentIndex + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex === 0) return;

//     setCurrentIndex(currentIndex - 1);
//   };

//   const goToSignUp = () => {
//     navigate(AUTH_ROUTES.linkChefSignUp);
//     // window.open("https://forms.gle/JZESyX6oGBMibewy6");
//   };

//   return (
//     <div className="bg-[#17020C] w-full overflow-x-hidden">
//       <TopNav
//         textUrl={HOME_ROUTES.linkChefLandingPage}
//         text="Home Chef"
//         login="Login"
//         // loginUrl="https://forms.gle/jZNVL3Xt7S3CS9gj8"
//         // signUpUrl="https://forms.gle/jZNVL3Xt7S3CS9gj8"
//         loginUrl={AUTH_ROUTES.linkCustomerLogin}
//         signUpUrl={AUTH_ROUTES.linkCustomerSignUp}
//       />
//       {/* HERO */}
//       <div
//         className="relative bg-bottom w-full bg-[#17020C] bg-[url('/public/images/chef-bg.svg')] bg-no-repeat bg-center bg-[length:200vw_100vh] lg:bg-cover"
//         style={{ height: "100vh" }}
//       >
//         <div className="h-full w-full lg:w-1/2 mx-auto flex flex-col items-center justify-center pt-14 lg:pt-0">
//           <div className="flex flex-col items-center justify-center gap-y-5 w-full h-full">
//             <p className="font-bold font_bold text-4xl lg:text-6xl text-center">
//               <span className="text-[#FBF6F6]">Make money.<br /></span>
//               <span className="text-[#FBF6F6]">Homemade.<br /></span>
//               <span className="text-[#E85666] italic">from your kitchen.</span>
//             </p>

//             <p className="text-[#B5ABB0] text-sm lg:text-lg font_regular font-medium w-2/3 lg:w-1/2 text-center">Sign up to be your own boss and cook whenever you want.</p>

//             <button className="flex flex-row items-center justify-between py-3 px-4 lg:px-8 bg-[#E85666] text-white rounded-lg gap-x-14 text-sm lg:text-lg font-bold button-shine whitespace-nowrap mx-auto" onClick={() => navigate(AUTH_ROUTES.linkChefSignUp)}>
//               Get Started!
//               <FaArrowRightLong size={20} className="" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* BUSINESS */}
//       <div className="w-11/12 mx-auto my-16 rounded-3xl px-4 py-8 lg:p-16 bg-[#270614]">
//         <div className="w-full flex flex-col items-center justify-center gap-y-5 m-0 p-0">
//           <div className="flex flex-row items-center justify- around gap-x-5 w-fit bg-[#17020C] rounded-xl p-3 text-white text-center m-0">
//             <p className={`font-semibold py-2 px-5 rounded-xl  cursor-pointer ${chosenTab === 1 && 'bg-[#4E0B2B]'}`} onClick={() => setChosenTab(1)}>For Chefs</p>
//             <p className={`font-semibold py-2 px-5 rounded-xl  cursor-pointer ${chosenTab === 2 && 'bg-[#4E0B2B]'}`} onClick={() => setChosenTab(2)}>For for businesses</p>
//           </div>

//           {chosenTab === 1 && (
//             <div className="w-full m-0">
//               <p className="text-[#E85666] font-bold font_bold text-3xl lg:text-5xl text-center">More for you and your business</p>

//               <div className="w-full lg:w-9/12 lg:mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-x-10 gap-y-10">
//                 <div className="h-full w-4/5 flex flex-col justify-center items-center justify-self-center lg:justify-self-end">
//                   <img src="/images/chef-guy.png" className="h-auto w-full object-cover object-center" alt="" />
//                 </div>

//                 <div className="h-full w-10/12 lg:w-4/5 flex flex-col items-center lg:items-start justify-center gap-y-10 justify-self-center lg:justify-self-start">
//                   <div>
//                     <p className="text-xl font-semibold text-[#E85666]">Submit application.</p>
//                     <p className="text-white">All you need is passion, commitment & answer to few simple questions from us.</p>
//                   </div>
//                   <div>
//                     <p className="text-xl font-semibold text-[#E85666]">Get approved.</p>
//                     <p className="text-white">We’ll walk you through the food safety certification process. Requirements vary by country.</p>
//                   </div>
//                   <div>
//                     <p className="text-xl font-semibold text-[#E85666]">Get approved.</p>
//                     <p className="text-white">We’ll walk you through the food safety certification process. Requirements vary by country.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {chosenTab === 2 && (
//             <div className="w-full m-0">
//               <p className="text-[#E85666] font-bold font_bold text-3xl lg:text-5xl text-center">More for you and your business2</p>

//               <div className="w-full lg:w-9/12 lg:mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-x-10 gap-y-10">
//                 <div className="h-full w-4/5 flex flex-col justify-center items-center justify-self-center lg:justify-self-end">
//                   <img src="/images/chef-guy.png" className="h-auto w-full object-cover object-center" alt="" />
//                 </div>

//                 <div className="h-full w-10/12 lg:w-4/5 flex flex-col items-center lg:items-start justify-center gap-y-10 justify-self-center lg:justify-self-start">
//                   <div>
//                     <p className="text-xl font-semibold text-[#E85666]">Submit application.</p>
//                     <p className="text-white">All you need is passion, commitment & answer to few simple questions from us.</p>
//                   </div>
//                   <div>
//                     <p className="text-xl font-semibold text-[#E85666]">Get approved.</p>
//                     <p className="text-white">We’ll walk you through the food safety certification process. Requirements vary by country.</p>
//                   </div>
//                   <div>
//                     <p className="text-xl font-semibold text-[#E85666]">Get approved.</p>
//                     <p className="text-white">We’ll walk you through the food safety certification process. Requirements vary by country.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* BENEFITS */}
//       <div className="w-11/12 mx-auto space-y-10 my-16">
//         <p className="text-center font_bold font-semibold text-white text-5xl">Benefits</p>

//         <div className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-between auto-rows-fr gap-x-5 gap-y-5">
//           <div className="flex flex-col items-center justify-center gap-y-5 rounded-xl p-8 lg:p-14 bg-[#270314] w-full h-full">
//             <img src="images/star.svg" alt="" />
//             <p className="font-bold font_bold text-white text-xl text-center">Make money.</p>
//             <p className="text-white text-center">It’s completely free to apply. Many home chefs make around N80,000 per week.</p>
//           </div>
//           <div className="flex flex-col items-center justify-center gap-y-5 rounded-xl p-8 lg:p-14 bg-[#270314] w-full h-full">
//             <img src="images/star.svg" alt="" />
//             <p className="font-bold font_bold text-white text-xl text-center">Become your own boss</p>
//             <p className="text-white text-center">Design your own menu, set your own prices and work when you want. </p>
//           </div>
//           <div className="flex flex-col items-center justify-center gap-y-5 rounded-xl p-8 lg:p-14 bg-[#270314] w-full h-full">
//             <img src="images/star.svg" alt="" />
//             <p className="font-bold font_bold text-white text-xl text-center">Get support.</p>
//             <p className="text-white text-center">We’ll help you craft a compelling menu, take beautiful photos of your dishes and provide tips on pricing your menu items.</p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-[url('/public/images/chefs-vector.svg')] bg-no-repeat bg-left-top bg-contain lg:bg-cover w-full my-16">
//         <div className="w-full lg:w-9/12 mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center lg:gap-x-10 gap-y-8">
//           <div className="h-full w-full lg:w-4/5 flex flex-col justify-center items-center lg:justify-self-end">
//             <img src="/images/chefs-bowl.png" className="h-auto w-full object-cover object-center" alt="" />
//           </div>

//           <div className="h-full w-9/12 lg:w-3/5 flex flex-col items-start justify-center gap-y-10 lg:justify-self-start">
//             <div>
//               <p className="text-xl font-semibold text-[#E85666]">Submit application.</p>
//               <p className="text-white">All you need is passion, commitment & answer to few simple questions from us.</p>
//             </div>
//             <div>
//               <p className="text-xl font-semibold text-[#E85666]">Get approved.</p>
//               <p className="text-white">We’ll walk you through the food safety certification process. Requirements vary by country.</p>
//             </div>
//             <div>
//               <p className="text-xl font-semibold text-[#E85666]">Start cooking.</p>
//               <p className="text-white">Get paid for doing what you love. We’ll make sure you succeed from day one.</p>
//             </div>

//             <button className="flex flex-row items-center justify-between py-2 px-4 lg:px-10 bg-[#E85666] text-white rounded-lg gap-x-14 text-sm lg:text-lg font-bold button-shine whitespace-nowrap" onClick={() => navigate(AUTH_ROUTES.linkChefSignUp)}>
//               Get Started!
//               <FaArrowRightLong size={20} className="" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* PRICING */}
//       <div className="w-11/12 mx-auto space-y-10 rounded-xl bg-[#090004] px-4 py-8 lg:p-20 my-16">
//         <p className="text-[#E85666] text-5xl font-bold font_bold text-center">Pricing</p>
//         <p className="text-white text-center w-full lg:w-1/3 mx-auto">All you need is passion, commitment & answer to few simple questions from us.</p>

//         <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center align content-start gap-x-5 gap-y-5 w-full">

//           <div className="flex flex-col items-center justify-between gap-y-10 w-full rounded-xl py-10 px-5 bg-[#17020C] hover:scale-105 hover:shadow-lg hover:shadow-neutral-600">

//             <div className="w-full space-y-1 text-center border-b border-[#34061C] pb-5">
//               <p className="text-white text-lg">Starter</p>
//               <p className="text-5xl font-semibold text-[#E85666]">₦<span className="font_bold">3,750</span></p>
//               <p className="text-[#6B133D] text-lg">Monthly</p>
//             </div>

//             <div className="flex flex-col items-start justify-start gap-y-3 font-light font_regular text-sm">
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//             </div>

//             <button className="w-full text-center py-2 px-4 lg:px-10 bg-transparent border border-[#E85666] text-[#FBF6F6] rounded-xl text-sm font-semibold button-shine whitespace-nowrap">
//               Choose starter
//             </button>
//           </div>

//           <div className="flex flex-col items-center justify-between gap-y-10 w-full rounded-xl py-10 px-5 bg-[#4E0B2B] hover:scale-105 hover:shadow-lg hover:shadow-neutral-600">

//             <div className="w-full space-y-1 text-center border-b border-[#E85666] pb-5">
//               <p className="text-white text-lg">Starter</p>
//               <p className="text-5xl font-semibold text-[#E85666]">₦<span className="font_bold">3,750</span></p>
//               <p className="text-[#E85666] text-lg">Monthly</p>
//             </div>

//             <div className="flex flex-col items-start justify-start gap-y-3 font-light font_regular text-sm">
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//             </div>

//             <button className="w-full text-center py-2 px-4 lg:px-10 bg-[#E85666] text-[#FBF6F6] rounded-xl text-sm font-semibold button-shine whitespace-nowrap">
//               Choose starter
//             </button>
//           </div>

//           <div className="flex flex-col items-center justify-between gap-y-10 w-full rounded-xl py-10 px-5 bg-[#17020C] hover:scale-105 hover:shadow-lg hover:shadow-neutral-600">

//             <div className="w-full space-y-1 text-center border-b border-[#34061C] pb-5">
//               <p className="text-white text-lg">Starter</p>
//               <p className="text-5xl font-semibold text-[#E85666]">₦<span className="font_bold">3,750</span></p>
//               <p className="text-[#6B133D] text-lg">Monthly</p>
//             </div>

//             <div className="flex flex-col items-start justify-start gap-y-3 font-light font_regular text-sm">
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//               <div className="flex flex-row items-center justify-start gap-x-3">
//                 <img src="/images/tickmark.svg" alt="" />
//                 <p className="text-neutral-500">Access to dashboard & all features</p>
//               </div>
//             </div>

//             <button className="w-full text-center py-2 px-4 lg:px-10 bg-transparent border border-[#E85666] text-[#FBF6F6] rounded-xl text-sm font-semibold button-shine whitespace-nowrap">
//               Choose starter
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* CHEFS */}
//       <div className="w-full space-y-16 flex flex-col overflow-hidden my-16">
//         <p className="text-4xl lg:text-5xl font-bold font_bold text-white text-center"><span className="text-[#E85666]">150+</span>Homechefs</p>

//         <div className="ml-10 grow flex flex-row items-center justify-start gap-x-5 chef-images">
//           {
//             chefImages.map((img, i) => (
//               <div key={i} className="shrink-0 w-[240px] h-[330px] rounded-xl border border-[#E85666] hover:scale-105 hover:shadow-lg hover:shadow-neutral-600">
//                 <img src={img} className="w-full h-full object-cover object-center rounded-xl" alt="" />
//               </div>
//             ))
//           }
//         </div>

//         <button className="flex flex-row items-center justify-between py-2 px-4 lg:px-10 bg-[#E85666] text-white rounded-lg gap-x-14 text-sm lg:text-lg font-bold button-shine whitespace-nowrap w-fit mx-auto" onClick={() => navigate(AUTH_ROUTES.linkChefSignUp)}>
//           Get Started!
//           <FaArrowRightLong size={20} className="" />
//         </button>
//       </div>

//       <FoodSafety />

//       <Testimonials navigate={navigate} buttonClick={() => goToExplore()} />

//       {/* <div className="foodsafety flex gap-x-6 overflow-hidden">
//         <h1 className="text-7xl lg:text-6xl font_bold text-[#4E0B2B]">
//           street love
//         </h1>
//         <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
//           street love
//         </h1>
//         <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
//           street love
//         </h1>
//       </div> */}
//       <Footer howref={howRef} />
//     </div>
//   );
// };

// export default ChefLandingPage;
