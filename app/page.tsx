"use client";
import { useState } from "react";
import { backgrounds, languages, themes } from "@/app/utils/utilities";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ThemeSelector from "./components/ThemeSelector";
import BackgroundSelector from "./components/BackgroundSelector";

export default function Home() {
  const [language, setLanguage] = useState(languages[0].name);
  const [activeIcon, setActiveIcon] = useState(languages[0].icon);
  const [theme, setTheme] = useState(themes[0]);
  const [background, setBackground] = useState(backgrounds[0]);

  const onCodeChange = () => {
    return "";
  };

  return (
    <main className="h-screen flex flex-col items-center justify-between">
      <header className="flex gap-6 mt-6 w-[940px] p-5 fixed top-0 left-1/2 translate-x-[-50%] z-10 bg-[#191919] rounded-lg border border-[#3c3c3c shadow-md]">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          setActiveIcon={setActiveIcon}
        />
        <ThemeSelector theme={theme} setTheme={setTheme}/>
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
      </header>
      <div className="code-editor-ref mt-[10rem]">
        <CodeEditor
          language={language}
          icon={activeIcon}
          theme={theme}
          onCodeChange={onCodeChange}
          background={background}
        />
      </div>
    </main>
  );
}
