import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = (props) => (
  <input
    {...props}
    className={
      `rounded-lg border-2 border-[#020202] px-4 py-2 text-[#020202] ` +
      (props.className || "")
    }
  />
);
