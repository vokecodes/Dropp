import { formatRemoteAmountKobo } from "../utils/formatMethods";

const DOWalletCard = ({ title, amount }: any) => {
  return (
    <div className="bg_menu rounded-2xl px-8 py-6">
      <p className="text-lg font_medium primary_txt_color">{title}</p>
      <p className="text-2xl font_bold text-black">
        {formatRemoteAmountKobo(amount).naira}
        {formatRemoteAmountKobo(amount).kobo}
      </p>
    </div>
  );
};

export default DOWalletCard;
