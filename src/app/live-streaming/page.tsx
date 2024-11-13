"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Send,
  X,
  ThumbsUp,
  Users,
  Zap,
  UserPlus,
  LogOut,
} from "lucide-react";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
  isHighlighted?: boolean;
}

export default function StreamingPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [viewerCount, setViewerCount] = useState(1200);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1000);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(100000);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [headlineOffset, setHeadlineOffset] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      const newMsg: ChatMessage = {
        id: Date.now(),
        user: `User${Math.floor(Math.random() * 1000)}`,
        message: `Random message ${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(),
        isHighlighted: Math.random() < 0.1, // 10% chance of being highlighted,
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    }, 3000);

    const viewerInterval = setInterval(() => {
      setViewerCount((prev) =>
        Math.max(1000, prev + Math.floor(Math.random() * 21) - 10)
      );
    }, 5000);

    const headlineInterval = setInterval(() => {
      setHeadlineOffset((prev) => (prev - 1) % 100);
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(viewerInterval);
      clearInterval(headlineInterval);
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now(),
        user: "You",
        message: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");
    }
  };

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  const handleFollow = () => {
    if (isFollowing) {
      setFollowerCount((prev) => prev - 1);
    } else {
      setFollowerCount((prev) => prev + 1);
    }
    setIsFollowing((prev) => !prev);
  };

  const handleLeaveStream = () => {
    // Implement leave stream functionality here
    console.log("Leaving stream");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-full bg-gradient-to-br from-[#1a1c20] to-[#2A2D31] text-white">
      {/* Main Video Screen */}
      <div className="flex-grow p-6 flex flex-col">
        <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-lg">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            autoPlay
            muted
            loop
          />
          <div className="absolute top-4 left-4 bg-red-600 px-2 py-1 rounded-full text-sm font-bold flex items-center">
            <Zap size={16} className="mr-1" /> LIVE
          </div>
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-2 py-1 rounded-full text-sm font-bold flex items-center">
            <Users size={16} className="mr-1" /> {viewerCount.toLocaleString()}
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent flex items-center px-4 overflow-hidden"
            style={{
              backgroundImage: "url('/placeholder.svg?height=64&width=800')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="whitespace-nowrap"
              style={{ transform: `translateX(${headlineOffset}%)` }}
            >
              <h1 className="text-2xl font-bold text-white inline-block">
                Epic Gaming Stream - Don't miss out on the action! Follow now
                for more exciting content!
              </h1>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-2 flex-grow">
          <p className="text-xl text-gray-300">ProGamer123 • 2 hours</p>
          <div className="flex space-x-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors duration-300 ${
                isLiked
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={handleLike}
            >
              <ThumbsUp size={20} />
              <span>{likeCount.toLocaleString()}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full flex items-center space-x-2 transition-colors duration-300 ${
                isFollowing
                  ? "bg-gray-700 text-gray-300"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              onClick={handleFollow}
            >
              <UserPlus size={20} />
              <span>{isFollowing ? "Following" : "Follow"}</span>
            </motion.button>
          </div>
          <p className="text-sm text-gray-400">
            {followerCount.toLocaleString()} followers
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white font-bold flex items-center justify-center space-x-2 transition-all duration-300 hover:from-red-600 hover:to-pink-600"
          onClick={handleLeaveStream}
        >
          <LogOut size={20} />
          <span>Leave Stream</span>
        </motion.button>
      </div>

      {/* Chat and Interaction Section */}
      <div className="w-full md:w-80 lg:w-96 bg-[#3A3D41] p-6 flex flex-col h-screen rounded-tl-3xl md:rounded-tl-none md:rounded-bl-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Live Chat</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-black px-4 py-2 rounded-full flex items-center space-x-2 transition-colors duration-300 hover:bg-yellow-600"
            onClick={() => setIsCallModalOpen(true)}
          >
            <Phone size={20} />
            <span>Call</span>
          </motion.button>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="h-[calc(100vh-200px)] md:h-[calc(100vh-240px)] overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar"
        >
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-3 rounded-lg shadow-md ${
                  msg.isHighlighted
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-[#2A2D31]"
                }`}
              >
                <p
                  className={`font-bold text-sm ${
                    msg.isHighlighted ? "text-white" : "text-[#FCAD06]"
                  }`}
                >
                  {msg.user}
                </p>
                <p className="text-gray-200 text-xs">{msg.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="mt-auto flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-[#2A2D31] p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FCAD06] transition-all duration-300 text-sm"
          />
          <button
            type="submit"
            className="bg-[#FCAD06] text-black p-3 rounded-r-full transition-colors duration-300 hover:bg-[#FFD700]"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Call Modal */}
      <AnimatePresence>
        {isCallModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-[#3A3D41] p-6 rounded-2xl max-w-sm w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Call Streamer</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCallModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <p className="mb-6 text-gray-300">
                Are you sure you want to call the streamer?
              </p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCallModalOpen(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-gray-700"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FCAD06] text-black px-4 py-2 rounded-full transition-colors duration-300 hover:bg-[#FFD700]"
                >
                  Call
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          transition: background-color 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
    </div>
  );
}
