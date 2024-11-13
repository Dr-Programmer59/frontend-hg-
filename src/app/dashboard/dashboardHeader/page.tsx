"use client";

import { Menu, Video, User, Settings } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function DashboardHeader({
  sidebarOpen,
  setSidebarOpen,
  setModalOpen,
  profileOpen,
  setProfileOpen,
  setCurrentPage,
}: any) {
  // @ts-ignore
  const {user} = useSelector(store => store.userReducer)
  return (
    <header className="bg-[#2A2D31] sticky top-0 z-50 p-4 px-7 flex justify-between items-center ">
      {/* Welcome message */}
      <h1 className="text-xl font-bold hidden sm:block ml-10">Welcome, User</h1>
      <h1 className="text-xl font-bold block sm:hidden ml-10"></h1>

      <div className="flex items-center space-x-7">
        {/* Go Live button */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-transparent border-1 border-primary text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-primary transition-colors flex items-center"
        >
          <Video size={18} className="mr-2" /> Go Live
        </button>

        {/* Profile button and dropdown */}
        <div className="relative ">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center focus:outline-none"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user?.avatar}`}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#2A2D31] rounded-md shadow-lg py-1 z-50">
              <Link
                href="#"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary hover:text-black"
                onClick={() => {
                  setCurrentPage("profile");
                }}
              >
                <User size={18} className="inline mr-2" /> Profile
              </Link>
              <Link
                href="#"
                onClick={() => {
                  setCurrentPage("settings");
                }}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-primary hover:text-black"
              >
                <Settings size={18} className="inline mr-2" /> Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
