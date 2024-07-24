import { setLoading } from "@/redux/features/loadingSlice";
import { IProduct, setProduct } from "@/redux/features/productSlice";
import { makeToast } from "@/utils/helper";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";

type PropsType = {
  srNo: number;
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
  setUpdateTable: Dispatch<SetStateAction<boolean>>;
  product: IProduct;
};

const ProductRow = ({
  srNo,
  setOpenPopUp,
  setUpdateTable,
  product,
}: PropsType) => {
  const dispatch = useDispatch();

  const onEdit = () => {
    dispatch(setProduct(product));
    setOpenPopUp(true);
  };

  const onDelete = async () => {
    dispatch(setLoading(true));
  
    const payload = {
      fileKey: product.fileKey,
    };
  
    try {
      const deleteFileResponse = await fetch(`/api/uploadthing`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: payload }),
      });
  
      if (!deleteFileResponse.ok) {
        throw new Error('Failed to delete file');
      }
  
      const deleteProductResponse = await fetch(`/api/deleteProduct/${product._id}`, {
        method: "DELETE",
      });
  
      if (!deleteProductResponse.ok) {
        throw new Error('Failed to delete product');
      }
      
      makeToast("Product deleted successfully");
      setUpdateTable((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      makeToast(`Could not delete the product! Please try again later`);
    } finally {
      dispatch(setLoading(false));
    }
  };
  

  return (
    <tr>
      <td>
        <div>{srNo}</div>
      </td>
      <td>
        <div>{product.name}</div>
      </td>
      <td>
        <div>$ {product.price}</div>
      </td>
      <td className="py-2">
        <Image src={product.imgSrc} width={40} height={40} alt={product.name} />
      </td>
      <td>
        <div className="text-2xl flex items-center text-gray-600">
          <CiEdit
            className="cursor-pointer hover:text-black"
            onClick={onEdit}
          />
          <RiDeleteBin5Line
            className="text-[20px] cursor-pointer hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
