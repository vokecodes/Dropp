import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import TopNav from "../../components/landing-page/TopNav";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import Footer from "../../components/Footer";
import Testimonials from "../../components/landing-page/Testimonials";
import Navbar from "../../components/Navbar";
import { Images } from "../../config/images";

const TermsService = () => {
  const navigate = useNavigate();

  const goToExplore = () => {
    navigate(HOME_ROUTES.linkExplore);
    // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-white w-full m-0 p-0">
      {/* <TopNav
        textUrl={AUTH_ROUTES.linkChefSignUp}
        text="Home Chef"
        login="Login"
        // loginUrl="https://forms.gle/JZESyX6oGBMibewy6"
        // signUpUrl="https://forms.gle/JZESyX6oGBMibewy6"
        loginUrl={AUTH_ROUTES.linkChefLogin}
        signUpUrl={AUTH_ROUTES.linkChefSignUp}
      /> */}
      <Navbar />

      <div className="flex flex-col justify-center items-center lg:h-80 h-64 w-full bg_primary">
        <h2 className="mb-5 text-3xl text-white font_bold font-bold lg:text-7xl text-center">
          Terms of Service
        </h2>
      </div>

      <div className="w-11/12 lg:w-3/4 mx-auto mt-10 mb-20 p-0">

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Dropp, Inc.
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            A subsidiary of Dropp Technologies ("Dropp," "we," "us," "our") makes certain content available and/or provides its services (described below) to you through the Dropp website (the "Site") and through its mobile applications*, technology platform, and related services (collectively, such services, including any new features and applications, and the Site, the "Service"), subject to the following Terms of Service (as amended from time to time, the "Terms of Service"). These Terms of Service form a legally binding agreement ("the Agreement") between you and Dropp, its parents, subsidiaries, representatives, affiliates, officers, and directors governing your use of the Service. We reserve the right, at our sole discretion, to change or modify portions of these Terms of Service at any time. If we do this, we will post the changes on this page and will indicate on this page the date these terms were last revised. Any such changes will become effective immediately upon your acceptance of the modified Agreement. Your continued use of the Service after the date any such changes become effective constitutes your acceptance of the new Terms of Service. Unless material changes are made to the arbitration provisions herein, you agree that modification of this Agreement does not create a renewed opportunity to opt out of arbitration (if applicable). If you do not agree to abide by these or any future Terms of Service, do not use or access (or continue to use or access) the Service.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="mt-2 font-bold text-black text-base font_regular">
            PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT YOU SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL INDIVIDUAL ARBITRATION, AND FURTHER ;
            (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AGAINST DROPP ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING,
            (2) YOU WILL ONLY BE PERMITTED TO SEEK RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY RELIEF) ON AN INDIVIDUAL BASIS, AND
            (3) YOU MAY NOT HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN A COURT OF LAW. BY ACKNOWLEDGING THE TERMS OF SERVICE AND/OR USING THE DROPP SITE, YOU EXPRESSLY ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTAND AND AGREE WITHOUT LIMITATION OR QUALIFICATION, TO BE BOUND BY THIS AGREEMENT AND YOU ACCEPT ALL OF ITS TERMS.
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            In addition, when using certain services, you will be subject to any additional terms applicable to such services that may be posted on the Service from time to time, including, without limitation, the Privacy Policy located at <Link to={HOME_ROUTES.linkPrivacyPolicy} className="underline decoration-1">https://tryhomemade.app/privacy-policy/.</Link> Sellers are also subject to Seller Community Guidelines. All such terms are hereby incorporated by reference into and subject to these Terms of Service.
          </p>
        </div>
        
        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Description of the Service
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
          The Service is a technology platform that provides an online marketplace which enables connections between personal chefs, caterers and other individuals who wish to list, offer, sell, and deliver food items and meal orders ("Meal(s)") to customers who browse and purchase Meals. Users who purchase Meals through the Service are "Customer(s)," and users who list, prepare and sell Meals through the Service are "Seller(s)." A user may be both a Customer and Seller. All purchases are made directly (and any contract for purchase and sale is) between the Customer and Seller.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Dropp offers a marketplace
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            It is not itself a Seller and is not preparing, packaging, or selling any food. The Service includes enabling users to connect with each other and related services, but we are not a party to any purchase or sales transaction. To encourage return use of the Service, Dropp may also help facilitate the resolution of disputes between Customers and Sellers, but Dropp has no control over and does not guarantee (a) the existence, quality, safety, authenticity, or legality of Meals offered or sold on the Service; (b) the truth or accuracy of a Seller's content or listings on the Service; (c) the ability of a Seller to sell Meals through the Service and deliver Meals within required delivery windows; (d) the ability of Customers to pay for Meals purchased through the Service; or (e) that a Customer or Seller will actually complete a transaction, effectuate trouble-free delivery and shipping, or return a Meal through the Service. 
          </p>
          
          <p className="font-normal text-black text-base font_regular">
            Sellers are independent business owners and independent contractors to Customers and not employees, partners, representatives, agents, joint venturers, or franchisees of Dropp. Dropp does not cook, package or deliver food and does not employ people to cook, package or deliver food. 
          </p>
          
          <p className="font-normal text-black text-base font_regular">
            Each Seller is solely responsible for complying with all applicable laws, rules and regulations and standards, including but not limited to those pertaining to the preparation, sale, marketing, packaging, handling, and delivery of all Meals ordered through Dropp, and updating details and prices relating to the Meals offered. Each Seller is solely liable for the quality, safety, and freshness of its products, and Dropp does not verify the credentials, representations, products, services, or prices offered by any Sellers, and does not guarantee the quality of the product or services, or that Sellers or Meals comply with applicable laws. Dropp will not be liable or responsible for any Meals provided by Sellers that are a cause of injury or that do not meet your expectations in any manner. 
          </p>
          
          <p className="font-normal text-black text-base font_regular">
            Depending on the region/location, Dropp may enter into agreements with third party independent contractors (each a "Delivery Company") to provide delivery services under certain circumstances if desirable by individual Sellers or Customers. If a Seller or Customer chooses to use a Delivery Partner to deliver a Meal, Dropp is not offering such delivery services and has no responsibility or liability for the actions or inactions of any Delivery Partner. Dropp will not be liable or responsible for any delivery services provided by a Delivery Partners or any errors or misrepresentations made by them. Delivery Partners are required to comply with all applicable laws, rules and regulations.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Access to the Service
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            You may be required to register with Dropp in order to access and use certain features of the Service. If you choose to register for the Service, you agree to provide and maintain true, accurate, current and complete information about yourself as prompted by the Service's registration form. Registration data and certain other information about you are governed by our Privacy Policy. The Service is available only to individuals who can form legally binding contracts under applicable law. Without limiting the foregoing, the Service is not available to minors (people under the age of 18 in their state or province of residence) or to temporarily or permanently suspended users of the Service (both Customers and Sellers). If you do not qualify, please do not use the Service. Additionally, Dropp reserves the right to refuse access to, or use of the Service to, anyone who breaches these Terms of Service or for the reasons related to the safety of the Dropp Community including Dropp Users, employees, or prospective Users. Except as expressly authorized otherwise by Dropp, you are only authorized to create and use one account for the Service and are prohibited from using alter egos or other disguised identities when using the Service. You are responsible for maintaining the confidentiality of your password and account, if any, and are fully responsible for any and all activities that occur under your password or account. You agree to (a) immediately notify Dropp of any unauthorized use of your password or account or any other breach of security, and (b) ensure that you exit from your account at the end of each session when accessing the Service. Dropp will not be liable for any loss or damage arising from your failure to comply with this Section. 
          </p>

          <p>
            Dropp reserves the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Dropp shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service. You acknowledge that Dropp may establish general practices and limits concerning use of the Service. You agree that Dropp has no responsibility or liability for the deletion or failure to store any data or other content maintained or transmitted by the Service. You acknowledge that Dropp reserves the right to terminate accounts that are inactive for an extended period of time. You further acknowledge that Dropp reserves the right to change these general practices and limits at any time, in its sole discretion, with or without notice. 
          </p>
          
          <p>
            The Service may include certain services that are available via a mobile device, including (i) the ability to upload content (including Meal options or Seller or Customer information) to the Service via a mobile device, (ii) the ability to browse the Service and the Site from a mobile device and (iii) the ability to access certain features through an application downloaded and installed on a mobile device (collectively, the "Mobile Services"). To the extent you access the Service through a mobile device, your wireless service carrier's standard charges, data rates and other fees may apply. In addition, downloading, installing, or using certain Mobile Services may be prohibited or restricted by your carrier, and not all Mobile Services may work with all carriers or devices. In the event you change or deactivate your mobile telephone number, you agree to promptly update your Shef account information to ensure that your messages are not sent to the person that acquires your old number. You acknowledge and agree that your use of the Service must be in accordance with the usage rules established by your mobile device platform or service provider. By registering for and using the Service, including the Mobile Services, and providing your contact information, you are consenting to be contacted by Shef for marketing and/ or transactional purposes by telephone, text message (which may be automated), email, fax, or other means. By using the Mobile Services, you also agree that Dropp may communicate with you by any electronic means to your mobile device and that certain information about your usage of the Mobile Services may be communicated to us. In the event you no longer want to receive communications from Dropp, you agree to notify Dropp directly. You may opt-out of text messages by texting STOP in response to any text message you receive from us and for calls, you may instruct the caller that you are opting out during any call you receive from us. You may also adjust your notification settings on the Notification page in your account settings. If you unsubscribe from our marketing lists, you will no longer receive marketing communications, but we may still contact you (including by text message) regarding management of your account, other administrative matters and to respond to your requests.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Conditions of Use; Acceptable Use
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            You are solely responsible for all descriptions, pictures, listings, information, data, text, music, sound, graphics, video, messages, or other materials ("content") that you upload, post, publish, or display (hereinafter, "upload") or email or otherwise send via the Service. You are also solely responsible for the manner in which you access and use the Service. Shef reserves the right to investigate and take appropriate legal action against anyone who, in Dropp's sole discretion, violates this provision, including without limitation, removing offending content from the Service, suspending or terminating the account of such violators, and reporting you to the law enforcement authorities. The following are examples of the kind of content and/or use of the Service that is illegal and/or prohibited by Shef. You agree not to use the Service to: 
          </p>
          <p className="mt-2 font-normal text-black text-base font_regular">
            a) sell, post or otherwise transmit any content or information that (i) is unlawful, harmful, threatening, abusive, harassing, tortious, excessively violent, defamatory, vulgar, obscene, pornographic, libelous, invasive of another‘s privacy, hateful, or otherwise objectionable; (ii) you do not have a right to sell or transmit under law or under contractual or fiduciary relationships; (iii) poses or creates a privacy or security risk to any person; (iv) infringes any intellectual property or other proprietary rights of any party; (v) constitutes unsolicited, unauthorized, or misleading advertising, promotional materials, commercial activities and/or sales, "junk mail," "spam," "contests," "sweepstakes," or any other form of solicitation; (vi) contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment; or (vii) in the sole judgment of Shef, is objectionable or which restricts or inhibits any other person from using or enjoying the Service, or which may expose Shef or its users to any harm or liability of any type; b) impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity; c) solicit personal information from anyone under the age of 18; d) harvest or collect email addresses or other contact information of other users from the Service or the Site by electronic or other means for the purposes of sending unsolicited emails or other unsolicited communications; e) advertise or offer to sell or buy any goods or services other than Meals intended to be prepared, sold and purchased through the Service; f) use the Service to request, make or accept a Meal independent of the Service, to circumvent any fees that would otherwise apply to such transaction; g) interfere with or disrupt the Service or servers or networks connected to the Service, or disobey any requirements, procedures, policies or regulations of networks connected to the Service; h) violate any applicable local, state, national or international law, or any regulations having the force of law; i) engage in any activities that violate the Telephone Consumer Protection Act, 47 U.S.C. § 227 et seq. and its regulations at 47 C.F.R. § 64.1200; the Do-Not-Call Implementation Act, 15 U.S.C. § 6101 et seq.; or any similar anti-spam, data protection, or privacy legislation in any jurisdiction; j) further or promote any criminal activity or enterprise or provide instructional information about illegal activities; or k) obtain or attempt to access or otherwise obtain any materials or information through any means not intentionally made available or provided for through the Service.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Ingredients and Allergens
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            For any Meal and related content posted using the Service, a Seller is required to provide a comprehensive list of ingredients contained in or otherwise used to prepare the Meal, including any known allergens. Dropp is not responsible for the accuracy of the information and labeling of Meals delivered to Customers. Customers should be advised that Meals may be prepared in facilities using the same equipment that is used to prepare Meals containing other allergens even if the allergen is marked as being absent from the food. You should not use this service if you have food allergies. Dropp shall not be liable for any illness, health problem, or other damages that may result from any order or consumption of any Meals and related items purchased through the Service.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Seller Insurance
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            Dropp maintains insurance for its own business operations, but it does not maintain insurance for the actions of Sellers or Customers. If you are a Seller, Dropp recommends that you obtain appropriate insurance to cover the operation of your food facility and the preparation and delivery of Meals. Please review any respective insurance policy carefully, and in particular make sure that you are familiar with and understand any exclusions to, and any deductibles that may apply for, such insurance policy, including, but not limited to, whether or not your insurance policy will cover the actions or inactions of Customers or any third-party service.
          </p>
        </div>

        <div className="mb-5 mx-0">
          <p className="text-black text-2xl font_bold">
            Customer Review Guidelines
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            To the extent you are a Customer, Shef may allow you to upload content and leave reviews regarding your purchase of Meals. Dropp may accept, reject or remove reviews and any associated content in its sole discretion. Dropp has absolutely no obligation to screen or to delete reviews or associated content, even if anyone considers reviews objectionable or inaccurate. Those Customers posting reviews should comply with the following criteria: (1) reviewers should have firsthand experience with the person/entity being reviewed; (2) reviews should not contain: offensive language, profanity, or abusive, racist, or hate language; discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation or disability; or references to illegal activity; (3) reviewers should not be affiliated with competitors if posting negative reviews; (4) reviewers should not make any conclusions as to the legality of conduct;; and (5) reviewers may not post any false statements or organize a campaign encouraging others to post reviews, whether positive or negative. Reviews are not endorsed by Dropp, and do not represent the views of Dropp or of any affiliate or partner of Dropp. Dropp does not assume liability for any review or for any claims, liabilities or losses resulting from any review. Any review you post will be considered User Content (as defined below).
          </p>
        </div>

      </div>

      <Testimonials buttonClick={() => goToExplore()} />

      <Footer logo={Images.logo} />
    </div>
  );
};

export default TermsService;
