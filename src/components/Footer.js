import React from "react";

const Footer = ({ logo }) => {
  return (
    <section className="bg-white w-3/5 mx-auto py-10">
      <div className="mt-10 lg:mt-0">
        <div className="lg:flex mt-16">
          <div className="lg:flex-1">
            <img className="w-48" src={logo} alt="dropp_logo" />
          </div>
          <div
            className="lg:flex lg:justify-between mt-10 lg:mt-0"
            style={{ flexGrow: 0.2 }}
          >
            <p className="font_bold text-base my-5 lg:my-0">
              2022 Dropp technologies. <br /> All rights reserved. <br />
              <a
                href="https://opposite-pet-88e.notion.site/Terms-of-Use-750a370ccc434a16b2b80c3f277f4968"
                target="_blank"
                rel="noreferrer"
                className="font_regular underline"
              >
                Terms of Use
              </a>
            </p>
            <p className="font_regular text-base my-5 lg:my-0">
              <span className="font_bold">Wanna talk? </span>
              <br />
              <a href="mailto:hello@getdropp.com" className="font_bold">
                hello@getdropp.com
              </a>
              <br />
              <a
                href="https://api.whatsapp.com/send?phone=+23408068424478&text=Hello, I have a question for Dropp https://paystack.shop/dropp"
                target="_blank"
                rel="noreferrer"
                className="font_bold"
              >
                +2349061494881
              </a>
            </p>
            <p className="font_regular text-base pb-10 lg:pb-0">
              <span className="font_bold">Follow Us</span>
              <br />
              <a
                href="https://www.instagram.com/getdropp/"
                target="_blank"
                rel="noreferrer"
                className="font_bold"
              >
                Instagram
              </a>
              <br />
              <a
                href="https://www.linkedin.com/company/getdropp/"
                target="_blank"
                rel="noreferrer"
                className="font_bold"
              >
                LinkedIn
              </a>
              <br />
              <a
                href="https://twitter.com/getdropp?s=11"
                target="_blank"
                rel="noreferrer"
                className="font_bold"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
