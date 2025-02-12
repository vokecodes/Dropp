import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import InfinityScroll from "./InfinityScroll";

const KitchenBoard = ({
  restaurantOrders,
  columnCount,
  title,
  headerBg,
  bodyBg,
  orders,
  hasMore,
  getMore,
  status,
}: any) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ title: title }),
      canDrop: ({ source }) => {
        if (
          source.data.title === title ||
          title === "New orders" ||
          title === "Completed" ||
          source.data.title === "Completed" ||
          source.data.title === "Decline" ||
          source.data.title === "Void"
        ) {
          return false;
        } else {
          return true;
        }
      },
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  return (
    <div
      id={status}
      ref={ref}
      className={`relative flex flex-col items-center justify-start gap-y-3 w-[90vw] md:w-80 shrink-0 max-h-svh overflow-y-scroll ${bodyBg} rounded-xl p-2 snap-center ${
        isDraggedOver && "border-2 border-solid border-green-500"
      }`}
    >
      <div
        className={`sticky top-0 flex flex-row justify-center items-center w-full gap-x-2 px-3 py-3 ${headerBg} rounded-xl`}
      >
        <p className="text-center font_medium text-white">{title}</p>
        <p className="h-fit w-fit rounded-full p-1 bg-black flex flex-row items-center justify-center">
          <span className="text-white font_regular text-xs">
            {restaurantOrders?.length || 0}
          </span>
        </p>
      </div>
      {orders}

      {/* <InfinityScroll
        data={restaurantOrders}
        getMore={getMore}
        hasMore={hasMore}
        scrollableTarget={status}
      >
        {orders}
      </InfinityScroll> */}
    </div>
  );
};

export default KitchenBoard;
