"use client";
import { removeFromCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

const NavBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md">
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
            <div className="flex items-center">
              <div>
                {!session ? (
                  <button
                    onClick={() => router.push("/login")}
                    className="text-white font-bold px-4"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-white font-bold px-4"
                  >
                    Logout
                  </button>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="text-white font-bold px-4 relative flex items-center h-[40px]"
                >
                  <FaShoppingCart className="mr-2" />
                  {totalQuantity > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {totalQuantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        {cartItems.length > 0 ? (
          cartItems.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span className="text-black">
                {item.name} (x{item.quantity})
              </span>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-black">No items in cart</div>
        )}
      </Modal>
    </nav>
  );
};

export default NavBar;
