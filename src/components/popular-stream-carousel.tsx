"use client";

import { Users } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";

import { StaticImageData } from "next/image";

interface Stream {
  id: string;
  title: string;
  streamer: string;
  viewers: number;
  thumbnail: String;
}

const popularStreams: Stream[] = [
  {
    id: "1",
    title: "Epic Fortnite Battles",
    streamer: "NinjaWarrior",
    viewers: 15000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "2",
    title: "Chill Minecraft Building",
    streamer: "BlockMaster",
    viewers: 8000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "3",
    title: "Speedrunning Mario 64",
    streamer: "SpeedDemon",
    viewers: 12000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "4",
    title: "League of Legends Ranked",
    streamer: "LolPro",
    viewers: 20000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "5",
    title: "Apex Legends Gameplay",
    streamer: "ApexPredator",
    viewers: 10000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "6",
    title: "Among Us with Friends",
    streamer: "SocialGamer",
    viewers: 7000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "7",
    title: "Valorant Pro Matches",
    streamer: "TacticalShooter",
    viewers: 18000,
    thumbnail: "/images/fortnite.png",
  },
  {
    id: "8",
    title: "Retro Gaming Night",
    streamer: "OldSchoolGamer",
    viewers: 5000,
    thumbnail: "/images/fortnite.png",
  },
];

export default function PopularStreamCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const x = useMotionValue(0);

  const extendedStreams = [
    ...popularStreams,
    ...popularStreams,
    ...popularStreams,
    ...popularStreams,
    ...popularStreams,
    ...popularStreams,
  ];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const viewportWidth = carousel.offsetWidth;

    const infiniteScroll = async () => {
      await controls.start({
        x: -scrollWidth + viewportWidth,
        transition: {
          duration: 500,
          ease: "linear",
        },
      });

      controls.set({ x: 0 });
      infiniteScroll();
    };

    infiniteScroll();

    return () => {
      controls.stop();
    };
  }, [controls]);

  useEffect(() => {
    controls.set({ x: 0 }); // Ensure this runs after the component mounts
  }, [controls]);

  return (
    <div className="relative bg-[#1F2226] text-white py-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#FCAD06 1px, transparent 1px), linear-gradient(to right, #FCAD06 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Horizontal lines */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-[#FCAD06] opacity-10"
          style={{ top: "25%" }}
          animate={{
            scaleX: [0, 1, 0],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute left-0 right-0 h-px bg-[#FCAD06] opacity-10"
          style={{ top: "75%" }}
          animate={{
            scaleX: [0, 1, 0],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            },
          }}
        />

        {/* Vertical lines */}
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-[#FCAD06] opacity-10"
          style={{ left: "25%" }}
          animate={{
            scaleY: [0, 1, 0],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute top-0 bottom-0 w-px bg-[#FCAD06] opacity-10"
          style={{ left: "75%" }}
          animate={{
            scaleY: [0, 1, 0],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            },
          }}
        />

        {/* Shapes */}
        <motion.div
          className="absolute w-40 h-40 rounded-full border-2 border-[#FCAD06] opacity-5"
          style={{ top: "10%", left: "10%" }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            transition: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />
        <motion.div
          className="absolute w-60 h-60 border-2 border-[#FCAD06] opacity-5"
          style={{ bottom: "10%", right: "10%" }}
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
            transition: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 justify-center items-center relative z-10">
        <div className="flex justify-center lg:justify-between flex-wrap">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl mb-5 text-center">
            Popular Live Streams
          </h1>

          {/* Search Box */}
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search streams..."
              className="w-full max-w-[600px] p-2 rounded-md bg-[#2A2E32] text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="overflow-hidden py-10">
          <motion.div
            ref={carouselRef}
            className="flex space-x-4"
            animate={controls}
            style={{ x }}
          >
            {extendedStreams.map((stream, index) => (
              <motion.div
                key={`${stream.id}-${index}`}
                className="flex-shrink-0 w-[300px] bg-[#2A2E32] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative overflow-hidden">
                  <Image
                  // @ts-ignore
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-36 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    width={300}
                    height={150}
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                    LIVE
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Users className="w-3 h-3 mr-1 text-[#FCAD06]" />
                    <span>{stream.viewers.toLocaleString()}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold mb-1 truncate text-[#FCAD06]">
                    {stream.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {stream.streamer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
