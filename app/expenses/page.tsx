// FILE PATH: app/expenses/page.tsx

"use client";

import { useState, useRef } from "react";
import {
  Receipt,
  Bike,
  Utensils,
  Train,
  Camera,
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

const expenseTypes = [
  {
    label: "Bike Fuel",
    icon: <Bike size={18} className="text-emerald-600" />,
    bg: "bg-emerald-100",
  },
  {
    label: "Food",
    icon: <Utensils size={18} className="text-orange-600" />,
    bg: "bg-orange-100",
  },
  {
    label: "Travel",
    icon: <Train size={18} className="text-blue-600" />,
    bg: "bg-blue-100",
  },
  {
    label: "Other",
    icon: <Receipt size={18} className="text-purple-600" />,
    bg: "bg-purple-100",
  },
];

export default function ExpensesPage() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [billPreview, setBillPreview] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleCapture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBillPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Expenses</h1>
        </div>
        <p className="text-sm text-gray-500">
          Capture bills, submit expenses and track approval status
        </p>
      </header>

      {/* EXPENSE TYPES */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Expense Type
        </h3>

        <div className="grid grid-cols-4 gap-3">
          {expenseTypes.map((e) => (
            <button
              key={e.label}
              className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-gray-100 active:scale-95 transition"
            >
              <div
                className={`w-11 h-11 rounded-xl ${e.bg} flex items-center justify-center`}
              >
                {e.icon}
              </div>
              <span className="text-xs font-medium text-gray-700">
                {e.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ADD EXPENSE */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Add Expense
        </h3>

        <div className="bg-white rounded-2xl border border-teal-100 p-5 shadow-sm space-y-4">
          <div>
            <label className="text-xs text-gray-500">
              Amount (₹)
            </label>
            <div className="mt-1 flex items-center border rounded-xl px-3">
              <IndianRupee size={16} className="text-gray-400" />
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-2 py-2 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500">
              Description / Note
            </label>
            <textarea
              placeholder="Fuel refill near clinic, lunch with doctor etc"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full mt-1 p-3 border rounded-xl text-sm outline-none resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">
              Capture Bill Photo
            </label>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleCapture}
            />

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="mt-1 w-full flex items-center justify-center gap-2 border border-dashed rounded-xl py-3 text-sm text-gray-600"
            >
              <Camera size={16} />
              Open Camera
            </button>

            {billPreview && (
              <img
                src={billPreview}
                alt="Bill preview"
                className="mt-3 w-full h-40 object-cover rounded-xl border"
              />
            )}
          </div>

          <button className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium active:scale-95 transition">
            Submit Expense
          </button>
        </div>
      </section>

      {/* EXPENSE STATUS */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Expense Status
        </h3>

        <div className="space-y-3">
          {/* Approved */}
          <StatusRow
            title="Bike Fuel"
            date="12 Jan 2026"
            amount="₹220"
            status="approved"
          />

          {/* Pending */}
          <StatusRow
            title="Lunch"
            date="13 Jan 2026"
            amount="₹150"
            status="pending"
          />

          {/* Rejected */}
          <StatusRow
            title="Auto Travel"
            date="10 Jan 2026"
            amount="₹90"
            status="rejected"
          />
        </div>
      </section>
    </div>
  );
}

/* ---------- STATUS ROW ---------- */
function StatusRow({
  title,
  date,
  amount,
  status,
}: {
  title: string;
  date: string;
  amount: string;
  status: "approved" | "pending" | "rejected";
}) {
  const statusMap = {
    approved: {
      label: "Approved",
      color: "bg-green-100 text-green-700",
      icon: <CheckCircle size={14} />,
    },
    pending: {
      label: "Pending",
      color: "bg-yellow-100 text-yellow-700",
      icon: <Clock size={14} />,
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-700",
      icon: <XCircle size={14} />,
    },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-900">
          {title}
        </p>
        <p className="text-xs text-gray-500">
          {date}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">
          {amount}
        </span>
        <span
          className={`text-xs pxx-3 py-1 rounded-full font-medium flex items-center gap-1 ${statusMap[status].color}`}
        >
          {statusMap[status].icon}
          {statusMap[status].label}
        </span>
      </div>
    </div>
  );
}
