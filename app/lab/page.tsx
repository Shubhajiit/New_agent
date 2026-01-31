
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, AlertTriangle } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";
import CategorySelector, { useCategories } from "@/components/ui/CategorySelector";
import QuantityControl from "@/components/ui/QuantityControl";
import AddToCartButton from "@/components/ui/AddToCartButton";

const categories = [
  "All",
  "Blood Test",
  "X-Ray",
  "MRI",
  "CT Scan",
  "Urine Test",
];

const tests = [
  { 
    id: 1, 
    name: "Complete Blood Count (CBC)", 
    description: "Pathology • TAT: 6-8 Hours",
    category: "Blood Test", 
    price: 350,
    discount: "10% OFF"
  },
  { 
    id: 2, 
    name: "Blood Sugar (Fasting)", 
    description: "Pathology • TAT: 4-6 Hours",
    category: "Blood Test", 
    price: 120,
    discount: "5% OFF"
  },
  { 
    id: 3, 
    name: "X-Ray Chest", 
    description: "Radiology • TAT: 2-4 Hours",
    category: "X-Ray", 
    price: 500,
    discount: "15% OFF"
  },
  { 
    id: 4, 
    name: "MRI Brain", 
    description: "Radiology • TAT: 1-2 Days",
    category: "MRI", 
    price: 4500,
    discount: "8% OFF"
  },
  { 
    id: 5, 
    name: "CT Scan Head", 
    description: "Radiology • TAT: 4-6 Hours",
    category: "CT Scan", 
    price: 3200,
    discount: "12% OFF"
  },
  { 
    id: 6, 
    name: "Urine Routine Test", 
    description: "Pathology • TAT: 2-4 Hours",
    category: "Urine Test", 
    price: 180,
    discount: "20% OFF"
  },
];

