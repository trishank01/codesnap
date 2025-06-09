"use client";
import { Resizable } from "re-resizable";
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

// languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";

// themes

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";
import { initialCode } from "../utils/utilities";

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
  currentPadding,
}: CodeEditorProps) => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState<number | null>(500);
  const [title , setTitle] = useState("Untitled-1");
  const [code , setCode] = useState(initialCode)


  const handleCodeChange = (newCode:string) => {
    setCode(newCode)
  }

  // @ts-ignore
  const handleResize = (event, direction, ref, pos) => {
  const newHeight = ref.style.height;   
    setHeight(parseInt(newHeight));
  };

  const updateSize = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    //updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
   console.log("height", height)
  return (
    <Resizable
      minHeight={466}
      minWidth={510}
      maxWidth={1000}
      defaultSize={{
        width: width,
        height: height || 500,
      }}
      onResize={handleResize}
      className="resize-container relative rounded-lg"
      style={{
        background:background
      }}
    >
      <div className="code-block ease-linear transition-all duration-300" style={{padding: currentPadding}}>
        <div className="code-title h-[52px] px-4 flex items-center justify-between bg-black opacity-80">
          <div className="dots flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772]"></div>
          </div>
          <div className="input-control w-full">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-[hsla(0,0%100%,.6)] outline-none font-medium text-center bg-transparent"
              
            />
          </div>
          <div className="icon w-8 h-8 flex justify-center items-center p-1 bg-black bg-opacity-30 rounded-sm">
            <img src={icon} className="w-[33px]" alt="icon"  />
          </div>
        </div>
        <AceEditor
          value={code}
          name="UNIQUE_ID_OF_DIV"
          fontSize={16}
          showGutter={false}
          theme={theme}
          height={`calc(${height}px - ${currentPadding} - ${currentPadding} - 52px)`}
          mode={language.toLowerCase()}
          wrapEnabled={true}
          showPrintMargin={false}
          highlightActiveLine={false}
          className="ace-editor-container"
          editorProps={{ $blockScrolling: true }}
          onChange={handleCodeChange}
        />
      </div>
    </Resizable>
  );
};

export default CodeEditor;
