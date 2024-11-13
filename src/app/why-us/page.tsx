"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, UserPlus } from "lucide-react";


export default function WhyUs() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <section
      className="relative h-full flex items-center justify-center py-[100px] overflow-hidden"
      style={{
        backgroundImage: `url("/images/background-image.png")`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl mb-10 z-10 text-white">
          Why Choose <span className="text-primary">HG Live</span>?
        </h1>
        <div className="grid md:grid-cols-3 gap-8 z-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              isHovered={hoveredFeature === index}
              onHover={() => setHoveredFeature(index)}
              onLeave={() => setHoveredFeature(null)}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function FeatureCard({
  title,
  description,
  icon,
  isHovered,
  onHover,
  onLeave,
}: FeatureCardProps) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary  to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <motion.div
        className="absolute inset-0 bg-primary mix-blend-overlay opacity-0"
        initial={false}
        animate={
          isHovered ? { opacity: 0.1, scale: 1.5 } : { opacity: 0, scale: 1 }
        }
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-primary mb-4"
          initial={false}
          animate={
            isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-primary"
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

const features = [
  {
    title: "Immersive Experience",
    description:
      "Dive into a world of stunning visuals and crystal-clear audio. Our platform offers an unparalleled immersive experience that brings live events right to your living room.",
    icon: <Sparkles size={40} />,
  },
  {
    title: "Lightning-Fast Streaming",
    description:
      "Experience the thrill of live events with zero lag. Our cutting-edge technology ensures smooth, buffer-free streaming, keeping you at the heart of the action.",
    icon: <Zap size={40} />,
  },
  {
    title: "Interactive Community",
    description:
      "Connect with like-minded individuals from around the globe. Engage in real-time discussions, share experiences, and build lasting connections within our vibrant community.",
    icon: <UserPlus size={40} />,
  },
];
