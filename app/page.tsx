"use client";
import { useReducer, useRef, useState } from "react";
import { backgrounds, languages, themes } from "@/app/utils/utilities";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ThemeSelector from "./components/ThemeSelector";
import BackgroundSelector from "./components/BackgroundSelector";
import PaddingSelector from "./components/PaddingSelector";
import { Download } from "lucide-react";
import Footer from "./components/Footer";
import html2canvas from "html2canvas-pro";

export default function Home() {
  const [language, setLanguage] = useState(languages[0].name);
  const [activeIcon, setActiveIcon] = useState(languages[0].icon);
  const [theme, setTheme] = useState(themes[0]);
  const [background, setBackground] = useState(backgrounds[0]);
  const [paddings, setPaddings] = useState(["1rem", "2rem", "3rem", "4rem"]);
  const [currentPadding, setCurrentPadding] = useState(paddings[2]);

  //ref

  const editorRef = useRef(null);

  const exportPng = async () => {
    const editorElem = editorRef.current;
    if (editorElem) {
      //   hide elements
      const handleElems = document.querySelectorAll(".handle") as any;
      const cursorElem = document.querySelector(".ace_cursor") as any;

      handleElems.forEach((elem: any) => {
        elem.style.display = "none";
      });
      cursorElem.style.display = "none";
      const canvas = await html2canvas(editorElem, {
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.download = "code.png";
      link.href = image;
      link.click();

      // show elements
      handleElems.forEach((elem: any) => {
        elem.style.display = "block";
      });
      cursorElem.style.display = "block";
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-between">
      <header className="flex gap-6 mt-6 w-[940px] p-5 fixed top-0 left-1/2 translate-x-[-50%] z-10 bg-[#191919] rounded-lg border border-[#3c3c3c shadow-md]">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          setActiveIcon={setActiveIcon}
        />
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <PaddingSelector
          paddings={paddings}
          currentPadding={currentPadding}
          setCurrentPadding={setCurrentPadding}
        />

        <div className="export-btn self-center ml-auto">
          <button
            className="flex items-center  gap-3  py-3 px-3 rounded-md text-sm  text-blue-400 font-medium 
          bg-opacity-10 hover:bg-opacity-80 hover:text-slate-50 ease-in-out transition-all duration-300 
          cursor-pointer bg-gray-700 hover:bg-blue-400"
            onClick={exportPng}
          >
            <span>
              <Download size={20} />
            </span>
            Export PNG{" "}
          </button>
        </div>
      </header>
      <div className="code-editor-ref mt-[10rem] w-fit" ref={editorRef}>
        <CodeEditor
          language={language}
          icon={activeIcon}
          theme={theme}
          background={background}
          currentPadding={currentPadding}
        />
      </div>
      <Footer />
    </main>
  );
}
