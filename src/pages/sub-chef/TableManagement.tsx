// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../components/PageTitle";
import ChefDashboardLayout from "../../components/ChefDashboardLayout";
import Button from "../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import { WaiterTableValues } from "../../utils/FormInitialValue";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { WaiterTableInputsSchema } from "../../utils/ValidationSchema";
import { Chip } from "@mui/material";
import EmptyState from "../../components/EmptyState";
import { FaAngleLeft } from "react-icons/fa";
import OutlineButton from "../../components/OutlineButton";
import {
  addTables,
  deleteTables,
  getTables,
  subChefAddTables,
  subChefDeleteTables,
  subChefGetTables,
  subChefUpdateTables,
  updateTables,
} from "../../_redux/table/tableAction";
import { CHEF_ROUTES } from "../../routes/routes";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { getSubChefRestaurantSections } from "../../_redux/section/sectionCrud";

const TableManagement = () => {
  const dispatch = useAppDispatch();

  const { loading, table } = useSelector(
    (state: any) => ({
      table: state.table.table,
      loading: state.table.loading,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(subChefGetTables());
  }, []);

  const [section, setSection] = useState([])

  const fetchSections = async () => {
    await getSubChefRestaurantSections()
    .then(({ data }) => {
      setSection(data.data);
    })
    .catch((err) => {
      const error = err?.response?.data;
      console.log(error);
    });;
  };

  useEffect(() => {
    fetchSections()
  }, []);

  const [togglePassword, setTogglePassword] = useState("password");
  const [editTable, setEditTable] = useState<any>(null);

  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: WaiterTableValues,
    validationSchema: WaiterTableInputsSchema,
    onSubmit: async () => {
      if (editTable) {
        await dispatch(
          subChefUpdateTables(
            values,
            editTable?._id,
            closeOrdersModal,
            resetForm
          )
        );
      } else {
        await dispatch(subChefAddTables(values, closeOrdersModal, resetForm));
      }
      setEditTable(null);
    },
  });

  const [selectedLoading, setSelectedLoading] = useState();

  const deleteTable = async (tableId) => {
    setSelectedLoading(tableId);
    await dispatch(subChefDeleteTables(tableId));
    setTimeout(() => {
      setSelectedLoading();
    }, 1200);
  };

  const [ordersModal, setOrdersModal] = useState(false);
  const openOrdersModal = () => setOrdersModal(true);
  const closeOrdersModal = () => setOrdersModal(false);

  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-y-2 md:gap-y-0">
              <div />

              <div className="flex flex-row justify-start items-center mx-auto md:mx-0">
                <Button
                  title="Create a new table"
                  extraClasses="w-fit p-3 rounded-full"
                  onClick={() => {
                    openOrdersModal();
                    setEditTable(null);
                    setValues(WaiterTableValues);
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="flex flex-col items-center justify-start gap-y-4">
                <div className="w-full h-full">
                  <div className="lg:w-4/5 bg-white rounded-3xl py-8">
                    {table?.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-4 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                        {table?.map((table: any, i: number) => (
                          <div key={i} className="bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1">
                            <div className="flex flex-row items-center justify-between">
                              <div className="flex-1 ">
                                <p className="text-xl text-black font_medium">
                                  {table?.table}
                                </p>
                                <p className="text-md primary_txt_color font_medium ">
                                  {table?.employeeAssigned}
                                </p>
                              </div>
                              <Chip label="Details" size="small" />
                            </div>
                            <div className="mt-3">
                              <Button
                                title="Edit"
                                extraClasses="w-full rounded-full"
                                onClick={() => {
                                  openOrdersModal();
                                  setEditTable(table);
                                  setValues(table);
                                }}
                              />
                              <OutlineButton
                                title="Delete"
                                extraClasses="w-full my-2 rounded-full"
                                loading={selectedLoading === table?._id}
                                onClick={() => {
                                  deleteTable(table?._id);
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <EmptyState title="No Tables yet..." />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADD TABLE */}
          <Modal
            open={ordersModal}
            onClose={closeOrdersModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none overflow-y-scroll">
              <div className="flex flex-col justify-between items-center p-0 h-fit">
                <div
                  className="h-fit my-3 w-full flex flex-col"
                  style={{ minHeight: "80%" }}
                >
                  <div className="flex flex-row w-full py-1 ">
                    <p className="w-10/12 text-center font_medium font-bold text-xl">
                      {editTable ? "Edit Table" : "Add Table"}
                    </p>
                    <div className="w-2/12 flex flex-row items-center justify-center">
                      <IoMdClose
                        size={24}
                        color="#8E8E8E"
                        className="cursor-pointer self-end"
                        onClick={closeOrdersModal}
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-col justify-start items-center h-full w-full mb-5"
                    style={{ minHeight: "80%" }}
                  >
                    <Input
                      type="dropdown"
                      placeholder="Section"
                      name="section"
                      container="w-full"
                      onChange={handleChange}
                      value={values.section}
                      options={
                        section?.length > 0
                          ? section?.map((s) => {
                              return { label: s.name, value: s._id };
                            })
                          : []
                      }
                      error={
                        errors.section && touched.section && errors.section
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Employee assigned"
                      name="employeeAssigned"
                      container="w-full"
                      onChange={handleChange}
                      value={values.employeeAssigned}
                      error={
                        errors.employeeAssigned &&
                        touched.employeeAssigned &&
                        errors.employeeAssigned
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Employee ID"
                      name="employeeID"
                      container="w-full"
                      onChange={handleChange}
                      value={values.employeeID}
                      error={
                        errors.employeeID &&
                        touched.employeeID &&
                        errors.employeeID
                      }
                    />

                    <Input
                      type="text"
                      placeholder="Table"
                      name="table"
                      container="w-full"
                      onChange={handleChange}
                      value={values.table}
                      error={errors.table && touched.table && errors.table}
                    />

                    <Input
                      type="text"
                      placeholder="Whatasapp Number (Optional)"
                      name="whatasappNumber"
                      container="w-full"
                      onChange={handleChange}
                      value={values.whatasappNumber}
                      error={
                        errors.whatasappNumber &&
                        touched.whatasappNumber &&
                        errors.whatasappNumber
                      }
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
                        console.log("togglePassword", togglePassword);
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

export default TableManagement;
