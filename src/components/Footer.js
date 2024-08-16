import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ logo }) => {
  return (
    <div className="bg-[#24412C]">
      <div className="relative lg:pt-60">
        <div className="w-4/5 mx-auto flex flex-col lg:flex-row justify-center gap-y-10 py-14">
          <div className="w-full lg:mr-20">
            <Link to="/">
              <span className="sr-only">Dropp</span>
              <img className="h-6 w-auto" src="/images/logo-white.svg" alt="" />
            </Link>
            <div>
              <p className="hidden lg:block text-base text-white font_bold mt-3">
                {new Date().getFullYear()} ©️ Roseto Labs Limited. All rights
                reserved.
              </p>
              <p className="lg:hidden text-base text-white font_bold mt-3">
                {new Date().getFullYear()} ©️ Roseto Labs Limited. <br /> All
                rights reserved.
              </p>
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-white text-lg font_bold">Products</h1>
            <p className="text-base text-white font_regular mt-3">
              Ordering tools
            </p>
            <p className="text-base text-white font_regular mt-3">
              Restaurant operations tools
            </p>
            <p className="text-base text-white font_regular mt-3">
              Marketing tools
            </p>
            <p className="text-base text-white font_regular mt-3">
              Analytics & Insight
            </p>
          </div>

          <div className="w-full">
            <h1 className="text-white text-lg font_bold">Legal</h1>
            <Link to="#">
              <p className="text-base text-white font_regular mt-3">
                Terms of use
              </p>
            </Link>
            <Link to="#">
              <p className="text-base text-white font_regular mt-3">
                Privacy policy
              </p>
            </Link>
          </div>
          <div className="w-full">
            <h1 className="text-white text-lg font_bold">Contact</h1>
            <a
              href="https://api.whatsapp.com/send?phone=+2348068424478&text=Hello, I have a question for Dropp https://paystack.shop/dropp"
              target="_blank"
              rel="noreferrer"
              className="text-base text-white font_regular mt-3"
            >
              +2348068424478
            </a>
            <p className="text-base text-white font_regular mt-3">
              hello@getdropp.com
            </p>
          </div>
          <div className="w-full">
            <h1 className="text-white text-lg font_bold">Social media</h1>
            <a
              href="https://www.linkedin.com/company/getdropp"
              target="_blank"
              rel="noreferrer"
              className="block text-base text-white font_regular mt-3"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/getdropp/"
              target="_blank"
              rel="noreferrer"
              className="block text-base text-white font_regular mt-3"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/getdropp?s=11"
              target="_blank"
              rel="noreferrer"
              className="block text-base text-white font_regular mt-3"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>

    // <section className="bg-white w-3/5 mx-auto py-10">
    //   <div className="mt-10 lg:mt-0">
    //     <div className="lg:flex mt-16">
    //       <div className="lg:flex-1">
    //         <img className="w-48" src={logo} alt="dropp_logo" />
    //       </div>
    //       <div
    //         className="lg:flex lg:justify-between mt-10 lg:mt-0"
    //         style={{ flexGrow: 0.2 }}
    //       >
    //         <p className="font_bold text-base my-5 lg:my-0">
    //           2022 Dropp technologies. <br /> All rights reserved. <br />
    //           <a
    //             href="https://opposite-pet-88e.notion.site/Terms-of-Use-750a370ccc434a16b2b80c3f277f4968"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="font_regular underline"
    //           >
    //             Terms of Use
    //           </a>
    //         </p>
    //         <p className="font_regular text-base my-5 lg:my-0">
    //           <span className="font_bold">Wanna talk? </span>
    //           <br />
    //           <a href="mailto:hello@getdropp.com" className="font_bold">
    //             hello@getdropp.com
    //           </a>
    //           <br />
    //           <a
    //             href="https://api.whatsapp.com/send?phone=+23408068424478&text=Hello, I have a question for Dropp https://paystack.shop/dropp"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="font_bold"
    //           >
    //             +2349061494881
    //           </a>
    //         </p>
    //         <p className="font_regular text-base pb-10 lg:pb-0">
    //           <span className="font_bold">Follow Us</span>
    //           <br />
    //           <a
    //             href="https://www.instagram.com/getdropp/"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="font_bold"
    //           >
    //             Instagram
    //           </a>
    //           <br />
    //           <a
    //             href="https://www.linkedin.com/company/getdropp/"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="font_bold"
    //           >
    //             LinkedIn
    //           </a>
    //           <br />
    //           <a
    //             href="https://twitter.com/getdropp?s=11"
    //             target="_blank"
    //             rel="noreferrer"
    //             className="font_bold"
    //           >
    //             Twitter
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Footer;
