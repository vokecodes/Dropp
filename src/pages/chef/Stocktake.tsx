import { useState } from 'react'
import ChefDashboardLayout from '../../components/ChefDashboardLayout';
import { CHEF_ROUTES } from '../../routes/routes';
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import PageTitle from '../../components/PageTitle';
import { IoSearchSharp } from 'react-icons/io5';
import { DashboardItemSkeletonLoader } from '../../components/DashboardItemSkeletonLoader';
import { generateUUIDBasedOnStringLength } from '../../utils/formatMethods';
import { Checkbox } from '@headlessui/react';
import { Modal } from '@mui/material';
import { IoMdClose } from 'react-icons/io';
import Button from '../../components/Button';

const STOCK_ITEMS = [
    {
        sku: '52363534',
        item: 'Rice (Mama gold)',
        category: ['Bar', 'Kitchen'],
        unit: 'KG',
        unit_cost: '10000',
        total_cost: '10000',
        reorder_level: '20'
    },
    {
        sku: '52363535',
        item: 'Beans (Oloyin)',
        category: ['Kitchen'],
        unit: 'KG',
        unit_cost: '8000',
        total_cost: '8000',
        reorder_level: '15'
    },
    {
        sku: '52363536',
        item: 'Flour (Golden Penny)',
        category: ['Bakery', 'Kitchen'],
        unit: 'KG',
        unit_cost: '7500',
        total_cost: '7500',
        reorder_level: '25'
    },
    {
        sku: '52363537',
        item: 'Vegetable Oil (Kings)',
        category: ['Kitchen'],
        unit: 'Litre',
        unit_cost: '12000',
        total_cost: '12000',
        reorder_level: '30'
    },
    {
        sku: '52363538',
        item: 'Sugar (Dangote)',
        category: ['Bar', 'Kitchen'],
        unit: 'KG',
        unit_cost: '5000',
        total_cost: '5000',
        reorder_level: '10'
    },
    {
        sku: '52363539',
        item: 'Salt (Mr Chef)',
        category: ['Kitchen'],
        unit: 'KG',
        unit_cost: '3000',
        total_cost: '3000',
        reorder_level: '10'
    },
    {
        sku: '52363540',
        item: 'Spaghetti (Golden Penny)',
        category: ['Kitchen'],
        unit: 'Pack',
        unit_cost: '6000',
        total_cost: '6000',
        reorder_level: '25'
    },
    {
        sku: '52363541',
        item: 'Milk (Peak Powdered)',
        category: ['Bar', 'Kitchen'],
        unit: 'Tin',
        unit_cost: '15000',
        total_cost: '15000',
        reorder_level: '18'
    },
    {
        sku: '52363542',
        item: 'Soft Drinks (Coca-Cola)',
        category: ['Bar'],
        unit: 'Crate',
        unit_cost: '14000',
        total_cost: '14000',
        reorder_level: '10'
    },
    {
        sku: '52363543',
        item: 'Chicken (Frozen)',
        category: ['Kitchen'],
        unit: 'KG',
        unit_cost: '20000',
        total_cost: '20000',
        reorder_level: '10'
    }
];

