import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    {...props}
    className={
      `rounded-full border-2 border-[#020202] bg-white text-[#020202] px-6 py-3 text-lg font-semibold transition-colors hover:bg-[#F5F5F5] focus:outline-none ` +
      (props.className || "")
    }
  >
    {children}
  </button>
);
