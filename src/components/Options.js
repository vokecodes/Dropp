import OptionCard from "./OptionCard";
import { Images } from "../config/images";

const Options = ({ user, setShowShoppingList }) => {
  const options = [
    {
      _id: 1,
      title: `Create & share \nyour shopping list.`,
      description: `Curate your list. Share with a dropper. 
            Save for later.`,
      image: Images.create,
      onClick: () => setShowShoppingList(true),
    },
    {
      _id: 2,
      title: `Shop from \nDropp mart.`,
      description: `Explore & shop from 
            1000+ items.`,
      image: Images.shop,
      onClick: () => window.open("https://paystack.shop/droppmart"),
    },
    {
      _id: 3,
      title: `Chat with your \npersonal dropper.`,
      description: `Hi, I’m Alex. I’m here to do 
            your shopping.`,
      image: Images.chat,
      onClick: () => window.open("https://wa.me/message/YKVHYMI6AXGUC1"),
    },
  ];
  return (
    <div>
      <div className="ml-6 lg:ml-0">
        <h1 className="text-2xl font_semibold shrink">
          Hi <span className="capitalize">{user?.firstName},</span>
        </h1>
        <h1 className="text-4xl lg:text-5xl text-black font_medium mt-5 mb-10">
          How would you love <br />
          to shop? 🛒
        </h1>
      </div>
      <div className="bg_shopping p-4 lg:p-8 rounded-3xl shadow-sm mb-10 lg:mb-0">
        {options?.map((option) => (
          <OptionCard
            key={option?._id}
            title={option?.title}
            description={option?.description}
            image={option?.image}
            onClick={option?.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Options;
