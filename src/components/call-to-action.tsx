"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Video, Users } from "lucide-react";
import Image from "next/image";


interface CustomInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => (
  <motion.input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 mb-4 bg-white border-2 border-primary] rounded-md text-[#1F2226] placeholder-gray-400 focus:outline-none focus:border-[#FF6B6B] transition-all duration-300"
    whileFocus={{ scale: 1.02 }}
  />
);

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick }) => (
  <motion.button
    onClick={onClick}
    className="w-full p-3 bg-[#FCAD06] text-[#1F2226] rounded-md font-bold hover:bg-[#FF6B6B] transition-colors duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.button>
);

export default function CallToAction() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && name) {
      console.log("Form submitted:", { name, email });
      alert("Thank you for signing up!");
      setEmail("");
      setName("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#1F2226] to-[#2A2E32] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Image
        height={200}
        width={200}
        src={"/images/boxes.png"}
        alt="Decorative Dots"
        className="absolute bottom-0 left-0 z-1"
      />
      <Image
        height={70}
        width={70}
        src={"/images/vertical-lines.png"}
        alt="Decorative Dots"
        className="absolute bottom-0 right-0 z-1"
      />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 mb-8 lg:mb-0"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-[#FCAD06]">
              Elevate Your Live Streaming Experience
            </h2>
            <p className="text-xl mb-6">
              Join our platform and unlock a world of possibilities:
            </p>
            <ul className="list-none mb-6 space-y-4">
              <motion.li whileHover={{ x: 5 }} className="flex items-center">
                <Mic className="w-6 h-6 mr-2 text-[#4ECDC4]" />
                <span>Crystal-clear audio streaming technology</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center">
                <Video className="w-6 h-6 mr-2 text-[#FF6B6B]" />
                <span>High-definition video with adaptive bitrate</span>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} className="flex items-center">
                <Users className="w-6 h-6 mr-2 text-[#45B7D1]" />
                <span>
                  Engage with your audience through interactive features
                </span>
              </motion.li>
            </ul>
            <div className="flex items-center bg-[#2A2E32] p-4 rounded-lg">
              <div className="w-12 h-12 bg-[#FCAD06] rounded-full flex items-center justify-center mr-4">
                <span className="text-[#1F2226] font-bold text-xl">TL</span>
              </div>
              <p className="text-sm italic">
                "This platform has transformed my streaming career. The quality
                and features are unmatched!" - TopLivestreamer
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-5/12 bg-[#2A2E32] p-8 rounded-lg shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-[#FCAD06]">
              Start Streaming Today
            </h3>
            <form onSubmit={handleSubmit}>
              <CustomInput
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <CustomInput
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <CustomButton onClick={() => {}}>Launch Your Stream</CustomButton>
            </form>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-sm text-gray-400 text-center"
            >
              By signing up, you agree to our Terms of Service and Privacy
              Policy.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
