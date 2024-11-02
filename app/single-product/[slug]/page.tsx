"use client";
import ProductDetails from "@/components/singelProduct";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const singleProduct = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  });
  return (
    <div>
      <ProductDetails />
    </div>
  );
};

export default singleProduct;
