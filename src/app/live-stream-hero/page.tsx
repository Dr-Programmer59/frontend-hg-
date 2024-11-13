"use client";

import { Play, Tv, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function LiveStreamHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  const rightItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <div className="bg-[#1F2226] text-white h-full z-100">
      <motion.div
        className="container mx-auto px-4 py-16 sm:py-24 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="flex flex-col justify-center space-y-8"
            variants={containerVariants}
          >
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                Live Your Passion,
                <br />
                <span className="text-primary">Stream</span> to the World
              </h1>
              <p className="text-xl text-gray-300">
                Connect with your audience in real-time. Start your live
                streaming journey today!
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              variants={itemVariants}
            >
              <motion.button
                className="bg-primary hover:bg-primary/80 text-[#1F2226] flex flex-row px-10 py-3 rounded-md justify-center items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="mr-2 h-5 w-5" /> Start Streaming
              </motion.button>
              <motion.button
                className="bg-white/10 text-white hover:bg-white/20 border-primary flex flex-row px-10 py-3 rounded-md justify-center items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Tv className="mr-2 h-5 w-5" /> Explore Streams
              </motion.button>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4 text-sm"
              variants={itemVariants}
            >
              <span className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                <span className="font-semibold">10k+</span> Live Viewers
              </span>
              <span className="flex items-center">
                <Tv className="mr-2 h-5 w-5 text-primary" />
                <span className="font-semibold">5k+</span> Active Streamers
              </span>
            </motion.div>
          </motion.div>
          <motion.div className="relative" variants={rightItemVariants}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary/30 rounded-lg transform rotate-3 scale-105"></div>
            <div className="relative bg-[#2A2E32] rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <video
                  src="https://www.youtube.com/watch?v=zOTHfIqtzkk&ab_channel=DrSajjadKhanMathAcademy"
                  height={720}
                  width={1280}
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4 bg-primary text-[#1F2226] px-2 py-1 rounded-md text-sm font-semibold flex items-center">
                <span className="w-2 h-2 bg-[#1F2226] rounded-full mr-2 animate-pulse"></span>
                LIVE
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#1F2226]/80 text-white p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">
                  Live Stream Title
                </h3>
                <p className="text-sm text-gray-300">
                  Some Description of the live stream.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-2xl font-bold mb-4 text-primary"
            variants={itemVariants}
          >
            Discover Top Categories
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={containerVariants}
          >
            {[
              "Gaming",
              "Music",
              "Talk Shows",
              "Sports",
              "Education",
              "Art",
            ].map((category) => (
              <motion.button
                key={category}
                className="bg-white/10 text-white hover:bg-primary hover:text-[#1F2226] border-primary rounded-md py-2"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
