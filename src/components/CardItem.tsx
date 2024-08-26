import { MdDelete } from "react-icons/md";
import { RxCheck } from "react-icons/rx";
import ColoredSpinner from "./ColoredSpinner";

const CardItem = ({
  bankName,
  cardNumber,
  card,
  selectedCard,
  onClickSelectCard,
  onDeleteClick,
  deleteLoading,
  selectedLoading,
  dashboardView,
}: any) => {
  return (
    <div className="border-b py-4">
      {dashboardView ? (
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="ml-5">
                <p className="text-lg gray_color font_regular uppercase">
                  {bankName}
                </p>
                <div className="flex items-center">
                  <p className="text-lg text-black font_bold">{cardNumber}</p>
                  <div className="mx-1 bg_ter_gray_color w-1 h-1 rounded-full" />
                  <p className="text-lg text-black font_regular uppercase">
                    {card}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-8 h-8 rounded-full bg_menu flex items-center justify-center cursor-pointer"
            onClick={onClickSelectCard}
          >
            {selectedCard && <RxCheck size={24} color="#06c167" />}
            {selectedLoading && <ColoredSpinner />}
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <div
                className="w-8 h-8 rounded-full bg_menu flex items-center justify-center cursor-pointer"
                onClick={onClickSelectCard}
              >
                {selectedCard && <RxCheck size={24} color="#06c167" />}
                {selectedLoading && <ColoredSpinner />}
              </div>
              <div className="ml-5">
                <p className="text-lg gray_color font_regular uppercase">
                  {bankName}
                </p>
                <div className="flex items-center">
                  <p className="text-lg text-black font_bold">{cardNumber}</p>
                  <div className="mx-1 bg_ter_gray_color w-1 h-1 rounded-full" />
                  <p className="text-lg text-black font_regular uppercase">
                    {card}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {onDeleteClick && (
            <div className="cursor-pointer" onClick={onDeleteClick}>
              {deleteLoading ? (
                <ColoredSpinner />
              ) : (
                <MdDelete size={28} color="#737682" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardItem;
