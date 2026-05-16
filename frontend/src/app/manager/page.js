"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaArrowTrendUp,
  FaBug,
  FaClock,
  FaCrown,
  FaGaugeHigh,
  FaUsers,
} from "react-icons/fa6";

export default function ManagerPage() {
  const [managerData, setManagerData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/manager")
      .then((res) => res.json())
      .then((data) => setManagerData(data));
  }, []);

  if (!managerData) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] flex items-center justify-center">
        <div className="text-sm font-medium text-gray-500">
          Loading manager dashboard...
        </div>
      </main>
    );
  }

  const metrics = [
    {
      title: "Total Developers",
      value: managerData.totalDevelopers,
      unit: "developers",
      icon: <FaUsers size={14} />,
      accent: "border-blue-500",
      description: "Active engineering contributors",
    },
    {
      title: "Average Lead Time",
      value: managerData.avgLeadTime,
      unit: "days",
      icon: <FaClock size={14} />,
      accent: "border-violet-500",
      description: "Average delivery turnaround",
    },
    {
      title: "Average Bug Rate",
      value: managerData.avgBugRate,
      unit: "%",
      icon: <FaBug size={14} />,
      accent: "border-red-500",
      description: "Defect ratio across teams",
    },
    {
      title: "Top Performer",
      value: managerData.topPerformer,
      unit: "",
      icon: <FaCrown size={14} />,
      accent: "border-amber-500",
      description: "Highest performing contributor",
      isText: true,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-gray-900">

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">

        {/* Header */}
        <header className="h-16 bg-white border border-gray-200 rounded-2xl px-6 flex items-center justify-between shadow-sm mb-6">

          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Engineering Management
            </h1>

            <p className="text-sm text-gray-500 mt-0.5">
              Team productivity and delivery analytics
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            <FaGaugeHigh size={12} />
            Developer Dashboard
          </Link>

        </header>

        {/* Hero Section */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
                <FaArrowTrendUp size={10} />
                Live Team Metrics
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Manager Dashboard
              </h2>

              <p className="text-gray-500 mt-2 max-w-2xl leading-relaxed">
                Monitor engineering productivity, delivery efficiency,
                and overall team performance across active contributors.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4 text-sm min-w-[220px]">

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-500">
                  Reporting Period
                </p>

                <p className="font-semibold mt-1">
                  Current Sprint
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-gray-500">
                  Team Status
                </p>

                <p className="font-semibold mt-1 text-emerald-600">
                  Healthy
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border-t-4 ${metric.accent}`}
            >

              <div className="flex items-center justify-between mb-5">

                <div className="text-gray-500">
                  {metric.icon}
                </div>

                <span className="text-xs text-gray-400 font-medium">
                  Metric
                </span>

              </div>

              <h3 className="text-sm text-gray-500 font-medium">
                {metric.title}
              </h3>

              <div className="mt-2 flex items-end gap-1">

                <p
                  className={`font-semibold tracking-tight ${
                    metric.isText
                      ? "text-xl"
                      : "text-3xl"
                  }`}
                >
                  {metric.value}
                </p>

                {metric.unit && (
                  <span className="text-sm text-gray-400 mb-1">
                    {metric.unit}
                  </span>
                )}

              </div>

              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                {metric.description}
              </p>

            </div>
          ))}

        </section>

      </div>

    </main>
  );
}