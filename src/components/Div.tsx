import React from "react";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Div: React.FC<DivProps> = ({ children, ...props }) => (
  <div
    {...props}
    className={`bg-[#F5F5F5] rounded-xl p-6 ` + (props.className || "")}
  >
    {children}
  </div>
);
