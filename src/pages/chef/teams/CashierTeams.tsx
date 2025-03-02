import { Modal } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { CashierValues } from '../../../utils/FormInitialValue';
import { CashierInputsSchema } from '../../../utils/ValidationSchema';
import { IoMdClose } from 'react-icons/io';
import OutlineButton from '../../../components/OutlineButton';
import EmptyState from '../../../components/EmptyState';
import { truncateText, uuidGen } from '../../../utils/formatMethods';
import Button from '../../../components/Button';
import Input from '../../../components/CustomInput';
import { IoSearchSharp } from 'react-icons/io5';

const initialData = [
    {
        id: '1927',
        employeeAssigned: "John Doe",
        section: "Section 1"
    },
    {
        id: '1928',
        employeeAssigned: "Jane Smith",
        section: "Section 2"
    },
    {
        id: '1929',
        employeeAssigned: "Michael Johnson",
        section: "Section 3"
    },
    {
        id: '1930',
        employeeAssigned: "Emily Davis",
        section: "Section 4"
    }
];


const CashierTeams = ({
    openCashier,
    setOpenCashier
}: any) => {

    const [loading, setLoading] = useState<any>(false);
    const [togglePassword, setTogglePassword] = useState("password");
    const [editWorker, setEditWorker] = useState<any>(null);
    const [cashier, setCashier] = useState(null);

    const section = [
        { _id: '1', name: "Section 1", value: "Section 1" },
        { _id: '2', name: "Section 2", value: "Section 2" },
        { _id: '3', name: "Section 3", value: "Section 3" },
        { _id: '4', name: "Section 4", value: "Section 4" },
        { _id: '5', name: "Section 5", value: "Section 5" }
    ];
    
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
        initialValues: CashierValues,
        validationSchema: CashierInputsSchema,
        onSubmit: async () => {
            
        }
    });
    
    const [q, setQ] = useState("");
    const handleClose = () => setOpenCashier(false);
    
  return (
    <>
        <div>
            <div className='w-full flex flex-col lg:flex-row justify-start justify-between items-stretch lg:items-center gap-y-3 my-5'>
                <div className="w-fit bg-white rounded-full pl-18 pr-20 flex items-center justify-between w-fit border border-neutral-200">
                    <div className="p-2">
                        <IoSearchSharp color="#D6D6D6" size={20} />
                    </div>
                    <div className="flex-1 ml-4">
                        <input
                            // ref={ref}
                            placeholder="Search Menu"
                            className="py-2 w-full rounded-full input_text text-md font_regular outline-none"
                            onChange={(e: any) => {
                            if (e.target.value) {
                                setQ(e.target.value);
                            } else {
                                setQ(e.target.value);
                            }
                            }}
                        />
                    </div>
                </div>

                <button
                    className="bg-black text-center text-white px-5 py-2 rounded-lg flex items-center space-x-2"
                    onClick={() => setOpenCashier(true)}
                >
                    <span className='mx-auto'>Add Cashier</span>
                </button>
            </div>

            {initialData?.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 justify-between items-center lg:gap-3 gap-y-2 auto-rows-fr">
                    {initialData.map((table: any, i: number) => (
                        <div
                        key={uuidGen()}
                        className="flex flex-col items-stretch justify-between bg-white p-6 rounded-2xl shadow-xl w-full h-full mx-1"
                        >
                            <div className="flex flex-row items-center justify-between">
                                <div className="flex-1 ">
                                    <p className="text-lg text-black font_medium text-nowrap">
                                        {truncateText(`${table?.section}`, 10, 13)}
                                    </p>
                                    <p className="text-sm primary_txt_color font_medium text-nowrap">
                                        {truncateText(table?.id, 12, 15)}
                                    </p>
                                    <p className="text-sm primary_txt_color font_medium text-nowrap">
                                        {truncateText(table?.employeeAssigned, 12, 15)}
                                    </p>
                                </div>
                                
                                <button className='px-2 py-1 text-xs font-semibold bg-[#EDECEC] rounded-full' onClick={() => {}}>
                                    Details
                                </button>
                            </div>
                            <div className="mt-3">
                                <Button
                                title="Edit"
                                extraClasses="w-full rounded-full !py-1"
                                onClick={() => {}}
                                />
                                <OutlineButton
                                title="Delete"
                                extraClasses="w-full my-2 rounded-full !py-1"
                                loading={loading}
                                onClick={() => {}}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                <EmptyState title="No Cashiers yet..." />
            )}
        </div>

        {/* ADD Cashier */}
        <Modal
            open={openCashier}
            onClose={handleClose}
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
                            {editWorker ? "Edit Cashier" : "Add Cashier"}
                            </p>
                            <div className="w-2/12 flex flex-row items-center justify-center">
                            <IoMdClose
                                size={24}
                                color="#8E8E8E"
                                className="cursor-pointer self-end"
                                onClick={handleClose}
                            />
                            </div>
                        </div>

                        <div
                            className="flex flex-col justify-start items-center h-full w-full mb-5 overflow-y-auto"
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
                                placeholder="Whatsapp Number (Optional)"
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
  )
}

export default CashierTeams