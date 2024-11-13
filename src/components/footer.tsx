"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const linkVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-[#1F2226] text-white py-12 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">HG Live</span>
            </div>
            <p className="text-sm text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              modi repellat ea quos exercitationem commodi ipsum, molestiae iure
              nihil tempora repudiandae, dolor velit quam dolore, excepturi
              architecto culpa molestias nobis?
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#FCAD06]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Profile", "Sessions", "Recordings"].map((item) => (
                <motion.li
                  key={item}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#FCAD06] transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#FCAD06]">
              Resources
            </h3>
            <ul className="space-y-2">
              {["About", "Pricing", "Support"].map((item) => (
                <motion.li
                  key={item}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-[#FCAD06] transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 pt-8 border-t border-gray-700 flex flex-wrap justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-400">
            &copy; 2024 SingAlong. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Terms", "Privacy", "Contact"].map((item) => (
              <motion.div key={item} variants={linkVariants} whileHover="hover">
                <Link
                  href="#"
                  className="text-sm text-gray-400 hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
