// components/Input.tsx
"use client";

import React from "react";

interface InputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
}) => {
  return (
    <div className="font-light text-md">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-400 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#1F2226] text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default Input;
