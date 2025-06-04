"use client"
import { useState } from "react";
import {languages} from "@/app/utils/utilities"
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";

export default function Home() {
  const [language , setLanguage] = useState<string>(languages[0].name)
  return (
    <main className="">
      <header>
        <LanguageSelector/>
      </header>
      <div className="code-editor-ref">
        <CodeEditor  language={language}/>
      </div>
    </main>
  );
}
