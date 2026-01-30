export default function ClinicCard() {
  return (
    <div className="bg-white rounded-2xl border border-teal-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Next Priority Visit
        </h3>

        <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-600 font-medium">
          Live Route
        </span>
      </div>

      {/* Clinic / Doctor Info */}
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-800">
          Dr. Anjali Gupta
        </p>

        <p className="text-xs text-gray-500">
          Pediatrician · Salt Lake
        </p>

        <p className="text-xs text-gray-400">
          📍 2.5 km away
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <button className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 transition-all duration-200 text-white rounded-xl text-sm font-medium transform hover:scale-105">
          Check In
        </button>

        <button className="px-5 py-2.5 border border-teal-200 hover:bg-teal-50 transition-all duration-200 rounded-xl text-sm font-medium text-teal-700 transform hover:scale-105">
          Directions
        </button>
      </div>
    </div>
  );
}
