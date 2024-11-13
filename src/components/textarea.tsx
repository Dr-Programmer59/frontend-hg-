// components/Textarea.tsx
"use client";

import React from "react";

interface TextareaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  required = false,
  placeholder = "",
  rows = 3,
}) => {
  return (
    <div className="font-light text-md">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-400 mb-1"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#1F2226] text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default Textarea;
