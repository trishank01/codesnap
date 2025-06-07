"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { themes } from "../utils/utilities";
import OutsideClickHandler from "react-outside-click-handler";

interface ThemeSelectorProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };
  return (
        <OutsideClickHandler onOutsideClick={() => setShowDropDown(false)}>
    <div className="theme-selector" onClick={toggleDropDown}>
      <p className="py-[5px] text-sm font-medium">Code Colors</p>
      <div className="dropdown-title capitalize w-[120px]">
        {theme} <ChevronDown />
      </div>
      {showDropDown && (
        <div className="dropdown-menu relative top-[94px] w-[120px] ">
          {themes.map((theme, i) => {
            return (
              <button
                key={i}
                onClick={() => handleThemeChange(theme)}
                className="capitalize cursor-pointer p-1"
              >
                {theme}
              </button>
            );
          })}
        </div>
      )}
    </div>
    </OutsideClickHandler>
  );
};

export default ThemeSelector;
