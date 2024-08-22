import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/landing-page/Footer";
import Header from "../../components/landing-page/Header";
import Testimonials from "../../components/landing-page/Testimonials";
import TopNav from "../../components/landing-page/TopNav";
import { AUTH_ROUTES, HOME_ROUTES } from "../../routes/routes";
import { chefData } from "../../utils/Globals";



const FoodSafety = () => {
  const navigate = useNavigate();

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

      <div className="relative w-full h-3/4 md:h-1/2 lg:h-96" style={{
         backgroundColor: `rgba(78, 11, 43, 1)`,
      }}>
        <Header
          backgroundImage="/images/hero-img.png"
          bgExtraClasses="flex flex-col md:flex-row justify-center items-center md:items-start w-full h-full mx-auto md:gap-x-16 gap-x-5 gap-y-2 lg:gap-y-0 pt-6 lg:p-0"
          text1="Health"
          text2="Safety First,"
          text3="Community"
          text4="Second."
          text1ExtraClasses="text-white text-5xl lg:text-6xl pb-2 font_bold"
          
          textContainerClasses="flex flex-col justify-center items-start h-full w-fit"
          newFlag={true}
        />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-14 lg:gap-y-0 lg:gap-x-28 m-0 pt-28 pb-20" style={{ backgroundColor: `#E85666`, color: `#ffffff`, }}>
        <div className="w-4/5 lg:w-1/4 max-w-xl">
          <div>
            <img src="/images/served.svg" alt="Hot plate of food" className="w-16 h-auto"/>
          </div>
          <div className="h-fit w-fit mt-5 lg:mt-8">
            <p className="text-2xl font-semibold">Our commitment to food safety is second to none. Though community-led we strive to provide you with fresh, homemade meals that we’d only serve our families.</p>
          </div>
        </div>
        
        <div className="hidden lg:block p-0 m-0 bg-white self-stretch" style={{
          width: `1px`,
          height: `auto`,
        }}>
          &nbsp;
        </div>

        <div className="w-4/5 lg:w-1/4 max-w-xl">
          <div>
            <img src="/images/plate.svg" alt="Hot plate of food" className="w-16 h-auto" />
          </div>
          <div className="h-fit w-fit mt-5 lg:mt-8">
            <p className="text-2xl font-semibold">At Homemade, we’ve made a conscious life-long effort in ensuring that our customers receive high quality meals that are safe to eat, and always will be, our highest priority.</p>
          </div>
        </div>
      </div>

      <div className="bg-white mt-10 lg:mt-0">

        <div className="w-full flex flex-col lg:flex-row justify-around items-start gap-y-10 lg:gap-x-5 p-4 lg:p-16">
          <div className="w-11/12 lg:w-1/3 font-bold text-4xl mx-auto lg:mx-0">
            <p>Every home chef on our platform is Food Safety Certified 🍕🎖️</p>
          </div>
          <div className="w-11/12 lg:w-2/5 text-2xl mx-auto lg:mx-0">
            <p>All home chefs selling through our platform are incredibly grateful for your support and take their responsibility to  provide you with safe, wholesome meals very seriously. Since we delivered our first order in 2022, we’ve expanded to serve more customers, and over 100+ meals have made their way onto tables of families across Lagos.</p>
          </div>
        </div>

        <div className="bg-black rounded-3xl h-fit my-8 mx-2 lg:mx-8 px-2 py-16">
          <div className="text-center my-8 lg:my-5">
            <p className="font-bold text-5xl lg:text-5xl text-white">Prior to selling on homemade</p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-y-10 lg:gap-x-5 text-white p-2 lg:p-8 mb-10 lg:mb-5">

            <div className="p-5 lg:p-10 rounded-3xl" style={{ backgroundColor: `#1B1A1A` }}>
              <div className="mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="59" height="53" viewBox="0 0 59 53" fill="none">
                  <g clip-path="url(#clip0_9606_9072)">
                    <path d="M32.7269 52.3399C24.9751 53.0661 17.3617 51.1297 11.3172 46.8535C5.5956 42.8194 1.90427 37.1716 0.796875 30.8783L16.5773 29.3857L20.1302 32.4113L18.8382 38.9869C18.6537 39.8744 19.0228 40.8023 19.8995 41.3671C20.4071 41.6898 21.0069 41.8915 21.6067 41.8915C22.0682 41.8915 22.4834 41.8108 22.8987 41.6091L29.6815 38.4625L36.5105 41.6091C36.8796 41.7705 37.341 41.8512 37.7563 41.8512C38.3561 41.8512 38.956 41.6898 39.4635 41.3267C40.2941 40.762 40.6632 39.9148 40.5248 38.9869L39.2328 32.371L44.7698 27.651C45.0928 27.3686 45.3697 27.0056 45.462 26.6021L58.7046 25.3516C59.6736 38.9466 48.2766 50.8876 32.7269 52.3399Z" fill="#E85666"/>
                    <path d="M43.0203 26.1577L42.0513 26.9645L37.391 30.9583C36.8834 31.4021 36.6527 32.0072 36.7911 32.6123L38.1292 39.3897C38.1754 39.551 38.0831 39.6317 37.9908 39.672C37.9447 39.7124 37.8062 39.7527 37.6678 39.7124L30.7004 36.5254C30.1006 36.243 29.3623 36.243 28.7164 36.5254L21.749 39.7124C21.6105 39.7931 21.4721 39.7124 21.426 39.672C21.3798 39.6317 21.2876 39.551 21.2876 39.3897L22.6257 32.6123C22.7641 32.0072 22.5334 31.4021 22.0258 30.9583L19.811 29.0623L18.5652 28.0134L17.3194 26.9645L16.3965 26.1577C16.2581 26.0367 16.3043 25.956 16.3043 25.8753C16.3043 25.835 16.3965 25.7139 16.535 25.7139L24.3329 24.7457C25.025 24.6651 25.6249 24.2617 25.9479 23.7372L29.4085 17.5246C29.5008 17.4036 29.593 17.3633 29.6853 17.3633C29.7315 17.3633 29.8699 17.4036 29.9622 17.5246L33.4689 23.6969C33.7919 24.2617 34.3918 24.6247 35.0839 24.7054L37.714 25.0281L42.8818 25.6736C42.928 25.6736 42.928 25.6736 42.9741 25.7139C43.0664 25.7543 43.1125 25.835 43.1125 25.8753C43.1125 25.956 43.1587 26.077 43.0203 26.1577Z" fill="#E85666"/>
                    <path d="M30.3742 14.4985C28.7131 14.4985 27.375 13.3286 27.375 11.8763V3.12219C27.375 1.6699 28.7131 0.5 30.3742 0.5C32.0353 0.5 33.3734 1.6699 33.3734 3.12219V11.8763C33.3734 13.3286 32.0353 14.4985 30.3742 14.4985Z" fill="#FACED8"/>
                    <path d="M44.7726 9.53516C46.4337 9.53516 47.7718 10.7051 47.7718 12.1573V17.5227C47.7718 18.975 46.4337 20.1449 44.7726 20.1449C43.1115 20.1449 41.7734 18.975 41.7734 17.5227V12.1573C41.7734 10.7051 43.1115 9.53516 44.7726 9.53516Z" fill="#FACED8"/>
                    <path d="M16.305 9.53516C17.9661 9.53516 19.3042 10.7051 19.3042 12.1573V17.5227C19.3042 18.975 17.9661 20.1449 16.305 20.1449C14.6439 20.1449 13.3058 18.975 13.3058 17.5227V12.1573C13.2597 10.7051 14.6439 9.53516 16.305 9.53516Z" fill="#FACED8"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_9606_9072">
                      <rect x="0.796875" y="0.5" width="58" height="52" rx="26" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p>Every home chef must undergo compulsory verification which includes but not limited to providing a valid proof of identification, and submitting a food handlers card or certification from a recognised institution or platform.</p>
              </div>
            </div>

            <div className="p-5 lg:p-10 rounded-3xl" style={{ backgroundColor: `#1B1A1A` }}>
              <div className="mb-5">
                <svg className="md:ml-auto lg:ml-0" xmlns="http://www.w3.org/2000/svg" width="59" height="58" viewBox="0 0 59 58" fill="none">
                  <rect x="0.796875" y="0.402344" width="58" height="57.1944" rx="28.5972" fill="#E85666"/>
                  <path d="M33.4999 24.194C33.4999 25.2986 34.3953 26.194 35.4999 26.194H40.4238C41.5283 26.194 42.4238 27.0894 42.4238 28.194V30.7382C42.4238 31.8427 41.5283 32.7382 40.4238 32.7382H35.4999C34.3953 32.7382 33.4999 33.6336 33.4999 34.7382V39.662C33.4999 40.7666 32.6045 41.662 31.4999 41.662H28.9557C27.8512 41.662 26.9557 40.7666 26.9557 39.662V34.7382C26.9557 33.6336 26.0603 32.7382 24.9557 32.7382H20.0859C18.9814 32.7382 18.0859 31.8427 18.0859 30.7382V28.194C18.0859 27.0894 18.9814 26.194 20.0859 26.194H24.9557C26.0603 26.194 26.9557 25.2986 26.9557 24.194V19.3242C26.9557 18.2197 27.8512 17.3242 28.9557 17.3242H31.4999C32.6045 17.3242 33.4999 18.2196 33.4999 19.3242V24.194Z" fill="#1B1A1A"/>
                </svg>
              </div>
              <div>
                <p>Every home chef is verified by our Health Safety Quality Assurance ( HSQA) team after a highly-selective application process which includes interviews, home kitchen inspections and a possible taste test</p>
              </div>
            </div>

            <div className="p-5 lg:p-10 rounded-3xl" style={{ backgroundColor: `#1B1A1A` }}>
              <div className="mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="52" viewBox="0 0 70 52" fill="none">
                  <path d="M53.432 9.46954C52.4613 9.46954 51.4905 9.5774 50.4659 9.73919L49.9266 9.84705L49.7109 9.36168C47.1762 3.91481 41.5675 0.355469 35.5274 0.355469C29.3795 0.355469 23.7169 3.96874 21.1822 9.5774L20.9125 10.0628L20.3733 9.90098C19.1329 9.5774 17.8386 9.41561 16.5443 9.41561C7.86163 9.46954 0.796875 16.5882 0.796875 25.2709C0.796875 33.9535 7.86163 41.0722 16.5982 41.0722C17.3532 41.0722 18.1082 41.0182 18.8632 40.9104L19.6722 40.8025L19.6182 41.6115C19.6182 41.989 19.5643 42.3126 19.5643 42.6901V51.5884C19.6722 51.5884 19.78 51.5884 19.8879 51.5884H27.1684V43.5529C27.1684 42.7979 27.7616 42.2047 28.5166 42.2047C28.8941 42.2047 29.2177 42.3665 29.4873 42.5822C29.757 42.8518 29.8648 43.1754 29.8648 43.5529V51.5884H34.9881V39.7239C34.9881 39.0229 35.5274 38.4836 36.2285 38.4836H36.4442C37.1453 38.4836 37.6846 39.0768 37.6846 39.7239V51.5884H43.6708V41.5575C43.6708 40.8565 44.2101 40.3172 44.9111 40.3172H45.1269C45.8279 40.3172 46.3672 40.8565 46.3672 41.5575V51.5884H53.7016C53.9174 51.5884 54.1331 51.5884 54.3488 51.6423V42.6361C54.3488 42.3126 54.3488 41.989 54.3488 41.6654L54.2949 41.0182L54.942 40.9643C63.0314 40.1554 69.1794 33.4142 69.1794 25.2709C69.2333 16.5882 62.1686 9.46954 53.432 9.46954Z" fill="#E85666"/>
                </svg>
              </div>
              <div>
                <p>All home chefs are required to undergo & pass an accredited food safety training certification exam, and be subject to food quality checks & assessment.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-around items-start px-6 lg:px-8 py-10 mx-2 lg:mx-8 rounded-3xl text-white md:gap-x-8 lg:gap-x-0 gap-y-10 lg:gap-y-0" style={{ backgroundColor: `#1B1A1A` }}>
              <div className="w-fit max-w-xl">
                <div className="mb-5">
                  <p className="font-bold text-lg">Prior to selling on homemade</p>
                </div>

                <div className="flex flex-col justify-around items-start gap-y-3">

                  <div className="flex items-start justify-start gap-x-3">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect y="0.128906" width="21.7422" height="21.7422" rx="10.8711" fill="#E85666"/>
                        <circle cx="10.873" cy="11" r="5.13867" fill="white"/>
                      </svg>
                    </div>
                    <p className="font-normal">Every home chef is subject to periodic food quality checks.</p>
                  </div>

                  <div className="flex items-start justify-start gap-x-3">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect y="0.128906" width="21.7422" height="21.7422" rx="10.8711" fill="#E85666"/>
                        <circle cx="10.873" cy="11" r="5.13867" fill="white"/>
                      </svg>
                    </div>
                    <p className="font-normal">Every home chef is required to wear a face mask, hairnet, and gloves while cooking.</p>
                  </div>

                  <div className="flex items-start justify-start gap-x-3">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect y="0.128906" width="21.7422" height="21.7422" rx="10.8711" fill="#E85666"/>
                        <circle cx="10.873" cy="11" r="5.13867" fill="white"/>
                      </svg>
                    </div>
                    <p className="font-normal">Every home chef is subject to a home kitchen inspection.</p>
                  </div>

                  <div className="flex items-start justify-start gap-x-3">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect y="0.128906" width="21.7422" height="21.7422" rx="10.8711" fill="#E85666"/>
                        <circle cx="10.873" cy="11" r="5.13867" fill="white"/>
                      </svg>
                    </div>
                    <p className="font-normal">Home chefs are required to use a thermometer to take their temperature prior to food preparation.</p>
                  </div>

                  <div className="flex items-start justify-start gap-x-3">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <rect y="0.128906" width="21.7422" height="21.7422" rx="10.8711" fill="#E85666"/>
                        <circle cx="10.873" cy="11" r="5.13867" fill="white"/>
                      </svg>
                    </div>
                    <p className="font-normal">Every home chef is required to have quarterly medical screenings.</p>
                  </div>

                </div>
              </div>

              <div className="hidden lg:block p-0 m-0 self-stretch" style={{
                width: `1px`,
                height: `auto`,
                backgroundColor: `#555555`,
              }}>
                &nbsp;
              </div>

              <div className="max-w-sm w-fit lg:w-96">
                <div className="mb-3 lg:mb-5 mt-5 lg:mt-0 flex flex-row items-center justify-center md:items-start md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="36" viewBox="0 0 39 36" fill="none">
                    <path d="M22.131 34.4761C20.6495 35.8446 18.3689 35.8446 16.8875 34.4562L16.6731 34.2579C6.43949 24.837 -0.246442 18.6688 0.00696088 10.9734C0.123916 7.60169 1.81976 4.36883 4.56821 2.46481C9.71423 -1.10522 16.0688 0.560798 19.4995 4.6465C22.9301 0.560798 29.2847 -1.12505 34.4307 2.46481C37.1792 4.36883 38.875 7.60169 38.992 10.9734C39.2649 18.6688 32.5594 24.837 22.3259 34.2976L22.131 34.4761Z" fill="#E85666"/>
                  </svg>
                </div>
                <p>Anyone who is feeling sick, or has a temperature above 37.5℃, or exhibits any other COVID-19 symptoms is asked to inform us so that we can remove them from the platform until it is safe for them to return in accordance with Federal Ministry of Health guidelines.</p>
              </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-14 py-20 px-4 lg:px-10" style={{ backgroundColor: `#FFF2F5`, }}>

        <div className="flex flex-col items-center justify around gap-y-5 text-center max-w-5xl mx-auto">
          <p className="font-bold text-5xl mb-2 lg:mb-0" style={{ color: `#E85666`, }}>Ongoing food safety education</p>
          <p className="text-base lg:text-2xl">Journey of running a successful home kitchen business. For us, big starts small! This means providing regular coaching sessions, workshops, learning resources on the best practises, medical outreaches to chef communities and tips which includes;</p>
        </div>

        <div className="grid grid-rows-3 grid-cols-1 lg:grid-cols-3 px-0 lg:px-8 gap-5">
          <div className="lg:col-span-2 h-full p-8 lg:p-10 rounded-3xl text-white mb-auto" style={{ backgroundColor: `#E85666`, }}>
            <p className="text-3xl font-semibold mb-5">Cleanliness</p>
            <p className="text-xl font-medium">Maintaining a clean kitchen is essential to preventing the spread of harmful bacteria. Make sure to regularly wash your hands, utensils, and surfaces before and after handling food. Use separate cutting boards for raw meat and produce to avoid cross-contamination. Don't forget to also wash fruits and vegetables thoroughly before using them.</p>
          </div>
          <div className="rounded-3xl hidden lg:block bg-center bg-cover" style={{ backgroundImage: "url('/images/chef3.jpeg')", }}>
            &nbsp;
          </div>
          <div className="rounded-3xl hidden lg:block bg-center bg-cover" style={{ backgroundImage: "url('/images/chef2.jpeg')", }}>
            &nbsp;
          </div>
          <div className="lg:col-span-2 h-full p-8 lg:p-10 rounded-3xl text-white" style={{ backgroundColor: `#4E0B2B`, }}>
            <p className="text-3xl font-semibold mb-5">Temperature</p>
            <p className="text-xl font-medium">Cooking food to the correct temperature is crucial to killing off any harmful bacteria. Use a food thermometer to ensure that your meat, poultry, and fish are cooked to the appropriate internal temperature. Refrigerate perishable foods promptly and don't leave them out at room temperature for more than two hours.</p>
          </div>
          <div className="lg:col-span-2 h-full p-8 lg:p-10 rounded-3xl text-white" style={{ backgroundColor: `#000000`, }}>
            <p className="text-3xl font-semibold mb-5">Storage</p>
            <p className="text-xl font-medium">Storing food properly can also prevent the growth of bacteria. Keep your refrigerator at 40°F or below and your freezer at 0°F or below. Use airtight containers to store leftovers and discard any food that has been sitting in the fridge for more than four days. By following these guidelines, you can help keep yourself, your loved ones, and your community safe and healthy. Happy cooking!</p>
          </div>
          <div className="rounded-3xl hidden lg:block bg-center bg-cover" style={{ backgroundImage: "url('/images/chef1.jpeg')", }}>
            &nbsp;
          </div>
        </div>
      </div>


      <Testimonials buttonClick={() => goToExplore()} />

      <Footer />
    </div>
  );
};

export default FoodSafety;
