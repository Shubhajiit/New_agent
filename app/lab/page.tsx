// FILE PATH: app/lab/page.tsx

"use client";

import { useState } from "react";
import { FlaskConical, Search } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

const categories = [
  "All",
  "Blood Test",
  "X-Ray",
  "MRI",
  "CT Scan",
  "Urine Test",
];

const tests = [
  { id: 1, name: "Complete Blood Count (CBC)", category: "Blood Test", price: 350 },
  { id: 2, name: "Blood Sugar (Fasting)", category: "Blood Test", price: 120 },
  { id: 3, name: "X-Ray Chest", category: "X-Ray", price: 500 },
  { id: 4, name: "MRI Brain", category: "MRI", price: 4500 },
  { id: 5, name: "CT Scan Head", category: "CT Scan", price: 3200 },
  { id: 6, name: "Urine Routine Test", category: "Urine Test", price: 180 },
];

export default function LabPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTests = tests.filter((t) => {
    const byCat = activeCategory === "All" || t.category === activeCategory;
    const bySearch = t.name.toLowerCase().includes(search.toLowerCase());
    return byCat && bySearch;
  });

  return (
    <div className="space-y-8 max-w-full w-full overflow-x-hidden">
      {/* HEADER WITH BACK BUTTON */}
      <section>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">
            Lab Test Pricing
          </h1>
        </div>
        <p className="text-sm text-gray-500">
          Browse tests by category and price
        </p>
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
            placeholder="Search lab test"
            className="w-full border rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Categories
        </h3>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${
                activeCategory === cat
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* TEST LIST (same card feel as Dashboard lists) */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Available Tests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-2xl border border-teal-100 p-4 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                  <FlaskConical size={18} className="text-red-600" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {test.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {test.category}
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold text-gray-900 shrink-0">
                ₹{test.price}
              </span>
            </div>
          ))}

          {filteredTests.length === 0 && (
            <div className="col-span-full text-center text-sm text-gray-500 py-6">
              No lab tests found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
