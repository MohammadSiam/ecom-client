"use client";
import React, { useEffect, useState } from "react";

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

const ProductDetails: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { slug } = params;
  console.log("data", slug);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${slug}`,
          { method: "GET" }
        );
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        } else {
          console.error("Error fetching product:", data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.strThumbnailUrl}
          alt={product.strProductName}
          className="w-full md:w-1/2 h-auto object-cover rounded-md"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold text-gray-800">
            {product.strProductName}
          </h1>
          <p className="text-gray-600 mt-2">
            {product.strDescription || "No description available"}
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Pack Size: {product.strPackSize}
          </p>
          <p className="text-xl font-bold text-green-500 mt-4">
            Price: ₹{product.decMrpPrice}
          </p>

          <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
