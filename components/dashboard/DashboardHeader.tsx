// FILE PATH: components/dashboard/DashboardHeader.tsx

"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";

interface DashboardHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const TIMEZONE = "Asia/Kolkata";

export default function DashboardHeader({
  selectedDate,
  onDateChange,
}: DashboardHeaderProps) {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate)
  );

  const today = new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date())
  );

  const isSameDay = (a: Date, b: Date) =>
    a.toDateString() === b.toDateString();

  const hour = Number(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: TIMEZONE,
    })
  );

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  return (
    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      {/* GREETING (LEFT) */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {greeting} 👋
        </h2>
        <p className="text-sm text-gray-500">
          Here’s your activity overview
        </p>
      </div>

      {/* NOTIFICATION BELL – TOP RIGHT ON MOBILE, NORMAL ON DESKTOP */}
      <div className="absolute top-0 right-0 sm:static sm:flex sm:items-center sm:gap-3">
        <div className="relative">
          <button className="w-10 h-10 rounded-full bg-white border border-teal-100 flex items-center justify-center hover:bg-teal-50 transition">
            <Bell size={18} className="text-teal-600" />
          </button>
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* CALENDAR (DESKTOP ONLY INLINE) */}
        <button
          onClick={() => setOpen(!open)}
          className="hidden sm:flex items-center gap-2 bg-white border border-teal-100 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-teal-50 transition"
        >
          <Calendar size={16} className="text-teal-600" />
          <span>
            {selectedDate.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              timeZone: TIMEZONE,
            })}
          </span>
        </button>
      </div>

      {/* CALENDAR (MOBILE BELOW) */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white border border-teal-100 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-teal-50 transition"
        >
          <Calendar size={16} className="text-teal-600" />
          <span>
            {selectedDate.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              timeZone: TIMEZONE,
            })}
          </span>
        </button>
      </div>

      {/* CALENDAR POPUP */}
      {open && (
        <div className="absolute right-0 top-14 sm:top-12 w-64 bg-white rounded-xl shadow-lg border border-teal-100 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-sm font-semibold">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-gray-500">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array(startDay)
              .fill(null)
              .map((_, i) => (
                <div key={`e-${i}`} />
              ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const date = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                i + 1
              );

              const active = isSameDay(date, selectedDate);

              return (
                <button
                  key={i}
                  onClick={() => {
                    onDateChange(date);
                    setOpen(false);
                  }}
                  className={`text-xs p-2 rounded-lg transition ${
                    active
                      ? "bg-teal-600 text-white"
                      : "hover:bg-teal-50"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
