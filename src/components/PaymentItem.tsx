import { MdDelete } from "react-icons/md";
import { PaymentItemProps } from "../utils/Interfaces";
import ColoredSpinner from "./ColoredSpinner";

const PaymentItem = ({
  bankImage,
  bankName,
  bankAccountNumber,
  bankAccountName,
  onDeleteClick,
  deleteLoading,
}: PaymentItemProps) => {
  return (
    <div className="border-b py-4">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center">
            {/* <div className="w-16 h-16 rounded-full mr-2">
              <img src={bankImage} alt="bank-logo" className="w-16 h-16 mt-2" />
            </div> */}
            <div>
              <p className="text-lg gray_color font_regular uppercase">
                {bankAccountName}
              </p>
              <div className="flex items-center">
                <p className="text-lg text-black font_bold">
                  {bankAccountNumber}
                </p>
                <div className="mx-1 bg_ter_gray_color w-1 h-1 rounded-full" />
                <p className="text-lg text-black font_regular uppercase">
                  {bankName}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cursor-pointer" onClick={onDeleteClick}>
          {deleteLoading ? (
            <ColoredSpinner />
          ) : (
            <MdDelete size={28} color="#737682" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
