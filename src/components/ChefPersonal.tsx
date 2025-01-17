import React, { useState, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Modal from "@mui/material/Modal";
import { FiChevronRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BiImages } from "react-icons/bi";
import { useFormik } from "formik";
import { useAppDispatch } from "../redux/hooks";
import {
  changePasswordChefAccount,
  changePasswordUserAccount,
  updateProfileChefAccount,
  updateProfileUserAccount,
} from "../_redux/user/userAction";
import { CHEF_URL, EXTRA_EMAILS_URL } from "../_redux/urls";
import OutlineButton from "./OutlineButton";
import CustomInput from "./CustomInput";
import ColoredSpinner from "./ColoredSpinner";
import { HandleImageUpload } from "../utils/uploadImage";
import { CHEFS_LOCATIONS } from "../utils/Globals";
import { handlePhoneNumber } from "../utils/formatMethods";
import { InputAdornment, TextField } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { SERVER } from "../config/axios";
import { updateProfileAccount } from "../_redux/user/userSlice";

const formInputs = [
  { type: "text", placeholder: "First Name", name: "firstName" },
  { type: "text", placeholder: "Last Name", name: "lastName" },
  { type: "text", placeholder: "Bio", name: "bio" },
  { type: "email", placeholder: "Email", name: "email" },
  { type: "tel", placeholder: "Phone Number", name: "phoneNumber" },
  {
    type: "dropdown",
    placeholder: "Location",
    name: "address",
    options: [{ label: "", value: "" }, ...CHEFS_LOCATIONS],
  },
];

const ChefPersonal = () => {
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
    dispatch(updateProfileChefAccount(CHEF_URL, values, closeProfileModal));

  const [cat, setCat] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [extraEmails, setExtraEmails] = useState<any>([]);

  const handleClickCategory = (e: any) => {
    let localMenuCategories = [...extraEmails];
    if (cat) {
      localMenuCategories.push(cat);
      setExtraEmails(localMenuCategories);
      setCat("");
    }
    console.log("cat= ", cat, "localMenuCategories", localMenuCategories);
  };

  const removeCat = (cat) => {
    console.log("rm", user?._id);
    let localMenuCategories = [...extraEmails];

    localMenuCategories = localMenuCategories.filter(
      (item) => item !== cat
    );

    setExtraEmails(localMenuCategories);
  };

  const [catModal, setCatModal] = useState(false);
  const openCatModal = () => {
    setExtraEmails(user?.extraEmails ? [...user?.extraEmails] : [])
    setCatModal(true)
  };
  const closeCatModal = () => {
    setCatModal(false);
  };

  const handleSaveCategory = () => {
    setIsLoadingCategories(true);
    SERVER.patch(`${EXTRA_EMAILS_URL}/${user?._id}`, {
      extraEmails: extraEmails,
    })
    .then(({ data }) => {
      console.log("handleSaveCategoryD", data);
      closeCatModal();
      dispatch(updateProfileAccount({ ...data?.chef }));
    })
    .catch((err) => {
      console.log("handleSaveCategoryE", err);
    })
    .finally(() => setIsLoadingCategories(false));
  };



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
          <p className="text-lg gray_color font_regular">Location</p>
          <p className="text-base text-black font_regular mt-2">
            {user?.address}
          </p>
        </div>
        <div className="border-b py-5">
          <p className="text-lg gray_color font_regular">Bio</p>
          <p className="text-base text-black font_regular mt-2">{user?.bio}</p>
        </div>
        <div className="border-b py-5">
          <p className="text-lg gray_color font_regular">Email</p>
          <p className="text-base text-black font_regular mt-2">
            {user?.email}
          </p>
        </div>
        <div className="border-b py-5">
          <p className="text-lg gray_color font_regular">Extra emails</p>
          <p className="text-base text-black font_regular mt-2">
            {user?.extraEmails?.join(", ")}
          </p>
          <div
            className="flex items-center mt-2 cursor-pointer"
            onClick={() => openCatModal()}
          >
            <p className="text-base text-black font_regular mr-1">
              Add extra email
            </p>
            <FiChevronRight size={24} />
          </div>
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
              <>
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
                    <FiChevronRight
                      size={20}
                      color="#06c167"
                      className="mt-1"
                    />
                  </div>
                </div>
              </>
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
                  options={input.options}
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
                      changePasswordChefAccount(
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

      {/* CATEGORY */}
      <Modal
        open={catModal}
        onClose={closeCatModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              Add extra emails
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeCatModal}
            />
          </div>

          <div className="mt-3 w-full h-5/6 relative">
            <TextField
              sx={{ m: 1 }}
              variant="outlined"
              className="w-full"
              label="Emails"
              id="outlined-adornment-password"
              onChange={(e: any) => {
                setCat(e.target.value);
                console.log(e.target.value);
              }}
              value={cat}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button
                      onClick={handleClickCategory}
                      className="primary_bg_color text-white text-xs rounded-lg py-1 px-2 cursor-pointer"
                    >
                      Add email
                    </button>
                  </InputAdornment>
                ),
              }}
            />

            <div className="w-full max-h-96 h-fit py-3 overflow-y-scroll">
              {extraEmails?.length > 0 && (
                <div
                  className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                  style={{ maxHeight: "250px" }}
                >
                  {extraEmails?.map((cat: any, i: number) => (
                    <div
                      key={cat}
                      className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="ml-3 flex flex-row justify-between items-center">
                          <p className="text-xs font-bold font_regular text-black">
                            {`${cat}`}
                          </p>
                        </div>
                      </div>
                      <div>
                        <AiFillCloseCircle
                          size={24}
                          color="#fff"
                          className="cursor-pointer hover:text-red-600"
                          onClick={() => {
                            removeCat(cat);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 absolute bottom-0 w-full">
              <OutlineButton
                loading={isLoadingCategories}
                title="Save extra emails"
                extraClasses="w-full p-3 rounded-full px-8 py-2"
                onClick={() => handleSaveCategory()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChefPersonal;
