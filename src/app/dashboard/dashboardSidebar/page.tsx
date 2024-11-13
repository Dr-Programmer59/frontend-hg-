"use client";

import Link from "next/link";
import { Home, Activity, LogOut, Tv, Eye } from "lucide-react";

interface DashboardSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isOpen: boolean;
}

export default function DashboardSidebar({
  currentPage,
  setCurrentPage,
  isOpen,
}: DashboardSidebarProps) {
  return (
    <aside
      className={`bg-[#2A2D31] w-64 fixed h-full z-50 transition-transform duration-300 ease-in-out z-100 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-4 h-full flex flex-col pt-[100px]">
        <nav className="flex-grow">
          <Link
            href="#"
            onClick={() => setCurrentPage("dashboard")}
            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-primary hover:text-black rounded transition-colors mb-3 ${
              currentPage === "dashboard" ? "bg-primary text-black" : ""
            }`}
          >
            <Home size={18} className="mr-2" /> Dashboard
          </Link>
          <Link
            href="#"
            onClick={() => setCurrentPage("analytics")}
            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-primary hover:text-black rounded transition-colors mb-3 ${
              currentPage === "analytics" ? "bg-primary text-black" : ""
            }`}
          >
            <Activity size={18} className="mr-2" /> Analytics
          </Link>
          <Link
            href="#"
            onClick={() => setCurrentPage("content")}
            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-primary hover:text-black rounded transition-colors mb-3 ${
              currentPage === "content" ? "bg-primary text-black" : ""
            }`}
          >
            <Eye size={18} className="mr-2" /> Content
          </Link>
        </nav>
        <button className="mt-auto bg-primary text-white px-4 py-2 rounded hover:primary/20 transition-colors flex items-center z-100">
          <LogOut size={18} className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
}
