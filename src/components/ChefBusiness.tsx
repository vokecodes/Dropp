import React, { useState, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { BiImages } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
import BannerCard from "./BannerCard";
import TagItem from "./TagItem";
import OutlineButton from "./OutlineButton";
import Button from "./Button";
import CustomInput from "./CustomInput";
import TextArea from "./TextArea";
import { useAppDispatch } from "../redux/hooks";
import { BusinessValues } from "../utils/FormInitialValue";
import { addBusiness, updateBusiness } from "../_redux/business/businessAction";
import Dropdown from "./Dropdown";
import ColoredSpinner from "./ColoredSpinner";
import { HandleImageUpload } from "../utils/uploadImage";
import AutoCompleteInput from "./AutoCompleteInput";

const CITIES = [
  { label: "", value: "" },
  { value: "Lagos", label: "Lagos" },
  // { value: "Ogun", label: "Ogun" },
  // { value: "Oyo", label: "Oyo" },
];

const DELIVERY_OPTIONS = [
  { label: "", value: "" },
  {
    value: "6 hours",
    label: "6 hours before delivery",
  },
  {
    value: "24 hours",
    label: "24 hours before delivery",
  },
  {
    value: "48 hours",
    label: "48 hours before delivery",
  },
];

const LOCALITY = [
  { value: "South", label: "South" },
  { value: "South-East", label: "South-East" },
  { value: "South-West", label: "South-West" },
  { value: "North", label: "North" },
  { value: "Others", label: "Others" },
];

const ChefBusiness = () => {
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [inputError, setInputError] = useState("");

  const { error, loading, business } = useSelector(
    (state: any) => ({
      business: state.business.business,
      loading: state.business.loading,
      error: state.business.error,
      user: state.user.user,
    }),
    shallowEqual
  );

  const [businessCity, setBusinessCity] = useState<any>({
    label: business?.businessCity,
    value: business?.businessCity,
  });

  const [businessSpecialisation, setBusinessSpecialisation] = useState(
    business?.businessSpecialisation?.length > 0 &&
      business?.businessSpecialisation?.map((b: string) => {
        return { label: b, value: b };
      })
  );

  const { handleChange, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: business || BusinessValues,
    onSubmit: () => {
      if (inputError) {
        return;
      }

      if (values.businessName.includes("-")) {
        setInputError(`Special character "-" not allowed.`);
        return;
      }

      if (business) {
        dispatch(updateBusiness(values, closeBusinessModal));
        // await createAMerchant(randomNumber, values);
      } else {
        dispatch(addBusiness(values, closeBusinessModal));
      }
    },
  });

  const [businessModal, setBusinessModal] = useState(false);
  const openBusinessModal = () => setBusinessModal(true);
  const closeBusinessModal = () => setBusinessModal(false);

  const uploadImage = async (file: any) => {
    await HandleImageUpload(file, setIsLoading, setFieldValue, "coverImage");
  };

  return (
    <>
      {business ? (
        <div>
          {business?.coverImage && (
            <BannerCard
              backgroundImage={business?.coverImage}
              bgExtraClasses="p-8 bg-cover bg-no-repeat min-w-full h-40 lg:h-96"
              noShowRightIcon={true}
            />
          )}
          <div className="lg:w-1/2">
            <div className="border-b py-7">
              <p className="text-xl text-black font-bold font_medium">
                {business?.businessName}
              </p>
              <p className="text-base gray_color font_regular mt-2">
                {business?.businessAddress}
              </p>
            </div>
            <div className="border-b py-7">
              <p className="text-lg gray_color font_regular">Description</p>
              <p className="text-base text-black font_regular mt-2">
                {business?.businessDescription}
              </p>
            </div>
            {/* {business?.businessDeliveryTime && (
              <div className="border-b py-7">
                <p className="text-lg gray_color font_regular">Delivery Time</p>
                <p className="text-base text-black font_regular mt-2">
                  {business?.businessDeliveryTime}
                </p>
              </div>
            )} */}
            {/* <div className="border-b py-7">
              <p className="text-lg gray_color font_regular">Your locality</p>
              <div className="my-5 flex">
                {business?.businessSpecialisation?.length > 0 &&
                  business?.businessSpecialisation?.map((locality: string) => (
                    <TagItem key={locality} title={locality} />
                  ))}
              </div>
            </div> */}
            <div className="my-10">
              <OutlineButton
                title="Edit my business"
                extraClasses="w-52 py-3"
                onClick={openBusinessModal}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-xl input_text mb-3">
            You have not added a business.
          </h2>
          <Button
            title="Add a business"
            extraClasses="py-4"
            onClick={() => openBusinessModal()}
          />
        </div>
      )}

      <Modal
        open={businessModal}
        onClose={closeBusinessModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex">
            <p className="flex-1 text-xl text-center font_bold black2">
              {business ? "Edit" : "Add"} business
            </p>
            <IoMdClose
              size={24}
              color="#8E8E8E"
              className="cursor-pointer"
              onClick={closeBusinessModal}
            />
          </div>
          <div className="my-7">
            <div className="border gray_border_color rounded-lg p-6 flex flex-col items-center justify-center">
              {isLoading ? (
                <ColoredSpinner />
              ) : (
                <>
                  {values?.coverImage ? (
                    <img src={values.coverImage} alt="coverImage" />
                  ) : (
                    <>
                      <BiImages size={28} color="#06c167" />
                      <p className="my-3 text-2xl text-black font_regular">
                        Add a cover image
                      </p>
                    </>
                  )}
                </>
              )}

              <div className="flex mt-5 cursor-pointer">
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
                  className="flex items-center"
                  onClick={() => {
                    if (imageInputRef.current) {
                      imageInputRef.current.click();
                    }
                  }}
                >
                  <p className="text-lg primary_txt_color font_regular text-center mr-3">
                    {values.coverImage
                      ? "Change banner image"
                      : "Add a banner image"}
                  </p>
                  <FiChevronRight size={20} color="#06c167" className="" />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <CustomInput
                type="text"
                placeholder="Business name"
                name="businessName"
                onChange={(e: any) => {
                  if (e.target.value.includes("-")) {
                    setInputError(`Special character "-" not allowed.`);
                  } else {
                    setInputError("");
                  }

                  setFieldValue("businessName", e.target.value);
                }}
                value={values["businessName"]}
                error={inputError}
              />

              {/* <Dropdown
                label="Business city"
                options={CITIES}
                value={businessCity}
                onChange={(v: any) => {
                  setBusinessCity(v);
                  setFieldValue("businessCity", v.value);
                }}
              /> */}
              <CustomInput
                type="dropdown"
                placeholder="Business city"
                name="businessCity"
                options={CITIES}
                onChange={handleChange}
                value={values["businessCity"]}
                error={inputError}
              />

              <AutoCompleteInput
                defaultValue={values["businessAddress"]}
                onSelect={(place: any) => {
                  setFieldValue("businessAddress", place.formatted_address);
                  setFieldValue(
                    "businessLatitude",
                    place?.geometry?.location?.lat()
                  );
                  setFieldValue(
                    "businessLongitude",
                    place?.geometry?.location?.lng()
                  );
                }}
              />

              {/* <CustomInput
                type="dropdown"
                placeholder="Business Delivery Time"
                name="businessDeliveryTime"
                options={DELIVERY_OPTIONS}
                onChange={handleChange}
                value={values["businessDeliveryTime"]}
                error={inputError}
              /> */}

              <div>
                <TextArea
                  placeholder="Tell us about your business"
                  name="businessDescription"
                  onChange={handleChange}
                  extraClasses="h-48"
                  value={values["businessDescription"]}
                />
              </div>

              {/* <Dropdown
                label="Add your locality"
                options={LOCALITY}
                value={businessSpecialisation}
                isMulti
                onChange={(v: any) => {
                  let items = v.map((i: any) => i.value);
                  setBusinessSpecialisation(v);
                  setFieldValue("businessSpecialisation", items);
                }}
              /> */}

              {/* <CustomInput
                type="dropdown"
                placeholder="Add your locality"
                name="businessSpecialisation"
                options={LOCALITY}
                onChange={handleChange}
                value={values["businessSpecialisation"]}
                error={inputError}
              /> */}

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
    </>
  );
};

export default ChefBusiness;
