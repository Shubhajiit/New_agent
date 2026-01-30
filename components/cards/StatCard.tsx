import { CheckCircle, Clock, Target } from "lucide-react";

interface StatCardProps {
  title: "Target" | "Visited" | "Pending";
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  const config = {
    Target: {
      icon: Target,
      bg: "bg-teal-100",
      text: "text-teal-600",
    },
    Visited: {
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    Pending: {
      icon: Clock,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  };

  const Icon = config[title].icon;

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
      {/* Icon */}
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${config[title].bg}`}
      >
        <Icon className={config[title].text} size={18} />
      </div>

      {/* Number */}
      <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mt-2">
        {value}
      </h2>

      {/* Label */}
      <p className="text-xs sm:text-sm text-gray-500">
        {title}
      </p>
    </div>
  );
}
