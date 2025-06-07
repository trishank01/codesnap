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

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  language: string;
  theme: string;
  icon: string;
  background?: string;
  currentPadding?: string;
}

const CodeEditor = ({
  onCodeChange,
  language,
  theme,
  icon,
  background,
  currentPadding,
}: CodeEditorProps) => {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState<number | null>(500);

  // @ts-ignore
  const handleResize = (event, direction, ref, pos) => {
    const newHeight = ref.style.height;
    setHeight(parseInt(newHeight));
  };

  const updateSize = () => {
    setHeight(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
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
      className="resize-container relative"
      style={{
        background:background
      }}
    >
      <div className="code-block p-8">
        <div className="code-title h-[52px] px-4 flex items-center justify-between bg-black opacity-80">
          <div className="dots flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a]"></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772]"></div>
          </div>
          <div className="input-control w-full">
            <input
              type="text"
              className="w-full text-[hsla(0,0%100%,.6)] outline-none font-medium text-center bg-transparent"
            />
          </div>
          <div className="icon w-8 h-8 flex justify-center items-center p-1 bg-black bg-opacity-30 rounded-sm">
            <img src={icon} alt="icon"  />
          </div>
        </div>
        <AceEditor
          value="function(){return 'hello word';}"
          name="UNIQUE_ID_OF_DIV"
          fontSize={16}
          showGutter={false}
          theme={theme}
          mode={language.toLowerCase()}
          wrapEnabled={true}
          showPrintMargin={false}
          highlightActiveLine={false}
          className="ace-editor-container"
          editorProps={{ $blockScrolling: true }}
          
        />
      </div>
    </Resizable>
  );
};

export default CodeEditor;
