"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { backgrounds } from "../utils/utilities";
import OutsideClickHandler from "react-outside-click-handler"

interface backgroundSelectorProps {
  background: string;
  setBackground: (background: string) => void;
}

const BackgroundSelector = ({
  background,
  setBackground,
}: backgroundSelectorProps) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  console.log(showDropDown)

  const handleBackgroundChange = (newBackground: string) => {
    setBackground(newBackground);
  };
  return (
    <OutsideClickHandler onOutsideClick={() => setShowDropDown(false)}>
    <div className="bg-seletor relative" onClick={toggleDropDown}>
      <p className="py-[5px] text-sm font-medium">Theme Selector</p>
      <div className="dropdown-title capitalize w-[62px]">
        <div
          className="rounded-full w-[20px] h-[20px]"
          style={{ background: background }}
        ></div>
        <ChevronDown />
        {showDropDown && (
          <div className="dropdown-menu relative top-[94px] w-[48px] ">
            {backgrounds.map((background, i) => {
              return (
                <button
                  key={i}
                  onClick={() => handleBackgroundChange(background)}
                  className="flex items-center justify-center capitalize cursor-pointer p-1"
                >
                  <div
                    className="rounded-full w-[24px] h-[24px] border-2"
                    style={{ background: background }}
                  ></div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
    </OutsideClickHandler>
  );
};

export default BackgroundSelector;
