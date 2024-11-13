"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Send,
  Settings,
  Users,
  ThumbsUp,
  Clock,
  LogOut,
  AlertTriangle,
} from "lucide-react";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  timestamp: Date;
}

export default function StreamerScreen() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [streamDuration, setStreamDuration] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [streamTitle, setStreamTitle] = useState("My Awesome Stream");
  const [streamDescription, setStreamDescription] = useState(
    "Welcome to my stream!"
  );
  const [streamCategory, setStreamCategory] = useState("Gaming");
  const [headline, setHeadline] = useState(
    "Welcome to the stream! Don't forget to like and subscribe!"
  );
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStreaming) {
      interval = setInterval(() => {
        setStreamDuration((prev) => prev + 1);
        setViewerCount((prev) =>
          Math.max(0, prev + Math.floor(Math.random() * 3) - 1)
        );
        setLikeCount((prev) => prev + Math.floor(Math.random() * 2));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
    setIsCameraOn(false);
  };

  const toggleStreaming = async () => {
    if (!isStreaming) {
      await startCamera();
      setIsStreaming(true);
      setStreamDuration(0);
      setViewerCount(0);
      setLikeCount(0);
    } else {
      stopCamera();
      setIsStreaming(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = isMuted));
    }
  };

  const toggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now(),
        user: "Streamer",
        message: newMessage.trim(),
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLeaveStream = () => {
    setIsLeaveModalOpen(true);
  };

  const confirmLeaveStream = () => {
    stopCamera();
    setIsStreaming(false);
    setIsLeaveModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen h-full bg-gradient-to-br from-[#1a1c20] to-[#2A2D31] text-white p-6">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Stream Preview and Controls */}
        <div className="flex-grow flex flex-col">
          <div className="relative w-full h-0 pb-[56.25%] rounded-2xl overflow-hidden shadow-lg bg-black">
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              muted={isMuted}
              autoPlay
              playsInline
            />
            {!isCameraOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <CameraOff size={64} className="text-gray-400" />
              </div>
            )}
            <div
              className="absolute bottom-0 left-0 right-0 h-12 bg-cover bg-center flex items-center overflow-hidden"
              style={{
                backgroundImage: "url('/placeholder.svg?height=48&width=800')",
              }}
            >
              <div className="animate-marquee whitespace-nowrap">
                <span className="text-xl font-bold mx-4">{headline}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleStreaming}
                className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
                  isStreaming
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isStreaming ? <Pause size={20} /> : <Play size={20} />}
                <span>
                  {isStreaming ? "Stop Streaming" : "Start Streaming"}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMute}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleCamera}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                {isCameraOn ? <Camera size={20} /> : <CameraOff size={20} />}
              </motion.button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>{viewerCount}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp size={16} className="mr-1" />
                <span>{likeCount}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{formatDuration(streamDuration)}</span>
              </div>
            </div>
          </div>
          {/* Creative Leave Stream Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 8px rgba(255, 0, 0, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLeaveStream}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white font-bold flex items-center justify-center space-x-2 transition-all duration-300 hover:from-red-600 hover:to-pink-600"
          >
            <LogOut size={24} />
            <span>Leave Stream</span>
          </motion.button>
        </div>

        {/* Stream Settings and Chat */}
        <div className="w-full lg:w-96 flex flex-col h-full">
          {/* Stream Settings */}
          <div className="bg-[#3A3D41] rounded-2xl p-4 mb-4">
            <h2 className="text-xl font-bold mb-2 flex items-center">
              <Settings size={20} className="mr-2" /> Stream Settings
            </h2>
            <div className="space-y-2">
              <input
                type="text"
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                placeholder="Stream Title"
                className="w-full bg-[#2A2D31] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FCAD06]"
              />
              <textarea
                value={streamDescription}
                onChange={(e) => setStreamDescription(e.target.value)}
                placeholder="Stream Description"
                className="w-full bg-[#2A2D31] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FCAD06] resize-none"
                rows={3}
              />
              <select
                value={streamCategory}
                onChange={(e) => setStreamCategory(e.target.value)}
                className="w-full bg-[#2A2D31] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FCAD06]"
              >
                <option value="Gaming">Gaming</option>
                <option value="Just Chatting">Just Chatting</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
              </select>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Scrolling Headline"
                className="w-full bg-[#2A2D31] p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#FCAD06]"
              />
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-[#3A3D41] rounded-2xl p-4 flex-grow flex flex-col h-[400px]">
            <h2 className="text-xl font-bold mb-2">Live Chat</h2>
            <div
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto mb-4 space-y-2 pr-2 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="bg-[#2A2D31] p-2 rounded">
                  <span className="font-bold text-[#FCAD06]">{msg.user}: </span>
                  <span>{msg.message}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex mt-auto">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-[#2A2D31] p-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#FCAD06]"
              />
              <button
                type="submit"
                className="bg-[#FCAD06] text-black p-2 rounded-r-full hover:bg-[#FFD700]"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Leave Stream Confirmation Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#3A3D41] p-6 rounded-2xl max-w-sm w-full">
            <div className="flex items-center mb-4 text-red-500">
              <AlertTriangle size={24} className="mr-2" />
              <h2 className="text-xl font-bold">Leave Stream</h2>
            </div>
            <p className="mb-6">
              Are you sure you want to end your stream? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmLeaveStream}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300"
              >
                Leave Stream
              </button>
            </div>
          </div>
        </div>
      )}

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
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
