"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

interface CartItem {
  id: number;
  name: string;
  price: number;
  category: string;
  quantity: number;
  image?: string;
  discount?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart data from localStorage or API
  useEffect(() => {
    const fetchCartData = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          setCartItems(parsed);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Use requestAnimationFrame for smooth transition
    requestAnimationFrame(fetchCartData);
  }, []);

  // Update localStorage whenever cart items change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    // Calculate savings based on discounts (simplified)
    return cartItems.reduce((savings, item) => {
      if (item.discount) {
        const discountPercent = parseInt(item.discount.replace(/[^\d]/g, '')) || 0;
        const originalPrice = item.price / (1 - discountPercent / 100);
        const itemSavings = (originalPrice - item.price) * item.quantity;
        return savings + itemSavings;
      }
      return savings;
    }, 0);
  };

  const handleProceedToBuy = async () => {
    if (cartItems.length === 0) return;
    
    try {
      // Here you would integrate with payment gateway
      console.log("Proceeding to buy:", cartItems);
      console.log("Total amount:", calculateTotal());
      
      // For demo, show alert
      alert(`Proceeding to buy ${cartItems.length} items for ₹${calculateTotal().toLocaleString()}`);
      
      // After successful purchase, clear cart
      // setCartItems([]);
    } catch (error) {
      console.error("Error processing purchase:", error);
      alert("Error processing purchase. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 text-center">
        <div className="flex items-center gap-3 mb-8">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        </div>
        
        <div className="bg-white rounded-2xl p-12 shadow-sm border">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Start shopping to add items to your cart</p>
          <div className="space-x-4">
            <button
              onClick={() => window.history.back()}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const total = calculateTotal();
  const savings = calculateSavings();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BackButton />
        <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg flex items-center justify-center">
                      <span className="text-teal-600 text-xs font-medium text-center">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                        {item.name}
                      </h3>
                      <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {item.category}
                      </span>
                      {item.discount && (
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium ml-2">
                          {item.discount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Price and Quantity */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        Total: ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Total Savings</span>
                  <span className="font-medium text-green-600">-₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={handleProceedToBuy}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
            >
              Proceed to Buy
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Secure checkout • Free delivery on orders above ₹500
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}