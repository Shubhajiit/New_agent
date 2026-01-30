type ProgressCardProps = {
  title: string;
  progress: number;
  subtitle?: string;
};

export default function ProgressCard({
  title,
  progress,
  subtitle,
}: ProgressCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-teal-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-gray-700">
          {title}
        </p>

        <span className="text-sm font-semibold text-teal-600">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-teal-50 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-teal-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-gray-500 mt-3">
          {subtitle}
        </p>
      )}
    </div>
  );
}
