// FILE PATH: app/dashboard/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Target,
  Receipt,
  FileText,
  Users,
  FlaskConical,
  Pill,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/cards/StatCard";
import ProgressCard from "@/components/cards/ProgressCard";
import ClinicCard from "@/components/cards/ClinicCard";
import BackButton from "@/components/navigation/BackButton";

export default function Dashboard() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayData = {
    target: "08",
    visited: "05",
    pending: "03",
    dailyGoal: 62,
    monthlyGoal: 10,
  };

  const visits = [
    {
      doctor: "Dr. Anjali Gupta",
      specialization: "Pediatrician",
      location: "Salt Lake",
      time: "10:30 AM",
      status: "Completed",
    },
    {
      doctor: "Dr. Rohit Sharma",
      specialization: "General Physician",
      location: "New Town",
      time: "12:15 PM",
      status: "Pending",
    },
    {
      doctor: "Dr. Neha Verma",
      specialization: "Gynecologist",
      location: "Sector V",
      time: "04:00 PM",
      status: "Upcoming",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
      </header>
      {/* Header */}
      <DashboardHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* Today Summary */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Today’s Summary
        </h3>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <StatCard title="Target" value={todayData.target} />
          <StatCard title="Visited" value={todayData.visited} />
          <StatCard title="Pending" value={todayData.pending} />
        </div>
      </section>

      {/* Performance */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProgressCard
            title="Daily Goal Completion"
            progress={todayData.dailyGoal}
          />
          <ProgressCard
            title="Monthly Goal Progress"
            progress={todayData.monthlyGoal}
            subtitle="₹90,000 Rs left"
          />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Quick Actions
        </h3>

        <div className="grid grid-cols-3 gap-3">
          <ActionCard
            icon={<Receipt size={20} className="text-yellow-600" />}
            label="Expenses"
            bg="bg-yellow-100"
            onClick={() => router.push("/expenses")}
          />

          <ActionCard
            icon={<FileText size={20} className="text-blue-600" />}
            label="Reports"
            bg="bg-blue-100"
            onClick={() => router.push("/reports")}
          />

          <ActionCard
            icon={<Users size={20} className="text-purple-600" />}
            label="Leads"
            bg="bg-purple-100"
            onClick={() => router.push("/leads")}
          />

          <ActionCard
            icon={<Target size={20} className="text-green-600" />}
            label="Targets"
            bg="bg-green-100"
            onClick={() => router.push("/targets")}
          />

          <ActionCard
            icon={<FlaskConical size={20} className="text-red-600" />}
            label="Lab"
            bg="bg-red-100"
            onClick={() => router.push("/lab")}
          />

          <ActionCard
            icon={<Pill size={20} className="text-emerald-600" />}
            label="Medicines"
            bg="bg-emerald-100"
            onClick={() => router.push("/medicines")}
          />
        </div>
      </section>

      {/* Next Priority Visit */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Next Priority Visit
        </h3>
        <ClinicCard />
      </section>

      {/* Today Visit Details */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Today’s Visit Details
        </h3>

        <div className="space-y-4">
          {visits.map((visit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-teal-100 p-4 shadow-sm flex flex-col sm:flex-row sm:justify-between gap-4"
            >
              <div>
                <h4 className="font-semibold text-gray-900">
                  {visit.doctor}
                </h4>
                <p className="text-sm text-gray-500">
                  {visit.specialization}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {visit.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {visit.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    visit.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : visit.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {visit.status}
                </span>

                <button className="p-2 rounded-lg border border-teal-200">
                  <Phone size={16} className="text-teal-600" />
                </button>

                <button className="p-2 rounded-lg border border-teal-200">
                  <CheckCircle size={16} className="text-teal-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- QUICK ACTION CARD ---------- */
function ActionCard({
  icon,
  label,
  bg,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  bg: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-gray-100 hover:bg-teal-50 transition active:scale-95"
    >
      <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}>
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-700">
        {label}
      </span>
    </button>
  );
}
