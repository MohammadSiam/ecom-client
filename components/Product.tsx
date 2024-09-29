"use client";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import React from "react";

type Product = {
  strCategory: string;
  strUuid: string;
  strProductName: string;
  strSlug: string;
  strDescription: string | null;
  strPackSize: string;
  decMrpPrice: string;
  strThumbnailUrl: string;
  dteCreatedAt: Date;
  dteUpdatedAt: Date;
  isActive: boolean;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter(); // Initialize the router

  // Function to handle navigation
  const handleNavigate = () => {
    router.push(`${product.strSlug}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
      <img
        src={product.strThumbnailUrl}
        alt={`Image of ${product.strProductName}`} // Improved alt text
        className="w-full h-48 object-cover rounded-md"
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
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Buy Now
        </button>
        <button
          onClick={handleNavigate} // Call the navigate function on click
          className="text-blue-500 hover:underline"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
