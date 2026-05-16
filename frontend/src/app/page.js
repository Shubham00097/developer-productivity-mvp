"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  FaArrowRight,
  FaBug,
  FaClock,
  FaCodeBranch,
  FaLayerGroup,
  FaRocket,
  FaUserTie,
} from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState(null);
  const [developerId, setDeveloperId] = useState("DEV-001");

  useEffect(() => {
    setData(null); // ✅ clear stale data on developer change
    fetch(`http://localhost:5000/api/metrics/${developerId}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [developerId]);

  if (!data) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] flex items-center justify-center">
        <div className="text-sm text-gray-500 font-medium">
          Loading dashboard...
        </div>
      </main>
    );
  }

  const metrics = [
    {
      title: "Lead Time",
      value: `${data.metrics.leadTime} days`,
      icon: <FaClock size={14} />,
      accent: "border-blue-500",
      description: "Average delivery turnaround",
    },
    {
      title: "Cycle Time",
      value: `${data.metrics.cycleTime} days`,
      icon: <FaLayerGroup size={14} />,
      accent: "border-violet-500",
      description: "Execution completion duration",
    },
    {
      title: "Bug Rate",
      value: `${(data.metrics.bugRate * 100).toFixed(0)}%`,
      icon: <FaBug size={14} />,
      accent: "border-red-500",
      description: "Defect ratio across releases",
    },
    {
      title: "Deployments",
      value: `${data.metrics.deploymentFrequency}/month`,
      icon: <FaRocket size={14} />,
      accent: "border-emerald-500",
      description: "Production release frequency",
    },
    {
      title: "PR Throughput",
      value: `${data.metrics.prThroughput}`,
      icon: <FaCodeBranch size={14} />,
      accent: "border-orange-500",
      description: "Pull requests completed",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-gray-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">

        {/* Header */}
        <header className="h-16 bg-white border border-gray-200 rounded-2xl px-6 flex items-center justify-between shadow-sm mb-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              Engineering Analytics
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Developer productivity insights
            </p>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/manager"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <FaUserTie size={12} />
              Manager View
            </Link>
          </nav>
        </header>

        {/* Developer Selector */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Developer
              </label>
              <select
                value={developerId}
                onChange={(e) => setDeveloperId(e.target.value)} // ✅ setData(null) moved to useEffect
                className="w-[280px] bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="DEV-001">Ava Chen</option>
                <option value="DEV-002">Noah Patel</option>
                <option value="DEV-003">Mia Lopez</option>
                <option value="DEV-004">Lucas Reed</option>
                <option value="DEV-005">Emma Roy</option>
                <option value="DEV-006">Ishan Mehta</option>
                <option value="DEV-007">Owen Brooks</option>
                <option value="DEV-008">Zara Khan</option>
              </select>
            </div>
            <div className="text-sm text-gray-500">
              Internal Engineering Metrics Platform
            </div>
          </div>
        </section>

        {/* Profile */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {data.developer.name}
              </h2>
              <div className="flex items-center gap-3 mt-3 flex-wrap">
                <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {data.developer.team}
                </span>
                {data.developer.role && (
                  <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                    {data.developer.role}
                  </span>
                )}
                {data.developer.status && (
                  <span className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
                    {data.developer.status}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="text-gray-500">Team</p>
                <p className="font-semibold mt-1">{data.developer.team}</p>
              </div>
              <div>
                <p className="text-gray-500">Role</p>
                <p className="font-semibold mt-1">
                  {data.developer.role ?? "Software Engineer"} 
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border-t-4 ${metric.accent}`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-gray-500">{metric.icon}</div>
                <span className="text-xs text-gray-400 font-medium">Metric</span>
              </div>
              <h3 className="text-sm text-gray-500 font-medium">{metric.title}</h3>
              <p className="text-2xl font-semibold tracking-tight mt-2">{metric.value}</p>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">{metric.description}</p>
            </div>
          ))}
        </section>

        {/* Insights + Suggestions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold">Insights</h2>
                <p className="text-sm text-gray-500 mt-1">Observed engineering patterns</p>
              </div>
            </div>
            <div className="space-y-4">
              {data.insights.map((insight, index) => (
                <div
                  key={index}
                  className="border-l-4 border-blue-500 bg-blue-50/40 rounded-r-xl px-4 py-3"
                >
                  <p className="text-sm leading-6 text-gray-700">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold">Recommendations</h2>
                <p className="text-sm text-gray-500 mt-1">Suggested improvement actions</p>
              </div>
            </div>
            <div className="space-y-4">
              {data.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="border-l-4 border-emerald-500 bg-emerald-50/40 rounded-r-xl px-4 py-3 flex items-start gap-3"
                >
                  <FaArrowRight className="text-emerald-600 mt-1" size={11} />
                  <p className="text-sm leading-6 text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chart */}
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Performance Trends</h2>
            <p className="text-sm text-gray-500 mt-1">Monthly engineering delivery indicators</p>
          </div>
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.metrics.trend}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="leadTime"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="bugRate"
                  stroke="#dc2626"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </main>
  );
}