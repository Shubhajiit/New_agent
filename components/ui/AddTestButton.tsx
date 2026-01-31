// FILE PATH: components/ui/AddTestButton.tsx

"use client";

import { useState } from "react";
import { Plus, Check } from "lucide-react";

interface AddTestButtonProps {
  testId: number;
  testName: string;
  price: number;
  onAdd?: (testId: number, testName: string, price: number) => void;
  variant?: "default" | "compact";
  className?: string;
}

export default function AddTestButton({ 
  testId, 
  testName, 
  price, 
  onAdd, 
  variant = "default",
  className = "" 
}: AddTestButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    if (isAdded || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the onAdd callback if provided
      onAdd?.(testId, testName, price);
      
      setIsAdded(true);
      
      // Reset after 2 seconds for demo purposes
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add test:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const baseClasses = "flex items-center gap-1.5 font-medium transition-all duration-200 ease-in-out border-2 focus:outline-none focus:ring-2 focus:ring-offset-1";
  
  const variantClasses = {
    default: "text-sm px-4 py-2 rounded-xl",
    compact: "text-xs px-3 py-1.5 rounded-lg"
  };

  const stateClasses = isAdded 
    ? "bg-emerald-50 border-emerald-200 text-emerald-700 cursor-default"
    : isLoading
    ? "bg-gray-50 border-gray-200 text-gray-400 cursor-wait"
    : "bg-white border-gray-200 text-gray-700 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 hover:shadow-lg hover:shadow-teal-100/50 active:scale-95 cursor-pointer";

  const focusClasses = isAdded 
    ? "focus:ring-emerald-300" 
    : "focus:ring-teal-300";

  return (
    <button
      onClick={handleAdd}
      disabled={isAdded || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${stateClasses} ${focusClasses} ${className}`}
      aria-label={isAdded ? `${testName} added` : `Add ${testName} to cart`}
    >
      {isLoading ? (
        <>
          <div className="w-3 h-3 border border-gray-300 border-t-transparent rounded-full animate-spin" />
          Adding
        </>
      ) : isAdded ? (
        <>
          <Check size={variant === "compact" ? 12 : 14} className="text-emerald-600" />
          Added
        </>
      ) : (
        <>
          <Plus size={variant === "compact" ? 12 : 14} />
          Add
        </>
      )}
    </button>
  );
}