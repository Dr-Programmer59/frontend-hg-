"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";

interface PricingTier {
  price: string;
  name: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    price: "$0",
    name: "Free",
    features: [
      "Up to 20 participants per meeting",
      "Basic meeting controls (mute, video on/off)",
      "Screen sharing",
      "Chat functionality",
      "Limited meeting duration (e.g., 40 minutes)",
      "Standard audio quality",
    ],
    buttonText: "Current Plan",
  },
  {
    price: "$10",
    name: "Business Starter",
    features: [
      "Up to 50 participants per meeting",
      "Extended meeting duration (e.g., 1 hour)",
      "Enhanced meeting controls (e.g., recording)",
      "HD video quality",
      "Customizable meeting backgrounds",
      "Basic analytics and reporting",
    ],
    buttonText: "Purchase Now",
    isPopular: true,
  },
  {
    price: "$20",
    name: "Business Plus",
    features: [
      "Up to 100 participants per meeting",
      "Extended meeting duration (e.g., 2 hours)",
      "Advanced meeting controls (e.g., breakout rooms)",
      "Live streaming options",
      "Priority customer support",
      "Advanced analytics and reporting",
    ],
    buttonText: "Purchase Now",
  },
];

const AnimatedShape = () => (
  <motion.div
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,50 Q25,30 50,50 T100,50"
        fill="none"
        stroke="rgba(252, 173, 6, 0.2)"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="rgba(252, 173, 6, 0.2)"
        strokeWidth="0.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </svg>
  </motion.div>
);

const AnimatedLine = () => (
  <motion.div
    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FCAD06] to-teal-400"
    initial={{ scaleX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  />
);

export default function EnhancedPricingCards() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative h-full bg-gradient-to-br from-gray-900 via-[#1F2226] to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <AnimatedShape />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#FCAD06] to-teal-400">
            Choose your plan
          </h2>
          <p className="mt-4 text-xl text-gray-300">
            Select the perfect plan for your streaming needs
          </p>
        </motion.div>
        <div className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <AnimatePresence>
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl shadow-lg transition-all duration-200 ease-in-out 
                            bg-gradient-to-br from-[#FCAD06] via-[#FFD700] to-teal-400
                            ${tier.isPopular ? "lg:scale-110 z-10" : ""}`}
                onMouseEnter={() => setHoveredTier(tier.name)}
                onMouseLeave={() => setHoveredTier(null)}
                whileHover={{ scale: 1.05 }}
              >
                <AnimatedLine />
                {tier.isPopular && (
                  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-36 h-36 overflow-hidden">
                    <div className="absolute transform rotate-45 bg-teal-500 text-white font-semibold py-1 right-[-40px] top-[32px] w-[170px] text-center">
                      Popular
                    </div>
                  </div>
                )}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {tier.name}
                  </h3>
                  <p className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-5xl font-extrabold tracking-tight">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-2xl font-semibold">/month</span>
                  </p>
                  <p className="mt-6 text-gray-800">
                    Everything you need for professional streaming
                  </p>
                </div>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0">
                        <Check className="h-6 w-6 text-gray-900" />
                      </div>
                      <p className="ml-3 text-base text-gray-900">{feature}</p>
                    </motion.li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 w-full py-3 px-6 border border-transparent rounded-md text-center font-medium text-lg transition duration-300 ease-in-out 
                              bg-gray-900 text-white hover:bg-gray-800
                              flex items-center justify-center space-x-2"
                >
                  <span>{tier.buttonText}</span>
                  {hoveredTier === tier.name && isClient && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
