"use client";

import BackButton from "@/components/navigation/BackButton";

export default function CheckInPage({
  params,
}: {
  params: { clinicId: string };
}) {
  return (
    <div className="max-w-xl mx-auto space-y-4">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Clinic Check-In</h1>
        </div>
      </header>

      <div className="bg-white p-6 rounded-xl shadow">
        <p>You are within clinic range</p>

        <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg">
          Confirm Check-In
        </button>
      </div>
    </div>
  );
}
