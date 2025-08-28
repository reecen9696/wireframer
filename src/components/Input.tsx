import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => (
  <input
    {...props}
    className={
      `rounded-lg bg-white border-2 border-[#F5F5F5] px-4 py-2 text-[#020202] focus:outline-none focus:ring-2 focus:ring-[#020202] ` +
      (props.className || "")
    }
  />
);
