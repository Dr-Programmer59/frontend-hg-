"use client";

import React, { useState } from "react";
import { InputField, SubmitButton } from ".";

export default function ForgotPasswordPage({
  setModalContent,
}: {
  setModalContent: (content: "login" | "signup" | "forgot-password") => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset link sent to:", { email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F2226] p-4 font-roboto">
      <div className="w-full max-w-md space-y-8 bg-[#2A2E33] p-8 rounded-xl border border-[#3A3E43] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email to receive a password reset link.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <SubmitButton
              name="Send Reset Link"
              type="submit"
              customClass="px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-black bg-[#FCAD06] hover:bg-[#FCAD06]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCAD06] transition duration-200 ease-in-out"
            />
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-400">
          Remember your password?{" "}
          <button
            className="font-medium text-primary hover:underline"
            onClick={() => setModalContent("login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
