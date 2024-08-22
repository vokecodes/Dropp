import React, { useRef, useState } from "react";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import PageTitle from "../../components/PageTitle";
import ChefPersonal from "../../components/ChefPersonal";
import { useAppDispatch } from "../../redux/hooks";
import { shallowEqual, useSelector } from "react-redux";
import { CHEF_URL, SUB_CHEF_URL } from "../../_redux/urls";
import {
  changePasswordChefAccount,
  changePasswordSubChefAccount,
  updateProfileChefAccount,
  updateProfileSubChefAccount,
} from "../../_redux/user/userAction";
import { useFormik } from "formik";
import { HandleImageUpload } from "../../utils/uploadImage";
import { FiChevronRight } from "react-icons/fi";
import OutlineButton from "../../components/OutlineButton";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import ColoredSpinner from "../../components/ColoredSpinner";
import { BiImages } from "react-icons/bi";
import { handlePhoneNumber } from "../../utils/formatMethods";
import CustomInput from "../../components/CustomInput";

const formInputs = [
  { type: "text", placeholder: "First Name", name: "firstName" },
  { type: "text", placeholder: "Last Name", name: "lastName" },
  { type: "email", placeholder: "Email", name: "email" },
];

const ChefSettings = () => {
  const dispatch = useAppDispatch();

  const { user, error, loading } = useSelector(
    (state: any) => ({
      user: state.user.user,
      loading: state.user.loading,
      error: state.user.error,
    }),
    shallowEqual
  );

  const [profileModal, setProfileModal] = useState(false);
  const openProfileModal = () => setProfileModal(true);
  const closeProfileModal = () => setProfileModal(false);

  const [passwordModal, setPasswordModal] = useState(false);
  const openPasswordModal = () => setPasswordModal(true);
  const closePasswordModal = () => setPasswordModal(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [togglePassword, setTogglePassword] = useState("password");

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: user,
    onSubmit: () => {
      dispatch(updateProfileSubChefAccount(values, closeProfileModal));
    },
  });

  return (
    <ChefDashboardLayout>
      <div className="w-full px-6 py-4">
        <PageTitle title="Account settings" />

        <div className="mt-10 bg-white rounded-3xl p-10">
          <div className="lg:w-1/2">
            <div className="border-b pb-5">
              {user?.image && (
                <div className="mb-5 border-8 w-24 h-24 rounded-full flex justify-center items-center">
                  <img
                    src={user?.image}
                    alt="chef"
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              )}
              <p className="text-xl text-black font-bold font_medium">
                Chef {user?.firstName}
              </p>
              <p className="text-base gray_color font_regular mt-2">
                {user?.phoneNumber}
              </p>
            </div>
            <div className="border-b py-5">
              <p className="text-lg gray_color font_regular">Email</p>
              <p className="text-base text-black font_regular mt-2">
                {user?.email}
              </p>
            </div>
            <div className="border-b py-7">
              <p className="text-lg gray_color font_regular">Password</p>
              <p className="text-base text-black font_regular mt-2">
                **********
              </p>
              {/* <div
                className="flex items-center mt-2 cursor-pointer"
                onClick={() => openPasswordModal()}
              >
                <p className="text-base text-black font_regular mr-1">
                  Change password
                </p>
                <FiChevronRight size={24} />
              </div> */}
            </div>
            <div className="my-10">
              <OutlineButton
                title="Edit Profile"
                extraClasses="w-52 py-3"
                onClick={openProfileModal}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={profileModal}
        onClose={closeProfileModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Edit account
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeProfileModal}
            />
          </div>
          <div className="my-7">
            {formInputs?.map((input, i) => (
              <CustomInput
                key={i}
                type={input?.type}
                placeholder={input?.placeholder}
                name={input?.name}
                onChange={handleChange}
                value={values[input.name]}
                onkeyup={handlePhoneNumber}
              />
            ))}

            {error && (
              <p className="text-sm text-center text-red-600 my-2">{error}</p>
            )}

            <div className="mt-10">
              <OutlineButton
                loading={loading}
                title="Save"
                extraClasses="w-full p-3 rounded-full"
                onClick={() => handleSubmit()}
              />
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={passwordModal}
        onClose={closePasswordModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/5 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Change Password
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closePasswordModal}
            />
          </div>
          <div className="my-7">
            <div>
              <CustomInput
                type={togglePassword}
                password={true}
                placeholder="Old Password"
                name="oldPassword"
                onChange={(e: any) => setOldPassword(e.target.value)}
                value={oldPassword}
                onClickPassword={() => {
                  const localValue = togglePassword;
                  if (localValue === "password") {
                    setTogglePassword("text");
                  } else {
                    setTogglePassword("password");
                  }
                }}
              />

              <CustomInput
                type={togglePassword}
                password={true}
                placeholder="New Password"
                name="newPassword"
                onChange={(e: any) => setNewPassword(e.target.value)}
                value={newPassword}
                onClickPassword={() => {
                  const localValue = togglePassword;
                  if (localValue === "password") {
                    setTogglePassword("text");
                  } else {
                    setTogglePassword("password");
                  }
                }}
              />

              {errorPassword && (
                <p className="text-sm text-center text-red-600 my-2">
                  {errorPassword}
                </p>
              )}

              {error && (
                <p className="text-sm text-center text-red-600 my-2">{error}</p>
              )}

              <div className="mt-10">
                <OutlineButton
                  loading={loading}
                  title="Save"
                  extraClasses="w-full p-3 rounded-full"
                  onClick={() => {
                    if (!oldPassword && !newPassword) {
                      setErrorPassword("Fields can't be empty");
                      return;
                    }
                    dispatch(
                      changePasswordSubChefAccount(
                        { oldPassword, newPassword },
                        closePasswordModal
                      )
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </ChefDashboardLayout>
  );
};

export default ChefSettings;
