import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FoodGallery from "../../components/landing-page/FoodGallery";
import FoodSafety from "../../components/landing-page/FoodSafety";
import Footer from "../../components/landing-page/Footer";
import Header from "../../components/landing-page/Header";
import HowHomeMadeWorks from "../../components/landing-page/HowHomeMadeWorks";
import LearnAboutChefs from "../../components/landing-page/LearnAboutChefs";
import Testimonials from "../../components/landing-page/Testimonials";
import TopNav from "../../components/landing-page/TopNav";
import WhyTryHomeMade from "../../components/landing-page/WhyTryHomeMade";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import { chefData } from "../../utils/Globals";

const hows = [
  {
    icon: "/images/hmw1.svg",
    header: "Explore a classic taste in every dish.",
    paragraph: "Search for authentic meals made by talented chefs near you.",
  },
  {
    icon: "/images/hmw2.svg",
    header: "Order right now or plan ahead.",
    paragraph: "Add dishes to your order and checkout in just a few steps.",
  },
  {
    icon: "/images/hmw3.svg",
    header: "Homemade food just for you.",
    paragraph: "Eat delicious homemade food made by certified chefs near you.",
  },
];

const foods = [
  { id: 1, image: "/images/riceandbeans-elipse.svg", title: "Rice and Beans" },
  { id: 2, image: "/images/ewagoyin-elipse.svg", title: "Ewa Agoyin" },
  { id: 3, image: "/images/asaro-ellipse.svg", title: "Asaro" },
  { id: 5, image: "/images/riceandbeans-elipse.svg", title: "Amala Abule" },
  { id: 6, image: "/images/asaro-ellipse.svg", title: "Stir Fry Pasta" },
  { id: 7, image: "/images/ewagoyin-elipse.svg", title: "Moi Moi" },
  { id: 8, image: "/images/asaro-ellipse.svg", title: "Efo Riro" },
  { id: 9, image: "/images/riceandbeans-elipse.svg", title: "Akara" },
  { id: 10, image: "/images/ewagoyin-elipse.svg", title: "Egusi" },
];

const meals = [
  "/images/meal1.png",
  "/images/meal2.png",
  "/images/meal3.png",
  "/images/meal4.png",
  "/images/meal5.png",
];

