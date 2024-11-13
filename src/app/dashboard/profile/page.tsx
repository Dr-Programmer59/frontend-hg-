"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Eye,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
} from "lucide-react";

type LiveStream = {
  title: string;
  date: string;
  views: number;
};

const CustomCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#3A3D41] p-6 rounded-lg shadow-md">{children}</div>
);

const CustomButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    className="bg-primary text-black hover:bg-primary/90 px-4 py-2 rounded-md font-medium transition duration-200 ease-in-out flex items-center justify-center"
    onClick={onClick}
  >
    {children}
  </button>
);

const StreamCard = ({ stream }: { stream: LiveStream }) => (
  <CustomCard>
    <h4 className="text-white font-medium mb-2">{stream.title}</h4>
    <p className="text-gray-400 flex items-center">
      <Calendar size={16} className="mr-2" />
      {new Date(stream.date).toLocaleDateString()}
    </p>
    <p className="text-gray-400 flex items-center mt-1">
      <Eye size={16} className="mr-2" />
      {stream.views.toLocaleString()} views
    </p>
  </CustomCard>
);

export default function EnhancedProfile() {
  const [showAllStreams, setShowAllStreams] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true to avoid SSR issues with client-only elements
    setIsMounted(true);
  }, []);

  const userInfo = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
  };

  const liveStreams: LiveStream[] = [
    { title: "Cooking Live!", date: "2024-09-15", views: 150 },
    { title: "Tech Talk", date: "2024-09-22", views: 200 },
    { title: "Fitness Session", date: "2024-09-28", views: 300 },
    { title: "Music Night", date: "2024-10-05", views: 250 },
    { title: "Art Workshop", date: "2024-10-12", views: 180 },
  ];

  if (!isMounted) return null; // Ensure client-side only rendering

  return (
    <div className="bg-[#2A2D31] p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-full mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
        Account Information
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
          <img
            src={userInfo.avatar}
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 w-full">
          <CustomCard>
            <h3 className="text-xl font-semibold text-white mb-4">
              User Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <User size={18} className="mr-3" />
                <span className="font-medium">Name:</span>
                <span className="ml-2">{userInfo.name}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail size={18} className="mr-3" />
                <span className="font-medium">Email:</span>
                <span className="ml-2">{userInfo.email}</span>
              </div>
            </div>
          </CustomCard>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Live Streams</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveStreams
            .slice(0, showAllStreams ? undefined : 3)
            .map((stream, index) => (
              <StreamCard key={index} stream={stream} />
            ))}
        </div>
        {liveStreams.length > 3 && (
          <div className="mt-6 text-center">
            <CustomButton onClick={() => setShowAllStreams(!showAllStreams)}>
              {showAllStreams ? (
                <>
                  Show Less <ChevronUp size={18} className="ml-2" />
                </>
              ) : (
                <>
                  Show More <ChevronDown size={18} className="ml-2" />
                </>
              )}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
}
