"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart2, Users, ChevronDown } from "lucide-react";

const graphData = [
  { name: "Jan", views: 4000, subscribers: 2400 },
  { name: "Feb", views: 3000, subscribers: 1398 },
  { name: "Mar", views: 2000, subscribers: 9800 },
  { name: "Apr", views: 2780, subscribers: 3908 },
  { name: "May", views: 1890, subscribers: 4800 },
  { name: "Jun", views: 2390, subscribers: 3800 },
];

const timeRanges = ["Last 6 months", "Last 3 months", "Last month"];

export default function DashboardAnalytics() {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BarChart2 className="mr-2 text-primary" size={24} />
          Views and Subscribers
        </h2>
        <div className="relative">
          <button
            className="bg-[#3A3D41] text-white px-4 py-2 rounded-md flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedRange}
            <ChevronDown className="ml-2" size={16} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#3A3D41] rounded-md shadow-lg z-10">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-[#4A4D51]"
                  onClick={() => {
                    setSelectedRange(range);
                    setIsDropdownOpen(false);
                  }}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#3A3D41" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip
              contentStyle={{ backgroundColor: "#3A3D41", border: "none" }}
              labelStyle={{ color: "#FCAD06" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#FCAD06"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="subscribers"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <StatCard
          title="Total Views"
          value="15,060"
          icon={BarChart2}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Subscribers"
          value="22,306"
          icon={Users}
          color="bg-green-500"
        />
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <motion.div
      className="bg-[#3A3D41] p-4 rounded-lg flex items-center justify-between"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div>
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
    </motion.div>
  );
}
