import { RxCross1 } from "react-icons/rx";

type CartProductType = {
  img: string;
  title: string;
  price: string;
  quantity: string;
  id: string;
  handleProductRemoved: (id: string) => void;
};

const CartProduct = ({
  img,
  title,
  price,
  quantity,
  id,
  handleProductRemoved,
}: CartProductType) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={img} alt={title} className="h-[80px] w-[80px] object-cover" />
        <div className="space-y-2">
          <h3 className="font-medium">{title}</h3>
          <p className="text-gray-600 text-[14px]">
            {quantity} x ${price}.00
          </p>
        </div>
      </div>

      <RxCross1
        className="cursor-pointer"
        onClick={() => handleProductRemoved(id)}
      />
    </div>
  );
};

export default CartProduct;
