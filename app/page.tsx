"use client";
import { useState } from "react";
import { languages } from "@/app/utils/utilities";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";

export default function Home() {
  const [language, setLanguage] = useState(languages[0].name);
  return (
    <main className="h-screen flex flex-col items-center justify-between">
      <header className="mt-6 w-[940px] p-5 fixed top-0 left-1/2 translate-x-[-50%] z-10 bg-[#191919] rounded-lg border border-[#3c3c3c shadow-md]">
        <LanguageSelector />
      </header>
      <div className="code-editor-ref mt-[10rem]">
        <CodeEditor language={language} />
      </div>
    </main>
  );
}
