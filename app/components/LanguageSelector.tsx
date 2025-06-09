"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { languages } from "../utils/utilities";
import OutsideClickHandler from "react-outside-click-handler";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
  setActiveIcon: (icon: string) => void;
}

const LanguageSelector = ({
  language,
  setLanguage,
  setActiveIcon,
}: LanguageSelectorProps) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    const newActiveIcon = languages.find(
      (lang) => lang.name === newLanguage
    )?.icon;

    if (newActiveIcon) {
      setActiveIcon(newActiveIcon);
    }
  };
  return (
   <OutsideClickHandler onOutsideClick={() => setShowDropDown(false)}>
    <div onClick={toggleDropDown}>
      <p className="py-[5px] text-sm font-medium">Language</p>
      <div className="dropdown-title capitalize w-[120px]">
        {language}
        <ChevronDown />
      </div>
      {showDropDown && (
        <div  className="dropdown-menu w-[120px] top-[94px]">
          {languages.map((language, index) => {
            return (
              <div key={index}>
                {
                  <button
                    className="drowpdown-item text-left p-1 cursor-pointer"
                    onClick={() => handleLanguageChange(language.name)}
                  >
                    {language.name}
                  </button>
                }
              </div>
            );
          })}
        </div>
      )}
    </div>
    </OutsideClickHandler>
  );
};

export default LanguageSelector;
