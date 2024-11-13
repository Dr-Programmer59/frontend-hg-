"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  MessageSquare,
  ThumbsUp,
  Globe,
  Lock,
  Calendar,
  MoreVertical,
  Play,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

type Video = {
  id: string;
  title: string;
  visibility: "Public" | "Private";
  date: string;
  views: number;
  comments: number;
  likes: string;
};

type SortKey = keyof Video;
type SortOrder = "asc" | "desc";

const videos: Video[] = [
  {
    id: "1",
    title: "Mesmerizing Rain Sounds",
    visibility: "Public",
    date: "2024-08-27",
    views: 1,
    comments: 0,
    likes: "100.0% 1 like",
  },
  {
    id: "2",
    title: "8K Switzerland",
    visibility: "Public",
    date: "2024-08-04",
    views: 13,
    comments: 1,
    likes: "-",
  },
  {
    id: "3",
    title: "Relaxing Beach Waves",
    visibility: "Private",
    date: "2024-07-15",
    views: 5,
    comments: 2,
    likes: "80.0% 4 likes",
  },
];

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`w-full px-3 py-2 bg-[#3A3D41] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FCAD06] ${className}`}
      ref={ref}
      {...props}
    />
  );
});
CustomInput.displayName = "CustomInput";

const CustomDropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="text-gray-400 hover:text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical size={18} />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#3A3D41] ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

const CustomDropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <button
      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#4A4D51]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function EnhancedVideoTable() {
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedAndFilteredVideos = useMemo(() => {
    return [...videos]
      .filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [videos, sortBy, sortOrder, searchTerm]);

  const handleSort = (column: SortKey) => {
    setSortBy(column);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="bg-[#2A2D31] p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden hidden-scrollbar">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-0 flex items-center">
          <Play className="mr-2 text-[#FCAD06]" size={24} />
          Latest Videos
        </h2>
        <div className="w-full sm:w-64">
          <CustomInput
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="pb-3 pl-3">Video</th>
              <th className="pb-3 hidden sm:table-cell">Visibility</th>
              <th
                className="pb-3 hidden md:table-cell cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortBy === "date" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1" size={16} />
                    ) : (
                      <ChevronDown className="ml-1" size={16} />
                    ))}
                </div>
              </th>
              <th
                className="pb-3 cursor-pointer"
                onClick={() => handleSort("views")}
              >
                <div className="flex items-center">
                  Views
                  {sortBy === "views" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1" size={16} />
                    ) : (
                      <ChevronDown className="ml-1" size={16} />
                    ))}
                </div>
              </th>
              <th
                className="pb-3 hidden lg:table-cell cursor-pointer"
                onClick={() => handleSort("comments")}
              >
                <div className="flex items-center">
                  Comments
                  {sortBy === "comments" &&
                    (sortOrder === "asc" ? (
                      <ChevronUp className="ml-1" size={16} />
                    ) : (
                      <ChevronDown className="ml-1" size={16} />
                    ))}
                </div>
              </th>
              <th className="pb-3 hidden xl:table-cell">Likes</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {sortedAndFilteredVideos.map((video) => (
                <motion.tr
                  key={video.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-gray-700 hover:bg-[#3A3D41]"
                >
                  <td className="py-4 pl-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-9 bg-gray-700 rounded flex items-center justify-center">
                        <Play size={18} className="text-white" />
                      </div>
                      <span className="text-white font-medium">
                        {video.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 hidden sm:table-cell">
                    {video.visibility === "Public" ? (
                      <Globe size={18} className="text-green-500" />
                    ) : (
                      <Lock size={18} className="text-yellow-500" />
                    )}
                  </td>
                  <td className="py-4 text-white hidden md:table-cell">
                    <div className="flex items-center">
                      <Calendar size={18} className="mr-2 text-gray-400" />
                      {new Date(video.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 text-white">
                    <div className="flex items-center">
                      <Eye size={18} className="mr-2 text-gray-400" />
                      {video.views}
                    </div>
                  </td>
                  <td className="py-4 text-white hidden lg:table-cell">
                    <div className="flex items-center">
                      <MessageSquare size={18} className="mr-2 text-gray-400" />
                      {video.comments}
                    </div>
                  </td>
                  <td className="py-4 text-white hidden xl:table-cell">
                    <div className="flex items-center">
                      <ThumbsUp size={18} className="mr-2 text-gray-400" />
                      {video.likes}
                    </div>
                  </td>
                  <td className="py-4">
                    <CustomDropdownMenu>
                      <CustomDropdownMenuItem>Edit</CustomDropdownMenuItem>
                      <CustomDropdownMenuItem>Duplicate</CustomDropdownMenuItem>
                      <CustomDropdownMenuItem>Delete</CustomDropdownMenuItem>
                    </CustomDropdownMenu>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
