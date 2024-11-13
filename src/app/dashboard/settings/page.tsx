"use client";

import React, { useState } from "react";
import { Camera, User, Mail, Lock } from "lucide-react";

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    icon: React.ReactNode;
  }
>(({ className, label, icon, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          className={`block w-full pl-10 sm:text-sm rounded-md bg-[#3A3D41] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent py-3 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  );
});
CustomInput.displayName = "CustomInput";

export default function EnhancedDashboardSettings() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("/placeholder.svg");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted with:", { name, email, password });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#2A2D31] p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full ">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Account Settings
      </h2>
      <p className="text-gray-400 mb-6">
        Update your account information and security settings here.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-2xl">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="avatar"
              className="cursor-pointer bg-primary text-black hover:bg-primary/90 px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition duration-200 ease-in-out"
            >
              <Camera size={16} />
              <span>Change Picture</span>
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <p className="text-sm text-gray-400">
              Recommended: Square image, at least 400x400 pixels.
            </p>
          </div>
        </div>

        <CustomInput
          label="Name"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
          icon={<User size={16} />}
        />

        <CustomInput
          label="Email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          icon={<Mail size={16} />}
        />

        <CustomInput
          label="New Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          icon={<Lock size={16} />}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 px-6 py-2 rounded-md font-medium transition duration-200 ease-in-out"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-full sm:w-auto bg-transparent text-primary hover:text-primary/90 px-6 py-2 rounded-md font-medium transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
