import { Modal } from '@mui/material'
import { useFormik } from 'formik';
import { useState } from 'react'
import { TerminalValues } from '../../../utils/FormInitialValue';
import { TerminalInputsSchema } from '../../../utils/ValidationSchema';
import { IoMdClose } from 'react-icons/io';
import OutlineButton from '../../../components/OutlineButton';
import EmptyState from '../../../components/EmptyState';
import { truncateText, uuidGen } from '../../../utils/formatMethods';
import Button from '../../../components/Button';
import Input from '../../../components/CustomInput';
import { DashboardItemSkeletonLoader } from '../../../components/DashboardItemSkeletonLoader';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { IoSearchSharp } from 'react-icons/io5';

const initialData = [
    { _id: "1927", name: "Terminal", location: "Lagos", status: true },
    { _id: "1928", name: "Station", location: "Abuja", status: false },
    { _id: "1929", name: "Depot", location: "Kano", status: true },
    { _id: "1930", name: "Hub", location: "Port Harcourt", status: false },
    { _id: "1931", name: "Center", location: "Ibadan", status: true }
];


const TerminalTeams = ({
    openTerminal,
    setOpenTerminal
}: any) => {

    const [loading, setLoading] = useState<any>(false);
    const [togglePassword, setTogglePassword] = useState("password");
    const [editWorker, setEditWorker] = useState<any>(null);
    const [terminal, setTerminal] = useState(null);

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
        initialValues: TerminalValues,
        validationSchema: TerminalInputsSchema,
        onSubmit: async () => {
            
        }
    });
    
    const [q, setQ] = useState("");
    const handleClose = () => setOpenTerminal(false);
    
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
                    className="bg-black text-white px-5 py-2 rounded-lg flex items-center space-x-2"
                    onClick={() => setOpenTerminal(true)}
                >
                    <span className='mx-auto'>Add Terminals</span>
                </button>
            </div>

            <div className='w-full overflow-x-auto'>
                {initialData?.length > 0 ? (
                    <div className="inline-block min-w-[600px] lg:min-w-full py-5 align-middle">
                        <div className="overflow-x-auto">
                            {loading ? (
                            <div className="my-4 grid grid-cols-2 gap-3">
                                {[...Array(4)]?.map((_, i) => (
                                    <DashboardItemSkeletonLoader key={i} />
                                ))}
                            </div>
                            ) : (
                            <table className="min-w-full divide-y divide-gray-300 h-auto min-h-48">
                                <thead>
                                    <tr>
                                        <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                        >
                                            Name
                                        </th>
                                        <th
                                        scope="col"
                                        colSpan={5}
                                        className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                        >
                                            Location
                                        </th>
                                        <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                        >
                                            Status
                                        </th>
                                        <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                        >
                                            &nbsp;
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {initialData?.map(
                                    (transaction: any, i: number) => (
                                    <tr
                                        key={uuidGen()}
                                    >
                                        <td className="whitespace-nowrap py-4 px-3 text-sm font_medium text-[#310E0E] lg:pl-3">
                                            {transaction?.name}
                                        </td>
                                        <td colSpan={5} className="whitespace-nowrap py-4 px-3 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                            {transaction?.location}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                            {transaction?.status ? (
                                                <span className='text-xs bg-[#D4F5D1] px-3 py-1 rounded-full'>
                                                    Active
                                                </span>
                                            ) : (
                                                <span className='text-xs bg-red-100 px-3 py-1 rounded-full'>
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap py-4 px-3 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                            <BiDotsHorizontalRounded size={25} className='cursor-pointer' onClick={() => {}} />
                                        </td>
                                    </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                            )}
                        </div>
                    </div>
                ) : (
                    <EmptyState title="No Terminals yet..." />
                )}
            </div>
        </div>

        {/* ADD Terminal */}
        <Modal
            open={openTerminal}
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
                            {editWorker ? "Edit Terminal" : "Add Terminal"}
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
                                type="text"
                                placeholder="Terminal name"
                                name="terminalName"
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
                                placeholder="Terminal location"
                                name="terminalLocation"
                                container="w-full"
                                onChange={handleChange}
                                value={values.employeeID}
                                error={
                                    errors.employeeID &&
                                    touched.employeeID &&
                                    errors.employeeID
                                }
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

export default TerminalTeams