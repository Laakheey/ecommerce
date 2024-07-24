import { addToCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

type ProductCardType = {
  id: string;
  img: string;
  category: string;
  title: string;
  price: number;
};

const ProductCard = ({ id, img, title, category, price }: ProductCardType) => {
  const dispatch = useAppDispatch();

  const addProductToCart = () => {
    const payload = {
      id,
      img,
      title,
      price: `${price}`,
      quantity: "1",
    };

    dispatch(addToCart(payload));
    toast.success("Added to cart successfully");
  };

  return (
    <div className="border border-gray-200">
      <div className="text-center border-b border-gray-200">
        <img
          src={img}
          alt={title}
          className="inline-block"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      </div>

      <div className="px-8 py-4">
        <p className="text-gray-500 text-[14px] font-medium">{category}</p>

        <h2 className="font-medium">{title}</h2>
        <div className="mt-3 flex text-[#ffb21d] items-center">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
          <p className="text-gray-600 text-[14px] ml-2">(3 Review)</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <h2 className="font-medium text-accent text-xl">${price}</h2>
          <div
            className="flex gap-2 items-center bg-pink text-white px-4 py-2 cursor-pointer hover:bg-accent"
            onClick={addProductToCart}
          >
            <AiOutlineShoppingCart /> Add To Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
