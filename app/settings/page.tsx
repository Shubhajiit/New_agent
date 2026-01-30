"use client";

import {
  User,
  Lock,
  Bell,
  Moon,
  HelpCircle,
  FileText,
  Pencil,
  ChevronRight,
  LogOut,
} from "lucide-react";
import BackButton from "@/components/navigation/BackButton";

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto px-4 space-y-6 pb-28">
      
      {/* PAGE TITLE */}
      <header>
        <div className="flex items-center gap-3 mb-2">
          <BackButton />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>
      </header>

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/100?img=32"
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <p className="font-semibold text-gray-900">
              Rahul Verma
            </p>
            <p className="text-sm text-gray-500">
              Marketing Executive
            </p>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">
              rahul.verma@rmdocto.com
            </span>
          </div>
        </div>

        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
          <Pencil size={16} className="text-gray-600" />
        </button>
      </div>

      {/* ACCOUNT */}
      <Section title="Account">
        <SettingItem
          icon={<User />}
          iconBg="bg-teal-100 text-teal-600"
          title="My Profile"
          subtitle="View and edit personal details"
        />

        <SettingItem
          icon={<Lock />}
          iconBg="bg-teal-100 text-teal-600"
          title="Change Password"
          subtitle="Update your security credentials"
        />
      </Section>

      {/* PREFERENCES */}
      <Section title="Preferences">
        <SettingItem
          icon={<Bell />}
          iconBg="bg-yellow-100 text-yellow-600"
          title="Notifications"
          subtitle="Manage alerts & reminders"
        />

        <SettingItem
          icon={<Moon />}
          iconBg="bg-indigo-100 text-indigo-600"
          title="Theme"
          subtitle="System default"
        />
      </Section>

      {/* SUPPORT */}
      <Section title="Support">
        <SettingItem
          icon={<HelpCircle />}
          iconBg="bg-green-100 text-green-600"
          title="Help & Support"
          subtitle="FAQs and contact support"
        />

        <SettingItem
          icon={<FileText />}
          iconBg="bg-gray-100 text-gray-600"
          title="Privacy Policy"
        />
      </Section>

      {/* LOGOUT */}
      <button className="w-full mt-2 bg-red-50 border border-red-200 text-red-600 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2">
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </p>

      <div className="bg-white rounded-2xl shadow-md divide-y">
        {children}
      </div>
    </div>
  );
}

function SettingItem({
  icon,
  iconBg,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>

        <div className="text-left">
          <p className="font-medium text-gray-900">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}
