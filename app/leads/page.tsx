"use client";

import { useState } from "react";
import {
  Search,
  User,
  MapPin,
  Briefcase,
  Activity,
  Phone,
} from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

/* -------- MOCK AGENT DATA -------- */
const agentsData = [
  {
    name: "Rahul Das",
    area: "Salt Lake",
    doctors: 18,
    todayVisits: 6,
    status: "Active",
    phone: "+91 98765 43210",
  },
  {
    name: "Priya Sen",
    area: "New Town",
    doctors: 12,
    todayVisits: 4,
    status: "On Leave",
    phone: "+91 91234 56789",
  },
  {
    name: "Aman Roy",
    area: "Sector V",
    doctors: 20,
    todayVisits: 7,
    status: "Active",
    phone: "+91 99887 66554",
  },
];

export default function LeadsPage() {
  const [search, setSearch] = useState("");

  const filteredAgents = agentsData.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">My Agents</h1>
        </div>
        <p className="text-sm text-gray-500">Agents working under you (Marketing Executive)</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search agent name or area"
          className="w-full pl-10 pr-4 py-3 border border-teal-100 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
        />
      </div>

      {/* Agents List */}
      <div className="space-y-4">
        {filteredAgents.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No agents found
          </div>
        )}

        {filteredAgents.map((agent, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-teal-100 p-4 shadow-sm
            flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Left */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                <User size={18} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  {agent.name}
                </h2>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {agent.area}
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
                    {agent.doctors} Doctors
                  </span>

                  <span className="flex items-center gap-1">
                    <Activity size={14} />
                    {agent.todayVisits} Visits Today
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${
                    agent.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {agent.status}
              </span>

              <button
                title="Call Agent"
                className="p-2 rounded-lg border border-teal-200 hover:bg-teal-50 transition"
              >
                <Phone size={16} className="text-teal-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
