import { useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import Button from "./Button";
import { CHEF_USER } from "../config/UserType";
import { CHEF_ROUTES } from "../routes/routes";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: any) => ({
      user: state.auth.user,
    }),
    shallowEqual
  );

  // useEffect(() => {
  //   console.log("userGEHMD", { user });

  //   if (user) {
  //     navigate(`/${user?.user?.userType}`);
  //   }
  // }, [user]);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24">
      <div className="text-center">
        <h1 className="text-7xl font_bold tracking-tight primary_txt_color">
          Ooops!
        </h1>
        <p className="mt-4 text-2xl text-black font_regular">
          Looks like something went completely wrong! <br /> But not to worry,
          breathe in, and on the out breath, go back and try again.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-x-6">
          <Button
            title="Go to home"
            onClick={() =>
              navigate(
                user?.user?.userType === CHEF_USER ? CHEF_ROUTES.linkChef : "/"
              )
            }
          />

          <div className="mt-16">
            <img
              src="/images/not-found.svg"
              alt="not-found"
              // className="w-96 h-80 object-cover"
              // style={{
              //   width: 666,
              //   height: 424,
              // }}
            />
          </div>
          {/* <a
              href={link}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a> */}
          {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
        </div>
      </div>
    </main>
  );
};

export default NotFound;
