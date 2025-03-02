import { Chip, Modal, Switch } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { ManagerValues } from '../../../utils/FormInitialValue';
import { ManagerInputsSchema } from '../../../utils/ValidationSchema';
import { IoMdClose } from 'react-icons/io';
import OutlineButton from '../../../components/OutlineButton';
import EmptyState from '../../../components/EmptyState';
import { truncateText, uuidGen } from '../../../utils/formatMethods';
import Button from '../../../components/Button';
import Input from '../../../components/CustomInput';
import { Checkbox } from '@headlessui/react';

const initialData = [
    {
        id: 1927,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com"
    },
    {
        id: 1928,
        first_name: "Jane",
        last_name: "Smith",
        email: "janesmith@gmail.com"
    },
    {
        id: 1929,
        first_name: "Michael",
        last_name: "Johnson",
        email: "michaeljohnson@gmail.com"
    },
    {
        id: 1930,
        first_name: "Emily",
        last_name: "Davis",
        email: "emilydavis@gmail.com"
    },
    {
        id: 1931,
        first_name: "Daniel",
        last_name: "Brown",
        email: "danielbrown@gmail.com"
    }
];

const dummyPermissions = {
    inventory: {
        label: "Inventory",
        permissions: [
            {label: "Supplier manager", value: false},
            {label: "Stock take", value: true},
            {label: "Stock management", value: true},
            {label: "Inventory", value: false},
        ]
    },
    waiter_management: {
        label: "Waiter management",
        permissions: [
            {label: "Supplier manager", value: false},
            {label: "Stock take", value: true},
            {label: "Stock management", value: true},
            {label: "Inventory", value: false},
        ]
    },
    orders_management: {
        label: "Orders management",
        permissions: [
            {label: "Supplier manager", value: false},
            {label: "Stock take", value: true},
            {label: "Stock management", value: true},
            {label: "Inventory", value: false},
        ]
    },
    menu_management: {
        label: "Menu management",
        permissions: [
            {label: "Supplier manager", value: false},
            {label: "Stock take", value: true},
            {label: "Stock management", value: true},
            {label: "Inventory", value: false},
        ]
    },
};


const ManagerTeams = ({
    openManager,
    setOpenManager
}: any) => {

    const [loading, setLoading] = useState<any>(false);
    const [editWorker, setEditWorker] = useState<any>(null);
    const [manager, setManager] = useState(null);
    
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
        initialValues: ManagerValues,
        validationSchema: ManagerInputsSchema,
        onSubmit: async () => {
            
        }
    });
    
    const handleClose = () => setOpenManager(false);

    const label = { inputProps: { 'aria-label': 'Manager permissions' } };
    
  return (
    <>
        <div>
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
                                        {truncateText(`${table?.first_name} ${table?.last_name}`, 10, 13)}
                                    </p>
                                    <p className="text-sm primary_txt_color font_medium text-nowrap">
                                        {truncateText(table?.email, 12, 15)}
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
                <EmptyState title="No Managers yet..." />
            )}
        </div>

        {/* ADD MANAGER */}
        <Modal
            open={openManager}
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
                            {editWorker ? "Edit Manager" : "Add Manager"}
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
                                placeholder="First name"
                                name="firstName"
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
                                placeholder="Last name"
                                name="lastName"
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
                                type="email"
                                placeholder="Email"
                                name="email"
                                container="w-full"
                                onChange={handleChange}
                                value={values.employeeAssigned}
                                error={
                                    errors.employeeAssigned &&
                                    touched.employeeAssigned &&
                                    errors.employeeAssigned
                                }
                            />

                            <div className='w-full'>
                                <div className='w-full flex flex-row items-center justify-between'>
                                    <p className='text-sm font-semibold'>Permissions</p>

                                    <Switch {...label} defaultChecked />
                                </div>

                                <div className='flex flex-col justify-start items-stretch gap-y-2'>
                                    {Object.keys(dummyPermissions).map(item => {
                                        const currentItem = dummyPermissions[item];
                                        let overall = true;
                                        
                                        dummyPermissions[item].permissions.forEach(perm => {
                                            if(perm.value === false){
                                                overall = false;
                                                return;
                                            }
                                        });

                                        return (
                                            <div key={uuidGen()} className='rounded-lg bg-[#EFEFEF] p-3'>

                                                <div className='flex flex-row items-center justify-start gap-x-1 mb-2'>
                                                    <Checkbox
                                                        // checked={overall}
                                                        onChange={() => {}}
                                                        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                                                        >
                                                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Checkbox>
                                                    <p className='text-xs font-semibold'>{currentItem?.label}</p>
                                                </div>

                                                <div className='w-full flex flex-row items-center justify-start gap-x-3 gap-y-2 flex-wrap'>
                                                    {currentItem?.permissions.map(perm => (
                                                        <div key={uuidGen()} className='flex flex-row items-center justify-start gap-x-1'>
                                                            <Checkbox
                                                                // checked={perm?.value}
                                                                onChange={() => {}}
                                                                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                                                                >
                                                                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                                                    <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </Checkbox>
                                                            <p className='text-xs text-[#595959] font-semibold'>{perm?.label}</p>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
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

export default ManagerTeams