import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { BsFillCheckCircleFill } from "react-icons/bs";
import BannerCard from "../../components/BannerCard";
import CompanyCheckItem from "./CompanyCheckItem";
import CompanyDashboardLayout from "./CompanyDashboardLayout";
import PageTitle from "../../components/PageTitle";
import { useAppDispatch } from "../../redux/hooks";
import { COMPANY_ROUTES } from "../../routes/routes";
import { getBusiness } from "../../_redux/business/businessAction";
import { IoMdClose } from "react-icons/io";
import { AiFillCloseCircle } from "react-icons/ai";
import { CurrentEmployeeProps } from "../../utils/Interfaces";
import Button from "../../components/Button";
import EmployeeListItem from "./EmployeeListItem";
import axios from "axios";
import { Modal } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import OutlineButton from "../../components/OutlineButton";
import ColoredSpinner from "../../components/ColoredSpinner";
import Input from "../../components/CustomInput";
import { TRANSACTION_URL } from "../../_redux/urls";
import {
  addCompanyCard,
  defaultCompanyCard,
  getCompanyCards,
} from "../../_redux/card/cardAction";
import CardItem from "../../components/CardItem";
import { useFormik } from "formik";
import { WithdrawAmountSchema } from "../../utils/ValidationSchema";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import { formatPrice, formatRemoteAmountKobo } from "../../utils/formatMethods";
import {
  getProfileCompanyAccount,
  getCompanyWalletTransactionAccount,
  getCompanyWalletAccount,
} from "../../_redux/user/userAction";
import { fundEmployeesCompany } from "../../_redux/employees/employeeCrud";
import {
  getCompanyEmployees,
} from "../../_redux/employees/employeeAction";


const TRANSACTION_TYPE = "COMPANY_FUNDING";

const FUNDING_SOURCES = [
  {
    type: "card",
    image: "../images/solar_card.svg",
    title: "Pay with Card",
  },
  {
    type: "paystack",
    image: "../images/PaystackLogo.svg",
    title: "Pay with Paystack",
  },
];



