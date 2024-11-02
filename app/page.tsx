"use client";

import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 space-y-10 pt-10">
        <div className="category-section">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
            Snacks
          </h2>
          <ProductList categoryName="Snacks" />
        </div>

        <div className="category-section">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
            Dairy Products
          </h2>
          <ProductList categoryName="Dairy Products" />
        </div>

        <div className="category-section">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
            Electrical Products
          </h2>
          <ProductList categoryName="Electrical Products" />
        </div>

        <div className="category-section">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-b-2 border-gray-200 pb-2">
            Beverages
          </h2>
          <ProductList categoryName="Beverages" />
        </div>
      </div>
    </div>
  );
}
