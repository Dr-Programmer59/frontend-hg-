// components/Checkbox.tsx
"use client";

import React from "react";

interface CheckboxProps {
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  required = false,
}) => {
  return (
    <div className="flex items-center font-light text-md">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded bg-[#1F2226]"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-400">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
