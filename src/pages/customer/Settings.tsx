import React, { useState, useRef, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, shallowEqual } from "react-redux";
import { FiChevronRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BiImages } from "react-icons/bi";
import { useFormik } from "formik";
import CustomerDashboardLayout from "../../components/CustomerDashboardLayout";
import OutlineButton from "../../components/OutlineButton";
import CustomInput from "../../components/CustomInput";
import PageTitle from "../../components/PageTitle";
import { useAppDispatch } from "../../redux/hooks";
import {
  changePasswordUserAccount,
  getProfileUserAccount,
  updateProfileUserAccount,
} from "../../_redux/user/userAction";
import { USER_URL } from "../../_redux/urls";
import ColoredSpinner from "../../components/ColoredSpinner";
import { HandleImageUpload } from "../../utils/uploadImage";
import TabMenu from "../../components/TabMenu";
import { CUSTOMER_SETTINGS_MENU } from "../../utils/Globals";
import CustomerPayment from "../../components/CustomerPayment";
import { handlePhoneNumber } from "../../utils/formatMethods";
import AutoCompleteInput from "../../components/AutoCompleteInput";

const settingsMenu = [
  CUSTOMER_SETTINGS_MENU.PERSONAL,
  CUSTOMER_SETTINGS_MENU.PAYMENT,
];

const formInputs = [
  { type: "text", placeholder: "First Name", name: "firstName" },
  { type: "text", placeholder: "Last Name", name: "lastName" },
  { type: "email", placeholder: "Email", name: "email" },
  { type: "tel", placeholder: "Phone Number", name: "phoneNumber" },
  // { type: "text", placeholder: "Address", name: "address" },
];

const CustomerSettings = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(
    CUSTOMER_SETTINGS_MENU.PERSONAL
  );

  const { user, loading, error } = useSelector(
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
    dispatch(updateProfileUserAccount(USER_URL, values, closeProfileModal));

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue } =
    useFormik({
      enableReinitialize: true,
      initialValues: user,
      onSubmit: () => {
        updateUserProfile();
      },
    });

  const uploadImage = async (file: any) => {
    await HandleImageUpload(file, setIsLoading, setFieldValue, "image");
  };

  useEffect(() => {
    dispatch(getProfileUserAccount());
  }, []);

  return (
    <>
      <CustomerDashboardLayout>
        <div className="w-full px-6 py-4">
          <PageTitle title="Settings" />
          <div className="my-10">
            <TabMenu
              containerExtraClasses="lg:w-2/3"
              ordersMenu={settingsMenu}
              selectedOrder={selectedMenu}
              setSelectedOrder={setSelectedMenu}
              textExtraClasses="w-1/2 text-base"
            />
          </div>
          <div className="my-5 bg-white rounded-3xl p-10">
            <div>
              {selectedMenu === settingsMenu[0] && (
                <div className="w-1/2">
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
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-base gray_color font_regular mt-2">
                      {user?.phoneNumber}
                    </p>
                  </div>
                  <div className="border-b py-5">
                    <p className="text-lg gray_color font_regular">Address</p>
                    <p className="text-base text-black font_regular mt-2">
                      {user?.address}
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
              )}
              {selectedMenu === settingsMenu[1] && <CustomerPayment />}
            </div>

            <Modal
              open={profileModal}
              onClose={closeProfileModal}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/5 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-10 my-10 outline-none">
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
                          {values?.image ? (
                            <img
                              src={values?.image}
                              alt="chef"
                              className="w-24 h-24 rounded-full"
                            />
                          ) : (
                            <BiImages size={28} color="#e85666" />
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
                          Add an image
                        </p>
                        <FiChevronRight
                          size={20}
                          color="#e85666"
                          className="mt-1"
                        />
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
                        error={errors[input?.name]}
                      />
                    ))}

                    <AutoCompleteInput
                      defaultValue={values["address"]}
                      onSelect={(place: any) => {
                        setFieldValue("address", place.formatted_address);
                        setFieldValue(
                          "addressLatitude",
                          place?.geometry?.location.lat()
                        );
                        setFieldValue(
                          "addressLongitude",
                          place?.geometry?.location.lng()
                        );
                      }}
                      error={
                        errors["address"] &&
                        touched["address"] &&
                        errors["address"]
                      }
                    />

                    {error && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {error}
                      </p>
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
                            changePasswordUserAccount(
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
          </div>
        </div>
      </CustomerDashboardLayout>
    </>
  );
};

export default CustomerSettings;
