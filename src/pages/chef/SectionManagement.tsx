// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../components/PageTitle";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import Button from "../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import { SectionValues } from "../../utils/FormInitialValue";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { SectionInputsSchema } from "../../utils/ValidationSchema";
import EmptyState from "../../components/EmptyState";
import OutlineButton from "../../components/OutlineButton";
import { CHEF_ROUTES } from "../../routes/routes";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { addSection, getSections } from "../../_redux/section/sectionAction";

const SectionManagement = () => {
  const dispatch = useAppDispatch();

  const { loading, section } = useSelector(
    (state: any) => ({
      section: state.section.section,
      loading: state.section.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getSections());
  }, []);

  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: SectionValues,
    validationSchema: SectionInputsSchema,
    onSubmit: async () => {
      await dispatch(addSection(values, closeSectionModal, resetForm));
    },
  });

  const [selectedLoading, setSelectedLoading] = useState();

  const deleteSection = async (sectionId) => {
    setSelectedLoading(sectionId);
    await dispatch(deleteSection(sectionId));
    setTimeout(() => {
      setSelectedLoading();
    }, 1200);
  };

  const [sectionModal, setSectionModal] = useState(false);
  const openSectionModal = () => setSectionModal(true);
  const closeSectionModal = () => setSectionModal(false);

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-y-2 md:gap-y-0">
              <Link to={CHEF_ROUTES.linkChefDineIn}>
                <div className="flex flex-row items-center cursor-pointer">
                  <MdOutlineArrowBackIosNew size={20} className="mr-3" />
                  <PageTitle title="Back" />
                </div>
              </Link>

              <div className="flex flex-row justify-start items-center mx-auto md:mx-0">
                <Button
                  title="Create a section"
                  extraClasses="w-fit p-3 rounded-full"
                  onClick={() => {
                    openSectionModal();
                    setValues(SectionValues);
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="flex flex-col items-center justify-start gap-y-4">
                <div className="w-full h-full">
                  <div className="lg:w-4/5 bg-white rounded-3xl py-8">
                    {section?.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                        {section?.map((section: any, i: number) => (
                          <div className="flex flex-col items-stretch justify-between bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1">
                            <div className="flex flex-row items-center justify-between">
                              <div className="flex-1 ">
                                <p className="text-xl text-black font_medium">
                                  {section?.name}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <OutlineButton
                                title="Delete"
                                extraClasses="w-full my-2 rounded-full"
                                loading={selectedLoading === section?._id}
                                onClick={() => {
                                  deleteSection(section?._id);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState title="No section created" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADD SECTION */}
          <Modal
            open={sectionModal}
            onClose={closeSectionModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-2/4 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none overflow-y-scroll">
              <div className="flex flex-col justify-between items-center p-0 h-fit">
                <div
                  className="h-fit my-3 w-full flex flex-col"
                  style={{ minHeight: "80%" }}
                >
                  <div className="flex flex-row w-full py-1 ">
                    <p className="w-10/12 text-center font_medium font-bold text-xl">
                      Add Section
                    </p>
                    <div className="w-2/12 flex flex-row items-center justify-center">
                      <IoMdClose
                        size={24}
                        color="#8E8E8E"
                        className="cursor-pointer self-end"
                        onClick={closeSectionModal}
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-col justify-start items-center h-full w-full mb-5"
                    style={{ minHeight: "80%" }}
                  >
                    <Input
                      type="text"
                      placeholder="Name"
                      name="name"
                      container="w-full"
                      onChange={handleChange}
                      value={values.name}
                      error={errors.name && touched.name && errors.name}
                    />
                  </div>
                </div>

                <div className="mt-5 w-full">
                  <div className="w-5/6 mx-auto">
                    <OutlineButton
                      title="Save"
                      extraClasses="w-full p-3 rounded-full"
                      loading={loading}
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

export default SectionManagement;
