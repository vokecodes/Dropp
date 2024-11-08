import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GiCook } from 'react-icons/gi';
import { dateFormatter, formatPrice } from '../utils/formatMethods';

type ReceiptProps = {
  chef: any,
  waiter: any,
  receiptValues: any,
  discountValue: any,
  totalPrice: any,
  orderId: any,
  handleImageLoad: any,
  date: any,
  waiterScreen: any
}



// Receipt component (not exported)
const Receipt = React.forwardRef<HTMLDivElement, ReceiptProps>(({ chef, waiter, receiptValues, discountValue, totalPrice, orderId, handleImageLoad, date, waiterScreen }, receiptRef) => (

  <div ref={receiptRef} style={{ position: 'absolute', top: '-10000px', left: '-10000px', maxWidth: '450px' }}>
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

          {waiterScreen ? (
            <div className='mt-5 mb-5'>
              {receiptValues?.cartMenu?.map((meal: any, i: any) => {
                if(meal.menu.discount) discountValue += ((meal.menu.price / 100) * meal.menu.discount) * meal.quantity
    
                totalPrice += (meal.menu.price * meal.quantity)
    
                  return (
                    <div key={i} className='w-full flex flex-row justify-between items-center gap-x-5'>
                      <p className='w-fit font-semibold text-wrap'>{meal?.menu.foodName}</p>
                      <p className='w-fit font-semibold text-nowrap'>₦{meal.menu.price * meal.quantity}</p>
                    </div>
                  )
                })}
            </div>
          ) : (
            <div className='mt-5 mb-5'>
              {receiptValues?.cartMenu?.map((meal: any, i: any) => {
                if(meal.discount) discountValue += ((meal.price / 100) * meal.discount) * meal.quantity
    
                totalPrice += (meal.price * meal.quantity)
    
                  return (
                    <div key={i} className='w-full flex flex-row justify-between items-center gap-x-5'>
                      <p className='w-fit font-semibold text-wrap'>{meal?.foodName}</p>
                      <p className='w-fit font-semibold text-nowrap'>₦{meal.price * meal.quantity}</p>
                    </div>
                  )
                })}
            </div>
          )}

        <hr className='w-1/3 mx-auto my-5' />
          
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='w-fit font-semibold'>Subtotal</p>
          <p className='w-fit font-semibold'>{formatPrice(totalPrice)}</p>
        </div>
        
        { discountValue > 0 && (
          <div className='w-full flex flex-row justify-between items-center gap-x-5'>
            <p className='w-fit font-semibold'>Total discount</p>
            <p className='w-fit font-semibold'>{formatPrice(discountValue)}</p>
          </div>
        )}
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='text-xl font-bold'>TOTAL</p>
          <p className='text-xl font-bold'>₦{formatPrice(receiptValues.totalAmount)}</p>
      </div>

      <hr className='w-3/4 mx-auto my-5' />

      <div className='w-full space-y-3'>
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='text-base font-bold'>Paid via</p>
          <p className='text-base font-bold'>{receiptValues.paidBy}</p>
        </div>
        
        <div className='w-full flex flex-row justify-between items-center gap-x-5'>
          <p className='text-base'>Date & time</p>
          <p className='text-base'>{date}</p>
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


const DownloadPDFButton = ({ children, chef, waiter, receiptValues, orderId, date, waiterScreen }) => {
  const receiptRef = useRef<HTMLDivElement>(null); 
  const [pdfHeight, setPdfHeight] = useState(200);
  const [pdfWidth, setPdfWidth] = useState(1000);
  const discountValue = 0;
  const totalPrice = 0;
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  date = date ? dateFormatter.format(new Date(date)) : dateFormatter.format(new Date());

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
      pdf.save(`${orderId}-dropp.pdf`);
    } catch (error) {
      alert("An error has occured!\nDon't fret, keep calm and try again.");
    }
  };

  return (
    <>
      <Receipt ref={receiptRef} chef={chef} waiter={waiter} receiptValues={receiptValues} discountValue={discountValue} totalPrice={totalPrice} orderId={orderId} handleImageLoad={handleImageLoad} date={date} waiterScreen={waiterScreen} />

      <span onClick={generatePDF}>
        {children}
      </span>
    </>
  );
};

export default DownloadPDFButton;