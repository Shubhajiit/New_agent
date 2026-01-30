"use client";

import WeeklyVisitsChart from "@/components/charts/WeeklyVisitsChart";
import BackButton from "@/components/navigation/BackButton";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2>Total Visits</h2>
          <p className="text-3xl font-bold">124</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2>Conversion</h2>
          <p className="text-3xl font-bold">68%</p>
        </div>
      </div>

      <WeeklyVisitsChart />
    </div>
  );
}
