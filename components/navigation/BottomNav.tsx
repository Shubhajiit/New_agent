"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  Users,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Home", path: "/dashboard", icon: Home },
  { name: "Wallet", path: "/wallet", icon: Wallet },
  { name: "Leads", path: "/leads", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center py-2 text-xs
                ${active ? "text-teal-600" : "text-gray-500"}`}
            >
              <Icon size={20} />
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
