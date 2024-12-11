"use client";

import Image from "next/image";

import Masonry from "react-masonry-css";

import {
  BarChart,
  Users,
  DollarSign,
  TrendingUp,
  Play,
  Eye,
  MessageSquare,
  ThumbsUp,
  Clock,
  Globe,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const breakPoints = {
  default: 3, // For large screens
  1100: 2, // For screens between 1100px and 1000px
  1000: 2, // For screens between 1000px and 900px
  900: 2, // For screens between 900px and 700px
  700: 2, // For screens between 700px and 600px
  600: 1, // For screens less than 600px
};

export default function DashboardHome() {

  return (
    <div className="space-y-8 p-6 bg-[#1E2023]">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      <DataCardGrid />
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        <ChannelAnalytics />
        <LatestVideoPerformance />
        <LatestComments />
        <IdeasForYou />
      </Masonry>
    </div>
  );
}

function DataCardGrid() {
  // @ts-ignore
  const {user} = useSelector(store => store.userReducer);
  const cards = [
    {
      title: "Total Views",
      value: "10,234",
      icon: BarChart,
      color: "bg-blue-500",
    },
    {
      title: "Subscribers",
      value: user?.followers || 0,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Revenue",
      value: "$6,789",
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      title: "Growth",
      value: "+12.3%",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <DataCard key={index} {...card} />
      ))}
    </div>
  );
}

function DataCard({ title, value, icon: Icon, color }: any) {
  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${color}`}>
          <Icon className="text-white" size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <div className={`absolute bottom-0 left-0 w-full h-1 ${color}`} />
    </motion.div>
  );
}

function LatestVideoPerformance() {
  const stats = [
    { label: "Ranking by views", value: "8 of 10", icon: BarChart },
    { label: "Views", value: "4", icon: Eye },
    { label: "Impressions click-through rate", value: "7.5%", icon: ThumbsUp },
    { label: "Average view duration", value: "1:00", icon: Clock },
  ];

  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <BarChart className="mr-2 text-primary" size={24} />
        Latest Video Performance
      </h2>

      {/* Thumbnail Image */}
      <div className="mb-6 rounded-lg overflow-hidden flex justify-center items-center">
        <img
          src={"/images/main.png"}
          alt="Latest Video Thumbnail"
          className="w-full rounded-lg h-full max-h-[300px] object-cover"
        />
      </div>

      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <stat.icon className="text-gray-400" size={18} />
              <span className="text-gray-300">{stat.label}</span>
            </div>
            <span className="text-white font-medium bg-[#3A3D41] px-3 py-1 rounded-full text-sm">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ChannelAnalytics() {
  const stats = [
    { label: "Current subscribers", value: "54", icon: Users },
    { label: "Views", value: "1", icon: Eye },
    { label: "Watch time (hours)", value: "0.0", icon: Clock },
  ];

  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Globe className="mr-2 text-primary" size={24} />
        Channel Analytics
      </h2>
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <stat.icon className="text-gray-400" size={18} />
              <span className="text-gray-300">{stat.label}</span>
            </div>
            <span className="text-white font-medium bg-[#3A3D41] px-3 py-1 rounded-full text-sm">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LatestComments() {
  const comments = [
    { author: "AT ULTRON", comment: "Nice", time: "1 year ago" },
    { author: "Tiktok Shorts", comment: "well done bhai", time: "2 years ago" },
    {
      author: "Noobie Ashar",
      comment: "Heart Touching ❤️🔥",
      time: "2 years ago",
    },
  ];

  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <MessageSquare className="mr-2 text-primary" size={24} />
        Latest Comments
      </h2>
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-4 bg-[#3A3D41] p-4 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <Users size={20} className="text-gray-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{comment.author}</p>
              <p className="text-gray-300 mt-1">{comment.comment}</p>
              <p className="text-gray-500 text-sm mt-2">{comment.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function IdeasForYou() {
  return (
    <motion.div
      className="bg-[#2A2D31] p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Play className="mr-2 text-primary" size={24} />
        Ideas for You
      </h2>
      <motion.div
        className="flex items-center space-x-6 bg-[#3A3D41] p-6 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Play size={36} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">
            Make a channel trailer
          </h3>
          <p className="text-gray-300">
            First impressions matter. Win the hearts of unsubscribed viewers
            with a captivating trailer.
          </p>
        </div>
        <ChevronRight size={24} className="text-gray-400" />
      </motion.div>
    </motion.div>
  );
}
