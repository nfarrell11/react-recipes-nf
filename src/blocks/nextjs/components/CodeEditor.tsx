"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type CodeEditorProps = {
  initialValue: string;
  language?: string;
  onCodeChange: (newCode: string) => void;
  blockId?: number;
  isEditMode: boolean;
};

/**
 * CodeEditor Component - Monaco Editor with auto-save
 */
export default function CodeEditor({
  initialValue,
  language = "javascript",
  onCodeChange
}: CodeEditorProps) {
  const [code, setCode] = useState<string>(initialValue || "");

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setCode(newValue);
      onCodeChange(newValue);  // Propagate changes to parent
    }
  };

  return (
    <div className="border rounded overflow-hidden">
      <MonacoEditor
        height="400px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          wordWrap: "on",
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
