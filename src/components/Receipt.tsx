import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GiCook } from 'react-icons/gi';

type ReceiptProps = {
  order: any,
  chef: any,
  waiter: any,
  receiptValues: any,
  discountValue: any,
  totalPrice: any,
  orderId: any,
  handleImageLoad: any
}



// Receipt component (not exported)
const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ order, chef, waiter, receiptValues, discountValue, totalPrice, orderId, handleImageLoad }, receiptRef) => (
  <div ref={receiptRef} style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
    <div className='m-10'>
      <div className='flex flex-col items-center justify-center gap-y-3'>
        <div className='w-fit h-fit'>
          {chef?.profile?.image ? (
            <img
              src={chef?.profile?.image}
              alt="chef"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover object-center"
              onLoad={handleImageLoad}
            />
          ) : (
            <GiCook
              color="#06c167"
              className="w-16 h-16 rounded-full p-4"
            />
          )}
        </div>
        
        <p className='text-xl font-bold text-center'>{chef?.business?.businessName}</p>

        {chef?.profile?.address && (
          <p className="text-base text-center">
            {chef?.profile?.address}
          </p>
        )}
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full space-y-3'>
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p>Customer name</p>
          <p>{receiptValues?.customerName ? receiptValues?.customerName : '---'}</p>
        </div>
        
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p>Waiter name</p>
          <p>{waiter?.employeeAssigned}</p>
        </div>
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full space-y-3'>
        <p className='text-lg'>Order</p>

        <div className='mt-5 mb-5'>
          {receiptValues?.cartMenu?.map((meal: any, i: any) => {
            if(meal.discount) discountValue += ((meal.price / 100) * meal.discount) * meal.quantity

            totalPrice += (meal.price * meal.quantity)

            return (
            <div className='w-full flex flex-row justify-between items-center gap-x-5'>
              <p className='w-fit font-semibold'>{meal?.foodName}</p>
              <p className='w-fit font-semibold'>₦{meal?.discount ? (meal.price - (meal.price / 100) * meal.discount) * meal.quantity : meal.price * meal.quantity}</p>
            </div>
          )})}
        </div>

        <hr className='w-1/3 mx-auto my-5' />
          
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='w-fit font-semibold'>Subtotal</p>
          <p className='w-fit font-semibold'>{totalPrice}</p>
        </div>
        
        { discountValue > 0 && (
          <div className='w-full flex flex-row justify-between items-center gap-x-5'>
            <p className='w-fit font-semibold'>Total discount</p>
            <p className='w-fit font-semibold'>{discountValue}</p>
          </div>
        )}
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='text-xl font-bold'>TOTAL</p>
          <p className='text-xl font-bold'>₦{receiptValues.totalAmount}</p>
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full space-y-3'>
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='text-base font-bold'>Paid via</p>
          <p className='text-base font-bold'>{receiptValues.paidBy}</p>
        </div>
        
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='text-base'>Date & time</p>
          <p className='text-base'>{new Date().toLocaleDateString()}</p>
        </div>
        
        <div className='w-full flex flex-row justify-between items-center gap-x-10'>
          <p className='text-base'>Order ID</p>
          <p className='text-base'>{orderId}</p>
        </div>
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full flex flex-col justify-center items-center gap-y-5'>
        <p className='text-center text-lg font-black'>THANKS FOR PATRONIZING US!</p>

        <div className='w-full flex flex-row items-center justify-center gap-x-5'>
          <p>Powered by</p>

          <img className="h-auto w-20 p-0 m-0" src="/images/logo.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
));


const DownloadPDFButton = ({ fileName = 'receipt.pdf', children, order, chef, waiter, receiptValues, orderId }) => {
  const receiptRef = useRef<HTMLDivElement>(null); 
  const [pdfHeight, setPdfHeight] = useState(200);
  const [pdfWidth, setPdfWidth] = useState(1000);
  const discountValue = 0;
  const totalPrice = 0;
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  console.log('imagesLoaded= ', imagesLoaded)

  order = !!order ? order : {
    items: [
      {
        name: '1st order',
        quantity: '1',
        price: '#2,000'
      },
      {
        name: '2nd order',
        quantity: '7',
        price: '#8,000'
      },
      {
        name: '3rd order',
        quantity: '4',
        price: '#21,000'
      },
      {
        name: '4th order',
        quantity: '9',
        price: '#45,000'
      },
      {
        name: '5th order',
        quantity: '7',
        price: '#7,000'
      },
    ],
    total: '#74,000',
    tax: '#3,000',
    subtotal: '#77,000'
  }

  useEffect(() => {
    // Update pdfHeight based on the height of the receiptRef element
    if (receiptRef.current) {
      setPdfHeight(receiptRef.current.offsetHeight);
      setPdfWidth(receiptRef.current.offsetWidth);
    }
  }, [receiptRef.current]);

  const generatePDF = async () => {
    try {
      if (!imagesLoaded) return;

      const canvas = await html2canvas(receiptRef.current, {useCORS: true});
      const imgData = canvas.toDataURL('image/png');

      // Define PDF dimensions based on the canvas size
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      // Set the image to fit within the PDF page
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <>
      <Receipt ref={receiptRef} order={order} chef={chef} waiter={waiter} receiptValues={receiptValues} discountValue={discountValue} totalPrice={totalPrice} orderId={orderId} handleImageLoad={handleImageLoad} />
      <span onClick={generatePDF}>
        {children}
      </span>
    </>
  );
};

export default DownloadPDFButton;