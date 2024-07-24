"use client";

import Popup from "@/components/admin-panel/Popup";
import ProductRow from "@/components/admin-panel/ProductRow";
import { setLoading } from "@/redux/features/loadingSlice";
import { IProduct } from "@/redux/features/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openPopup, setOpenPopUp] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    fetch("/api/get-products")
      .then((res) => {
        return res.json()
      })
      .then((response) =>{
        setProducts(response)
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));

  }, [updateTable]);

  return (
    <>
      <div className="bg-white h-[calc(100vh-96px)] rounded-lg p-4">
        <h2 className="text-3xl">All Products</h2>
        <div className="mt-4 h-[calc(100vh-180px)] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 border-t border-[#aeb370]">
                <th>SR No.</th>
                <th>Name</th>
                <th>Price</th>
                <th>Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <ProductRow
                    key={index}
                    srNo={index + 1}
                    setOpenPopUp={setOpenPopUp}
                    setUpdateTable={setUpdateTable}
                    product={product}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {openPopup && (
        <Popup setOpenPopup={setOpenPopUp} setUpdateTable={setUpdateTable} />
      )}
    </>
  );
};

export default Dashboard;
