import moment from 'moment';
import { useEffect, useRef, useState } from 'react'
import invariant from 'tiny-invariant';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { dateFormatter } from '../utils/formatMethods';

const KitchenCard = ({
    order,
    restaurantOrders,
    filteredRestaurantOrders,
    kitchenCardButtons,
    title
}) => {

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
            console.log('dragging has started')
        }
        })
    }, [restaurantOrders, filteredRestaurantOrders])

  return (
    <div
        ref={dragRef}
        key={order?._id}
        className="bg-white w-full  mb-2 p-3 rounded-xl cursor-move"
        style={dragging ? { opacity: 0.4, borderColor: '#16a34a', borderStyle: 'solid', borderWidth: '6px' } : {}}
    >
        <p className="font-semibold font_medium">
            {dateFormatter.format(new Date(order?.updatedAt))}
        </p>
        <p className="font-semibold font_medium mb-2">
            {order?.name} - {order?.table?.table} #
            {order?.displayId?.slice(-6)}
        </p>
        <div className="flex flex-row">
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