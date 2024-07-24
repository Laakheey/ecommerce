"use client";

import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hooks";
import { makeToast } from "@/utils/helper";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

type PayloadType = {
  imgSrc: null | string;
  fileKey: string | null;
  name: string;
  category: string;
  price: string;
};

const ProductForm = () => {
  const [payload, setPayload] = useState<PayloadType>({
    imgSrc: null,
    fileKey: null,
    name: "",
    category: "",
    price: "",
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(setLoading(true));

    fetch(`/api/addProduct`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then(() => {
        makeToast("Product added successfully");
        setPayload({
          imgSrc: null,
          fileKey: null,
          price: "",
          name: "",
          category: "",
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Image
        className="max-h-[300px] w-auto object-contain rounded-md"
        src={payload.imgSrc ? payload.imgSrc : "/placeholder.jpg"}
        width={500}
        height={800}
        alt="Product"
      />

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setPayload({ ...payload, imgSrc: res[0].url, fileKey: res[0].key });
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />

      <div className="">
        <label htmlFor="name" className="bloc ml-1">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.name}
          required
          onChange={(e) => setPayload({ ...payload, name: e.target.value })}
        />
      </div>

      <div className="">
        <label htmlFor="category" className="bloc ml-1">
          Product Category
        </label>
        <input
          id="category"
          type="text"
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.category}
          required
          onChange={(e) => setPayload({ ...payload, category: e.target.value })}
        />
      </div>

      <div className="">
        <label htmlFor="price" className="bloc ml-1">
          Product Price
        </label>
        <input
          id="price"
          type="text"
          className="bg-gray-300 w-full px-4 py-2 border outline-pink rounded-md"
          value={payload.price}
          required
          onChange={(e) => setPayload({ ...payload, price: e.target.value })}
        />
      </div>

      <div className="flex justify-end">
        <button className="bg-pink text-white px-8 py-2 rounded-md">Add</button>
      </div>
    </form>
  );
};

export default ProductForm;
