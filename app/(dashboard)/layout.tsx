import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 text-white p-6">
        <div className="font-bold text-xl mb-8">GenContent</div>
        <nav className="flex-1 space-y-2">
          <Link
            href="/dashboard"
            className="block p-2 hover:bg-gray-800 rounded cursor-pointer"
          >
            Dashboard
          </Link>
          <Link
            href="/generate"
            className="block p-2 hover:bg-gray-800 rounded cursor-pointer"
          >
            Generate
          </Link>
          <Link
            href="/history"
            className="block p-2 hover:bg-gray-800 rounded cursor-pointer"
          >
            History
          </Link>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-sm text-gray-400">Account</span>
          <UserButton />
        </div>
      </div>
      <main className="md:pl-72">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
