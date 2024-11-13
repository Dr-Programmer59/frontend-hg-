// components/Button.tsx
"use client";

import React from "react";

interface ButtonProps {
  name: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  customClass?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  onClick,
  type = "button",
  customClass = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 w-full border border-transparent text-sm font-medium rounded-lg transition duration-200 ease-in-out ${customClass}`}
    >
      {name}
    </button>
  );
};

export default Button;
