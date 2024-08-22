import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { HOME_ROUTES } from "../../routes/routes";
import { USER_TYPE } from "../../utils/Globals";

const Footer = ({ howref, chefDashboard, noLove }: any) => {
  const { person } = useSelector(
    (state: any) => ({
      person: state.user.user,
    }),
    shallowEqual
  );

  return (
    <>
    {!noLove && (
      <div className="relative -bottom-2 lg:-bottom-[4.5rem] w-full px-2">
        <img src="/images/street-love.svg" className="w-full object-cover" alt="" />
      </div>
    )}
      <div className="relative bg-[#240011] px-6 lg:px-24">
        <div className="w-full flex flex-col lg:flex-row justify-between gap-y-10 white_txt_color py-14">
          <div>
            <Link to="/">
              <span className="sr-only">Homemade</span>
              <img className="h-6 w-auto" src="/images/logowhite.svg" alt="" />
            </Link>
            <div>
              <p className="customW text-1xl mt-3 font_bold">
                Explore homemade meals from verified home chefs around.
              </p>
              <p className="text-sm text-white font_regular mt-3">
                {new Date().getFullYear()} Dropp Technologies. All rights
                reserved.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start justify-between gap-x-10">
            <div className="min-w-24">
              <h1 className="bg-[#E85666] rounded-full w-20 text-[#4E0B2B] text-base text-center font_bold">
                Explore
              </h1>
              <Link to={HOME_ROUTES.linkExplore}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  Explore meals
                </p>
              </Link>
              <Link to={HOME_ROUTES.linkSubscription}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  Subscription
                </p>
              </Link>
              <Link to={HOME_ROUTES.linkChefLandingPage}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  For businesses
                </p>
              </Link>
              <Link to={HOME_ROUTES.linkCompanies}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  For companies
                </p>
              </Link>
            </div>
            <div className="min-w-24">
              <h1 className="bg-[#E85666] rounded-full w-20 text-[#4E0B2B] text-base text-center font_bold">
                Learn
              </h1>
              <Link to={HOME_ROUTES.linkFoodSafety}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  Food safety
                </p>
              </Link>
              <Link to={HOME_ROUTES.linkExplore}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  Home Chefs
                </p>
              </Link>
              <Link to={HOME_ROUTES.linkTermsService}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  Terms of service
                </p>
              </Link>
              <Link to={HOME_ROUTES.linkPrivacyPolicy}>
                <p className="text-sm text-[#8A8085] font_regular mt-3">
                  Privacy policy
                </p>
              </Link>
            </div>
          </div>

          <div>
            <h1 className="bg-[#E85666] rounded-full w-24 text-[#4E0B2B] text-base text-center font_bold">
              Reach out
            </h1>
            <a href="+2348068424478">
              <p className="text-sm text-[#8A8085] font_regular mt-3 underline decoration-1">
                +2348068424478
              </p>
            </a>
            <a href="mailto:hello@getdropp.com">
              <p className="text-sm text-[#8A8085] font_regular mt-3 underline decoration-1">
                hello@getdropp.com
              </p>
            </a>
            <div className="mt-5">
              <h1 className="bg-[#E85666] rounded-full w-20 text-[#4E0B2B] text-base text-center font_bold">
                Office
              </h1>
              <p className="text-sm text-[#8A8085] font_regular mt-3 decoration-1">
                Roseto Labs Inc.
              </p>
              <p className="text-sm text-[#8A8085] font_regular decoration-1">
                8 The Green Ste A Dover, DE 19901, USA
              </p>
              <p className="text-sm text-[#8A8085] font_regular decoration-1">
                1 block, 128 Remi Olowude St, Lekki Phase I, Lagos, Nigeria
              </p>
            </div>
          </div>
          <div className="w-full lg:w-fit flex flex-row lg:flex-col justify-between lg:justify-start gap-y-4">
            <p className="bg-[#E85666] rounded-full w-fit lg:w-24 text-base text-center text-white font_bold px-2">
              <a
                href="https://www.linkedin.com/company/homemade-by-dropp?trk=profile-position"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </p>
            <p className="bg-[#E85666] rounded-full w-fit lg:w-24 text-base text-center text-white font_bold px-2">
              <a
                href="https://www.instagram.com/try.homemade/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </p>
            <p className="bg-[#E85666] rounded-full w-fit lg:w-24 text-base text-center text-white font_bold px-2">
              <a
                href="https://twitter.com/tryhomemade"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
