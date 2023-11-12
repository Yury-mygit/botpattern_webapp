import * as React from "react";

type IconButtonProps = {
  onClick: () => void;
  children: React.ReactNode; // Add this line
};

export const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick} className="box-border border-2 border-transparent hover:border-blue-500 text-white font-bold py-2 px-4 rounded">
    {children}
  </button>
);