// FILE PATH: app/medicines/page.tsx

"use client";

import { useState } from "react";
import { Search, Star, ShoppingCart } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

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
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto px-4 space-y-8 overflow-x-hidden">
      {/* HEADER WITH BACK BUTTON + CART */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-2xl font-semibold text-gray-900">Medicines</h1>
          </div>

          <button
            aria-label="Cart"
            className="inline-flex items-center justify-center p-2 rounded-full border border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500">Browse and shop ayurvedic medicines</p>
      </section>

      {/* SEARCH */}
      <section>
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines"
            className="w-full border rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </section>

      {/* CATEGORY (HORIZONTAL, COMPACT SELECT ON RIGHT) */}
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">Category</h3>
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="border rounded-full px-3 py-1.5 text-xs bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 w-40 sm:w-44"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* PRODUCTS */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Popular Products</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="relative bg-white rounded-2xl border border-pink-100 p-4 pr-16 shadow-sm flex items-start md:items-center gap-3 transition hover:shadow-md hover:border-pink-200"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-20 h-20 object-contain rounded-xl bg-pink-50 ring-1 ring-pink-100"
              />

              <div className="flex-1 min-w-0 space-y-1">
                {p.badge && (
                  <span className="inline-block text-[11px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                    {p.badge}
                  </span>
                )}

                <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                  {p.name}
                </p>

                <p className="text-xs text-gray-500">{p.qty}</p>

                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-green-600 text-white px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
                    {p.rating} <Star size={10} className="opacity-90" />
                  </span>
                  <span className="text-gray-500">{p.reviews} ratings</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-pink-700">₹{p.price}</span>
                  <span className="text-sm line-through text-gray-400">₹{p.mrp}</span>
                  <span className="text-sm text-green-600">{p.discount}</span>
                </div>

                <span className="inline-block text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded">
                  {p.offer}
                </span>
              </div>

              <div className="shrink-0">
                <button
                  aria-label="Add to cart"
                  className="absolute right-4 top-[56%] -translate-y-1/2 bg-pink-600 text-white px-4 py-1.5 rounded-full font-semibold shadow-sm hover:bg-pink-700 active:scale-95 transition"
                >
                  ADD
                </button>
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
