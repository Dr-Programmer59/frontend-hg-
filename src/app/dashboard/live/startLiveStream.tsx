"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios";
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

interface StartLiveStreamProps {
  onClose: () => void;
}

const StartLiveStream: React.FC<StartLiveStreamProps> = ({
  onClose,
}: StartLiveStreamProps) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    category: "",
    thumbnail: null as File | null,
    banner: null as File | null,
    headlineText: "",
  });
const [title, settitle] = useState(
  ""
)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [logoPreview, setlogoPreview] = useState<string | null>(null);

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [currentTag, setCurrentTag] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bannerTextRef = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const { isAuth, user } = useSelector(store => store.userReducer);
const [file, setfile] = useState("")
  const router = useRouter();
// setting the onlivesubmithanlder
// @ts-ignore
const onLiveSubmitHandler = async (e) => {
  e.preventDefault();
  try {
      //create a stream on database pending
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/stream-create`, { title, file, thumnail:thumbnailPreview,logo:logoPreview }, {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
      });
      console.log(data)
      router.push(`/live-dashboard?rooms=${data.roomId}`);
      
  } catch (error) {
      console.log(error)
  }
}

  useEffect(() => {
    setProgress((step / 3) * 100);
  }, [step]);

  useEffect(() => {
    if (bannerTextRef.current) {
      bannerTextRef.current.style.animation = "none";
      void bannerTextRef.current.offsetWidth;
      bannerTextRef.current.style.animation = "scrollText 20s linear infinite";
    }
  }, [formData.headlineText]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "thumbnail" || name === "banner" || name==="logo") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (name === "thumbnail") {
            setThumbnailPreview(reader.result as string);
          } 
          else if(name==="logo"){
            setlogoPreview(reader.result as string);
          }
          else {
            setBannerPreview(reader.result as string);
            // @ts-ignore
            setfile(file)
          }
        };
        reader.readAsDataURL(file);
      } else {
        if (name === "thumbnail") {
          setThumbnailPreview(null);
        } else {
          setBannerPreview(null);
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentTag.trim() !== "") {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleStartLiveStream = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Starting live stream with data:", formData);
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCheckStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStopStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="bg-[#2A2D31] rounded-lg p-6 w-full max-w-4xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onClose();
            handleStopStream();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        <form >
          <h2 className="text-2xl font-bold text-white mb-6">
            Start Live Stream
          </h2>
          <div className="mb-6 bg-[#1F2226] rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e)=>{settitle(e.target.value)}}
                  required
                  className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter stream title"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter stream description"
                  rows={3}
                />
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary text-black px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 focus:outline-none"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  id="tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagInput}
                  className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter tags and press Enter"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a category</option>
                  <option value="fundraising">Fund Raisng</option>
                  <option value="music">Church</option>
                  <option value="talk-show">Pray</option>
                  <option value="sports">health</option>
                </select>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Image Preview Section */}
              <div className="flex-1 order-1 sm:order-2">
                <div className="relative w-full h-64 bg-gray-800 rounded-md overflow-hidden">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No thumbnail selected
                    </div>
                  )}
                  
                  {bannerPreview ? (
                    <img
                      src={bannerPreview}
                      alt="Banner Preview"
                      className="absolute bottom-0 left-0 right-0 h-12 w-full object-cover"
                    />
                  ) : null}

                  {bannerPreview && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-black bg-opacity-50 flex items-center overflow-hidden">
                      <div
                        ref={bannerTextRef}
                        className="whitespace-nowrap text-white px-4"
                        style={{
                          animation: "scrollText 10s linear infinite",
                        }}
                      >
                        {formData.headlineText}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input Fields Section */}
              <div className="space-y-4 flex-1 order-2 sm:order-1">
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="banner"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Banner
                  </label>
                  <input
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="logo"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Logo
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label
                    htmlFor="headlineText"
                    className="block text-sm font-medium text-gray-400 mb-1"
                  >
                    Headline Text
                  </label>
                  <input
                    type="text"
                    id="headlineText"
                    name="headlineText"
                    value={formData.headlineText}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-[#1F2226] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter headline text"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center">
              <h3 className="text-xl text-white mb-4">Live Preview</h3>
              <div className="relative w-full max-w-md h-auto">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full h-auto rounded-md border border-gray-600"
                />
                {bannerPreview && (
                  <img
                    src={bannerPreview}
                    alt="Banner Preview"
                    className="absolute bottom-0 left-0 right-0 h-12 w-full object-cover"
                    style={{ zIndex: 1 }}
                  />
                )}
                {/* Headline text will scroll over the banner */}
                <div
                  ref={bannerTextRef}
                  className="absolute bottom-0 left-0 right-0 bg-transparent text-primary px-4 py-2 rounded-sm text-center overflow-hidden"
                  style={{ zIndex: 2 }}
                >
                  <p
                    className="w-full h-[20px]"
                    style={{
                      animation: "scrollText 10s linear infinite",
                    }}
                  >
                    {formData.headlineText || " "}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  onClick={isStreaming ? handleStopStream : handleCheckStream}
                  className="bg-primary text-black px-4 py-2 rounded-md hover:bg-[#f0a800] transition duration-200"
                >
                  {isStreaming ? "Stop Preview" : "Start Preview"}
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center"
              >
                <ChevronLeft size={20} className="mr-2" /> Previous
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="bg-primary text-black px-4 py-2 rounded hover:bg-primary/80 transition-colors flex items-center ml-auto"
              >
                Next <ChevronRight size={20} className="ml-2" />
              </button>
            )}
            {step === 3 && (
              <button
                type="button"
                onClick={onLiveSubmitHandler}
                className="bg-primary text-black px-4 py-2 rounded hover:bg-primary/80 transition-colors flex items-center ml-auto"
              >
                Start Stream
              </button>
            )}
          </div>
        </form>
      </div>
      <style jsx>{`
        @keyframes scrollText {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default StartLiveStream;