// FILE PATH: app/medicines/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Star } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import CategorySelector, { useCategories } from "@/components/ui/CategorySelector";
import AddToCartButton from "@/components/ui/AddToCartButton";
import QuantityControl from "@/components/ui/QuantityControl";

const categories = [
  "Top picks - Ayurveda",
  "Mind Care",
  "Sexual Wellness",
  "Bone, Joint and Muscle Care",
  "Ayurvedic Stomach Care",
  "Cough, Cold & Fever",
];

const products = [
  {
    id: 1,
    name:
      "Himalaya Wellness Ashwagandha Tablet | Stress Relief Supplement | Rejuvenates Mind & Body",
    qty: "60 tablets",
    rating: 4.4,
    reviews: 3816,
    price: 234,
    mrp: 260,
    discount: "10% off",
    offer: "₹211 order for ₹1200",
    badge: "Bestseller+",
    image:
      "https://images.unsplash.com/photo-1584305574647-1f3b29f4c2c7?q=80&w=300",
  },
  {
    id: 2,
    name:
      "Panch Tulsi Drops for Respiratory Relief and Healthy Immunity | by Tata 1mg",
    qty: "30 ml Drop",
    rating: 4.5,
    reviews: 1119,
    price: 85,
    mrp: 164,
    discount: "48% off",
    offer: "₹76.5 order for ₹1200",
    badge: "Bestseller+",
    image:
      "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=300",
  },
];

export default function MedicinesPage() {
  const router = useRouter();
  const { activeCategory, handleCategoryChange } = useCategories(categories);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; price: number; category: string; quantity: number }>>([]);
  const [productQuantities, setProductQuantities] = useState<Record<number, number>>({});

  // Sync cart with localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
        // Update quantities from cart
        const quantities: Record<number, number> = {};
        parsed.forEach((item: any) => {
          if (item.category === 'Medicine') {
            quantities[item.id] = item.quantity;
          }
        });
        setProductQuantities(quantities);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Handle increasing quantity
  const handleIncreaseQuantity = (productId: number, productName: string, price: number) => {
    const currentQuantity = productQuantities[productId] || 0;
    const newQuantity = currentQuantity + 1;
    
    setProductQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));

    // Update cart items
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        return [...prev, { 
          id: productId, 
          name: productName, 
          price: price, 
          category: "Medicine",
          quantity: newQuantity
        }];
      }
    });
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (productId: number) => {
    const currentQuantity = productQuantities[productId] || 0;
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      
      setProductQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }));

      // Update cart items
      if (newQuantity === 0) {
        setCartItems(prev => prev.filter(item => item.id !== productId));
      } else {
        setCartItems(prev => prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
    }
  };

  // Handle cart click - navigate to cart page
  const handleCartClick = () => {
    router.push('/cart');
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto lg:max-w-7xl px-4 lg:px-8 space-y-6 lg:space-y-8 overflow-x-hidden">
      {/* HEADER WITH BACK BUTTON + CART */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Medicines</h1>
          </div>
          <AddToCartButton 
            cartItems={cartItems} 
            onCartClick={handleCartClick}
          />
        </div>
        <p className="text-sm lg:text-base text-gray-500">Browse and shop ayurvedic medicines</p>
      </section>

      {/* SEARCH */}
      <section>
        <div className="relative max-w-md lg:max-w-lg xl:max-w-xl">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines"
            className="w-full border rounded-xl pl-10 pr-3 py-2.5 lg:py-3 text-sm lg:text-base outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </section>

      {/* CATEGORY (HORIZONTAL, COMPACT SELECT ON RIGHT) */}
      <CategorySelector
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        heading="Category"
      />

      {/* PRODUCTS */}
      <section>
        <h3 className="text-sm lg:text-base font-semibold text-gray-700 mb-4 lg:mb-6">Popular Products</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="relative bg-white rounded-2xl border border-pink-100 p-4 pr-16 lg:pr-4 lg:pb-16 shadow-sm flex lg:flex-col items-start md:items-center lg:items-start gap-3 lg:gap-4 transition hover:shadow-md hover:border-pink-200"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 lg:w-full lg:h-32 xl:h-40 object-contain rounded-xl bg-pink-50 ring-1 ring-pink-100"
              />

              <div className="flex-1 min-w-0 space-y-1 lg:space-y-2">
                {p.badge && (
                  <span className="inline-block text-[11px] lg:text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                    {p.badge}
                  </span>
                )}

                <p className="text-sm lg:text-base font-semibold text-gray-900 leading-snug line-clamp-2 lg:line-clamp-3">
                  {p.name}
                </p>

                <p className="text-xs lg:text-sm text-gray-500">{p.qty}</p>

                <div className="flex items-center gap-2 text-xs lg:text-sm">
                  <span className="bg-green-600 text-white px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    {p.rating} <Star size={10} className="opacity-90" />
                  </span>
                  <span className="text-gray-500">{p.reviews} ratings</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg lg:text-xl font-semibold text-pink-700">₹{p.price}</span>
                  <span className="text-sm lg:text-base line-through text-gray-400">₹{p.mrp}</span>
                  <span className="text-sm lg:text-base text-green-600">{p.discount}</span>
                </div>

                <span className="inline-block text-xs lg:text-sm bg-pink-100 text-pink-700 px-2 py-0.5 rounded">
                  {p.offer}
                </span>
              </div>

              <div className="shrink-0">
                <QuantityControl
                  quantity={productQuantities[p.id] || 0}
                  onIncrease={() => handleIncreaseQuantity(p.id, p.name, p.price)}
                  onDecrease={() => handleDecreaseQuantity(p.id)}
                  productName={p.name}
                  className="absolute right-4 top-[56%] lg:right-4 lg:top-auto lg:bottom-4 lg:-translate-y-0 -translate-y-1/2"
                />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-500 py-6">
              No products found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
