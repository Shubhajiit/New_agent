"use client";

import {
  Bell,
  Plus,
  ArrowDown,
  Scan,
  CreditCard,
  FileText,
  BarChart3,
  Car,
  Utensils,
  Gift,
  Smartphone,
} from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

export default function WalletPage() {
  return (
    <div className="max-w-md mx-auto space-y-6 pb-24">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <BackButton />

        <h1 className="text-lg font-semibold">My Wallet</h1>

        <button className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
          <Bell size={18} />
        </button>
      </div>

      {/* BALANCE CARD */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
        <p className="text-sm opacity-80">Total Balance</p>
        <h2 className="text-4xl font-bold mt-2">₹12,450.00</h2>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="bg-teal-500 hover:bg-teal-600 transition rounded-xl py-3 flex items-center justify-center gap-2 font-medium">
            <Plus size={18} />
            Add Money
          </button>

          <button className="bg-slate-700 hover:bg-slate-600 transition rounded-xl py-3 flex items-center justify-center gap-2 font-medium">
            <ArrowDown size={18} />
            Withdraw
          </button>
        </div>

        {/* Decorative circle */}
        <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/5" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <QuickAction icon={<Scan />} label="Scan & Pay" />
        <QuickAction icon={<CreditCard />} label="Cards" />
        <QuickAction icon={<FileText />} label="History" />
        <QuickAction icon={<BarChart3 />} label="Analytics" />
      </div>

      {/* RECENT TRANSACTIONS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Recent Transactions</h3>
          <button className="text-teal-600 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          <Transaction
            icon={<Car />}
            title="Travel Reimbursement"
            time="Today, 10:30 AM"
            amount="+₹1,250"
            positive
          />

          <Transaction
            icon={<Utensils />}
            title="Lunch Expense"
            time="Yesterday, 02:15 PM"
            amount="-₹450"
          />

          <Transaction
            icon={<Gift />}
            title="Incentive Bonus"
            time="20 Oct, 09:00 AM"
            amount="+₹5,000"
            positive
          />

          <Transaction
            icon={<Smartphone />}
            title="Mobile Bill Payment"
            time="18 Oct, 06:45 PM"
            amount="-₹599"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-2xl bg-white shadow flex items-center justify-center text-gray-700">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600">
        {label}
      </span>
    </div>
  );
}

function Transaction({
  icon,
  title,
  time,
  amount,
  positive,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
  amount: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center
          ${
            positive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {icon}
        </div>

        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>

      <p
        className={`font-semibold ${
          positive ? "text-green-600" : "text-gray-900"
        }`}
      >
        {amount}
      </p>
    </div>
  );
}
