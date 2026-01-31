"use client";

import { useState } from "react";
import { Download, FileText, File } from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Visits", "Financial"];

  const statsData = [
    {
      value: "124",
      label: "Total Visits",
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      value: "68%",
      label: "Conversion",
      change: "-5%",
      changeType: "negative" as const,
    },
  ];

  const reportsData = [
    {
      title: "Monthly Sales Report",
      type: "PDF",
      date: "Oct 01 - Oct 31, 24",
      icon: File,
      size: "",
    },
    {
      title: "Doctor Visit Log",
      type: "XLS",
      date: "Last 7 Days - 11 hrs",
      icon: FileText,
      size: "",
    },
    {
      title: "Expense Summary",
      type: "PDF",
      date: "September 2024 - 500 KB",
      icon: File,
      size: "",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  stat.changeType === "positive"
                    ? "text-green-600 bg-green-50"
                    : "text-red-600 bg-red-50"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly Performance Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Weekly Performance</h2>
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
            Visits
          </div>
        </div>
        
        <div className="h-48 flex items-end justify-between px-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
            <div key={day} className="flex flex-col items-center">
              <div
                className={`w-8 rounded-t-lg transition-all duration-300 ${
                  index === 2 ? "bg-teal-500 h-32" : "bg-gray-200 h-8"
                }`}
              ></div>
              <span className="text-xs text-gray-500 mt-3">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
          <button className="text-sm text-teal-600 font-medium hover:text-teal-700">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {reportsData.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">{report.type}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{report.title}</h3>
                  <p className="text-xs text-gray-500">{report.date}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
