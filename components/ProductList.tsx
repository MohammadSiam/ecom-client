"use client";
import ProductCard from "@/components/Product";
import React, { useEffect, useState } from "react";

interface Product {
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
}

interface ProductListProps {
  categoryName: string;
}

const ProductList: React.FC<ProductListProps> = ({ categoryName }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/category/${categoryName}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-48 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (<div>Error: {error}</div>);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {products.map((product) => (
          <ProductCard key={product.strUuid} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
