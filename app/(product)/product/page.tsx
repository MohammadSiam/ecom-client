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
  decMrpPrice: string;
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/category/Snacks`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); // Assuming the API returns an array of products
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Product Listing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.strUuid} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
