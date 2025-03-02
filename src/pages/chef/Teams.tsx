import React, { useState } from 'react'
import PageTitle from '../../components/PageTitle';
import ChefDashboardLayout from '../../components/ChefDashboardLayout';
import { Modal } from '@mui/material';
import Input from '../../components/CustomInput';
import { IoMdClose } from 'react-icons/io';
import OutlineButton from '../../components/OutlineButton';
import { useFormik } from 'formik';
import { cashierValues, ManagerValues, TerminalValues, terminalValues, WaiterValues } from '../../utils/FormInitialValue';
import { ManagerInputsSchema, NewCashierInputsSchema, NewTerminalInputsSchema, WaiterInputsSchema } from '../../utils/ValidationSchema';
import ManagerTeams from './teams/ManagerTeams';
import WaiterTeams from './teams/WaiterTeams';
import CashierTeams from './teams/CashierTeams';
import TerminalTeams from './teams/TerminalTeams';

const Teams = () => {

  const [loading, setLoading] = useState<any>(false);
  const [editWorker, setEditWorker] = useState<any>(null);
  const [manager, setManager] = useState(null);
  const [waiter, setWaiter] = useState(null);
  const [cashier, setCashier] = useState(null);
  const [terminal, setTerminal] = useState(null);


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
      initialValues: manager ? ManagerValues : waiter ? WaiterValues : cashier ? cashierValues : TerminalValues,
      validationSchema: manager ? ManagerInputsSchema : waiter ? WaiterInputsSchema : cashier ? NewCashierInputsSchema : NewTerminalInputsSchema,
      onSubmit: async () => {
        
      }
    });

    const [selectedView, setSelectedView] = useState("manager");
    const [ openManager, setOpenManager] = useState(false);
    const [ openWaiter, setOpenWaiter] = useState(false);
    const [ openCashier, setOpenCashier] = useState(false);
    const [ openTerminal, setOpenTerminal] = useState(false);

    const handleOpen = (flag: string) => {
        if (flag === "manager") {
          setSelectedView(flag);
          setOpenManager(true);
        } else if (flag === "waiter") {
          setSelectedView(flag);
          setOpenWaiter(true);
        } else if (flag === "cashier") {
          setSelectedView(flag);
          setOpenCashier(true);
        } else if (flag === "terminals") {
          setSelectedView(flag);
          setOpenTerminal(true);
        }
    };
    
    const handleClose = (flag: string) => {
        if (flag === "manager") {
            setOpenManager(false);
        } else if (flag === "waiter") {
            setOpenWaiter(false);
        } else if (flag === "cashier") {
            setOpenCashier(false);
        } else if (flag === "terminals") {
            setOpenTerminal(false);
        }
    };
    
  return (
    <>
      <ChefDashboardLayout>
        <>
          <div className="w-full px-6 py-4">
            <div className="flex flex-col md:flex-row w-full justify-start gap-y-2 md:gap-y-0">
                <PageTitle title="Teams" />
            </div>

            <div className='text-nowrap pb-2 flex flex-row flex-nowrap justify-start items-center gap-x-8 overflow-x-auto'>
              <div className='flex flex-row items-center justify-start gap-x-1'>
                <button className={`px-5 py-1.5 rounded-full ${selectedView === "manager" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => setSelectedView("manager")}>Manager</button>

                <button className={`text-2xl size-9 rounded-full ${selectedView === "manager" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => handleOpen("manager")}>+</button>
              </div>

              <div className='flex flex-row items-center justify-start gap-x-1'>
                <button className={`px-5 py-1.5 rounded-full ${selectedView === "waiter" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => setSelectedView("waiter")}>Waiter</button>

                <button className={`text-2xl size-9 rounded-full ${selectedView === "waiter" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => handleOpen("waiter")}>+</button>
              </div>

              <div className='flex flex-row items-center justify-start gap-x-1'>
                <button className={`px-5 py-1.5 rounded-full ${selectedView === "cashier" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => setSelectedView("cashier")}>Cashier</button>

                <button className={`text-2xl size-9 rounded-full ${selectedView === "cashier" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => handleOpen("cashier")}>+</button>
              </div>
              
              <div className='flex flex-row items-center justify-start gap-x-1'>
                <button className={`px-5 py-1.5 rounded-full ${selectedView === "terminals" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => setSelectedView("terminals")}>Terminals</button>

                <button className={`text-2xl size-9 rounded-full ${selectedView === "terminals" ? 'primary_bg_color text-white' : 'bg-[#EDECEC] text-black'}`} onClick={() => handleOpen("terminals")}>+</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
              {selectedView === "manager" ? (
                <ManagerTeams openManager={openManager} setOpenManager={setOpenManager} />
              ) : selectedView === "waiter" ? (
                <WaiterTeams openWaiter={openWaiter} setOpenWaiter={setOpenWaiter} />
              ) : selectedView === "cashier" ? (
                <CashierTeams openCashier={openCashier} setOpenCashier={setOpenCashier} />
              ) : (
                <TerminalTeams openTerminal={openTerminal} setOpenTerminal={setOpenTerminal} />
              )}
            </div>
          </div>
        </>
      </ChefDashboardLayout>
    </>
  )
}

export default Teams