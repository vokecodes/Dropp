import React, { useEffect, useState, useRef } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { useFormik } from "formik";
import {
  companyCreateEmployees,
  getCompanyEmployees,
} from "../../_redux/employees/employeeAction";
import CompanyDashboardLayout from "./CompanyDashboardLayout";
import EmployeeListItem from "./EmployeeListItem";
import Button from "../../components/Button";
import Input from "../../components/CustomInput";
import PageTitle from "../../components/PageTitle";
import { styled } from "@mui/material/styles";
import { Button as MuiButton } from "@mui/material";
import { Modal } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { BASE_API_URL } from "../../_redux/urls";
import { store } from "../../store";

const CompanyDashboard = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<any>("");
  const [selectedView, setSelectedView] = useState<any>("all");
  const fileInput = useRef<HTMLInputElement>(null);
  const [extras, setExtras] = useState<boolean>(false);

  const { user, payment, wallet, employees, employeeLoading } = useSelector(
    (state: any) => ({
      user: state.user.user,
      payment: state.payment.payment,
      wallet: state.wallet.wallet,
      employees: state.employees.employees,
      employeeLoading: state.employees.loading,
    }),
    shallowEqual
  );

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const VIEWS = ["Active", "Pending", "Frozen"];

  useEffect(() => {
    dispatch(getCompanyEmployees());
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  // INVITE LOGIC
  const [inviteModal, setInviteModal] = useState(false);
  const [inviteSuccessful, setInviteSuccessful] = useState(false);
  const [fileInfo, setFileInfo] = useState<string>("");
  const [fileDetails, setFileDetails] = useState<any>(null);

  const handleInvite = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("csvFile", fileDetails);
    const { auth: user }: any = store.getState();
    const token = user?.user?.token;

    try {
      const { data } = await axios({
        method: "post",
        url: `${BASE_API_URL}/company/employee/csv`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success) {
        successful();
      }
    } catch (error: any) {
      // alert("Something went wrong! Try again and if it persists contact support.")
      alert(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      dispatch(getCompanyEmployees());
    }
  };

  const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    handleChange(e);
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let mails = e?.target?.value?.toString()?.split(",");
    mails = mails
      ?.map((c: string, i: number) => c.trim())
      .filter((c: string, i: number) => c.length > 0 && emailRegex.test(c));
    mails && setAddEmployees(mails);
  };

  const removeEmail = (email: string) => {
    let newArr = addEmployees?.filter((c) => c !== email);
    newArr && setAddEmployees(newArr);

    let regex = new RegExp(email, "g");
    let text = values.emails.replace(regex, "");
    values.emails = text;
  };

  // ADD EMPLOYEE LOGIC
  const [addEmployees, setAddEmployees] = useState<string[] | null>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      emails: "",
    },
    onSubmit: () => {
      setIsLoading(true);
      setErrorMessage("");

      if (fileInfo) {
        setErrorMessage("");
        handleInvite();
        return;
      } else if (addEmployees && addEmployees?.length < 1) {
        setErrorMessage("Employees email is required");
        return;
      } else {
        setErrorMessage("");

        dispatch(
          companyCreateEmployees({ employees: addEmployees }, successful)
        );
      }
    },
  });

  const openModal = (flag: string) => {
    if (flag === "invite") {
      errors.emails = "";
      setErrorMessage("");
      setInviteModal(true);

      values.emails = "";
      setAddEmployees([]);
    }
  };

  const closeModal = (flag: string) => {
    if (flag === "invite") {
      setInviteModal(false);
      setInviteSuccessful(false);
      setExtras(false);
    }
  };

  const successful = () => {
    setInviteSuccessful(true);
    resetForm();
    setFileDetails(null);
  };

  // SEARCH LOGIC
  const [q, setQ] = useState("");

  return (
    <>
      <CompanyDashboardLayout>
        <div className="w-full px-6 py-4" style={{}}>
          <div className="lg:flex">
            <div className="lg:w-full lg:mr-5">
              <div className="flex flex-col md:flex-row justify-start items-center gap-y-5">
                <div className="flex-border-right w-fit">
                  <PageTitle title="Employees" />
                </div>

                <div className="flex-border-right">
                  <button
                    className="primary_bg_color px-4 py-2 text-white rounded-lg w-fit"
                    onClick={() => {
                      openModal("invite");
                    }}
                  >
                    Add&nbsp;a&nbsp;new&nbsp;employee
                  </button>
                </div>

                <div className="w-fit bg-white rounded-full ps-18 pe-20 flex items-center justify-between w-fit">
                  <div className="py-2">
                    <IoSearchSharp color="#D6D6D6" size={20} />
                  </div>
                  <div className="flex-1 ml-4">
                    <input
                      placeholder="Search employees"
                      className="py-2 w-full rounded-full input_text text-md font_regular outline-none"
                      value={q}
                      onChange={(e: any) => {
                        setQ(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="lg:w-4/5 bg-white rounded-3xl py-8 min-w-full mt-5 overflow-x-auto">
                <div
                  className="grid grid-cols-3 items-center justify-items-start lg:justify-between border-b pb-4 gap-x-5 px-8"
                  style={{ minWidth: "800px" }}
                >
                  <p className="text-sm lg:text-base font_regular gray_color">
                    Name & Email
                  </p>

                  <p className="text-sm lg:text-base font_regular gray_color text-start">
                    Balance
                  </p>

                  <div
                    className="justify-self-end flex flex-row flex-none overflow-x-auto rounded-full p-1 items-center"
                    style={{ backgroundColor: "#F0F1F5" }}
                  >
                    <div
                      className={`w-16 lg:w-20 h-8 md:h-10 rounded-full cursor-pointer flex items-center justify-center ${
                        selectedView === "all"
                          ? "primary_bg_color text-white"
                          : "secondary_gray_color text-black"
                      }`}
                      onClick={() => setSelectedView("all")}
                    >
                      <p
                        className={`text-xs lg:text-sm ${
                          selectedView === "all"
                            ? "primary_bg_color text-white"
                            : "secondary_gray_color text-black"
                        }`}
                      >
                        All
                      </p>
                    </div>

                    {VIEWS.map((view: any, index: number) => (
                      <div
                        key={index}
                        className={`w-16 lg:w-20 h-8 md:h-10 rounded-full mx-1 cursor-pointer flex items-center justify-center ${
                          selectedView === view
                            ? "primary_bg_color text-white"
                            : "secondary_gray_color text-black"
                        }`}
                        onClick={() => setSelectedView(view)}
                      >
                        <p
                          className={`text-xs lg:text-sm ${
                            selectedView === view
                              ? "primary_bg_color text-white"
                              : "secondary_gray_color text-black"
                          }`}
                        >
                          {view}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {employees && employees?.length > 0 ? (
                  q.length > 0 ? (
                    employees
                      ?.filter(
                        (em: any) =>
                          em?.employee?.firstName
                            ?.toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1 ||
                          em?.employee?.lastName
                            ?.toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1 ||
                          em?.employee?.email
                            ?.toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                      )
                      .map((e: any, i: number) => (
                        <EmployeeListItem
                          key={i}
                          id={e?._id}
                          email={e?.employee.email}
                          status={e?.status}
                          image={e?.employee?.image}
                          firstName={e?.employee.firstName}
                          lastName={e?.employee.lastName}
                          employeeBalance={e?.employeeBalance}
                          extraClasses={[
                            "grid grid-cols-6 items-center justify-items-start lg:justify-between border-b pb-4 gap-x-5 px-8 break-keep",
                            "flex items-center col-span-2",
                            "text-2xl text-black lg:text-base font_bold text-start justify-self-start col-span-1",
                            "flex flex-nowrap justify-between items-center gap-x-8 lg:gap-x-20 justify-self-end col-span-3",
                          ]}
                          employeeDash={true}
                          selectedView={selectedView}
                        />
                      ))
                  ) : (
                    employees?.map((e: any, i: number) => (
                      <EmployeeListItem
                        key={i}
                        id={e?._id}
                        email={e?.employee.email}
                        status={e?.status}
                        image={e?.employee?.image}
                        firstName={e?.employee.firstName}
                        lastName={e?.employee.lastName}
                        employeeBalance={e?.employeeBalance}
                        preEmail={
                          e?.employee.constructor === String ? e?.employee : ""
                        }
                        extraClasses={[
                          "grid grid-cols-6 items-center justify-items-start lg:justify-between border-b pb-4 gap-x-5 px-8 break-keep",
                          "flex items-center col-span-2",
                          "text-2xl text-black lg:text-base font_bold text-start justify-self-start col-span-1",
                          "flex flex-nowrap justify-between items-center gap-x-8 lg:gap-x-20 justify-self-end col-span-3",
                        ]}
                        employeeDash={true}
                        selectedView={selectedView}
                      />
                    ))
                  )
                ) : (
                  <div className="flex flex-col items-center">
                    <img src="/images/empty-order.svg" alt="empty" />
                    <h2 className="text-xl input_text mb-3">
                      No employees added yet.
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CompanyDashboardLayout>

      {/* INVITE EMPLOYEE */}
      <Modal
        // open={true}
        open={inviteModal}
        onClose={() => {
          closeModal("invite");
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl px-7 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div className="h-fit my-3 w-100 w-full flex flex-col">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Invite Employee
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={() => {
                    closeModal("invite");
                  }}
                />
              </div>

              <div className="w-full">
                {inviteSuccessful ? (
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="my-6 w-28 h-28 rounded-full suc_withdraw_bg flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#E85666"
                        className="w-14 h-14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="my-3 text-3xl text-center font-bold black2">
                      Invitation sent
                    </p>
                    <p className="text-sm text-black font_medium text-center font-semibold">
                      An invite has been sent to your employees.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-full flex flex-col justify-between items-center mb-1">
                      <div className="my-6 w-28 h-28 rounded-full bg_pink flex justify-center items-center">
                        <MdGroups
                          size={65}
                          color="#e85666"
                          className="self-center"
                        />
                      </div>
                    </div>

                    <div className="text-center px-3 font-sans mb-6">
                      <h3 className="font-bold text-2xl mb-3">
                        Enter your employees email to invite them
                      </h3>
                      <p className="font-semibold secondary_gray_color text-xs">
                        You can put multiple employee email addresses seperated
                        by commas to send bulk invitations.
                      </p>
                    </div>

                    <div>
                      <div>
                        <Input
                          type="text"
                          placeholder="Enter email address"
                          name="emails"
                          onChange={(e: any) => {
                            handleInviteChange(e);
                          }}
                          value={values.emails}
                          extraClasses="overflow-x-scroll"
                        />

                        {errors?.emails && (
                          <p className="text-sm text-center text-red-600 my-2">
                            {errors?.emails}
                          </p>
                        )}

                        {errorMessage && (
                          <p className="text-sm text-center text-red-600 my-2">
                            {errorMessage}
                          </p>
                        )}
                      </div>

                      <div>
                        {addEmployees && addEmployees?.length > 0 ? (
                          <div
                            className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                            style={{ maxHeight: "250px" }}
                          >
                            {addEmployees?.map((email: any, i: number) => (
                              <>
                                <div className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full">
                                  <div className="flex flex-row justify-between items-center">
                                    <div className="ml-3 flex flex-row justify-between items-center">
                                      <p className="text-xs font-bold font_regular text-black">
                                        {email}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <AiFillCloseCircle
                                      size={24}
                                      color="#fff"
                                      className="cursor-pointer hover:text-red-600"
                                      onClick={() => {
                                        removeEmail(email);
                                      }}
                                    />
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col justify-around items-center gap-y-5">
                            <p className="font-semibold secondary_gray_color text-sm">
                              Or import employees data
                            </p>
                            <MuiButton
                              component="label"
                              variant="outlined"
                              sx={[
                                {
                                  border: "2px solid #e85666",
                                  borderRadius: "50px",
                                  color: extras ? "#ffffff" : "initial",
                                  fontWeight: "bold",
                                  textTransform: "none",
                                  paddingX: "30px",
                                  backgroundColor: extras
                                    ? "#e85666"
                                    : "initial",
                                  "&:hover": {
                                    color: "#4e0b2b",
                                    backgroundColor: "#f1f1f1",
                                  },
                                },
                              ]}
                            >
                              Upload csv
                              <VisuallyHiddenInput
                                ref={fileInput}
                                type="file"
                                accept=".csv"
                                onChange={(e: any) => {
                                  setFileInfo(e.target?.files[0].name);
                                  setExtras(true);
                                  setFileDetails(e.target?.files[0]);
                                }}
                              />
                            </MuiButton>

                            {fileInfo && (
                              <p className="font-semibold text-green-500 text-sm my-2">
                                Selected File: {fileInfo}
                              </p>
                            )}

                            <div className="text-red-500 text-center space-y-3">
                              <p className="font-semibold text-sm">
                                The csv file must contain an “email” row
                              </p>
                              <a
                                href="/files/Homemade_sample.csv"
                                download="Homemade_sample"
                                target="_blank"
                                className="cursor-pointer decoration-1 underline decoration-red-500"
                              >
                                <p className="font-semibold text-sm">
                                  Click to download sample csv file
                                !</p>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="my-6 w-full">
              {inviteSuccessful ? (
                <div className="absolute bottom-10 w-5/6">
                  <Button
                    title="Done"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={() => {
                      closeModal("invite");
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-between items-center gap-y-3">
                  <Button
                    loading={isLoading}
                    title="Proceed"
                    extraClasses="w-full p-3 rounded-lg"
                    onClick={() => handleSubmit()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CompanyDashboard;
