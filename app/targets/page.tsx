// FILE PATH: app/targets/page.tsx

"use client";

import {
  Target,
  Calendar,
  Stethoscope,
  Pill,
  FlaskConical,
} from "lucide-react";

import ProgressCard from "@/components/cards/ProgressCard";
import BackButton from "@/components/navigation/BackButton";

export default function TargetsPage() {
  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Targets</h1>
        </div>
        <p className="text-sm text-gray-500">Daily & monthly target overview</p>
      </header>

      {/* DAILY & MONTHLY TARGET (SAME AS DASHBOARD PERFORMANCE) */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Target Progress
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProgressCard
            title="Daily Target Completion"
            progress={62}
            subtitle="5 of 8 clinics visited"
          />

          <ProgressCard
            title="Monthly Target Progress"
            progress={65}
            subtitle="₹35,000 remaining"
          />
        </div>
      </section>

      {/* CLINICS TO VISIT */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Clinics to Visit Today
        </h3>

        <div className="bg-white rounded-2xl border border-teal-100 p-4 space-y-3 shadow-sm">
          {[
            "Dr. Anjali Gupta",
            "Dr. Rohit Sharma",
            "Dr. Neha Verma",
          ].map((clinic, i) => (
            <div
              key={i}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Stethoscope
                  size={18}
                  className="text-teal-600"
                />
                <span className="text-sm font-medium text-gray-900">
                  {clinic}
                </span>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                Pending
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TARGET TYPES (LIKE QUICK ACTION STYLE) */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Target Categories
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {/* Medicine */}
          <TargetTypeCard
            icon={<Pill size={20} className="text-emerald-600" />}
            bg="bg-emerald-100"
            title="Medicine"
            value="₹45,000"
          />

          {/* Lab */}
          <TargetTypeCard
            icon={<FlaskConical size={20} className="text-red-600" />}
            bg="bg-red-100"
            title="Lab"
            value="₹20,000"
          />

          {/* Clinic */}
          <TargetTypeCard
            icon={<Target size={20} className="text-blue-600" />}
            bg="bg-blue-100"
            title="Clinic"
            value="10 Visits"
          />
        </div>
      </section>
    </div>
  );
}

/* ---------- TARGET TYPE CARD ---------- */
function TargetTypeCard({
  icon,
  bg,
  title,
  value,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-gray-100">
      <div
        className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}
      >
        {icon}
      </div>

      <span className="text-xs font-medium text-gray-700">
        {title}
      </span>

      <span className="text-sm font-semibold text-gray-900">
        {value}
      </span>
    </div>
  );
}
