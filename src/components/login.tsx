"use client";

import { useDispatch, useSelector } from "react-redux";
import { SubmitButton, InputField } from ".";
import { useState } from "react";
import { login,register } from "@/lib/actions/user";
import { UnknownAction } from "@reduxjs/toolkit";

type FormData = {
  email: string;
  password: string;
};

const initialFormData: FormData = {
  email: "",
  password: "",
};

export default function CustomLoginPage({
  setModalContent,
}: {
  setModalContent: (content: "login" | "signup" | "forgot-password") => void;
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  // @ts-ignore
  const {loading} = useSelector(store => store.userReducer);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // @ts-ignore
    const res = await dispatch(login(formData));
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F2226] p-4 font-roboto">
      <div className="w-full max-w-md space-y-8 bg-[#2A2E33] p-8 rounded-xl border border-[#3A3E43] shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-white cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                Show Password
              </label>
              <button
                type="button"
                className="text-sm font-medium text-primary hover:underline"
                onClick={() => setModalContent("forgot-password")} // Switch to Forgot Password
              >
                Forgot your password?
              </button>
            </div>
          </div>
          <div>
            <SubmitButton
            type="submit"
              name="Log In"
              customClass="w-full py-2 px-4 bg-primary text-white font-bold rounded-md"
            />
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              className="font-medium text-primary hover:underline"
              onClick={() => setModalContent("signup")}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
