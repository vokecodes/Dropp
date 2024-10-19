import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react'
import KitchenButton from './KitchenButton';
import invariant from 'tiny-invariant';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

const KitchenCard = ({
    order,
    startCooking,
    handleStartCooking,
    setDeclineOrder,
    setDeclineOrderMenu,
    openDeclineModal,
    restaurantOrders,
    filteredRestaurantOrders
}) => {

    const dragRef = useRef(null)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        const el = dragRef.current
        invariant(el)

        return draggable({
        element: el,
        getInitialData: () => ({ data: 'works' }),
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(true)
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
            {moment(order?.updatedAt).format("DD/MM/YYYY H:MM A")}
        </p>
        <p className="font-semibold font_medium mb-2">
            {order?.name} - {order?.table?.table} #
            {order?._id?.substring(order?._id?.length - 5)}
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

        <KitchenButton
            title="Start Cooking"
            extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
            loading={startCooking === order?._id}
            onClick={() =>
            handleStartCooking(order?.parent, order?._id)
            }
        />

        <KitchenButton
            title="Decline"
            extraClasses="mt-2 text-red-600 bg-red-100 border-red-600"
            onClick={() => {
            setDeclineOrder(order?.parent);
            setDeclineOrderMenu(order?._id);
            openDeclineModal();
            }}
        />
    </div>
  )
}

export default KitchenCard