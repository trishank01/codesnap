"use client";
import { Resizable } from "re-resizable";
import React, { useEffect, useState, useRef } from "react";
import AceEditor from "react-ace";
import { initialCode, languages } from "../utils/utilities";


// languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";

// themes
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";

interface CodeEditorProps {
  language: string;
  theme: string;
  icon: string;
  background?: string;
  currentPadding?: string;
}

const CodeEditor = ({
  language,
  theme,
  icon,
  background,
  currentPadding = "20px",
}: CodeEditorProps) => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState<number>(500);
  const [title, setTitle] = useState(`script.${languages[0]?.extension}`);
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(initialCode);
  const containerRef = useRef<HTMLDivElement>(null); // Ref to track container

  // Parse padding to a number
  const paddingValue = (padding: string) => {
    const value = parseFloat(padding.replace("px", ""));
    return isNaN(value) ? 20 : value; // Fallback to 20 if parsing fails
  };

  // change language extension
  const languageExtenstion = () => {
    languages.map((lang) =>
      lang.name === language && setCount(lang.id) 
    );

    //setTitleExtension(`${languages[count]?.extension}`);
    setTitle(`script.${languages[count]?.extension}`);
  };


  useEffect(() => {
    languageExtenstion();
  }, [language, count]);



  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value;

  // If user tries to edit extension, ignore it
  const parts = rawValue.split(".");
  const base = parts[0].replace(/[^a-zA-Z0-9_-]/g, ""); // restrict characters
  setTitle(`${base}.${languages[count]?.extension}`);
};
  const paddingNum = paddingValue(currentPadding);

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  // Handle resize from Resizable component
  const handleResize = (
    event: MouseEvent | TouchEvent,
    direction: string,
    ref: HTMLElement
  ) => {
    setWidth(ref.offsetWidth);
    setHeight(ref.offsetHeight);
  };

  // Initialize and update size on window resize
  const updateSize = () => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setHeight(
        Math.max(466, Math.min(containerHeight, window.innerHeight - 100))
      ); // Respect minHeight and offset
    } else {
      setHeight(window.innerHeight - 100); // Fallback
    }
  };

  useEffect(() => {
    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Calculate editor height (total height - title bar - padding)
  const editorHeight = height ? `${height - 52 - 2 * paddingNum}px` : "100%";

  ;
  return (
    <Resizable
      minHeight={466}
      minWidth={510}
      maxWidth={1000}
      defaultSize={{
        width: width,
        height: height,
      }}
      onResizeStop={handleResize}
      className="resize-container relative rounded-lg overflow-hidden"
      style={{
        background: background,
      }}
    >
      <div
        ref={containerRef}
        className="code-block flex flex-col h-full ease-linear transition-all duration-300 overflow-visible"
        style={{ padding: currentPadding }}
      >
        <div className="handle handle-top absolute left-1/2 translate-x-[-50%] top-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
        <div className="handle handle-bottom absolute left-1/2 translate-x-[-50%] bottom-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
        <div className="handle handle-left absolute top-1/2 translate-y-[-50%] left-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
        <div className="handle handle-right absolute top-1/2 translate-y-[-50%] right-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
        <div className="code-title h-[52px] px-4 flex items-center justify-between bg-black opacity-80 overflow-visible">
          <div className="dots flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772]"></div>
          </div>
          <div className="input-control w-full overflow-visible">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full h-[42px] text-[hsla(0,0%100%,.6)] outline-none font-medium text-center bg-transparent leading-3 py-[4px]"
            />

          </div>
          <div className="icon w-8 h-8 flex justify-center items-center p-1 bg-black bg-opacity-30 rounded-sm">
            <img src={icon} className="w-[33px]" alt="icon" />
          </div>
        </div>
        <AceEditor
          value={code}
          name="UNIQUE_ID_OF_DIV"
          fontSize={16}
          showGutter={false}
          theme={theme}
          height={editorHeight}
          width="100%"
          mode={language.toLowerCase()}
          wrapEnabled={true}
          showPrintMargin={false}
          highlightActiveLine={false}
          className="ace-editor-container"
          editorProps={{ $blockScrolling: true }}
          onChange={handleCodeChange}
          style={{ overflow: "hidden", position: "relative" }}
        />
      </div>
    </Resizable>
  );
};

export default CodeEditor;
