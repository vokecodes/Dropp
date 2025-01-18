// @ts-nocheck
import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import PageTitle from "../../../components/PageTitle";
import Button from "../../../components/Button";
import Modal from "@mui/material/Modal";
import { IoMdClose } from "react-icons/io";
import Input from "../../../components/CustomInput";
import {
  cashierValues,
  QsrSubAdminValues,
  terminalValues,
} from "../../../utils/FormInitialValue";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../redux/hooks";
import {
  CashierInputsSchema,
  CreateQsrSubAdminSchema,
  TerminalInputsSchema,
} from "../../../utils/ValidationSchema";
import { Chip, FormControlLabel, ListItemText } from "@mui/material";
import EmptyState from "../../../components/EmptyState";
import { FaAngleLeft } from "react-icons/fa";
import OutlineButton from "../../../components/OutlineButton";
import { CHEF_ROUTES } from "../../../routes/routes";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { getSections } from "../../../_redux/section/sectionAction";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import QsrDashboardLayout from "../../../components/QsrDashboardLayout";
import {
  addCashier,
  addTerminal,
  deleteCashier,
  deleteTerminal,
  getCashier,
  getTerminals,
  updateCashier,
  updateTerminal,
} from "../../../_redux/cashier/cashierAction";
import { getQsrSubAdminAccount } from "../../../_redux/user/userAction";
import {
  deleteAQsrSubAdmin,
  registerAQsrSubAdmin,
} from "../../../_redux/user/userCrud";
import { uuidGen } from "../../../utils/formatMethods";

const USER_TABS = ["Sub-Admins", "Cashiers", "Terminals"];

