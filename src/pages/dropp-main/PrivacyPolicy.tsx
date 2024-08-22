import React from "react";
import { useNavigate, Link } from "react-router-dom";
import TopNav from "../../components/landing-page/TopNav";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import Footer from "../../components/landing-page/Footer";
import Testimonials from "../../components/landing-page/Testimonials";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const goToExplore = () => {
    navigate(HOME_ROUTES.linkExplore);
    // window.open("https://forms.gle/jZNVL3Xt7S3CS9gj8");
  };

  return (
    <div className="bg-white">
      <TopNav
        textUrl={AUTH_ROUTES.linkChefSignUp}
        text="Home Chef"
        login="Login"
        // loginUrl="https://forms.gle/JZESyX6oGBMibewy6"
        // signUpUrl="https://forms.gle/JZESyX6oGBMibewy6"
        loginUrl={AUTH_ROUTES.linkChefLogin}
        signUpUrl={AUTH_ROUTES.linkChefSignUp}
      />

      <div className="flex flex-col justify-center items-center lg:h-80 h-64 w-full break-words" style={{ backgroundColor: `#4E0B2B`, }}>
        <h2 className="mb-5 text-3xl text-white font_bold font-bold lg:text-7xl text-center">
          Privacy Policy
        </h2>
      </div>

      <div className="w-11/12 lg:w-3/4 mx-auto mt-10 mb-20">

        <div className="mb-5">
          <p className="text-black text-2xl font_bold">
            Homemade, Inc.
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
            Welcome to the website (the “Site”) of Homemade, Inc. (“Homemade,” “we,” “us,” or “our”). Homemade provides an online marketplace in which Sellers (defined below) can list, offer, sell and deliver food items and meal orders to the general public, and customers can browse and purchase Meals (collectively, including the Site and any related mobile applications, the “Service”). This Privacy Policy explains what information we collect, how we use and share that data, and your choices concerning our data practices. Before using the Service or submitting any information to Homemade, please review this Privacy Policy carefully and contact us at <a href="mailto:hello@getdropp.com" className="underline decoration-1">hello@getdropp.com</a> if you have any questions. By using the Service, you agree to our <Link to={HOME_ROUTES.linkTermsService} className="underline decoration-1 font-semibold" style={{ color: `#E85666`, }}>Terms of Service</Link> and the practices described in this Privacy Policy. If you do not agree to this Privacy Policy and our Terms of Service, please do not access the Site or otherwise use the Service.
          </p>
        </div>

        <div className="mb-5">
          <p className="mt-2 text-black text-2xl font_bold">
            1. INFORMATION WE COLLECT
          </p>
          <p className="mt-2 font-normal text-black text-base font_regular">
            We collect information as follows:
          </p>
          <p className="mt-2 font-normal text-black text-base font_regular">
            Information You Provide: We collect information that you provide to Homemade when (i) filling out or updating required and optional profile information when signing up for and using the Service, (ii) contacting us by email, (iii) filling out a contact form on the Service; (iv) making a purchase; (v) participating in a promotion; or (vi) applying for a job. The information collected during these interactions may vary based on what you choose to share with us, but it will generally include name, e-mail address, telephone number, account credentials, demographic data (such as gender, race, and country), your delivery address, other profile data (such as your preferences and favorites), employment data (such as your employment and education history, transcripts, and references as necessary to consider you for open positions), the content of any message you send to us or reviews and feedback you submit about Sellers’ Meals that may be publicly posted on the Service at Seller’s discretion, and the financial information necessary to ensure payments can be processed by our payment processor Payment, Inc. (“Paystack”). Accordingly, in addition to this Privacy Policy and our Terms of Service, information related to your purchases is also processed according to Paystack's services agreement and privacy policy. We collect the content within any messages exchanged between users and Sellers through the Service (such as if you use our chat functionality). Information We Collect Through Our Social Media Pages and Chatbots: We have pages on social media sites like Instagram, Twitter, LinkedIn, and TikTok(“Social Media Pages”). When you interact with our Social Media Pages (e.g., through our chatbot on Twitter), we will collect the information that you provide to us, such as your contact details. Also, if you publicly reference our Service on social media (e.g., by using a hashtag associated with Homemade in a tweet or post), we may use your reference on or in connection with our Service. In addition, the companies that host our Social Media Pages may provide us with aggregate information and analytics regarding the use of our Social Media Pages. Information We Collect When You Log-in Through Social Media: We may embed a pixel or SDK on our Service that allows you to log-in to your Homemade account through social media. If you choose to engage with such integration, we may receive information from the social media platform that you have authorized to share with us. Please note that the social media platform may independently collect information about you through the integrationInformation We Receive Automatically From Your Use of the Service: When you visit, use and interact with the Service, we may receive certain information about your visit, use or interactions. For example, we may monitor the number of people that visit the Service, peak hours of visits, which page(s) you visit, which links you click, what text you enter, how your mouse moves around the Service, the domains you come from (e.g., google.com, facebook.com, etc.), and which browsers you use to access the Service (e.g., Google Chrome, Firefox, Microsoft Internet Explorer, etc.), broad geographical information (such as location derived from an IP address or data that indicates a city or postal code level) and precise location data (such as latitude/longitude data when you enter you address for a Meal delivery), and navigation patterns. In particular, the following information is created and automatically logged in our systems: 
          </p>

          <ol  className="mt-2 font-normal text-black text-base font_regular mx-10">
            <li>
              <span className="font-bold">&bull;&nbsp;Log data:</span> Information that your browser automatically sends whenever you visit the Site (“log data”). Log data includes your Internet Protocol address, browser type and settings, the date and time of your request, and how you interacted with the Site.
            </li>

            <li>
              <span className="font-bold">&bull;&nbsp;Device information:</span> Includes name of the device, operating system, internet service provider, your device’s regional and language settings, device identifiers (e.g., IP address), and browser you are using. Information collected may depend on the type of device you use and its settings.
            </li>

            <li>
              <span className="font-bold">&bull;&nbsp;Usage Information:</span> We collect information about how you use our Service, such as the types of content that you view or engage with, the features you use, the actions you take (including the Meals you view and purchase), the emails you view, and the time, frequency and duration of your activities.
            </li>
          </ol>
          
          <p className="mt-2 font-normal text-black text-base font_regular">
            Information We Receive from Other Sources: We collect information from (i) data brokers, from which we purchase data to supplement the data we collect; (ii) partners, who offer co-branded services, sell or distribute our products and services, or engage in joint marketing activities; and (iii) publicly-available sources, including data in the public domain.
          </p>
          
          <p className="mt-2 font-normal text-black text-base font_regular">
            Information We Collect if You use the Service as a Seller: If you sign up to be a Seller on the Service, we collect information about you such as your first and last name, email address, telephone number, postal address, health code enforcement agency permit number (where applicable), government issued I.D. (such as a driver’s license), demographic data, account credentials, financial information, and other information collected by our service provider(s) who assist with providing the Service for Sellers. We use this information to create and administer your Shef account and facilitate communications between you and individuals who purchase Meals from you through the Service.
          </p>

          <p className="mt-2 font-normal text-black text-base font_regular">
          <span className="font-black">Cookies:</span> We use cookies to operate and administer our Site, gather Usage Information on our Site, support security features, bring you advertising off the Service, and improve your experience on it. A “cookie” is a piece of information sent to your browser by a website you visit. Cookies can be stored on your computer for different periods of time. Some cookies expire after a certain amount of time, or upon logging out (session cookies), others survive after your browser is closed until a defined expiration date set in the cookie (as determined by the party placing it), and help recognize your computer when you open your browser and browse the Internet again (persistent cookies). For more details on cookies please visit www.allaboutcookies.org.
          </p>
          <p className="mt-2 font-normal text-black text-base font_regular">
            <span className="font-black">Pixels:</span> We use pixels (also known as web beacons), which is code embedded in a website, video, email, or advertisement, to send information about your use of the Service to a server. There are various types of pixels, including image pixels (which are small graphic images) and JavaScript pixels (which contains JavaScript code). When you access a website, video, email, or advertisement that contains a pixel, the pixel may permit us or a separate entity to drop or read cookies on your browser. Pixels are used in combination with cookies to track activity by a particular browser on a particular device. We may incorporate pixels from separate entities, including Facebook and GetEmail, that allow us to track our conversions, bring you advertising off the Service (such as by associating an email address with the browser or device used to access the Service), and provide you with additional functionality, such as the ability to connect our Service with your social media account. Analytics: We use analytics services, such as Google Analytics, a web analytics service provided by Google, Inc. (“Google”). These analytics services use cookies to help us analyze how users use the Site and enhance your experience when you use the Site. For more information on how Google uses this data, go to <a href="https://www.google.com/policies/privacy/partners/"  className="underline decoration-1">www.google.com/policies/privacy/partners/</a>. To opt out of the use of certain information collected by Google Analytics visit <a href="https://tools.google.com/dlpage/gaoptout"  className="underline decoration-1">https://tools.google.com/dlpage/gaoptout</a> and <a href="https://www.google.com/settings/ads/onweb/"  className="underline decoration-1">https://www.google.com/settings/ads/onweb/</a> for Google Analytics for Display Advertising or the Google Display Network at. Online Tracking and Do Not Track Signals: We and our analytics and advertising providers, including Facebook, may use cookies, pixels or other tracking technologies to collect information about your browsing activities over time and across different websites following your use of the Site and use that information to send targeted advertisements. For example, we place ads through Google and Facebook that you may view on their platforms as well as on other websites and services.
          </p>

        </div>
        
        
        <div className="mb-5">
          <p className="mt-2 text-black text-2xl font_bold">
            2. HOW WE USE INFORMATION
          </p>
          <p className="mt-2 font-normal text-black text-base font_regular">
            We collect and use information for business and commercial purposes in accordance with the practices described in this Privacy Policy. We use the information we collect for the following business purposes: 
          </p>
          
          <ol className="mt-2 font-normal text-black text-base font_regular mx-10">
            <li>&bull;&nbsp;To provide the Service, including the online marketplace in which Sellers can sell food items and meal orders to customers (each, a “Meal”) and customers can rate and provide feedback on those Meals; </li>

            <li>&bull;&nbsp;To respond to your inquiries, comments, feedback or questions; </li>
            
            <li>&bull;&nbsp;To facilitate your orders on the Service;</li>

            <li>&bull;&nbsp;To send administrative information to you, for example, information regarding the Service, requests for feedback, and changes to our terms, conditions, and policies;</li>

            <li>&bull;&nbsp;To analyze how you interact with our Service;</li>

            <li>&bull;&nbsp;To maintain and improve the content and functionality of the Service and other Shef websites, apps, marketing efforts, products, and services;</li>

            <li>&bull;&nbsp;To develop new products and services;</li>

            <li>&bull;&nbsp;To prevent fraud, criminal activity, or misuses of our Service, breach of our policies and terms, and to ensure the security of our IT systems, architecture and networks;</li>

            <li>&bull;&nbsp;To conduct promotions, including verifying your eligibility and if applicable, delivering prizes in connection with your entries.</li>

            <li>&bull;&nbsp;To comply with legal obligations and legal process and to protect our rights, privacy, safety or property, and/or that of our affiliates, you or other third parties;</li>

            <li>&bull;&nbsp;To fulfil any other purpose at your direction; and With notice to you and your consent. </li>
          </ol>

          <p className="mt-2 font-normal text-black text-base font_regular">
            Aggregated or De-Identified Information. We may aggregate or de-identify information in a form that does not identify you and use such aggregated or de-identified information for any purpose except as prohibited by law.
          </p>            
          
          <p className="mt-2 font-normal text-black text-base font_regular">
            <span className="font-bold">Marketing.</span> We use your information to contact you to tell you about products or services we believe may be of interest to you. For instance, if you elect to provide your email address or provide your consent to marketing communications sent to your telephone number we use that information to send you special offers. You may opt out of receiving promotional emails by following the instructions contained in each promotional email we send you. You can also control the marketing emails and/or text messages you receive by updating your settings through your account. You can opt-out of receiving text messages or calls to your phone number at any time by (i) for text messages, texting “STOP” in response to any text message you receive from us; and (ii) for calls, requesting opt-out during any call you receive from us. In addition, if at any time you do not wish to receive future marketing communications via your email address or telephone number, you may contact us at privacy@shef.com. If you unsubscribe from our marketing lists, you will no longer receive marketing communications but we may still contact you regarding management of your account, other administrative matters, and to respond to your requests. 

          </p>

        </div>

        <div className="mb-5">
          <p className="mt-2 text-black text-2xl font_bold">
            3. SHARING AND DISCLOSURE OF INFORMATION
          </p>
          <p className="mt-2 font-normal text-black text-base font_regular">
            We share your information that we collect in accordance with the practices described in this Privacy Policy. The categories of parties with whom we share information is set forth below:  
          </p>

          <ol  className="mt-2 font-normal text-black text-base font_regular mx-10">
            <li>
              <span className="font-bold">&bull;&nbsp;Service Providers:</span> To assist us in meeting business operations needs and to perform certain services and functions, we share information with service providers, including providers of hosting services, cloud services and other information technology services providers, email communication software and email newsletter services, payment processors, customer relationship management and customer support services, and web analytics services (for more details on the parties that place cookies through the Site, please see the “Cookies” and “Analytics” sections above). Pursuant to our instructions, these parties will access, process or store information in the course of performing their duties to us, although we may permit them to use information that does not identify you (including information that has been aggregated or de-identified) for any purpose except as prohibited by applicable law.
            </li>

            <li>
              <span className="font-bold">&bull;&nbsp;Sellers:</span> We share information with sellers on the Service (each , a “Seller”) in order to facilitate your orders, provide Sellers your feedback and ratings on their Meals, respond to your questions, market and advertise to you, and otherwise comply with the law.
            </li>

            <li>
              <span className="font-bold">&bull;&nbsp;Vendors and Other Parties:</span> We share information with vendors and other parties for analytics, advertising, delivery and marketing related services. These parties may act as our service providers, or in certain contexts, independently decide how to process your information.
            </li>

            <li>
              <span className="font-bold">&bull;&nbsp;Other Users of the Shef Website:</span> In certain jurisdictions where third party delivery may be restricted or limited, we share information with other users of the Service who need access to your information (for example your home address and telephone number) in order to complete an order (i.e. pick up a meal, deliver a meal, etc. ). If you receive another user’s information, you agree to use it only for the purpose in which it was provided (i.e. to complete the transaction).
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Partners:</span> We share information with our partners in connection with offering co-branded services, selling or distributing our products, or engaging in joint marketing activities.
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Promotions:</span> Our promotions may be jointly sponsored or offered by other parties. When you voluntarily enter a promotion, we share information as set out in the official rules that govern the promotion as well as for administrative purposes and as required by law (e.g., on a winners list). By entering a promotion, you agree to the official rules that govern that promotion, and may, except where prohibited by applicable law, allow the sponsor and/or other entities to use your name, voice and/or likeness in advertising or marketing materials.
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Profile and Feedback:</span> We share information you make public through the Service, such as information in your profile (e.g., your profile picture) or your reviews of the Sellers and Meals on the Service. Please think carefully before making information public as you are solely responsible for any information you make public. Once you have posted information, you may not be able to edit or delete such information, subject to additional rights set out in this Privacy Policy.
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Business Transfers:</span> If we are involved in a merger, acquisition, financing due diligence, reorganization, bankruptcy, receivership, sale of all or a portion of our assets, or transition of service to another provider, information will be shared in the diligence process with counterparties and others assisting with the transaction and transferred to a successor or affiliate as part of that transaction along with other assets.
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Security, Safety and Legal Requirements:</span> We share information we collect if required to do so by law or in the good faith belief that such action is necessary to (i) comply with a legal obligation, including to meet national security or law enforcement requirements, (ii) protect and defend our rights or property, (iii) prevent fraud, (iv) act in urgent circumstances to protect the rights, property, life, health, security, and personal safety of us, the Service, users of the Service, anyone else, or the public, or (v) protect against legal liability. We review all government demands to ensure they are legally valid and appropriate. If we receive a demand for your information, to the extent permitted by law we will direct the requesting party to seek the data directly from you. If legally required or compelled to disclose or give access to your information, we will promptly notify you and provide a copy of the demand unless legally prohibited from doing so. 
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Affiliates:</span> We may share information with our affiliates, meaning an entity that controls, is controlled by, or is under common control with Shef. Our affiliates may use the information we share in a manner consistent with this Privacy Policy, including where they act as our service providers or for their own internal purposes.
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Facilitating Requests:</span> We share information as requested by you or at your direction.
            </li>
            
            <li>
              <span className="font-bold">&bull;&nbsp;Consent:</span> We share information with notice to you and your consent.
            </li>
          </ol>
          
        </div>

      </div>

      <Testimonials buttonClick={() => goToExplore()} />

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