const CustomerLandingPage = () => {
  const navigate = useNavigate();
  const howRef = useRef(null);

  const goToExplore = () => {
    navigate(HOME_ROUTES.linkExplore);
    // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
  };
  const goToChefPage = () => navigate(HOME_ROUTES.linkChefLandingPage);

  return (
    <div className="">
      <TopNav
        textUrl={HOME_ROUTES.linkChefLandingPage}
        text="Home Chef"
        login="Login"
        // loginUrl="https://forms.gle/jZNVL3Xt7S3CS9gj8"
        // signUpUrl="https://forms.gle/jZNVL3Xt7S3CS9gj8"
        loginUrl={AUTH_ROUTES.linkCustomerLogin}
        signUpUrl={AUTH_ROUTES.linkCustomerSignUp}
      />

      <div className="relative bg-bottom w-full" style={{ height: "40rem" }}>
        <Header
          backgroundImage="/images/customer-header.png"
          bgExtraClasses="pl-10 py-24"
          text1="Fresh meals."
          text2="Homemade."
          text3="Delivered hot!"
          text1ExtraClasses="text-white text-5xl lg:text-6xl pb-2 font_bold"
          text4="Explore homemade meals from verified home chefs around."
          text4ExtraClasses="w-80 text-white py-3 text-xl font_regular"
          textContainerClasses="py-5 px-5"
          buttonTitle="What’s cooking?"
          buttonClick={() => goToExplore()}
        />
      </div>

      <div ref={howRef} id="how-it-works" className="my-16">
        <h1 className="hidden lg:block card_headerText text-4xl text-center font_bold mb-10">
          How homemade works!
        </h1>
        <h1 className="lg:hidden card_headerText text-4xl text-center font_bold mb-10">
          How homemade <br /> works!
        </h1>
        <div className="w-4/5 mx-auto lg:flex justify-center">
          {hows.map((d, i) => (
            <div key={i} className="lg:w-1/3 lg:mr-10">
              <HowHomeMadeWorks {...d} />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            title="What's Cooking?"
            showIcon
            onClick={() => goToExplore()}
            extraClasses="text-center lg:w-1/4"
          />
        </div>
      </div>

      <FoodGallery foods={foods} meals={meals} />

      <WhyTryHomeMade buttonClick={() => goToExplore()} />

      <FoodSafety />

      <LearnAboutChefs
        data={chefData}
        buttonTitle="Learn more about chef"
        buttonClick={() => goToChefPage()}
      />

      <Testimonials buttonClick={() => goToExplore()} />

      <Footer howref={howRef} />
    </div>
  );
};

export default CustomerLandingPage;

// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
// import FoodGallery from "../../components/landing-page/FoodGallery";
// import FoodSafety from "../../components/landing-page/FoodSafety";
// import Footer from "../../components/landing-page/Footer";
// import Header from "../../components/landing-page/Header";
// import HowHomeMadeWorks from "../../components/landing-page/HowHomeMadeWorks";
// import LearnAboutChefs from "../../components/landing-page/LearnAboutChefs";
// import Testimonials from "../../components/landing-page/Testimonials";
// import TopNav from "../../components/landing-page/TopNav";
// import WhyTryHomeMade from "../../components/landing-page/WhyTryHomeMade";
// import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
// import { chefData } from "../../utils/Globals";
// import HomeNav from "../../components/landing-page/HomeNav";

// const hows = [
//   {
//     icon: "/images/hmw1.svg",
//     header: "Explore a classic taste in every dish.",
//     paragraph: "Search for authentic meals made by talented chefs near you.",
//   },
//   {
//     icon: "/images/hmw2.svg",
//     header: "Order right now or plan ahead.",
//     paragraph: "Add dishes to your order and checkout in just a few steps.",
//   },
//   {
//     icon: "/images/hmw3.svg",
//     header: "Homemade food just for you.",
//     paragraph: "Eat delicious homemade food made by certified chefs near you.",
//   },
// ];

// const foods = [
//   { id: 1, image: "/images/riceandbeans-elipse.svg", title: "Rice and Beans" },
//   { id: 2, image: "/images/ewagoyin-elipse.svg", title: "Ewa Agoyin" },
//   { id: 3, image: "/images/asaro-ellipse.svg", title: "Asaro" },
//   { id: 5, image: "/images/riceandbeans-elipse.svg", title: "Amala Abule" },
//   { id: 6, image: "/images/asaro-ellipse.svg", title: "Stir Fry Pasta" },
//   { id: 7, image: "/images/ewagoyin-elipse.svg", title: "Moi Moi" },
//   { id: 8, image: "/images/asaro-ellipse.svg", title: "Efo Riro" },
//   { id: 9, image: "/images/riceandbeans-elipse.svg", title: "Akara" },
//   { id: 10, image: "/images/ewagoyin-elipse.svg", title: "Egusi" },
// ];

// const meals = [
//   "/images/meal1.png",
//   "/images/meal2.png",
//   "/images/meal3.png",
//   "/images/meal4.png",
//   "/images/meal5.png",
// ];

// const CustomerLandingPage = () => {
//   const navigate = useNavigate();
//   const howRef = useRef(null);

//   const goToExplore = () => {
//     navigate(HOME_ROUTES.linkExplore);
//     // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
//   };
//   const goToChefPage = () => navigate(HOME_ROUTES.linkChefLandingPage);

//   return (
//     <div className="bg-[#17020C]">
//       <HomeNav
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
//         className="relative bg-bottom w-full bg-[#17020C] flex flex-col items-center justify-center"
//         style={{ height: "50rem" }}
//       >
//         <p className="text-5xl text-[#FBF6F6] font_bold text-center">
//           Homemade
//         </p>
//         <p className="text-5xl text-[#E85666] italic font_bold text-center">
//           tastes better.
//         </p>
//         <p className="my-3 text-xl text-[#B5ABB0] font_regular text-center">
//           Explore fresh homemade meals from verified <br /> home chefs and
//           restaurants around.
//         </p>
//         <Button
//           title="Explore meals"
//           extraClasses="w-40"
//           onClick={() => navigate(HOME_ROUTES.linkExplore)}
//         />
//         <Button
//           title="Buy a meal plan"
//           bgColor=" bg-[#4E0B2B]"
//           extraClasses="w-40 mt-3"
//           onClick={() => navigate(HOME_ROUTES.linkSubscription)}
//         />
//       </div>

//       {/* PACKAGES */}
//       <div
//         ref={howRef}
//         id="how-it-works"
//         className="mx-5 rounded-3xl p-8 lg:p-16 bg-[#090004]"
//       >
//         <h1 className="hidden lg:block text-4xl text-center text-white font_bold mb-10">
//           One package. <span className="text-[#DE505F]">All Homemade.</span>
//         </h1>
//         <h1 className="lg:hidden text-4xl text-center text-white font_bold mb-10">
//           One package. <br />{" "}
//           <span className="text-[#DE505F]">All Homemade.</span>
//         </h1>

//         <div className="flex flex-col lg:flex-row gap-6 mb-6">
//           <div className="relative lg:w-3/5 bg-[#270314] rounded-2xl p-8 overflow-hidden">
//             <p className="text-2xl text-white font_bold">
//               Homemade meals <br /> around.{" "}
//             </p>
//             <p className="py-5 text-base text-white font_regular">
//               Varieties of locally sourced, healthy & affordable <br /> fresh
//               meals around you, delivered to your doorstep.
//             </p>
//             <div
//               className="mt-16 w-36 p-2 bg-[#360B1B] rounded-full mr-4 flex items-center justify-center cursor-pointer"
//               onClick={() => navigate(HOME_ROUTES.linkExplore)}
//             >
//               <p className="whitespace-nowrap text-sm font_medium text-white text-center">
//                 Explore now
//               </p>
//               <div className="ml-2 w-4 h-4 rounded-full bg-[#E85666] flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="#ffffff"
//                   className="w-3 h-3"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="hidden lg:block absolute -bottom-1 -right-1 -0">
//               <img src="/images/explore-package.svg" alt="explore-package" />
//             </div>
//           </div>
//           <div className="relative lg:w-2/5 bg-[#E35362] rounded-2xl p-8 overflow-hidden">
//             <p className="text-2xl text-[#4E0B2B] font_bold">
//               Homemade <br /> monthly plan.{" "}
//             </p>
//             <p className="py-5 text-base text-white font_regular">
//               Starting from ₦ 9,000/month, enjoy your <br /> favourite meals
//               delivered to your door.
//             </p>
//             <div
//               className="mt-16 w-36 p-2 bg-[#CF4A58] rounded-full mr-4 flex items-center justify-center cursor-pointer"
//               onClick={() => navigate(HOME_ROUTES.linkSubscription)}
//             >
//               <p className="whitespace-nowrap text-sm font_medium text-white text-center">
//                 Subscribe now
//               </p>
//               <div className="ml-2 w-4 h-4 rounded-full bg-[#E85666] flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="#ffffff"
//                   className="w-3 h-3"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="hidden lg:block absolute -bottom-2 -right-1 -0">
//               <img src="/images/sub-package.svg" alt="sub-package" />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="relative lg:w-2/5 bg-[#4E0B2B] rounded-2xl p-8 overflow-hidden">
//             <p className="text-2xl text-white font_bold">
//               Homemade for Chefs
//               <br /> & Restaurants
//             </p>
//             <p className="py-5 text-base text-white font_regular">
//               Everything you need to earn more, work <br />
//               smarter and efficiently in one place.
//             </p>
//             <div
//               className="mt-16 w-36 p-2 bg-[#5A112F] rounded-full mr-4 flex items-center justify-center cursor-pointer"
//               onClick={() => navigate(HOME_ROUTES.linkChefLandingPage)}
//             >
//               <p className="whitespace-nowrap text-sm font_medium text-white text-center">
//                 Get started
//               </p>
//               <div className="ml-2 w-4 h-4 rounded-full bg-[#E85666] flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="#ffffff"
//                   className="w-3 h-3"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="hidden lg:block absolute -bottom-2 -right-1 -0">
//               <img src="/images/chef-package.svg" alt="chef-package" />
//             </div>
//           </div>
//           <div className="relative lg:w-3/5 bg-[#270314] rounded-2xl p-8 overflow-hidden">
//             <p className="text-2xl text-white font_bold">
//               Homemade for <br /> Companies.{" "}
//             </p>
//             <p className="py-5 text-base text-white font_regular">
//               Authentic Homemade meals as a benefit for <br /> employees to stay
//               efficient.
//             </p>
//             <div
//               className="mt-16 w-36 p-2 bg-[#360B1B] rounded-full mr-4 flex items-center justify-center cursor-pointer"
//               onClick={() => navigate(HOME_ROUTES.linkCompanies)}
//             >
//               <p className="whitespace-nowrap text-sm font_medium text-white text-center">
//                 Get started
//               </p>
//               <div className="ml-2 w-4 h-4 rounded-full bg-[#E85666] flex items-center justify-center">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="#ffffff"
//                   className="w-3 h-3"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <div className="hidden lg:block absolute -bottom-10 -right-1 -0">
//               <img src="/images/company-package.svg" alt="company-package" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <FoodSafety />

//       <Testimonials navigate={navigate} buttonClick={() => goToExplore()} />

//       <div className="foodsafety flex gap-x-6 overflow-hidden">
//         <h1 className="text-7xl lg:text-6xl font_bold text-[#4E0B2B]">
//           street love
//         </h1>
//         <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
//           street love
//         </h1>
//         <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
//           street love
//         </h1>
//       </div>
//       <Footer howref={howRef} />
//     </div>
//   );
// };

// export default CustomerLandingPage;