const Stocktake = () => {

    const [continueModal, setContinueModal] = useState(false)
    const openContinueModal = () => {
        setContinueModal(true)
    }
    const closeContinueModal = () => {
        setContinueModal(false)
    }

    const [isLoading, setIsLoading] = useState(false);
    const [q, setQ] = useState("");

    const [skuList, setSkuList] = useState([])

    const handleSkuCheck = (sku) => {
        if(skuList.includes(sku)){
            let tempList = skuList;
            const index = tempList.indexOf(sku);
            if (index > -1) {
                tempList.splice(index, 1);
            }
            setSkuList([...tempList]);
        }else{
            setSkuList([sku, ...skuList]);
        }
    }

    const searchFiltered =
    q === ""
      ? STOCK_ITEMS
      : STOCK_ITEMS.filter(
          (item: any) =>
            item?.category?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.item?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.sku?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.unit?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.unit_cost?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.total_cost?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
            item?.reorder_level?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );

    return (
        <ChefDashboardLayout>
            <>
                <div className="w-full px-6 py-4">
                    <div className="flex flex-col md:flex-row w-full justify-between gap-y-2 md:gap-y-0">
                        <Link to={CHEF_ROUTES.linkChefInventory}>
                            <div className="flex flex-row items-center cursor-pointer">
                                <MdOutlineArrowBackIosNew size={20} className="mr-3" />
                                <PageTitle title="Back" />
                            </div>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl w-full py-10 px-5 mt-3">
                        <div>
                            <p className='text-3xl font-semibold pb-2'>Stocktake</p>
                            <p className='text-lg'>Select the list of stock you want to take</p>
                        </div>

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
                                onClick={openContinueModal}
                            >
                                Continue
                            </button>
                        </div>

                        <div className="inline-block min-w-[300px] lg:min-w-full py-5 align-middle">
                            <div className="overflow-x-auto">
                                {isLoading ? (
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
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font_medium text-black font-normal sm:pl-0"
                                            >
                                                SKU
                                            </th>
                                            <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                            >
                                                Item
                                            </th>
                                            <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                            >
                                                Category
                                            </th>
                                            <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                            >
                                                Unit
                                            </th>
                                            <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                            >
                                                Unit cost
                                            </th>
                                            <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                            >
                                                Total cost
                                            </th>
                                            <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font_medium text-black font-normal"
                                            >
                                                Reorder level
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                    {searchFiltered?.map(
                                        (transaction: any, i: number) => (
                                        <tr
                                            key={generateUUIDBasedOnStringLength(
                                            "ttrugf"
                                            )}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                                                <span className='flex items-center gap-x-2'>
                                                    <Checkbox
                                                        checked={skuList.includes(transaction?.sku)}
                                                        onChange={() => handleSkuCheck(transaction?.sku)}
                                                        className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                                                    >
                                                        {/* Checkmark icon */}
                                                        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </Checkbox>
                                                    {transaction?.sku}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3">
                                                {transaction?.item}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                                {transaction?.category?.join(", ")}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                                {transaction?.unit}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                                {transaction?.unit_cost}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                                {transaction?.total_cost}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-0 text-sm font_medium text-[#310E0E] lg:pl-3 text-wrap">
                                                {transaction?.reorder_level}
                                            </td>
                                        </tr>
                                        )
                                    )}
                                    </tbody>
                                </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    open={continueModal}
                    onClose={closeContinueModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <div className="absolute top-1/2 left-1/2 w-5/6 lg:w-1/3 h-3/4 overflow-scroll -translate-y-1/2 -translate-x-1/2 bg-white rounded-3xl p-7 my-10 outline-none">
                        <div className="flex">
                            <p className="flex-1 text-xl text-center font_bold black2">
                                Enter the quantity you want to take
                            </p>
                            <IoMdClose
                            size={24}
                            color="#8E8E8E"
                            className="cursor-pointer"
                            onClick={closeContinueModal}
                            />
                        </div>

                        <div className="mt-3 w-full h-5/6 relative">
                            <div className="w-full max-h-96 h-fit py-3 overflow-y-auto">
                                {
                                    STOCK_ITEMS.filter(item => skuList.includes(item?.sku)).map(item => (
                                        <div className='flex flex-row items-center justify-between py-2'>
                                            <p className='text-sm'>{item?.item}</p>
                                            
                                            <div className='flex flex-row items-center justify-right gap-x-2'>
                                                <p className='text-xs text-gray-600'>Enter quantity*</p>
                                                <input type="number" className='w-24 border border-neutral-500 rounded p-1' />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="mt-10 absolute bottom-0 w-full">
                                <Button
                                    loading={isLoading}
                                    title="Continue"
                                    extraClasses="w-full p-3 rounded-full px-8 py-2"
                                    onClick={() => {
                                        closeContinueModal();
                                        setSkuList([])
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        </ChefDashboardLayout>
    )
}

export default Stocktake