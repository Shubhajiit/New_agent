"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="
        hidden lg:flex
        sticky top-0 z-40
        h-14 bg-white/90 backdrop-blur
        border-b border-teal-100
        items-center justify-between
        px-4 lg:px-6
      "
    >
      <h1 className="font-semibold text-lg text-teal-600">
        Marketing Executive
      </h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="w-9 h-9 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center hover:bg-teal-200 transition"
        >
          <User size={18} />
        </button>

        <div
          className={`
            absolute right-0 mt-2 w-44 bg-white
            rounded-xl shadow-lg border border-teal-100
            z-50 overflow-hidden
            transition-all duration-200 transform
            ${
              dropdownOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }
          `}
        >
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50">
            <User size={16} /> Profile
          </button>

          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50">
            <Settings size={16} /> Settings
          </button>

          <div className="border-t border-teal-100" />

          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
