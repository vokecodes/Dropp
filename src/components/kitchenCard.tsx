import moment from 'moment';
import { useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { dateFormatter } from '../utils/formatMethods';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const KitchenCard = ({
    order,
    restaurantOrders,
    filteredRestaurantOrders,
    kitchenCardButtons=[],
    title
}) => {
    const [openNotes, setOpenNotes] = useState(false)
    const dragRef = useRef(null)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        const el = dragRef.current
        invariant(el)

        return draggable({
        element: el,
        getInitialData: () => ({ order: order, title: title }),
        onDragStart: () => setDragging(true),
        onDrop: () => {
            setDragging(false)
        }
        })
    }, [restaurantOrders, filteredRestaurantOrders])

  return (
    <div
        ref={dragRef}
        key={order?._id}
        className="bg-white w-full shrink-0 mb-2 p-3 rounded-xl cursor-move"
        style={dragging ? { opacity: 0.4, borderColor: '#16a34a', borderStyle: 'solid', borderWidth: '6px' } : {}}
    >
        <p className="font-semibold font_medium">
            {dateFormatter.format(new Date(order?.updatedAt))}
        </p>
        <p className="font-semibold font_medium mb-2">
            {order?.name} - {order?.table?.table} #
            {order?.displayId?.slice(-6)}
        </p>

        <div className={`flex flex-row ${order?.notes && 'mb-3'}`}>
            <img
            src={order?.menu?.images[0]}
            className="w-10 h-auto rounded-md"
            alt="menu"
            />
            <div className="ml-2 font_bold text-sm space-y-2">
            <p>{order?.menu?.foodName}</p>
            <p>
                {order?.quantity} portion
                {order?.quantity > 1 && "s"}
            </p>
            </div>
        </div>

        {order?.notes && (
          <>
            <hr className="w-4/5 border mx-auto my-2" />
            <div className='w-full font_medium text-sm px-2'>
                <div className='w-full flex flex-row items-center justify-between p-2 cursor-pointer hover:bg-neutral-200/80 hover:rounded-xl duration-500' onClick={() => setOpenNotes(!openNotes)}>
                    <p className="text-[#585858] text-base font-medium font_medium">Note:</p>
                    {openNotes ? (
                        <IoIosArrowUp size={20} />
                    ) : (
                        <IoIosArrowDown size={20} />
                    )}
                </div>
                {openNotes && (
                    <p className='font_medium text-sm text-wrap'>{order?.notes}</p>
                )}
            </div>
            <hr className="w-4/5 border mx-auto my-2" />
          </>
        )}

        {
            kitchenCardButtons && kitchenCardButtons.map((cardButton: any, i: any) => (
                <div key={i}>
                    {cardButton}
                </div>
            ))
        }

        
    </div>
  )
}

export default KitchenCard