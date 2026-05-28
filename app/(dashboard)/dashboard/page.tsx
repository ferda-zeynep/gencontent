import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import DashboardCards from "./DashboardCards";

export default async function DashboardPage() {
  const authObj = await auth();
  const userId = authObj.userId;

  if (!userId) {
    redirect("/sign-in");
  }

  const totalCount = await db.generatedContent.count({
    where: { userId },
  });

  const recentGenerations = await db.generatedContent.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const allContents = await db.generatedContent.findMany({
    where: { userId },
    select: { contentType: true },
  });

  const typeCounts = allContents.reduce(
    (acc, curr) => {
      acc[curr.contentType] = (acc[curr.contentType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const mostUsedType = Object.keys(typeCounts).reduce(
    (a, b) => (typeCounts[a] > typeCounts[b] ? a : b),
    "None Yet",
  );

  const statsCards = [
    {
      title: "Total Generations",
      value: totalCount,
      description: "AI contents created so far",
      icon: "✨",
    },
    {
      title: "Most Used Type",
      value: mostUsedType === "None Yet" ? "None" : mostUsedType,
      description: "Your favorite content style",
      icon: "📊",
    },
    {
      title: "Latest Activity",
      value: recentGenerations.length > 0 ? "Active" : "Idle",
      description:
        recentGenerations.length > 0
          ? "Content saved successfully"
          : "No recent data",
      icon: "🚀",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-950 tracking-tight">
            Welcome to GenContent
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your performance and manage your automated AI workspaces.
          </p>
        </div>
        <Link
          href="/generate"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition shadow-sm shadow-blue-200"
        >
          + Quick Generate
        </Link>
      </div>

      <DashboardCards cards={statsCards} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Recent Generations
          </h2>
          <Link
            href="/history"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            View All →
          </Link>
        </div>

        {recentGenerations.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-gray-400">
              No content generated yet. Give it a try!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentGenerations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="space-y-1 max-w-md md:max-w-xl">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {item.prompt}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 capitalize">
                  {item.contentType}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
