"use client";
import { useParams } from "next/navigation";
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

const ProductDetails = () => {
    const params = useParams()
    const { slug } = params;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/slug/${slug}`,
                    { method: "GET" }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex flex-col md:flex-row items-start animate-pulse">
                    <div className="w-full md:w-1/2">
                        <div className="bg-gray-200 h-48 w-96 rounded-md"></div>
                    </div>
                    <div className="w-full md:w-1/2 md:ml-8 mt-6 md:mt-0 flex flex-col space-y-4">
                        <div className="bg-gray-200 h-8 w-3/4 rounded-md"></div>
                        <div className="bg-gray-200 h-4 w-full rounded-md"></div>
                        <div className="bg-gray-200 h-4 w-1/2 rounded-md"></div>
                        <div className="bg-gray-200 h-6 w-1/3 rounded-md"></div>
                        <div className="bg-gray-200 h-10 w-40 rounded-md mt-4"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/2">
                    <img
                        src={product.strThumbnailUrl}
                        alt={product.strProductName}
                        className="object-contain h-48 w-96 rounded-md"
                    />
                </div>
                <div className="w-full md:w-1/2 md:ml-8 mt-6 md:mt-0 flex flex-col justify-start">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {product.strProductName}
                    </h1>
                    <p className="text-gray-600 mt-4">
                        {product.strDescription || "No description available"}
                    </p>
                    <p className="text-lg text-gray-600 mt-4">
                        Pack Size: {product.strPackSize}
                    </p>
                    <p className="text-xl font-bold text-green-500 mt-6">
                        Price: ₹{product.decMrpPrice}
                    </p>

                    <button className="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
