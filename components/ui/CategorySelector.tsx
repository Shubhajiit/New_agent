// components/ui/CategorySelector.tsx

"use client";

import { useState, useEffect } from "react";

interface CategorySelectorProps {
  categories?: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  heading?: string;
  placeholder?: string;
  className?: string;
  fetchUrl?: string; // URL to fetch categories from API
  defaultCategories?: string[]; // Fallback categories if fetch fails
  variant?: "dropdown" | "pills"; // UI variant
}

export default function CategorySelector({
  categories,
  activeCategory,
  onCategoryChange,
  heading = "Category",
  placeholder = "Select category",
  className = "",
  fetchUrl,
  defaultCategories = [],
  variant = "dropdown",
}: CategorySelectorProps) {
  const [fetchedCategories, setFetchedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use provided categories, fetched categories, or default categories
  const availableCategories = categories || fetchedCategories || defaultCategories;

  // Fetch categories from API if fetchUrl is provided
  useEffect(() => {
    if (fetchUrl && !categories) {
      fetchCategories();
    }
  }, [fetchUrl, categories]);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(fetchUrl!);
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Assuming API returns categories in format: { categories: string[] }
      // Adjust this based on your actual API response structure
      const categories = Array.isArray(data) ? data : data.categories || data.data || [];
      
      setFetchedCategories(categories);
      
      // If no active category is set and we have categories, set the first one
      if (categories.length > 0 && !activeCategory) {
        onCategoryChange(categories[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      console.error('Error fetching categories:', err);
      
      // Use default categories as fallback
      if (defaultCategories.length > 0) {
        setFetchedCategories(defaultCategories);
        if (!activeCategory) {
          onCategoryChange(defaultCategories[0]);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(event.target.value);
  };

  const handlePillClick = (category: string) => {
    onCategoryChange(category);
  };

  if (error && availableCategories.length === 0) {
    return (
      <section className={className}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">{heading}</h3>
          <div className="text-xs text-red-500">Failed to load categories</div>
        </div>
      </section>
    );
  }

  if (variant === "pills") {
    return (
      <section className={className}>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">{heading}</h3>
        
        {isLoading && (
          <div className="text-sm text-gray-500">Loading categories...</div>
        )}
        
        {!isLoading && availableCategories.length === 0 && (
          <div className="text-sm text-gray-500">No categories available</div>
        )}
        
        {!isLoading && availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => handlePillClick(category)}
                disabled={isLoading}
                className={`px-4 py-1.5 rounded-full text-sm border transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeCategory === category
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {error && availableCategories.length > 0 && (
          <p className="text-xs text-amber-600 mt-2">
            Using fallback categories due to fetch error
          </p>
        )}
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{heading}</h3>
        <select
          value={activeCategory}
          onChange={handleCategoryChange}
          disabled={isLoading || availableCategories.length === 0}
          className="border rounded-full px-3 py-1.5 text-xs bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-500 w-40 sm:w-44 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && (
            <option value="">Loading...</option>
          )}
          {!isLoading && availableCategories.length === 0 && (
            <option value="">No categories</option>
          )}
          {!isLoading && availableCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {error && availableCategories.length > 0 && (
        <p className="text-xs text-amber-600 mt-1">
          Using fallback categories due to fetch error
        </p>
      )}
    </section>
  );
}

// Hook for easier category management
export function useCategories(initialCategories: string[] = [], fetchUrl?: string) {
  const [activeCategory, setActiveCategory] = useState(initialCategories[0] || "");
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return {
    activeCategory,
    setActiveCategory,
    handleCategoryChange,
  };
}