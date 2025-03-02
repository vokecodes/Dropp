import { Chip, FormControl, InputLabel, ListItemText, MenuItem, Modal, OutlinedInput, Select, SelectChangeEvent, Switch } from '@mui/material'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { WaiterValues } from '../../../utils/FormInitialValue';
import { WaiterInputsSchema } from '../../../utils/ValidationSchema';
import { IoMdClose } from 'react-icons/io';
import OutlineButton from '../../../components/OutlineButton';
import EmptyState from '../../../components/EmptyState';
import { truncateText, uuidGen } from '../../../utils/formatMethods';
import Button from '../../../components/Button';
import Input from '../../../components/CustomInput';
import { Checkbox } from '@headlessui/react';
import { IoSearchSharp } from 'react-icons/io5';

const initialData = [
    {
        id: 1927,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        tables: [1, 2, 3, 4]
    },
    {
        id: 1928,
        first_name: "Jane",
        last_name: "Smith",
        email: "janesmith@gmail.com",
        tables: [1, 2, 3, 4]
    },
    {
        id: 1929,
        first_name: "Michael",
        last_name: "Johnson",
        email: "michaeljohnson@gmail.com",
        tables: [1, 2, 3, 4]
    },
    {
        id: 1930,
        first_name: "Emily",
        last_name: "Davis",
        email: "emilydavis@gmail.com",
        tables: [1, 2, 3, 4]
    }
];


const WaiterTeams = ({
    openWaiter,
    setOpenWaiter
}: any) => {

    const [loading, setLoading] = useState<any>(false);
    const [togglePassword, setTogglePassword] = useState("password");
    const [editWorker, setEditWorker] = useState<any>(null);
    const [waiter, setWaiter] = useState(null);

    const table = [
        { _id: '1', table: "Table 1", value: "Table 1" },
        { _id: '2', table: "Table 2", value: "Table 2" },
        { _id: '3', table: "Table 3", value: "Table 3" },
        { _id: '4', table: "Table 4", value: "Table 4" },
        { _id: '5', table: "Table 5", value: "Table 5" }
    ];
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
        initialValues: WaiterValues,
        validationSchema: WaiterInputsSchema,
        onSubmit: async () => {
            
        }
    });
    
    const [q, setQ] = useState("");
    const handleClose = () => setOpenWaiter(false);

    const [personName, setPersonName] = useState<string[]>([]);
    
    const handleChangeTables = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(typeof value === "string" ? value.split(",") : value);
        setFieldValue(
            "subTables",
            typeof value === "string" ? value.split(",") : value
        );
    };

    const [selectedSection, setSelectedSection] = useState<string[]>([]);

    const handleChangeSections = (
        event: SelectChangeEvent<typeof personName>
        ) => {
        const {
            target: { value },
        } = event;
        setSelectedSection(typeof value === "string" ? value.split(",") : value);
        setFieldValue(
            "section",
            typeof value === "string" ? value.split(",") : value
        );
    };
    
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
                    onClick={() => setOpenWaiter(true)}
                >
                    <span className='mx-auto'>Add Waiter</span>
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
                                        {truncateText(`${table?.first_name} ${table?.last_name}`, 10, 13)}
                                    </p>
                                    <p className="text-sm primary_txt_color font_medium text-nowrap">
                                        {truncateText(table?.email, 12, 15)}
                                    </p>
                                    <p className="text-sm font_medium text-nowrap">
                                        {truncateText(table?.tables.join(', '), 12, 15)}
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
                <EmptyState title="No Waiters yet..." />
            )}
        </div>

        {/* ADD Waiter */}
        <Modal
            open={openWaiter}
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
                            {editWorker ? "Edit Waiter" : "Add Waiter"}
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
                            <FormControl sx={{ m: 1, width: "100%" }}>
                            <InputLabel id="demo-multiple-name-label">
                                Section
                            </InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={selectedSection ? selectedSection : []}
                                onChange={handleChangeSections}
                                input={<OutlinedInput label="Section" />}
                                renderValue={(selected) => {
                                const newSelected = section
                                    ?.filter((item) => selected.includes(item?._id))
                                    .map((item) => item?.name);

                                return newSelected.join(", ");
                                }}
                                name="section"
                            >
                                {section?.length > 0
                                ? section?.map((name) => (
                                    <MenuItem key={name._id} value={name._id}>
                                        <Checkbox
                                        checked={selectedSection?.includes(name._id)}
                                        />
                                        <ListItemText primary={name.name} />
                                    </MenuItem>
                                    ))
                                : []}
                            </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: "100%" }}>
                                <InputLabel id="demo-multiple-name-label">
                                    Tables
                                </InputLabel>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    multiple
                                    value={personName ? personName : []}
                                    onChange={handleChangeTables}
                                    input={<OutlinedInput label="Tables" />}
                                    renderValue={(selected) => {
                                    const newSelected = table
                                        ?.filter((item) => selected.includes(item?._id))
                                        .map((item) => item?.table);

                                    return newSelected.join(", ");
                                    }}
                                    name="subTables"
                                >
                                    {table?.length > 0
                                    ? table
                                        ?.filter((table) => !!table?.table)
                                        .map((name) => (
                                            <MenuItem key={name._id} value={name._id}>
                                            <Checkbox
                                                checked={personName?.includes(name._id)}
                                            />
                                            <ListItemText primary={name.table} />
                                            </MenuItem>
                                        ))
                                    : []}
                                </Select>
                            </FormControl>

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

export default WaiterTeams