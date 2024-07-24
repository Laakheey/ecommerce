import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { RxCross1 } from "react-icons/rx";
import { removeFromCart } from "@/redux/features/cartSlice";

type CartType = {
  setShowCart: Dispatch<SetStateAction<boolean>>;
};

const Cart = ({ setShowCart }: CartType) => {
  const products = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();
  const [allProducts, setAllProducts] = useState(products);

  const getTotal = () => {
    let total = 0;
    allProducts.forEach(
      (item) =>
        (total = total + parseFloat(item.price) * parseFloat(item.quantity))
    );
    return total;
  };

  const [total, setTotal] = useState(getTotal());

  const handleProductRemoved = (id: string) => {
    const updatedProducts = allProducts.map(x => {
      if (x.id === id) {
        const updatedQuantity = (parseInt(x.quantity) - 1).toString();
        return { ...x, quantity: updatedQuantity };
      }
      return x;
    }).filter(x => x.quantity !== '0');  
    setAllProducts(updatedProducts);
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    setTotal(getTotal());
  }, [allProducts])
  

  return (
    <div className="bg-[#0000007d] w-full min-h-screen fixed left-0 top-0 z-20 overflow-y-scroll">
      <div className="max-w-[400px] w-full min-h-full bg-white absolute right-0 top-0 p-6">
        <RxCross1
          className="absolute right-0 top-0 m-6 text-[25px] cursor-pointer"
          onClick={() => setShowCart(false)}
        />
        <h3 className="pt-3 text-lg font-medium text-gray-600 uppercase">
          Your Cart
        </h3>
        <div className="mt-6 space-y-2">
          {allProducts.map((item) => (
            <CartProduct
              img={item.img}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              id={item.id}
              key={item.id}
              handleProductRemoved={handleProductRemoved}
            />
          ))}
        </div>

        <div className="flex justify-between items-center font-medium text-xl py-4">
          <p>Total:</p>
          <p>${total}.00</p>
        </div>

        <button className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4">
          View Cart
        </button>

        <button className="bg-black text-white text-center w-full rounded-3xl py-2 hover:bg-accent mb-4 mt-4">
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default Cart;
