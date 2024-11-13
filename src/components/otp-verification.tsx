"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";

export default function OTPVerification({
  setModalContent,
}: {
  setModalContent: (content: "login" | "signup" | "forgot-password") => void;
}) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 4) {
      console.log("Submitting OTP:", otpCode);
      alert(`OTP ${otpCode} submitted!`);

      //redirecting back to login page
      setTimeout(() => {
        setModalContent("login");
      }, 2000);
    } else {
      alert("Please enter a complete 4-digit OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F2226] p-4 font-roboto">
      <div className="max-w-[400px] w-full mx-auto mt-20 bg-[#2A2E33] shadow-md rounded-lg p-6 ">
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-semibold text-primary text-left my-2">
            Code Verification
          </h2>
          <p className="text-white text-left">
            Enter the 4-digit code sent to your device
          </p>
        </div>
        <div className="flex justify-between mb-6 max-w-[300px] w-full mx-auto">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={inputRefs[index]}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              className="border-2 border-gray-500 bg-transparent text-center text-2xl text-white w-14 h-14 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-primary text-[#1F2226] rounded font-semibold"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
