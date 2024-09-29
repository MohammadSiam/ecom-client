"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Implement your logout logic here
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full justify-between">
            <div className="flex-shrink-0">
              <button
                onClick={() => router.push("/")}
                className="text-white font-bold"
              >
                Home
              </button>
            </div>
            <div>
              <button
                onClick={() => router.push("/product")}
                className="text-white font-bold"
              >
                Products
              </button>
              <button
                onClick={() => router.push("/login")}
                className="text-white font-bold px-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3"></div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
