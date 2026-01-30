// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   X,
//   LayoutDashboard,
//   Pill,
//   Users,
//   BarChart,
//   Wallet,
// } from "lucide-react";
// import { useSidebar } from "./SidebarContext";

// const menu = [
//   { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//   { name: "Medicines", path: "/medicines", icon: Pill },
//   { name: "Agents", path: "/leads", icon: Users },
//   { name: "Reports", path: "/reports", icon: BarChart },
//   { name: "Wallet", path: "/wallet", icon: Wallet },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const { isOpen, close } = useSidebar();

//   return (
//     <>
//       {/* Mobile Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden
//         transition-opacity duration-300
//         ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onClick={close}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-64
//         bg-white border-r border-teal-100
//         h-screen p-4 flex flex-col
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         {/* Brand */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-xl font-bold text-teal-600 leading-tight">
//               MedTrack
//             </h1>
//             <p className="text-xs text-gray-500">
//               Marketing Executive
//             </p>
//           </div>

//           <button
//             onClick={close}
//             className="lg:hidden text-gray-500 hover:text-gray-700"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1">
//           {menu.map((item) => {
//             const active = pathname === item.path;
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.path}
//                 href={item.path}
//                 onClick={close}
//                 className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl
//                 text-sm font-medium transition
//                 ${
//                   active
//                     ? "bg-teal-50 text-teal-700"
//                     : "text-gray-600 hover:bg-teal-50 hover:text-teal-700"
//                 }`}
//               >
//                 {/* Active Indicator */}
//                 {active && (
//                   <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-teal-600" />
//                 )}

//                 <Icon size={18} />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="pt-4 border-t border-teal-100 text-xs text-gray-500">
//           <p className="font-medium text-gray-700">
//             Rahul Sharma
//           </p>
//           <p>Marketing Executive</p>
//           <p className="mt-2">v1.0.0</p>
//         </div>
//       </aside>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Pill,
  Users,
  BarChart,
  Wallet,
} from "lucide-react";

const menu = [
  { name: "Home", path: "/dashboard", icon: LayoutDashboard },
  { name: "Medicines", path: "/medicines", icon: Pill },
  { name: "Leads", path: "/leads", icon: Users },
  { name: "Reports", path: "/reports", icon: BarChart },
  { name: "Wallet", path: "/wallet", icon: Wallet },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-white border-r border-teal-100 p-4 flex-col">
      {/* Brand */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-teal-600">MedTrack</h1>
        <p className="text-xs text-gray-500">Marketing Executive</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {menu.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition
              ${
                active
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-teal-50"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t text-xs text-gray-500">
        <p className="font-medium text-gray-700">Rahul Sharma</p>
        <p>Marketing Executive</p>
      </div>
    </aside>
  );
}

