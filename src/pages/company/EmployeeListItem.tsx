import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiSolidTrash } from "react-icons/bi";
import { PiDotsThreeBold } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { EmployeeItemProps } from "../../utils/Interfaces";
import { useAppDispatch } from "../../redux/hooks";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import { Modal } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import Input from "../../components/CustomInput";
import Button from "../../components/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fundEmployeesCompany,
  removeEmployeesCompany,
  freezeEmployeesCompany,
  unfreezeEmployeesCompany,
} from "../../_redux/employees/employeeCrud";
import { getCompanyEmployees } from "../../_redux/employees/employeeAction";

const EmployeeListItem = ({
  id,
  email,
  status,
  firstName,
  lastName,
  employeeBalance,
  image,
  extraClasses,
  homeDash,
  employeeDash,
  selectedView,
  preEmail,
}: EmployeeItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedOrder, setSelectedOrder] = useState<any>();

  const [isLoading, setIsLoading] = useState(false);

  const openModal = (flag: string) => {
    if (flag === "fund") setFundEmployeeModal(true);
    if (flag === "freeze") setFreezeEmployeeModal(true);
    if (flag === "remove") setRemoveEmployeeModal(true);
  };

  const closeModal = (flag: string) => {
    if (flag === "fund") {
      setFundEmployeeModal(false);
      setFundingSuccessful(false);
      values.amount = "";
    }
    if (flag === "freeze") {
      setFreezeEmployeeModal(false);
      setFreezeSuccessful(false);
    }
    if (flag === "remove") {
      setRemoveEmployeeModal(false);
      setRemoveSuccessful(false);
    }

    dispatch(getCompanyEmployees());
  };

  // FREEZE LOGIC
  // TEMP
  const [frozen, setFrozen] = useState(status == "freeze");

  useEffect(() => {}, [frozen]);

  const [freezeEmployeeModal, setFreezeEmployeeModal] = useState(false);
  const [freezeSuccessful, setFreezeSuccessful] = useState(false);

  const handleFreeze = async () => {
    setIsLoading(true);

    try {
      const { data } = frozen
        ? await unfreezeEmployeesCompany({
            employeeId: id,
          })
        : await freezeEmployeesCompany({
            employeeId: id,
          });
      setFreezeSuccessful(true);
      setFrozen(!frozen);
    } catch (error) {
      alert("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // REMOVE LOGIC
  const [removeEmployeeModal, setRemoveEmployeeModal] = useState(false);
  const [removeSuccessful, setRemoveSuccessful] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      const { data } = await removeEmployeesCompany(id);
      setRemoveSuccessful(true);
    } catch (error) {
      alert("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // FUND WALLET LOGIC
  const [fundEmployeeModal, setFundEmployeeModal] = useState(false);

  const [fundingSuccessful, setFundingSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleFundEmployee = async () => {
    setIsLoading(true);

    try {
      const { data } = await fundEmployeesCompany({
        employees: [id],
        amount: values.amount,
      });
      setFundingSuccessful(true);
    } catch (error) {
      alert("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().required().positive().integer(),
    }),
    onSubmit: () => {
      setErrorMessage("");

      if (parseFloat(values.amount) < 1000) {
        setErrorMessage("Minimum amount is ₦1,000.");
        return;
      }

      if (/\D/g.test(values.amount)) {
        setErrorMessage("Only numbers allowed");
        return;
      }

      handleFundEmployee();
    },
  });

  return (
    <>
      <div
        className={`my-7 ${
          selectedView === "Active" && preEmail !== ""
            ? "hidden"
            : selectedView === "Frozen" && status !== "freeze"
            ? "hidden"
            : selectedView === "Pending" && !!firstName
            ? "hidden"
            : ""
        }`}
      >
        <div className="block">
          <div
            className={extraClasses[0]}
            style={{ minWidth: `${homeDash ? "500px" : "800px"}` }}
          >
            <div className={extraClasses[1]}>
              <div className="w-fit h-fit m-0 p-0 rounded-full">
                {image ? (
                  <img
                    src={`${image}`}
                    alt="employee"
                    className="rounded-full w-14 h-14 p-2"
                  />
                ) : (
                  <CiUser className="w-14 h-14 p-2" color="#06c167" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-base font-bold font_regular text-black">
                  {preEmail && preEmail.length > 0 ? (
                    <span className="text-red-300">User not registered!</span>
                  ) : (
                    `${firstName} ${lastName}`
                  )}
                </p>
                <p className="text-sm font_regular sec_gray_color">
                  {preEmail && preEmail.length > 0 ? preEmail : email}
                </p>
              </div>
            </div>

            <p className={`${extraClasses[2]}`}>
              {formatRemoteAmountKobo(employeeBalance).naira}
              {formatRemoteAmountKobo(employeeBalance).kobo}
            </p>

            {employeeDash && (
              <div className={extraClasses[3]}>
                <button
                  className="px-2 md:px-3 py-1 md:py-2 text-xs text-white rounded-lg cursor-pointer"
                  disabled={preEmail && preEmail.length > 0 ? true : false}
                  style={{
                    backgroundColor:
                      preEmail && preEmail.length > 0
                        ? "rgb(0 0 0 / 53%)"
                        : "#000",
                  }}
                  onClick={() => openModal("fund")}
                >
                  Fund&nbsp;Balance
                </button>

                <div className="flex flex-nowrap justify-between items-center gap-x-4 lg:gap-x-5">
                  <button
                    className="flex flex-row flex-nowrap justify-between items-center px-2 md:px-3 py-1 md:py-2 text-xs text-white rounded-lg gap-x-2 cursor-pointer"
                    disabled={preEmail && preEmail.length > 0 ? true : false}
                    style={{
                      backgroundColor:
                        preEmail && preEmail.length > 0
                          ? "rgb(242 249 254 / 48%)"
                          : "rgb(217 238 252)",
                      color: "#61676A",
                    }}
                    onClick={() => {
                      openModal("freeze");
                    }}
                  >
                    {!frozen ? "Freeze" : "Unfreeze"}
                    {!frozen ? (
                      <AiFillPauseCircle color="#61676A" size={20} />
                    ) : (
                      <AiFillPlayCircle color="#61676A" size={20} />
                    )}
                  </button>

                  <button
                    className="flex flex-row flex-nowrap justify-between items-center px-2 md:px-3 py-1 md:py-2 text-xs text-white rounded-lg gap-x-2 hover:bg-cyan-600 cursor-pointer"
                    style={{ backgroundColor: "#FFF4F6", color: "#FF001C" }}
                    onClick={() => openModal("remove")}
                  >
                    <BiSolidTrash color="#FF001C" size={20} />
                    Remove
                  </button>
                </div>
              </div>
            )}

            {homeDash && (
              <div className={extraClasses[3]}>
                <div
                  className="cursor-pointer rounded-full p-1"
                  style={{ backgroundColor: "#EDEDED", height: "fit-content" }}
                >
                  <PiDotsThreeBold
                    color="#000"
                    size={32}
                    onClick={() => console.log("info")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FUND EMPLOYEE */}
      <Modal
        // open={true}
        open={fundEmployeeModal}
        onClose={() => {
          closeModal("fund");
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div
              className="h-fit my-3 w-100 w-full flex flex-col gap-y-10"
              style={{ minHeight: "80%" }}
            >
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Fund Employee
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={() => {
                    closeModal("fund");
                  }}
                />
              </div>

              <div
                className="flex flex-col justify-center items-center h-full w-full mb-5"
                style={{ minHeight: "80%" }}
              >
                {fundingSuccessful ? (
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="my-6 w-28 h-28 rounded-full suc_withdraw_bg flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#06c167"
                        className="w-14 h-14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="my-3 text-xl text-center font_bold black2">
                      Funding successful
                    </p>
                    <p className="text-lg text-black font_medium text-center">
                      <span className="font_bold">
                        ₦{formatPrice(values.amount)}
                      </span>{" "}
                      has been added to <br /> {firstName}'s wallet balance.
                    </p>

                    {/* <div className="absolute bottom-10 w-5/6 left-8 lg:left-12">
                      <Button
                        title="Done"
                        extraClasses="w-full p-3 rounded-full"
                        onClick={() => closeEmployeeWalletModal()}
                      />
                    </div> */}
                  </div>
                ) : (
                  <>
                    <div className="w-full flex flex-col justify-between items-center gap-y-2">
                      <div className="mb-5 border-8 w-fit h-fit rounded-full flex justify-center items-center">
                        {image ? (
                          <img
                            src={image}
                            alt="food"
                            className="w-20 h-20 rounded-full"
                          />
                        ) : (
                          <CiUser
                            className="w-14 h-14 p-2"
                            size={28}
                            color="#06c167"
                          />
                        )}
                      </div>
                      <p className="font-semibold text-xl">
                        {firstName} {lastName}
                      </p>
                      <p className="font-light text-gray-500 text-base">
                        {email}
                      </p>
                    </div>

                    <div className="w-full h-fit">
                      <Input
                        type="number"
                        placeholder="Amount"
                        name="amount"
                        onChange={handleChange}
                        value={values.amount}
                      />

                      {errors?.amount && (
                        <p className="text-sm text-center text-red-600 my-2">
                          {errors?.amount}
                        </p>
                      )}

                      {errorMessage && (
                        <p className="text-sm text-center text-red-600 my-2">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 w-full">
              {fundingSuccessful ? (
                <div className="absolute bottom-10 w-5/6">
                  <Button
                    title="Done"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={() => closeModal("fund")}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    loading={isLoading}
                    title="Proceed"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={handleSubmit}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* FREEZE EMPLOYEE */}
      <Modal
        // open={true}
        open={freezeEmployeeModal}
        onClose={() => {
          closeModal("freeze");
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div
              className="h-fit my-3 w-100 w-full flex flex-col gap-y-10"
              style={{ minHeight: "80%" }}
            >
              <div className="flex w-full justify-end">
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer self-end"
                  onClick={() => {
                    closeModal("freeze");
                  }}
                />
              </div>

              <div
                className="flex flex-col justify-center items-center h-full w-full mb-5"
                style={{ minHeight: "80%" }}
              >
                {freezeSuccessful ? (
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="my-6 w-28 h-28 rounded-full suc_withdraw_bg flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#06c167"
                        className="w-14 h-14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="my-3 text-xl text-center font_bold black2">
                      Account {frozen ? "Frozen" : "Unfrozen"}
                    </p>
                    <p className="text-lg text-black font_medium text-center">
                      {firstName}'s account has been{" "}
                      {frozen ? "frozen" : "unfrozen"}.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-full flex flex-col justify-between items-center gap-y-2 mb-3">
                      <div className="mb-5 border-8 w-fit h-fit rounded-full flex justify-center items-center">
                        {image ? (
                          <img
                            src={image}
                            alt="food"
                            className="w-20 h-20 rounded-full"
                          />
                        ) : (
                          <CiUser
                            className="w-14 h-14 p-2"
                            size={28}
                            color="#06c167"
                          />
                        )}
                      </div>
                      <p className="font-semibold text-xl">
                        {firstName} {lastName}
                      </p>
                      <p className="font-light text-gray-500 text-base">
                        {email}
                      </p>
                    </div>

                    <div className="text-center px-3 font-sans">
                      <h3 className="font-bold text-2xl mb-3">
                        Are you sure you want to{" "}
                        {frozen ? "unfreeze" : "freeze"} {firstName} {lastName}
                      </h3>
                      <p className="font-semibold text-sm">
                        {firstName} will {frozen ? "now be" : "not be"} able to
                        spend the money in his balance
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 w-full">
              {freezeSuccessful ? (
                <div className="absolute bottom-10 w-5/6">
                  <Button
                    title="Done"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={() => {
                      closeModal("freeze");
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-between items-center gap-y-3">
                  <Button
                    loading={isLoading}
                    title={frozen ? "Yes Unfreeze" : "Yes Freeze"}
                    extraClasses="w-full p-3 rounded-lg"
                    onClick={() => handleFreeze()}
                  />
                  <button
                    className="w-full px-8 py-2 rounded-lg bg-gray-200 cursor-pointer"
                    onClick={() => {
                      closeModal("freeze");
                    }}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* DELETE EMPLOYEE */}
      <Modal
        // open={true}
        open={removeEmployeeModal}
        onClose={() => {
          closeModal("remove");
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
          <div className="flex flex-col justify-between items-center p-0 h-full">
            <div
              className="h-fit my-3 w-100 w-full flex flex-col gap-y-10"
              style={{ minHeight: "80%" }}
            >
              <div className="flex w-full justify-end">
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer self-end"
                  onClick={() => {
                    closeModal("remove");
                  }}
                />
              </div>

              <div
                className="flex flex-col justify-center items-center h-full w-full mb-5"
                style={{ minHeight: "80%" }}
              >
                {removeSuccessful ? (
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="my-6 w-28 h-28 rounded-full suc_withdraw_bg flex justify-center items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#06c167"
                        className="w-14 h-14"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="my-3 text-xl text-center font_bold black2">
                      Account Deleted
                    </p>
                    <p className="text-lg text-black font_medium text-center">
                      {firstName}'s account has been Deleted.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="w-full flex flex-col justify-between items-center gap-y-2 mb-3">
                      <div className="mb-5 border-8 w-fit h-fit rounded-full flex justify-center items-center">
                        {image ? (
                          <img
                            src={image}
                            alt="food"
                            className="w-20 h-20 rounded-full"
                          />
                        ) : (
                          <CiUser
                            className="w-14 h-14 p-2"
                            size={28}
                            color="#06c167"
                          />
                        )}
                      </div>
                      <p className="font-semibold text-xl">
                        {firstName} {lastName}
                      </p>
                      <p className="font-light text-gray-500 text-base">
                        {email}
                      </p>
                    </div>

                    <div className="text-center px-3 font-sans">
                      <h3 className="font-bold text-2xl mb-3">
                        Are you sure you want to Delete {firstName}
                      </h3>
                      <p className="font-semibold text-sm">
                        {firstName} will not be able to spend the money in his
                        balance
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-5 w-full">
              {removeSuccessful ? (
                <div className="absolute bottom-10 w-5/6">
                  <Button
                    title="Done"
                    extraClasses="w-full p-3 rounded-full"
                    onClick={() => {
                      closeModal("remove");
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-between items-center gap-y-3">
                  <Button
                    loading={isLoading}
                    title="Yes Delete"
                    extraClasses="w-full p-3 rounded-lg"
                    onClick={() => handleRemove()}
                  />
                  <button
                    className="w-full px-8 py-2 rounded-lg bg-gray-200 cursor-pointer"
                    onClick={() => {
                      closeModal("remove");
                    }}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmployeeListItem;
