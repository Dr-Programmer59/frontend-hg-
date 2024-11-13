// components/Select.tsx
"use client";

import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="font-light text-md">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-400 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-[#1F2226] text-white focus:outline-none focus:ring-2 focus:ring-[#FCAD06] focus:border-transparent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
