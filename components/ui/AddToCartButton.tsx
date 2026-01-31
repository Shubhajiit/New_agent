"use client";

import { useState } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  
  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCartClick = async () => {
    // Fetch cart data or perform cart operations
    try {
      // Example: Fetch updated cart data
      console.log("Fetching cart data...");
      
      // You can add API calls here
      // const response = await fetch('/api/cart');
      // const cartData = await response.json();
      
      if (onCartClick) {
        onCartClick();
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCartClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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

      {/* Hover Tooltip */}
      {isHovered && cartCount > 0 && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-3 z-50 min-w-[200px] transform opacity-100 transition-all duration-200">
          <div className="text-xs text-gray-600 mb-1">Cart Summary</div>
          <div className="text-sm font-semibold text-gray-900 mb-2">
            {cartCount} item{cartCount !== 1 ? 's' : ''} • ₹{totalPrice.toLocaleString()}
          </div>
          
          {/* Show first 3 items */}
          <div className="space-y-1 mb-2">
            {cartItems.slice(0, 3).map((item, index) => (
              <div key={`${item.id}-${index}`} className="text-xs text-gray-600 truncate">
                {item.name} - ₹{item.price}
              </div>
            ))}
            {cartCount > 3 && (
              <div className="text-xs text-gray-500 italic">
                +{cartCount - 3} more item{cartCount - 3 !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          <div className="text-xs text-teal-600 font-medium">
            Click to view cart
          </div>
        </div>
      )}
    </div>
  );
}