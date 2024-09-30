"use client";
import { addToCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

type Product = {
  strCategory: string;
  strUuid: string;
  strProductName: string;
  strSlug: string;
  strDescription: string | null;
  strPackSize: string;
  decMrpPrice: number;
  strThumbnailUrl: string;
  dteCreatedAt: Date;
  dteUpdatedAt: Date;
  isActive: boolean;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <img
        src={product.strThumbnailUrl}
        alt={`Image of ${product.strProductName}`}
        className="w-full h-48 object-contain h-48 w-96 rounded-md"
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {product.strProductName}
        </h2>
        <p className="text-gray-600">{product.strPackSize}</p>
        <p className="text-lg font-bold text-green-500 mt-2">
          ₹{product.decMrpPrice}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() =>
            dispatch(addToCart({ id: product.strUuid, name: product.strProductName, quantity: 1, price: product.decMrpPrice }))
          }
          className="text-blue-500"
        >
          Add to Cart
        </button>
        <button
          onClick={() => router.push(`/single-product/${product.strSlug}`)}
          className="text-blue-500 hover:underline"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
