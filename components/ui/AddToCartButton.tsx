"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface AddToCartButtonProps {
  cartItems?: CartItem[];
  onCartClick?: () => void;
  className?: string;
}

export default function AddToCartButton({ 
  cartItems = [], 
  onCartClick,
  className = "" 
}: AddToCartButtonProps) {
  const router = useRouter();
  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      router.push('/cart');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCartClick}
        className={`relative p-3 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group ${className}`}
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        {/* Cart Icon */}
        <ShoppingCart 
          size={20} 
          className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200" 
        />
        
        {/* Cart Badge */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 shadow-lg">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </button>
    </div>
  );
}