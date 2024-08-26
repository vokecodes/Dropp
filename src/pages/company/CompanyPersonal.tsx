import React, { useState, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Modal from "@mui/material/Modal";
import { FiChevronRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { BiImages } from "react-icons/bi";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import {
  changePasswordCompanyAccount,
  updateProfileCompanyAccount,
} from "../../_redux/user/userAction";
import { COMPANY_URL } from "../../_redux/urls";
import OutlineButton from "../../components/OutlineButton";
import CustomInput from "../../components/CustomInput";
import ColoredSpinner from "../../components/ColoredSpinner";
import { HandleImageUpload } from "../../utils/uploadImage";
import { CHEFS_LOCATIONS } from "../../utils/Globals";
import { handlePhoneNumber } from "../../utils/formatMethods";

const formInputs = [
  { type: "text", placeholder: "Company name", name: "companyName" },
  { type: "email", placeholder: "Official Email", name: "email" },
  {
    type: "number",
    placeholder: "Number of employees",
    name: "numberOfEmployees",
  },
];

const CompanyPersonal = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const updateUserProfile = () =>
    dispatch(
      updateProfileCompanyAccount(COMPANY_URL, values, closeProfileModal)
    );

  const { handleChange, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: user,
    onSubmit: () => {
      updateUserProfile();
    },
  });

  const uploadImage = async (file: any) => {
    await HandleImageUpload(file, setIsLoading, setFieldValue, "image");
  };

  return (
    <>
      <div className="lg:w-2/3">
        <div className="flex flex-row justify-start items-start gap-x-3 border-b pb-5">
          <div className="mb-5 border-8 w-fit h-fit rounded-full flex justify-center items-center">
            {user?.image ? (
              <img
                src={user?.image}
                alt="chef"
                className="w-14 h-14 rounded-full"
              />
            ) : (
              <CiUser className="w-14 h-14 p-2" color="#06c167" />
            )}
          </div>
          <div className="flex flex-col justify-start items-start gap-y-1">
            <p className="text-xl text-black font-bold font_medium">
              {user?.companyName}
            </p>
            <p className="text-base gray_color font_regular">{user?.email}</p>
          </div>
        </div>
        <div className="border-b py-5">
          <p className="text-lg gray_color font_regular">Number of employees</p>
          <p className="text-base text-black font_regular mt-2">
            {user?.numberOfEmployees}
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
          <p className="text-base text-black font_regular mt-2">**********</p>
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={() => openPasswordModal()}
          >
            <p className="text-base text-black font_regular mr-1">
              Change password
            </p>
            <FiChevronRight size={24} />
          </div>
        </div>
        <div className="my-10">
          <OutlineButton
            title="Edit Profile"
            extraClasses="w-52 py-3"
            onClick={openProfileModal}
          />
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
            <div className="flex flex-col items-center justify-center">
              <div className="w-28 h-28 bg_third_gray_color rounded-full flex justify-center items-center">
                {isLoading ? (
                  <ColoredSpinner />
                ) : (
                  <>
                    {values.image ? (
                      <img
                        src={values.image}
                        alt="chef"
                        className="w-24 h-24 rounded-full"
                      />
                    ) : (
                      <BiImages size={28} color="#06c167" />
                    )}
                  </>
                )}
              </div>
              <div className="flex my-5 cursor-pointer items-center">
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  name="image"
                  placeholder=""
                  onChange={(e: any) => uploadImage(e.target.files[0])}
                  className="hidden"
                  ref={imageInputRef}
                />
                <div
                  className="flex"
                  onClick={() => {
                    if (imageInputRef.current) {
                      imageInputRef.current.click();
                    }
                  }}
                >
                  <p className="text-lg primary_txt_color font_regular text-center mr-3">
                    {values.image ? "Change image" : "Add an image"}
                  </p>
                  <FiChevronRight size={20} color="#06c167" className="mt-1" />
                </div>
              </div>
            </div>
            <div>
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
                      changePasswordCompanyAccount(
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
    </>
  );
};

export default CompanyPersonal;