const CompanyDashboard = () => {
  const dispatch = useAppDispatch();
  const { auth, user, wallet, cards, walletTransaction, userLoading, employees, employeeLoading } =
    useSelector(
      (state: any) => ({
        auth: state.auth.user,
        user: state.user.user,
        cards: state.cards.cards,
        wallet: state.user.wallet,
        walletTransaction: state.user.walletTransaction,
        userLoading: state.user.loading,
        employees: state.employees.employees,
        employeeLoading: state.employees.loading,
      }),
      shallowEqual
    );

  const employeeOptions:any[] = employees && employees.map((i: any) => { return {'label': `${i.employee.firstName} ${i.employee.lastName}`, 'id': i._id, 'employee': i}})

  useEffect(() => {
    dispatch(getProfileCompanyAccount());
    dispatch(getCompanyWalletAccount());
    dispatch(getCompanyWalletTransactionAccount());
    dispatch(getCompanyCards());
    dispatch(getCompanyEmployees());
  }, []);

  const checkItems: any[] = [
    {
      title: "Add and invite your employees to join homemade",
      checked: employees?.length > 0,
      to: COMPANY_ROUTES.linkCompanyEmployees,
      action: "Add employees",
      key: 1,
    },
    {
      title: "Fund your wallet",
      checked: wallet?.balance > 0,
      to: COMPANY_ROUTES.linkCompanyWallet,
      action: "Fund wallet",
      key: 2,
    },
    {
      title: "Send money to your employees",
      checked: employees?.some((e: any) => e.employeeBalance > 0),
      to: COMPANY_ROUTES.linkCompanyEmployees,
      action: "Fund employees",
      key: 3,
    },
    {
      title: "Update your profile",
      checked: user?.updatedAt !== user?.createdAt,
      to: COMPANY_ROUTES.linkCompanySettings,
      action: "Update profile",
      key: 4,
    },
  ];


  const [employeeWalletModal, setEmployeeWalletModal] = useState(false);
  const openEmployeeWalletModal = () => setEmployeeWalletModal(true);
  const closeEmployeeWalletModal = () => setEmployeeWalletModal(false);


  // PROCESSING MODAL
  const [processingModal, setProcessingModal] = useState(false);
  const openProcessingModal = () => setProcessingModal(true);
  const closeProcessingModal = () => setProcessingModal(false);

  // FUNDED EMPLOYEES MODAL
  const [fundedModal, setFundedModal] = useState(false);
  const openFundedModal = () => setFundedModal(true);
  const closeFundedModal = () => {
    dispatch(getCompanyEmployees());
    dispatch(getCompanyWalletAccount());
    setFundedModal(false);
    setSelectedEmployee(null);
    setSelectManyEmployees([]);
  };

  // FUND MULTIPLE EMPLOYEES
  const [fundAmount, setFundAmount] = useState("")
  const [employeeError, setEmployeeError] = useState("");

  const handleFundEmployee = () => {
    if (!checked && selectedEmployee == null || checked && selectManyEmployees.length == 0) {
      setEmployeeError("No employee selected.");
      return;
    } if(fundAmount == ""){
      setEmployeeError('Amount cannot be empty');
      return;
    }else if(parseFloat(fundAmount) < 1000){
      setEmployeeError('Amount cannot be lower than 1000');
      return;
    }else {
      setEmployeeWalletModal(false);
      setProcessingModal(true);
      fundEmployees();
    }
  };

  const fundEmployees = async () => {
    let ids 
    if (checked) {
      ids = selectManyEmployees.map((c: any) => c._id)
    } else {
      ids = selectedEmployee._id
    }

    setIsLoading(true);

    try {
      const { data } = await fundEmployeesCompany({
        employees: checked ? [...ids] : [ids],
        amount: parseFloat(fundAmount),
      });

      closeProcessingModal();
      openFundedModal();
    } catch (error) {
      closeProcessingModal();
      openEmployeeWalletModal();
      alert("Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const [firstCheck, setFirstCheck] = useState(1);

  const removeEmployee = (employee: any) => {
    setSelectManyEmployees(
      selectManyEmployees.filter((i: any) => i._id !== employee._id)
    );
  };

  // SWITCH
  const [checked, setChecked] = React.useState(false);

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  // RADIO
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const handleRadio = (event: any, employee: any) => {
    if (
      checked &&
      !selectManyEmployees.find(({ _id }: any) => _id === employee._id)
      ) {
      setSelectManyEmployees(
        Array.from(new Set([...selectManyEmployees, employee]))
      );
    } else {
      setSelectedRadio(event.target.value);
      setSelectedEmployee(employee);
    }
  };

  // CHECKBOXES
  const [selectManyEmployees, setSelectManyEmployees] = useState<any>([]);

  const handleCheckBox = (event: any, employee: any) => {
    if (
      event.target.checked &&
      !selectManyEmployees.find(({ _id }: any) => _id === employee._id)
    ) {
      setSelectManyEmployees([...selectManyEmployees, employee]);
    } else {
      setSelectManyEmployees(
        selectManyEmployees.filter((i: any) => i._id !== employee._id)
      );
    }
  };



  // CARD MANAGEMENT FUNCS
  const [selectedCard, setSelectedCard] = useState<any>();
  const [selectedTransaction, setSelectedTransaction] = useState<any>("");
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [fundingSuccessful, setFundingSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFundingSource, setSelectedFundingSource] = useState<any>("");
  const [showCards, setShowCards] = useState(false);

  const [fundWalletModal, setFundWalletModal] = useState(false);
  const openFundWalletModal = () => setFundWalletModal(true);
  const closeFundWalletModal = () => {
    setFundWalletModal(false);
    setShowCards(false);
    setFundingSuccessful(false);
    setSelectedFundingSource(null);
    setSelectedCard(null);
    setErrorMessage("");
    resetForm();
    dispatch(getCompanyWalletAccount());
  };

  const [verifyPaymentModal, setVerifyPaymentModal] = useState(false);
  const openVerifyPaymentModal = () => setVerifyPaymentModal(true);
  const closeVerifyPaymentModal = () => setVerifyPaymentModal(false);

  const [refundSuccess, setRefundSuccess] = useState(false);

  const refundTransaction = async (referenceId: any) => {
    await axios
      .post(
        "https://api.paystack.co/refund",
        { transaction: referenceId },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
          },
        }
      )
      .then(({ data }) => {
        setRefundSuccess(true);
      })
      .catch((err) => {});
  };

  const verifyTransaction = async (referenceId: any) => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(
        `${TRANSACTION_URL}/verify/${referenceId}`,
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );

      const result = data?.data;

      if (result?.status) {
        setFundingSuccessful(true);
        dispatch(getCompanyWalletAccount());
        dispatch(getCompanyWalletTransactionAccount());
      }
    } catch (error) {
      alert("Server error! Try again and if it persists contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAddCardTransaction = async (referenceId: any) => {
    await axios
      .get(`${TRANSACTION_URL}/verify/${referenceId}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      })
      .then(async ({ data }) => {
        const result = data?.data;

        if (result?.status) {
          await dispatch(
            addCompanyCard({
              authorization: result.data.authorization,
              customer: result.data.customer,
            })
          );
          await refundTransaction(referenceId);

          setTimeout(() => {
            dispatch(getCompanyCards());
          }, 5000);
        }
      })
      .catch((err) => {});
  };

  const handleAddCard = () => {
    try {
      const transactionId = uuidv4();
      let handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: user.email,
        amount: 50 * 100,
        ref: transactionId,
        channels: ["card"],
        onClose: function () {
          alert("Transaction was not completed, window closed.");
        },
        callback: function (response: any) {
          verifyAddCardTransaction(transactionId);
        },
      });

      handler.openIframe();
    } catch (err) {}
  };

  const setDefaultCard = (cardId: string) => {
    setSelectedCard(cardId);
    dispatch(defaultCompanyCard(cardId, setSelectedCard));
  };

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: WithdrawAmountSchema,
    onSubmit: () => {
      setErrorMessage("");

      if (!selectedFundingSource) {
        setErrorMessage("Select a funding option.");
        return;
      }

      if (parseFloat(values.amount) < 10000) {
        setErrorMessage("Minimum amount is ₦10,000.");
        return;
      }

      if (selectedFundingSource === "paystack") {
        initiateFunding(values.amount);
        return;
      }

      if (selectedFundingSource === "card") {
        setShowCards(true);
        return;
      }

      // if (selectedFundingSource === "card") {
      // handleFundSubmit();
      // return;
      // }
    },
  });

  const initiateFunding = async (amount: any) => {
    setIsLoading(true);

    try {
      const referenceId = uuidv4();

      let handler = window.PaystackPop.setup({
        key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: user.email,
        amount: amount * 100,
        ref: referenceId,
        metadata: {
          transactionType: TRANSACTION_TYPE,
          userId: user._id,
        },
        onClose: function () {
          alert("Transaction was not completed, window closed.");
        },
        callback: function (response: any) {
          verifyTransaction(referenceId);
        },
      });

      handler.openIframe();
    } catch (error: any) {
      setErrorMessage(
        "Server error! Try again and if it persists contact support."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFundSubmit = async () => {
    if (showCards) {
      if (!selectedCard) {
        setErrorMessage("Select a card");
        return;
      }

      setIsLoading(true);

      try {
        const { data } = await axios.post(
          "https://api.paystack.co/transaction/charge_authorization",
          {
            email: selectedCard?.customer?.email,
            amount: Number(values.amount) * 100,
            authorization_code: selectedCard?.authorization?.authorization_code,
            metadata: {
              transactionType: TRANSACTION_TYPE,
              userId: user._id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_SECRET_KEY}`,
            },
          }
        );

        const result = data?.data;

        if (result?.status) {
          setShowCards(false);
          setFundingSuccessful(true);
          setTimeout(() => {
            dispatch(getCompanyWalletAccount());
            dispatch(getCompanyWalletTransactionAccount());
          }, 5000);
        }
      } catch (error: any) {
        alert("Server error! Try again and if it persists contact support.");
      } finally {
        setIsLoading(false);
      }
    } else {
      handleSubmit();
    }
  };

  return (
    <>
      <CompanyDashboardLayout>
        <div className="w-full px-6 py-4" style={{}}>
          <div className="lg:flex">
            <div className="lg:w-3/4 lg:mr-3">
              <PageTitle title="My Home" />
              <div className="mt-5">
                <BannerCard
                  backgroundImage="./img/company-wallet-bg.svg"
                  backgroundColor="white"
                  bgExtraClasses="p-4 lg:p-4 bg-cover bg-no-repeat min-w-full h-66"
                  textContainerClasses="px-10 py-10 rounded-2xl"
                  text1="Balance"
                  text1ExtraClasses="text-base text-black font_regular"
                  text2={
                    formatRemoteAmountKobo(wallet?.balance).naira +
                    formatRemoteAmountKobo(wallet?.balance).kobo
                  }
                  text2ExtraClasses="text-2xl md:text-5xl text-black font_bold mt-3 mb-5"
                  noShowRightIcon
                  iconSize={24}
                  iconExtraClasses="ml-2"
                  showWalletIcons={true}
                  onClickText3={() => openFundWalletModal()}
                  onClickText4={() => openEmployeeWalletModal()}
                />
              </div>

              {/* employees table */}
              <div
                className="lg:w-4/5 rounded-3xl py-5 min-w-full mt-5 px-3 shadow-lg shadow-slate-400"
                style={{ backgroundColor: "#F9FBFC" }}
              >
                {/* table head */}
                <div className="flex flex-row justify-between items-center px-2 md:px-8 mb-5">
                  <div>
                    <p className="text-lg font-semibold">Employees</p>
                  </div>
                  <div>
                    <Link to={COMPANY_ROUTES.linkCompanyEmployees}>
                      <button className="border border-slate-300 rounded-full border-solid px-5 py-1.5 text-sm font-semibold hover:bg-slate-200">
                        View all
                      </button>
                    </Link>
                  </div>
                </div>

                {/* table gangan */}
                <div className="bg-white px-8 rounded-3xl w-full overflow-x-auto">
                  <div className="grid grid-cols-4 items-center justify-items-start md:justify-between border-b gap-x-5 py-4 font-medium" style={{ minWidth:'500px', }}>
                    <p className="text-sm lg:text-base font_regular gray_color col-span-2 whitespace-nowrap">
                      Name & Email
                    </p>
                    <p className="text-sm lg:text-base font_regular gray_color text-start justify-self-start whitespace-nowrap">
                      Balance
                    </p>
                    <p className="justify-self-end">&nbsp;</p>
                  </div>

                  <div
                    className="h-fit md:px-3"
                    style={{ maxHeight: "500px" }}
                  >
                    {employees && employees?.length > 0 ? (
                      employees?.map((e: any, i: number) => (
                        <EmployeeListItem
                          key={e?._id}
                          id={e?.id}
                          email={e?.employee?.email}
                          status={e?.status}
                          firstName={e?.employee?.firstName}
                          lastName={e?.employee?.lastName}
                          image={e?.employee?.image}
                          employeeBalance={e?.employeeBalance}
                          extraClasses={[
                            "grid grid-cols-4 items-center justify-items-start pb-4 gap-x-5 break-keep",
                            "flex items-center col-span-2",
                            "text-2xl text-black font_bold text-start justify-self-start",
                            "flex flex-col lg:flex-row justify-self-end",
                          ]}
                          homeDash={true}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center">
                        <img
                          src="/img/no-employees.svg"
                          alt="empty"
                          className="mt-8 mb-3"
                        />
                        <h2 className="text-xl input_text mb-3">
                          No employees added yet.
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3/3 */}
            <div
              className="lg:w-1/4 mt-10 lg:mt-0 rounded-2xl pt-2 pb-2 lg:pb-0 bg-no-repeat bg-cover"
              style={{ backgroundImage: "url(./img/company-dash-side.svg)" }}
            >
              <div className="flex flex-col items-center my-5">
                <div className="w-fit h-fit rounded-full p-2 bg-white">
                  {user?.image ? (
                    <img
                      src={user?.image}
                      alt="chef"
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <CiUser className="w-12 h-12 p-2" color="#e85666" />
                  )}
                </div>
              </div>

              <div className="my-5">
                <p className="flex flex-col justify-around items-center text-base text-white text-center">
                  <span className="font-bold">Hi {user?.companyName},</span>
                  <span className="font-light">Lets get you started!</span>
                </p>
              </div>

              <div>
                <div className="flex flex-col items-start justify-around p-3 bg_menu rounded-2xl mb-2 mx-2 h-fit gap-y-2">
                  {checkItems?.map((item, i) => (
                    <CompanyCheckItem
                      key={item.key}
                      num={i + 1}
                      title={item?.title}
                      checked={item?.checked}
                      to={item?.to}
                      action={item?.action}
                      firstCheck={firstCheck}
                      setFirstCheck={setFirstCheck}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FUND EMPLOYEE */}
          <Modal
            // open={true}
            open={employeeWalletModal}
            onClose={closeEmployeeWalletModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex my-5">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Fund Employee wallet
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeEmployeeWalletModal}
                />
              </div>

              <div className="flex flex-col justify-between items-center p-0">
                <div className="w-full mb-5">
                  <div>
                    <Autocomplete
                      disableClearable
                      id="combo-box-demo"
                      options={employeeOptions}
                      sx={{ width: "100%" }}
                      onChange={(e, employee) => {
                        handleRadio(e, employee.employee);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Select employees" />
                      )}
                    />
                  </div>

                  <div className="my-5 bg_gray_color px-3 py-1 rounded-lg h-fit">
                    <div className="flex flex-row justify-between items-center">
                      <label
                        className="font-semibold"
                        htmlFor="flexSwitchChecked"
                      >
                        Fund multiple employees
                      </label>
                      <Switch
                        checked={checked}
                        onChange={handleCheck}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </div>
                  </div>

                  {/* SHOW ONE WHEN USER PICKED */}
                  {selectedEmployee && !checked && (
                    <div className="flex flex-row justify-between items-start">
                      <div className="flex flex-row justify-between items-start">
                        {selectedEmployee?.employee?.image ? (
                          <img
                            src={selectedEmployee?.employee?.image}
                            alt="food"
                            className="w-11 h-11 rounded-full"
                          />
                        ) : (
                          <CiUser size={28} color="#e85666" />
                        )}
                        <div className="h-full my-auto ml-3 flex flex-row justify-between items-center">
                          <p className="text-xs font-bold font_regular text-black">
                            {`${selectedEmployee?.employee.firstName} ${selectedEmployee?.employee.lastName}`}
                          </p>
                          <p className="font-bold mx-1">&middot;</p>
                          <p className="text-xs font_regular sec_gray_color">
                            {selectedEmployee?.employee?.email}
                          </p>
                        </div>
                      </div>
                      <div className="h-full">
                        <AiFillCloseCircle
                          size={24}
                          color="#8E8E8E"
                          className="cursor-pointer hover:text-red-600 mr-2.5 my-auto"
                          onClick={() => {
                            setSelectedEmployee(null);
                            setSelectedRadio(null);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* SHOW MANY WHEN USER PICKED */}
                  {selectManyEmployees.length > 0 && checked && (
                    <div
                      className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1"
                      style={{ maxHeight: "250px" }}
                    >
                      {selectManyEmployees.map((employee: any, i: number) => (
                        <div key={employee?.employee._id} className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-1 my-1 gap-x-1 rounded-full">
                          <div className="flex flex-row justify-between items-center">
                            {employee?.employee?.image ? (
                              <img
                                src={employee?.employee?.image}
                                alt="food"
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <CiUser size={28} color="#e85666" />
                            )}
                            <div className="ml-3 flex flex-row justify-between items-center">
                              <p className="text-xs font-bold font_regular text-black">
                                {`${employee.employee.firstName} ${employee.employee.lastName}`}
                              </p>
                            </div>
                          </div>
                          <div>
                            <AiFillCloseCircle
                              size={24}
                              color="#fff"
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => {
                                removeEmployee(employee);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="my-5 w-full">
                  <p className="mb-3 text-start text-sm input_text font-semibold">
                    Recently added employees
                  </p>

                  {employees && employees?.length > 0 ? (
                    employees?.slice(0, 5).map((employee: any, i: number) => (
                      <div key={employee?.employee._id} className="h-fit w-full p-0 m-0">
                        <div className="flex flex-row justify-between items-start">
                          <div className="flex flex-row justify-between items-center">
                            {employee?.employee?.image ? (
                              <img
                                src={employee?.employee?.image}
                                alt="food"
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <CiUser size={28} color="#e85666" />
                            )}
                            <div className="ml-3 flex flex-row justify-between items-center">
                              <p className="text-xs font-bold font_regular text-black">
                                {`${employee.employee.firstName} ${employee.employee.lastName}`}
                              </p>
                              <p className="font-bold mx-1">&middot;</p>
                              <p className="text-xs font_regular sec_gray_color">
                                {employee.employee?.email}
                              </p>
                            </div>
                          </div>
                          <div>
                            {checked ? (
                              <Checkbox
                                checked={selectManyEmployees?.find(
                                  ({ _id }: any) => _id === employee._id
                                )}
                                onChange={(e) => handleCheckBox(e, employee)}
                                inputProps={{ "aria-label": "controlled" }}
                              />
                            ) : (
                              <Radio
                                checked={
                                  selectedRadio === employee?._id
                                }
                                onChange={(e) => handleRadio(e, employee)}
                                value={employee?._id}
                                name={`${employee.employee.firstName} ${employee.employee.lastName}`}
                                inputProps={{ "aria-label": "A" }}
                              />
                            )}
                          </div>
                        </div>

                        <hr className="mx-auto my-3" />
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center">
                      <img src="/images/empty-order.svg" alt="empty" />
                      <h2 className="text-xl input_text mb-3">
                        No employees added yet.
                      </h2>
                    </div>
                  )}
                </div>

                <div className="mt-5 w-full">
                  <div>
                    <Input
                      type="number"
                      placeholder="Amount (Minimum of ₦1,000)"
                      name="amount"
                      onChange={(e: any) => setFundAmount(e.target.value)}
                      value={fundAmount}
                    />

                    {employeeError && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {employeeError}
                      </p>
                    )}

                    {errors.amount && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errors.amount}
                      </p>
                    )}

                    {errorMessage && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button
                      title="Proceed"
                      extraClasses="w-full p-3 rounded-full"
                      onClick={() => {
                        handleFundEmployee()
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* FUND WALLET MODAL */}
          <Modal
            // open={true}
            open={fundWalletModal}
            onClose={closeFundWalletModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-10 my-10 outline-none">
              <div className="flex">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Fund wallet
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeFundWalletModal}
                />
              </div>

              {fundingSuccessful ? (
                <div className="flex flex-col justify-center items-center">
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
                  <p className="my-3 text-xl text-center font_bold black2">
                    Funding successful
                  </p>
                  <p className="text-lg text-black font_medium text-center">
                    <span className="font_bold">
                      ₦{formatPrice(values.amount)}
                    </span>{" "}
                    has been added to <br /> your wallet balance.
                  </p>

                  <div className="absolute bottom-10 w-5/6 left-8 lg:left-12">
                    <Button
                      title="Done"
                      extraClasses="w-full p-3 rounded-full"
                      onClick={() => closeFundWalletModal()}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mt-10">
                    {showCards ? (
                      <>
                        <p className="mt-8 text-lg font_medium text-black">
                          Cards
                        </p>
                        <div className="my-5 h-[2px] grayBackground" />
                        <div className="h-52 overflow-scroll">
                          {cards?.map((c: any) => (
                            <div
                              key={c?._id}
                              className="border-b py-3 flex items-center justify-between cursor-pointer"
                              onClick={() => setSelectedCard(c)}
                            >
                              <div className="flex items-center">
                                <div className="ml-5">
                                  <p className="text-lg gray_color font_regular uppercase">
                                    {c?.authorization?.bank}
                                  </p>
                                  <div className="flex items-center">
                                    <p className="text-lg text-black font_bold">
                                      {"****    *****    ****   " +
                                        c?.authorization?.last4}
                                    </p>
                                    <div className="mx-1 bg_ter_gray_color w-1 h-1 rounded-full" />
                                    <p className="text-lg text-black font_regular uppercase">
                                      {c?.authorization?.brand}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full cursor-pointer ${
                                  selectedCard?._id === c?._id
                                    ? "primary_bg_color"
                                    : "bg_check_inactive"
                                }`}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="">
                          <OutlineButton
                            title="Add a new card"
                            onClick={() => handleAddCard()}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="">
                        <Input
                          type="number"
                          placeholder="Amount (Minimum of ₦10,000)"
                          name="amount"
                          onChange={handleChange}
                          value={values.amount}
                          error={errors.amount}
                        />
                        <div className="my-6">
                          <p className="mt-8 text-md font_medium secondary_gray_color">
                            Select your funding option
                          </p>
                          <div className="my-5 h-[2px] grayBackground" />
                          {FUNDING_SOURCES?.map((source, i) => (
                            <div
                              key={i}
                              className="cursor-pointer"
                              onClick={() =>
                                setSelectedFundingSource(source?.type)
                              }
                            >
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-black mr-4 flex items-center justify-center">
                                  <img
                                    src={source?.image}
                                    alt={source?.title}
                                  />
                                </div>
                                <p className="flex-1 text-lg font_medium black3">
                                  {source.title}
                                </p>
                                <div
                                  className={`w-5 h-5 rounded-full cursor-pointer ${
                                    selectedFundingSource === source?.type
                                      ? "primary_bg_color"
                                      : "bg_check_inactive"
                                  }`}
                                />
                              </div>
                              {FUNDING_SOURCES.length !== i + 1 && (
                                <div className="my-5 h-[2px] grayBackground" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {errorMessage && (
                      <p className="text-sm text-center text-red-600 my-2">
                        {errorMessage}
                      </p>
                    )}

                    <div className="my-5 mx-auto md:absolute md:bottom-10 w-5/6 md:left-8 md:left-12">
                      <Button
                        loading={isLoading}
                        title="Proceed"
                        extraClasses="w-full p-3 rounded-full"
                        onClick={() => handleFundSubmit()}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal>

          <Modal
            open={processingModal}
            onClose={closeProcessingModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-80 h-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <h3 className="text-center font_bold text-2xl black2">
                Processing
              </h3>

              <div className="mt-3 flex justify-center" role="status">
                <ColoredSpinner heightWidthClasses="h-10 w-10" />
              </div>
            </div>
          </Modal>

          {/* FUNDED EMPLOYEE(S) MODAL */}
          <Modal
            // open={true}
            open={fundedModal}
            onClose={closeFundedModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <div className="flex my-5">
                <p className="flex-1 text-xl text-center font_bold black2">
                  Fund Employee wallet
                </p>
                <IoMdClose
                  size={24}
                  color="#8E8E8E"
                  className="cursor-pointer"
                  onClick={closeFundedModal}
                />
              </div>

              <div className="w-full h-fit my-5 flex flex-col justify-center items-center px-5">
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
                  Funding successful
                </p>

                <div>
                  {/* SHOW ONE WHEN USER PICKED */}
                  {selectedEmployee && !checked && (
                    <div className="flex flex-row flex-wrap h-fit p-3 rounded my-3 gap-x-1">
                      <div className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit py-2 px-3 my-1 gap-x-1 rounded-full">
                        <div className="flex flex-row justify-between items-center">
                          {selectedEmployee?.employee.image ? (
                            <img
                              src={selectedEmployee?.employee.image}
                              alt="food"
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <CiUser size={28} color="#e85666" />
                          )}
                          <div className="ml-3 flex flex-row justify-between items-center">
                            <p className="text-xs font-bold font_regular text-black">
                              {`${selectedEmployee?.employee.firstName} ${selectedEmployee?.employee.lastName}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SHOW MANY WHEN USER PICKED */}
                  {selectManyEmployees.length > 0 && checked && (
                    <div
                      className="flex flex-row flex-wrap items-center justify-center h-fit p-3 rounded my-3 gap-x-1"
                      style={{ maxHeight: "250px" }}
                    >
                      {selectManyEmployees.map((employee: any, i: number) => (
                        <div key={employee?.employee._id} className="flex flex-row justify-between bg-gray-200 items-center w-fit h-fit p-2 my-1 gap-x-1 rounded-full">
                          <div className="flex flex-row justify-between items-center">
                            {employee?.employee.image ? (
                              <img
                                src={employee?.employee.image}
                                alt="food"
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <div className="h-fit w-fit bg-white p-2 rounded-full">
                                <CiUser size={28} color="#e85666" />
                              </div>
                            )}
                            <div className="ml-3 flex flex-row justify-between items-center">
                              <p className="text-xs font-bold font_regular text-black">
                                {`${employee?.employee.firstName} ${employee?.employee.lastName}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-lg text-black font-bold text-center">
                  ₦{formatPrice(fundAmount)} has been added to your employees
                  wallet balance.
                </p>
              </div>

              <div className="absolute bottom-10 w-5/6">
                <Button
                  title="Proceed"
                  extraClasses="w-full p-3 rounded-full"
                  onClick={closeFundedModal}
                />
              </div>
            </div>
          </Modal>

          {/* VERIFY PAYMENT MODAL */}
          <Modal
            open={verifyPaymentModal}
            onClose={closeVerifyPaymentModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div className="absolute top-1/2 left-1/2 w-80 h-auto -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
              <h3 className="text-center font_bold text-2xl black2">
                Verifying card
              </h3>

              <div className="mt-3 flex justify-center" role="status">
                <ColoredSpinner heightWidthClasses="h-10 w-10" />
              </div>
            </div>
          </Modal>
        </div>
      </CompanyDashboardLayout>
    </>
  );
};

export default CompanyDashboard;
