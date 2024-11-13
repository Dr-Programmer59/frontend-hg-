"use client";

import { useState, useEffect } from "react";
import {
  Home,
  User,
  Settings,
  HelpCircle,
  Flame,
  ThumbsUp,
  AlignLeft,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only access window here after the component mounts
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsOpen(!mobile);  // Set `isOpen` based on mobile view
      setIsMobile(mobile);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-[#1F2226] text-white transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4">
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="text-primary hover:text-primary/80"
            >
              <AlignLeft size={24} />
            </button>
          )}
        </div>
        <nav>
          <ul className="space-y-2">
            {[
              { icon: Home, label: "Home" },
              { icon: Flame, label: "Trending" },
              { icon: ThumbsUp, label: "Liked Videos" },
              { icon: User, label: "Profile" },
              { icon: Settings, label: "Settings" },
              { icon: HelpCircle, label: "Help" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center p-4 hover:bg-[#FCAD06]/10 transition-colors duration-200"
                >
                  <item.icon size={24} className="text-primary" />
                  <span className={`${isOpen ? "ml-4" : "hidden"}`}>
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
