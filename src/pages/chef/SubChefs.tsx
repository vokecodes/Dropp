// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../components/PageTitle";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import Button from "../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import { SubChefValues, WaiterTableValues } from "../../utils/FormInitialValue";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { CreateSubChefSchema } from "../../utils/ValidationSchema";
import EmptyState from "../../components/EmptyState";
import OutlineButton from "../../components/OutlineButton";
import { getChefSubChefsAccount } from "../../_redux/user/userAction";
import { deleteASubChef, registerASubChef } from "../../_redux/user/userCrud";
import { Chip } from "@mui/material";

const SubChefs = () => {
  const dispatch = useAppDispatch();

  const { subChefs } = useSelector(
    (state: any) => ({
      subChefs: state.user.subChefs,
    }),
    shallowEqual
  );

  const [subChefModal, setSubChefModal] = useState(false);
  const openSubChefModal = () => setSubChefModal(true);
  const closeSubChefModal = () => setSubChefModal(false);

  const [selectedSubChef, setSelectedSubChef] = useState<any>(null);
  const [seeSubChefModal, setSeeSubChefModal] = useState(false);
  const openSeeSubChefModal = (subChef: any) => {
    setSeeSubChefModal(true);
    setSelectedSubChef(subChef);
  };
  const closeSeeSubChefModal = () => {
    setSeeSubChefModal(false);
    setSelectedSubChef();
  };

  const [togglePassword, setTogglePassword] = useState("password");

  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: SubChefValues,
    validationSchema: CreateSubChefSchema,
    onSubmit: () => {
      handleAddSubChef();
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectSubChef, setSelectSubChef] = useState();
  const [addErrorMessage, setAddErrorMessage] = useState();

  const handleAddSubChef = async () => {
    setAddErrorMessage();
    setIsLoading(true);
    try {
      const { data } = await registerASubChef(values);

      if (data?.success) {
        closeSubChefModal();
        resetForm();
        dispatch(getChefSubChefsAccount());
      }
    } catch (error) {
      setAddErrorMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubChef = async (subChefId) => {
    setSelectSubChef(subChefId);

    try {
      const { data } = await deleteASubChef(subChefId);

      if (data?.success) {
        dispatch(getChefSubChefsAccount());
      }
    } catch (error) {
    } finally {
      setSelectSubChef();
    }
  };

  useEffect(() => {
    dispatch(getChefSubChefsAccount());
  }, []);

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-y-2 md:gap-y-0">
              <PageTitle
                title="Sub Admins"
                extraClasses="text-center lg:text-start"
              />

              <div className="flex flex-row justify-start items-center mx-auto md:mx-0">
                <Button
                  title="Create a sub admin"
                  extraClasses="w-fit p-3 rounded-full"
                  onClick={() => openSubChefModal()}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="flex flex-col items-center justify-start gap-y-4">
                <div className="bg-white rounded-3xl py-8">
                  {subChefs?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                      {subChefs?.map((subChef: any, i: number) => (
                        <div
                          key={i}
                          className="flex flex-col items-stretch justify-between bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1"
                        >
                          <div className="flex flex-col items-start justify-between h-full">
                            <div className="flex-1 ">
                              <p className="text-xl text-black font_medium">
                                {subChef?.firstName} {subChef?.lastName}
                              </p>
                              <p className="text-md primary_txt_color font_medium ">
                                {subChef?.email}
                              </p>
                            </div>
                            <div className="w-fit h-fit">
                              <Chip label="See details" size="small" className="cursor-pointer bg-black text-white"
                              onClick={() => openSeeSubChefModal(subChef)}
                              />
                            </div>
                          </div>
                          <div className="mt-3">
                            <OutlineButton
                              title="Delete"
                              extraClasses="w-full my-2 rounded-full"
                              loading={selectSubChef === subChef?._id}
                              onClick={() => {
                                deleteSubChef(subChef?._id);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState title="No sub admin added." />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SEE SUB ADMIN DETAILS */}
          <Modal
            open={seeSubChefModal}
            onClose={closeSeeSubChefModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-1/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
              <div className="flex flex-col justify-between items-center p-0 h-full">
                <div className="h-fit my-3 w-full flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="flex-1 text-center font_medium font-bold text-xl">
                      Details
                    </p>
                    <div className="">
                      <IoMdClose
                        size={24}
                        color="#8E8E8E"
                        className="cursor-pointer self-end"
                        onClick={closeSeeSubChefModal}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-start h-full w-full mb-5">
                    <p className="text-lg text-black font_medium">
                      Full name: {selectedSubChef?.firstName}{" "}
                      {selectedSubChef?.lastName}
                    </p>
                    <p className="text-lg text-black font_medium ">
                      Email: {selectedSubChef?.email}
                    </p>
                    <p className="text-lg text-black font_medium ">
                      Password: {selectedSubChef?.passwordText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* ADD SUB ADMIN */}
          <Modal
            open={subChefModal}
            onClose={closeSubChefModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
              <div className="flex flex-col justify-between items-center p-0 h-full">
                <div className="h-fit my-3 w-full flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="flex-1 text-center font_medium font-bold text-xl">
                      Add a sub admin
                    </p>
                    <div className="">
                      <IoMdClose
                        size={24}
                        color="#8E8E8E"
                        className="cursor-pointer self-end"
                        onClick={closeSubChefModal}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-start items-center h-full w-full mb-5">
                    <Input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      container="w-full"
                      onChange={handleChange}
                      value={values.firstName}
                      error={
                        errors.firstName &&
                        touched.firstName &&
                        errors.firstName
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      container="w-full"
                      onChange={handleChange}
                      value={values.lastName}
                      error={
                        errors.lastName && touched.lastName && errors.lastName
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Email"
                      name="email"
                      container="w-full"
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email && touched.email && errors.email}
                    />

                    <Input
                      placeholder="Password"
                      name="password"
                      container="w-full"
                      type={togglePassword}
                      password={true}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        errors.password && touched.password && errors.password
                      }
                      onClickPassword={() => {
                        const localValue = togglePassword;
                        if (localValue === "password") {
                          setTogglePassword("text");
                        } else {
                          setTogglePassword("password");
                        }
                      }}
                    />
                  </div>
                </div>

                {addErrorMessage && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {addErrorMessage}
                  </p>
                )}

                <div className="mt-5 w-full">
                  <div className="w-5/6 mx-auto">
                    <OutlineButton
                      title="Add"
                      extraClasses="w-full p-3 rounded-full"
                      loading={isLoading}
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      </ChefDashboardLayout>
    </>
  );
};

export default SubChefs;
