"use client";

import { IProduct } from "@/redux/features/productSlice";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const TrendingProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await fetch(`/api/get-products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetProducts();
  }, []);

  return (
    <div className="container mt-32">
      <div className="sm:flex justify-between items-center">
        <h2 className="text-4xl font-medium">Trending Products</h2>

        <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
          <div className="text-black">New</div>
          <div className="">Featured</div>
          <div className="">Top Sellers</div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {products.map((item, index) => (
          <ProductCard
            id={item._id}
            key={index}
            category={item.category}
            img={item.imgSrc}
            title={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
