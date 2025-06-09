"use client";
import React from "react";

interface PaddingSelectorProps {
  paddings: string[];
  currentPadding: string;
  setCurrentPadding: (padding: string) => void;
}

const PaddingSelector = ({
  paddings,
  currentPadding,
  setCurrentPadding,
}: PaddingSelectorProps) => {
  const changePadding = (newPadding: string) => {
    setCurrentPadding(newPadding);
  };
  return (
    <div>
      <p className="py-[5px] text-sm font-medium">Padding Selector</p>
      <div className="flex items-center gap-3">
        {paddings.map((padding, i) => (
          <button
            className={`h-[38px] flex items-center justify-center text-sm px-2 cursor-pointer ${
              currentPadding === padding && "bg-[#3C3C3C] text-white rounded-md"
            } hover:text-white ease-linear transition-all duration-300`}
            onClick={() => changePadding(padding)}
            key={i}
          >
            {padding}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaddingSelector;