const SuperAdminCashiers = () => {
  const dispatch = useAppDispatch();

  const {
    loading,
    cashiers,
    section,
    subAdmins,
    cashierError,
    subAdminError,
    terminals,
    terminalError,
  } = useSelector(
    (state: any) => ({
      cashiers: state.cashier.cashiers,
      subAdmins: state.user.subAdmins,
      loading: state.cashier.loading,
      cashierError: state.cashier.error,
      subAdminError: state.user.error,
      terminals: state.cashier.terminals,
      terminalError: state.cashier.terminalError,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getCashier());
    dispatch(getQsrSubAdminAccount());
    dispatch(getTerminals());
  }, []);

  const [selectedTab, setSelectedTab] = useState(USER_TABS[0]);

  const [togglePassword, setTogglePassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState();
  const [selectedLoading, setSelectedLoading] = useState();
  const [cashierType, setCashierType] = useState("Sub-Admin");
  const [placed, setPlaced] = useState(false);
  const openModal = () => setPlaced(true);
  const closeModal = () => setPlaced(false);

  // CASHIER
  const [openEditCashier, setOpenEditCashier] = useState<any>(null);
  const [editCashier, setEditCashier] = useState<any>(null);
  const [ordersModal, setOrdersModal] = useState(false);
  const openOrdersModal = () => setOrdersModal(true);
  const closeOrdersModal = () => setOrdersModal(false);
  const [selectedCashier, setSelectedCashier] = useState();
  const [openDetails, setOpenDetails] = useState(false);
  const closeOpenDetails = () => setOpenDetails(false);

  // TERMINAL
  const [openEditTerminal, setOpenEditTerminal] = useState<any>(null);
  const [editTerminal, setEditTerminal] = useState<any>(null);
  const [terminalModal, setTerminalModal] = useState(false);
  const openTerminalModal = () => setTerminalModal(true);
  const closeTerminalModal = () => setTerminalModal(false);

  // SUBADMIN
  const [editSubAdmin, setEditSubAdmin] = useState<any>(null);
  const [showSubAdmin, setShowSubAdmin] = useState(false);
  const [subAdminModal, setSubAdminModal] = useState(false);
  const openSubAdminModal = () => setSubAdminModal(true);
  const closeSubAdminModal = () => setSubAdminModal(false);
  const [selectSubAdmin, setSelectSubAdmin] = useState();
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<any>(null);
  const [seeSubAdminModal, setSeeSubAdminModal] = useState(false);
  const openSeeSubAdminModal = (subAdmin: any) => {
    setSeeSubAdminModal(true);
    setSelectedSubAdmin(subAdmin);
  };
  const closeSeeSubAdminModal = () => {
    setSeeSubAdminModal(false);
    setSelectedSubAdmin();
  };

  const {
    handleChange,
    handleSubmit,
    values,
    setValues,
    setFieldValue,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: subAdminModal
      ? QsrSubAdminValues
      : terminalModal
      ? terminalValues
      : cashierValues,
    validationSchema: subAdminModal
      ? CreateQsrSubAdminSchema
      : terminalModal
      ? TerminalInputsSchema
      : CashierInputsSchema,
    onSubmit: async () => {
      if (subAdminModal) {
        handleAddSubAdmin();
      } else if (terminalModal) {
        if (openEditTerminal) {
          await dispatch(
            updateTerminal(
              values,
              editTerminal?._id,
              closeTerminalModal,
              resetForm
            )
          );
        } else {
          setCashierType('Terminal');
          await dispatch(
            addTerminal(values, closeTerminalModal, resetForm, openModal)
          );
        }
      } else {
        if (openEditCashier) {
          await dispatch(
            updateCashier(values, editCashier?._id, closeOrdersModal, resetForm)
          );
        } else {
          setCashierType('Cashier');
          await dispatch(
            addCashier(values, closeOrdersModal, resetForm, openModal)
          );
        }
      }
      setOpenEditCashier(false);
      setEditCashier(null);
    },
  });

  const deleteACashier = async (tableId) => {
    setSelectedLoading(tableId);
    await dispatch(deleteCashier(tableId));
    setTimeout(() => {
      setSelectedLoading();
    }, 1200);
  };

  const deleteATerminal = async (tableId) => {
    setSelectedLoading(tableId);
    await dispatch(deleteTerminal(tableId));
    setTimeout(() => {
      setSelectedLoading();
    }, 1200);
  };

  const handleAddSubAdmin = async () => {
    setAddErrorMessage();
    setIsLoading(true);
    try {
      const { data } = await registerAQsrSubAdmin(values);

      if (data?.success) {
        closeSubAdminModal();
        resetForm();
        dispatch(getQsrSubAdminAccount());
        setCashierType('Sub-Admin');
        openModal();
      }
    } catch (error) {
      setAddErrorMessage(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSubAdmin = async (subAdminId) => {
    setSelectSubAdmin(subAdminId);

    try {
      const { data } = await deleteAQsrSubAdmin(subAdminId);

      if (data?.success) {
        dispatch(getQsrSubAdminAccount());
      }
    } catch (error) {
    } finally {
      setSelectSubAdmin();
    }
  };

  return (
    <>
      <QsrDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="flex flex-col md:flex-row w-full justify-between gap-y-2 md:gap-y-0">
              <PageTitle
                title="Cashiers"
                extraClasses="text-center lg:text-start"
              />

              <div className="flex flex-col lg:flex-row justify-start items-center gap-x-3 gap-y-3 mx-auto md:mx-0">
                <OutlineButton
                  title="Create Sub-Admin"
                  extraClasses="w-full my-2 rounded-full"
                  blackTrue={true}
                  onClick={() => {
                    setShowSubAdmin(true);
                    openSubAdminModal();
                    setEditSubAdmin(null);
                    setValues(QsrSubAdminValues);
                  }}
                />

                <Button
                  title="Create Cashier"
                  extraClasses="w-fit p-3 rounded-full"
                  onClick={() => {
                    openOrdersModal();
                    setEditCashier(null);
                    setValues(cashierValues);
                    setOpenEditCashier(null)
                  }}
                />

                <OutlineButton
                  title="Create Terminal"
                  extraClasses="w-fit p-3 rounded-full"
                  onClick={() => {
                    openTerminalModal();
                    setEditTerminal(null);
                    setValues(terminalValues);
                    setOpenEditTerminal(null)
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              <div className="flex flex-col items-center justify-start gap-y-4">
                <div className="w-full h-full">
                  <div className="lg:w-4/5">
                    <div className="w-full flex flex-row items-center justify-start gap-x-3 my-2">
                      {USER_TABS.map((tab: any, i: number) => (
                        <span
                          key={uuidGen()}
                          className={`rounded-full px-3 py-1 cursor-pointer font_medium ${
                            selectedTab === tab
                              ? "primary_bg_color text-white"
                              : "bg-[#EDECEC]"
                          }`}
                          onClick={() => setSelectedTab(tab)}
                        >
                          {tab}
                        </span>
                      ))}

                      {/* <span
                        className={`rounded-full px-3 py-1 cursor-pointer font_medium ${
                          showSubAdmin
                            ? "bg-[#EDECEC]"
                            : "primary_bg_color text-white"
                        }`}
                        onClick={() => setShowSubAdmin(false)}
                      >
                        Cashiers
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 cursor-pointer font_medium ${
                          showSubAdmin
                            ? "primary_bg_color text-white"
                            : "bg-[#EDECEC]"
                        }`}
                        onClick={() => setShowSubAdmin(true)}
                      >
                        Sub admin
                      </span> */}
                    </div>

                    {selectedTab === USER_TABS[0] && (
                      <>
                        {subAdmins?.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                            {subAdmins?.map((subAdmin: any, i: number) => (
                              <div
                                key={i}
                                className="flex flex-col items-stretch justify-between bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1"
                              >
                                <div className="flex flex-col items-start justify-between h-full">
                                  <div className="flex-1 ">
                                    <p className="text-xl text-black font_medium">
                                      {subAdmin?.firstName} {subAdmin?.lastName}
                                    </p>
                                    <p className="text-md primary_txt_color font_medium ">
                                      {subAdmin?.email}
                                    </p>
                                  </div>
                                  <div className="w-fit h-fit">
                                    <Chip
                                      label="See details"
                                      size="small"
                                      className="cursor-pointer bg-black text-white"
                                      onClick={() =>
                                        openSeeSubAdminModal(subAdmin)
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <OutlineButton
                                    title="Delete"
                                    extraClasses="w-full my-2 rounded-full"
                                    loading={selectSubAdmin === subAdmin?._id}
                                    onClick={() => {
                                      deleteSubAdmin(subAdmin?._id);
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <EmptyState title="No Sub-Admins created..." />
                        )}
                      </>
                    )}

                    {selectedTab === USER_TABS[1] && (
                      <>
                        {cashiers?.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                            {cashiers?.map((cashier: any, i: number) => (
                              <div
                                key={i}
                                className="flex flex-col items-stretch justify-between bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1"
                              >
                                <div className="flex flex-row items-center justify-between">
                                  <div className="flex-1 ">
                                    <p className="text-xl text-black font_medium">
                                      {cashier?.employeeName}
                                    </p>
                                    <p className="text-md primary_txt_color font_medium ">
                                      Cashiers
                                    </p>
                                  </div>

                                  <div className="flex flex-col items-right justify-start gap-y-2">
                                    <Chip
                                      label="Details"
                                      size="small"
                                      onClick={() => {
                                        setSelectedCashier(cashier);
                                        setOpenDetails(true);
                                      }}
                                    />

                                    {cashier.isSubAdmin && (
                                      <Chip label="Sub Admin" size="small" />
                                    )}
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <Button
                                    title="Edit"
                                    extraClasses="w-full !rounded-full !py-1"
                                    onClick={() => {
                                      openOrdersModal();
                                      setEditCashier(cashier);
                                      setOpenEditCashier(true);
                                      setValues(cashier);
                                    }}
                                  />
                                  <OutlineButton
                                    title="Delete"
                                    extraClasses="w-full my-2 !rounded-full !py-1"
                                    loading={selectedLoading === cashier?._id}
                                    onClick={() => {
                                      deleteACashier(cashier?._id);
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <EmptyState title="No Cashiers created..." />
                        )}
                      </>
                    )}

                    {selectedTab === USER_TABS[2] && (
                      <>
                        {terminals?.length > 0 ? (
                          <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                            {terminals?.map((terminal: any, i: number) => (
                              <div
                                key={i}
                                className="flex flex-col items-stretch justify-between bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1"
                              >
                                <div className="flex flex-row items-center justify-between">
                                  <div className="flex-1 ">
                                    <p className="text-xl text-black font_medium">
                                      {terminal?.employeeName}
                                    </p>
                                    <p className="text-md primary_txt_color font_medium ">
                                      Terminals
                                    </p>
                                  </div>

                                  <div className="flex flex-col items-right justify-start gap-y-2">
                                    <Chip
                                      label="Details"
                                      size="small"
                                      onClick={() => {
                                        setSelectedCashier(terminal);
                                        setOpenDetails(true);
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <Button
                                    title="Edit"
                                    extraClasses="w-full !rounded-full !py-1"
                                    onClick={() => {
                                      setEditTerminal(terminal);
                                      setValues(terminal);
                                      openTerminalModal();
                                      setOpenEditTerminal(true);
                                    }}
                                  />
                                  <OutlineButton
                                    title="Delete"
                                    extraClasses="w-full my-2 !rounded-full !py-1"
                                    loading={selectedLoading === terminal?._id}
                                    onClick={() => {
                                      deleteATerminal(terminal?._id);
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <EmptyState title="No Terminal created..." />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADD CASHIER */}
          <Modal
            open={ordersModal}
            onClose={closeOrdersModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-4/5 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none overflow-y-scroll">
              <div className="flex flex-col justify-between items-center p-0 h-fit">
                <div
                  className="h-fit my-3 w-full flex flex-col"
                  style={{ minHeight: "80%" }}
                >
                  <div className="flex flex-row w-full py-1 ">
                    <p className="w-10/12 text-center font_medium font-bold text-xl">
                      {openEditCashier ? "Edit Cashier" : "Add Cashier"}
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
                      type="text"
                      placeholder="Cashier Name"
                      name="employeeName"
                      container="w-full"
                      onChange={handleChange}
                      value={values.employeeName}
                      error={
                        errors.employeeName &&
                        touched.employeeName &&
                        errors.employeeName
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
                      placeholder="Whatasapp Number (Optional)"
                      name="whatsappNumber"
                      container="w-full"
                      onChange={handleChange}
                      value={values.whatsappNumber}
                      error={
                        errors.whatsappNumber &&
                        touched.whatsappNumber &&
                        errors.whatsappNumber
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

                {cashierError && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {cashierError}
                  </p>
                )}

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

          {/* ADD TERMINAL */}
          <Modal
            open={terminalModal}
            onClose={closeTerminalModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-4/5 -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none overflow-y-scroll">
              <div className="flex flex-col justify-between items-center p-0 h-fit">
                <div
                  className="h-fit my-3 w-full flex flex-col"
                  style={{ minHeight: "80%" }}
                >
                  <div className="flex flex-row w-full py-1 ">
                    <p className="w-10/12 text-center font_medium font-bold text-xl">
                      {openEditTerminal ? "Edit Terminal" : "Add Terminal"}
                    </p>
                    <div className="w-2/12 flex flex-row items-center justify-center">
                      <IoMdClose
                        size={24}
                        color="#8E8E8E"
                        className="cursor-pointer self-end"
                        onClick={closeTerminalModal}
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-col justify-start items-center h-full w-full mb-5"
                    style={{ minHeight: "80%" }}
                  >
                    <Input
                      type="text"
                      placeholder="Terminal"
                      name="terminal"
                      container="w-full"
                      onChange={handleChange}
                      value={values.terminal}
                      error={
                        errors.terminal && touched.terminal && errors.terminal
                      }
                    />
                    <Input
                      type="text"
                      placeholder="Cashier name"
                      name="employeeName"
                      container="w-full"
                      onChange={handleChange}
                      value={values.employeeName}
                      error={
                        errors.employeeName &&
                        touched.employeeName &&
                        errors.employeeName
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

                {terminalError && (
                  <p className="text-sm text-center text-red-600 my-2">
                    {terminalError}
                  </p>
                )}

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

          <Modal
            open={openDetails}
            onClose={closeOpenDetails}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-1/3 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
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
                        onClick={closeOpenDetails}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-start h-full w-full mb-5">
                    <p className="text-lg text-black font_medium">
                      Cashier Name: {selectedCashier?.employeeName}
                    </p>
                    <p className="text-lg text-black font_medium ">
                      Cashier ID: {selectedCashier?.employeeID}
                    </p>
                    {selectedCashier?.whatsappNumber && (
                      <p className="text-lg text-black font_medium ">
                        Whatsapp Number: {selectedCashier?.whatsappNumber}
                      </p>
                    )}
                    <p className="text-lg text-black font_medium ">
                      Password: {selectedCashier?.password}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* SEE SUB ADMIN DETAILS */}
          <Modal
            open={seeSubAdminModal}
            onClose={closeSeeSubAdminModal}
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
                        onClick={closeSeeSubAdminModal}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-start h-full w-full mb-5">
                    <p className="text-lg text-black font_medium">
                      Full Name: {selectedSubAdmin?.firstName}{" "}
                      {selectedSubAdmin?.lastName}
                    </p>
                    <p className="text-lg text-black font_medium ">
                      Email: {selectedSubAdmin?.email}
                    </p>
                    <p className="text-lg text-black font_medium ">
                      Password: {selectedSubAdmin?.passwordText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* ADD SUB ADMIN */}
          <Modal
            open={subAdminModal}
            onClose={closeSubAdminModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-4 lg:p-7 my-10 outline-none">
              <div className="flex flex-col justify-between items-center p-0 h-full">
                <div className="h-fit my-3 w-full flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="flex-1 text-center font_medium font-bold text-xl">
                      Add Sub-Admin
                    </p>
                    <div className="">
                      <IoMdClose
                        size={24}
                        color="#8E8E8E"
                        className="cursor-pointer self-end"
                        onClick={closeSubAdminModal}
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

          {/* ORDER PLACED MODAL */}
          <Modal
            open={placed}
            onClose={() => {
              closeModal();
            }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex flex-col justify-between items-center p-0 h-full">
                <div className="h-fit my-3 w-100 w-full flex flex-col gap-y-10 min-h-60% lg:min-h-[80%]">
                  <div className="flex">
                    <p className="flex-1 text-xl text-center font_bold black2"></p>
                    <IoMdClose
                      size={24}
                      color="#8E8E8E"
                      className="cursor-pointer"
                      onClick={() => {
                        closeModal();
                      }}
                    />
                  </div>

                  <div className="flex flex-col justify-center items-center h-full w-full mb-5 h-fit lg:min-h-[80%]">
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="my-6 w-20 lg:w-28 h-20 lg:h-28 border-8 primary_border_color rounded-full flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="#06c167"
                          className="w-10 lg:w-14 h-10 lg:h-14"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="my-3 text-lg lg:text-xl text-center font_bold black2">
                        { cashierType } created successfully!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-3 lg:my-10 w-full">
                  <Button
                    title="Done"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={() => closeModal()}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      </QsrDashboardLayout>
    </>
  );
};

export default SuperAdminCashiers;
