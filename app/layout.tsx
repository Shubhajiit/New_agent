// "use client";

import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import BottomNav from "@/components/navigation/BottomNav";
import { SidebarProvider } from "@/components/sidebar/SidebarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-teal-50">
        <SidebarProvider>
          <div className="flex min-h-screen">
            
            {/* DESKTOP SIDEBAR ONLY */}
            <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
              <Sidebar />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col lg:ml-64">
              
              {/* Navbar (desktop mostly) */}
              <Navbar />

              {/* Page content */}
              <main className="flex-1 p-3 sm:p-4 lg:p-6 bg-white pb-20 lg:pb-6">
                {children}
              </main>
            </div>
          </div>

          {/* MOBILE BOTTOM NAV ONLY */}
          <BottomNav />
        </SidebarProvider>
      </body>
    </html>
  );
}