export default function LabPage() {
  const router = useRouter();
  const { activeCategory, handleCategoryChange } = useCategories(categories);
  const [search, setSearch] = useState("");
  const [testQuantities, setTestQuantities] = useState<Record<number, number>>({});
  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; price: number; category: string; quantity: number }>>([]);

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
          if (item.category !== 'Medicine') {
            quantities[item.id] = item.quantity;
          }
        });
        setTestQuantities(quantities);
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
  const handleIncreaseQuantity = (testId: number, testName: string, price: number) => {
    const test = tests.find(t => t.id === testId);
    if (test) {
      const currentQuantity = testQuantities[testId] || 0;
      const newQuantity = currentQuantity + 1;
      
      setTestQuantities(prev => ({
        ...prev,
        [testId]: newQuantity
      }));

      // Update cart items
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === testId);
        if (existingItem) {
          return prev.map(item => 
            item.id === testId 
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else {
          return [...prev, { 
            id: testId, 
            name: testName, 
            price: price, 
            category: test.category,
            quantity: newQuantity
          }];
        }
      });
      console.log(`Added test: ${testName} (ID: ${testId}) - Price: ₹${price}`);
    }
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (testId: number) => {
    const currentQuantity = testQuantities[testId] || 0;
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      
      setTestQuantities(prev => ({
        ...prev,
        [testId]: newQuantity
      }));

      // Update cart items
      if (newQuantity === 0) {
        setCartItems(prev => prev.filter(item => item.id !== testId));
      } else {
        setCartItems(prev => prev.map(item => 
          item.id === testId 
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

  // Category color themes
  const getCategoryTheme = (category: string) => {
    const themes = {
      "Blood Test": {
        iconBg: "bg-red-50",
        iconBgHover: "group-hover:bg-red-100",
        iconColor: "text-red-500",
        shadow: "shadow-red-100/50",
        hoverShadow: "hover:shadow-red-200/60",
        border: "border-red-100/50",
        hoverBorder: "hover:border-red-200"
      },
      "X-Ray": {
        iconBg: "bg-blue-50",
        iconBgHover: "group-hover:bg-blue-100",
        iconColor: "text-blue-500",
        shadow: "shadow-blue-100/50",
        hoverShadow: "hover:shadow-blue-200/60",
        border: "border-blue-100/50",
        hoverBorder: "hover:border-blue-200"
      },
      "MRI": {
        iconBg: "bg-purple-50",
        iconBgHover: "group-hover:bg-purple-100",
        iconColor: "text-purple-500",
        shadow: "shadow-purple-100/50",
        hoverShadow: "hover:shadow-purple-200/60",
        border: "border-purple-100/50",
        hoverBorder: "hover:border-purple-200"
      },
      "CT Scan": {
        iconBg: "bg-indigo-50",
        iconBgHover: "group-hover:bg-indigo-100",
        iconColor: "text-indigo-500",
        shadow: "shadow-indigo-100/50",
        hoverShadow: "hover:shadow-indigo-200/60",
        border: "border-indigo-100/50",
        hoverBorder: "hover:border-indigo-200"
      },
      "Urine Test": {
        iconBg: "bg-yellow-50",
        iconBgHover: "group-hover:bg-yellow-100",
        iconColor: "text-yellow-600",
        shadow: "shadow-yellow-100/50",
        hoverShadow: "hover:shadow-yellow-200/60",
        border: "border-yellow-100/50",
        hoverBorder: "hover:border-yellow-200"
      },
    };
    
    return themes[category as keyof typeof themes] || {
      iconBg: "bg-gray-50",
      iconBgHover: "group-hover:bg-gray-100",
      iconColor: "text-gray-500",
      shadow: "shadow-gray-100/50",
      hoverShadow: "hover:shadow-gray-200/60",
      border: "border-gray-100/50",
      hoverBorder: "hover:border-gray-200"
    };
  };

  const filteredTests = tests.filter((t) => {
    const byCat = activeCategory === "All" || t.category === activeCategory;
    const bySearch = t.name.toLowerCase().includes(search.toLowerCase());
    return byCat && bySearch;
  });

  return (
    <div className="space-y-8 max-w-full w-full overflow-x-hidden">
      {/* HEADER WITH BACK BUTTON */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-2xl font-semibold text-gray-900">
              Lab Test Pricing
            </h1>
          </div>
          <AddToCartButton 
            cartItems={cartItems} 
            onCartClick={handleCartClick}
          />
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

      {/* CATEGORY (HORIZONTAL, COMPACT SELECT ON RIGHT) */}
      <CategorySelector
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        heading="Category"
      />

      {/* TEST LIST */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            Available Tests
          </h3>
          <span className="text-xs text-gray-400">
            {filteredTests.length} Results
          </span>
        </div>

        <div className="space-y-2">
          {filteredTests.map((test) => {
            const theme = getCategoryTheme(test.category);
            return (
              <div
                key={test.id}
                className={`bg-white rounded-xl border-2 p-4 transition-all duration-300 relative group ${theme.border} ${theme.hoverBorder} ${theme.shadow} ${theme.hoverShadow} shadow-lg hover:shadow-2xl hover:-translate-y-0.5`}
              >
                {/* Discount Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[11px] px-2 py-1 rounded-full font-semibold shadow-lg">
                    {test.discount}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  {/* Category Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${theme.iconBg} ${theme.iconBgHover} shadow-sm`}>
                    <AlertTriangle size={18} className={`${theme.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                      {test.name}
                    </h4>
                    
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                      {test.description}
                    </p>
                    
                    <div className="flex items-end justify-between">
                      <span className="text-base font-bold text-teal-600">
                        ₹{test.price}
                      </span>
                      
                      {/* Quantity Control */}
                      <QuantityControl
                        quantity={testQuantities[test.id] || 0}
                        onIncrease={() => handleIncreaseQuantity(test.id, test.name, test.price)}
                        onDecrease={() => handleDecreaseQuantity(test.id)}
                        productName={test.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTests.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-6">
              No lab tests found
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
