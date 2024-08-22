import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import FoodSafety from "../../components/landing-page/FoodSafety";
import Footer from "../../components/landing-page/Footer";
import Testimonials from "../../components/landing-page/Testimonials";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import HomeNav from "../../components/landing-page/HomeNav";

const CompaniesLandingPage = () => {
  const navigate = useNavigate();
  const howRef = useRef(null);

  const goToExplore = () => {
    navigate(HOME_ROUTES.linkExplore);
    // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
  };

  return (
    <div className="bg-[#17020C]">
      <HomeNav
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
        className="relative bg-bottom w-full bg-[#17020C] flex flex-col items-center justify-center pt-10 pb-32"
        style={{ height: "50rem" }}
      >
        <p className="lg:hidden mt-64 text-5xl text-[#FBF6F6] font_bold text-center">
          Homemade meals as a
        </p>
        <p
          className="hidden lg:block text-5xl text-[#FBF6F6] font_bold text-center"
          style={{ marginTop: "36rem" }}
        >
          Homemade meals as a
        </p>
        <p className="text-5xl text-[#E85666] italic font_bold text-center">
          benefit for employees.
        </p>
        <p className="my-3 text-xl text-[#B5ABB0] font_regular text-center">
          Meal plans for your employees as a <br /> benefit or reward for
          performance
        </p>
        <Button
          title="Get started"
          extraClasses="w-60"
          showIcon
          onClick={() => navigate(AUTH_ROUTES.auth)}
        />
        <div className="my-10 lg:my-20 flex justify-center">
          <img
            src="/images/companies-hero.svg"
            alt="companies-hero"
            className="w-3/4"
          />
        </div>
      </div>

      {/* PACKAGES */}
      <div ref={howRef} id="how-it-works" className="lg:mt-64 mx-5 p-8 lg:p-16">
        <h1 className="hidden lg:block text-4xl text-center text-white font_bold mb-10">
          Why companies{" "}
          <span className="text-[#DE505F] italic font_regular">
            love homemade.
          </span>
        </h1>
        <h1 className="lg:hidden text-4xl text-center text-white font_bold mb-10">
          Why companies <br />{" "}
          <span className="text-[#DE505F] italic font_regular">
            love homemade.
          </span>
        </h1>

        <div className="my-10 bg-[#FFC09C] flex items-center justify-between rounded-2xl overflow-hidden">
          <div className="">
            {/* <img src="/images/company-package.svg" alt="company-package" /> */}
          </div>
          <div className="p-8">
            <p className="text-2xl text-[#0A0A0A] font_bold">
              Make your team 91% <br />
              more efficient
            </p>
            <p className="py-5 text-base text-[#0A0A0A] font_regular">
              Homemade is the first legal marketplace that connects <br />
              home meal lovers to verified homechefs around them.
            </p>
          </div>
        </div>

        <div className="bg-[#210311] flex items-center justify-between rounded-2xl overflow-hidden">
          <div className="p-8">
            <p className="text-2xl text-white font_bold">
              Explore new <br /> experiences.{" "}
            </p>
            <p className="py-5 text-base text-white font_regular">
              Your employees can reconnect with their local <br /> favourites or
              explore new cultures.
            </p>
          </div>
          <div className="">
            {/* <img src="/images/company-package.svg" alt="company-package" /> */}
          </div>
        </div>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-[#FFA67A] rounded-2xl p-8 overflow-hidden">
            <img
              src="/images/unlimited-companies.svg"
              alt="unlimited-companies"
              className="my-4"
            />
            <p className="text-2xl text-[#210311] font_bold">
              Unlimited authentic <br />
              meal options.
            </p>
            <p className="py-5 text-base text-[#210311] font_medium">
              Homemade is the first legal marketplace that connects home meal
              lovers to verified homechefs around them.
            </p>
          </div>
          <div className="relative bg-[#E85666] rounded-2xl overflow-hidden">
            <img src="/images/floating-money.svg" alt="unlimited-companies" />
            <div className="p-8">
              <p className="text-2xl text-white font_bold">
                Spend less with <br /> Homemade!
              </p>
              <p className="py-5 text-base text-white font_medium">
                Pay only for used meal credits.
              </p>
            </div>
          </div>
        </div>

        <div className="my-10 flex justify-center">
          <Button
            title="Get started"
            extraClasses="w-60"
            showIcon
            onClick={() => navigate(AUTH_ROUTES.auth)}
          />
        </div>
      </div>

      <div className="mt-10 mx-5 lg:p-8">
        <h1 className="text-2xl lg:text-4xl text-center text-white font_bold mb-10">
          One dashboard to{" "}
          <span className="text-[#DE505F] italic font_regular">manage</span>{" "}
          <br />
          <span className="text-[#DE505F] italic font_regular">
            everything with ease
          </span>
        </h1>

        <div className="my-10 lg:w-4/5 mx-auto">
          <img src="/images/dashboard.svg" alt="dashboard" className="w-full" />
        </div>
      </div>

      <FoodSafety />

      <Testimonials navigate={navigate} buttonClick={() => goToExplore()} />

      <div className="foodsafety flex gap-x-6 overflow-hidden">
        <h1 className="text-7xl lg:text-6xl font_bold text-[#4E0B2B]">
          street love
        </h1>
        <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
          street love
        </h1>
        <h1 className="hidden lg:text-6xl font_bold text-[#4E0B2B]">
          street love
        </h1>
      </div>
      <Footer howref={howRef} />
    </div>
  );
};

export default CompaniesLandingPage;

// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../../components/Button";
// import FoodSafety from "../../components/landing-page/FoodSafety";
// import Footer from "../../components/landing-page/Footer";
// import Testimonials from "../../components/landing-page/Testimonials";
// import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
// import HomeNav from "../../components/landing-page/HomeNav";

// const CompaniesLandingPage = () => {
//   const navigate = useNavigate();
//   const howRef = useRef(null);

//   const goToExplore = () => {
//     navigate(HOME_ROUTES.linkExplore);
//     // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
//   };

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
//         className="relative bg-bottom w-full bg-[#17020C] flex flex-col items-center justify-center pt-10 pb-32"
//         style={{ height: "50rem" }}
//       >
//         <p className="lg:hidden mt-64 text-5xl text-[#FBF6F6] font_bold text-center">
//           Homemade meals as a
//         </p>
//         <p
//           className="hidden lg:block text-5xl text-[#FBF6F6] font_bold text-center"
//           style={{ marginTop: "36rem" }}
//         >
//           Homemade meals as a
//         </p>
//         <p className="text-5xl text-[#E85666] italic font_bold text-center">
//           benefit for employees.
//         </p>
//         <p className="my-3 text-xl text-[#B5ABB0] font_regular text-center">
//           Meal plans for your employees as a <br /> benefit or reward for
//           performance
//         </p>
//         <Button
//           title="Get started"
//           extraClasses="w-60"
//           showIcon
//           onClick={() => navigate(AUTH_ROUTES.auth)}
//         />
//         <div className="my-10 lg:my-20 flex justify-center">
//           <img
//             src="/images/companies-hero.svg"
//             alt="companies-hero"
//             className="w-3/4"
//           />
//         </div>
//       </div>

//       {/* PACKAGES */}
//       <div ref={howRef} id="how-it-works" className="lg:mt-64 mx-5 p-8 lg:p-16">
//         <h1 className="hidden lg:block text-4xl text-center text-white font_bold mb-10">
//           Why companies{" "}
//           <span className="text-[#DE505F] italic font_regular">
//             love homemade.
//           </span>
//         </h1>
//         <h1 className="lg:hidden text-4xl text-center text-white font_bold mb-10">
//           Why companies <br />{" "}
//           <span className="text-[#DE505F] italic font_regular">
//             love homemade.
//           </span>
//         </h1>

//         <div className="my-10 bg-[#FFC09C] flex items-center justify-between rounded-2xl overflow-hidden">
//           <div className="">
//             {/* <img src="/images/company-package.svg" alt="company-package" /> */}
//           </div>
//           <div className="p-8">
//             <p className="text-2xl text-[#0A0A0A] font_bold">
//               Make your team 91% <br />
//               more efficient
//             </p>
//             <p className="py-5 text-base text-[#0A0A0A] font_regular">
//               Homemade is the first legal marketplace that connects <br />
//               home meal lovers to verified homechefs around them.
//             </p>
//           </div>
//         </div>

//         <div className="bg-[#210311] flex items-center justify-between rounded-2xl overflow-hidden">
//           <div className="p-8">
//             <p className="text-2xl text-white font_bold">
//               Explore new <br /> experiences.{" "}
//             </p>
//             <p className="py-5 text-base text-white font_regular">
//               Your employees can reconnect with their local <br /> favourites or
//               explore new cultures.
//             </p>
//           </div>
//           <div className="">
//             {/* <img src="/images/company-package.svg" alt="company-package" /> */}
//           </div>
//         </div>

//         <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="relative bg-[#FFA67A] rounded-2xl p-8 overflow-hidden">
//             <img
//               src="/images/unlimited-companies.svg"
//               alt="unlimited-companies"
//               className="my-4"
//             />
//             <p className="text-2xl text-[#210311] font_bold">
//               Unlimited authentic <br />
//               meal options.
//             </p>
//             <p className="py-5 text-base text-[#210311] font_medium">
//               Homemade is the first legal marketplace that connects home meal
//               lovers to verified homechefs around them.
//             </p>
//           </div>
//           <div className="relative bg-[#E85666] rounded-2xl overflow-hidden">
//             <img src="/images/floating-money.svg" alt="unlimited-companies" />
//             <div className="p-8">
//               <p className="text-2xl text-white font_bold">
//                 Spend less with <br /> Homemade!
//               </p>
//               <p className="py-5 text-base text-white font_medium">
//                 Pay only for used meal credits.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="my-10 flex justify-center">
//           <Button
//             title="Get started"
//             extraClasses="w-60"
//             showIcon
//             onClick={() => navigate(AUTH_ROUTES.auth)}
//           />
//         </div>
//       </div>

//       <div className="mt-10 mx-5 lg:p-8">
//         <h1 className="text-2xl lg:text-4xl text-center text-white font_bold mb-10">
//           One dashboard to{" "}
//           <span className="text-[#DE505F] italic font_regular">manage</span>{" "}
//           <br />
//           <span className="text-[#DE505F] italic font_regular">
//             everything with ease
//           </span>
//         </h1>

//         <div className="my-10 lg:w-4/5 mx-auto">
//           <img src="/images/dashboard.svg" alt="dashboard" className="w-full" />
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

// export default CompaniesLandingPage;
