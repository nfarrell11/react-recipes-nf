"use client";

import { FetchedBlockType } from "../schemas";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { useEffect, useRef } from "react";

type BlockProps = {
  block: FetchedBlockType;
};
/**
 * Block Component - Displays a block's title and code
 */
export default function Block({ block }: BlockProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Auto-adjust textarea height based on content
   */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height dynamically
    }
  }, [block.code]);

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 h-[calc(100vh-100px)]">
      <div className="p-4 flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{block.title}</h1>
        <div className="flex gap-2">
          <EditButton blockId={block.id} />
          <DeleteButton blockId={block.id} />
        </div>
      </div>

      {/* Auto-resizing Textarea for Code Display */}
      <textarea
        ref={textareaRef}
        value={block.code}
        readOnly
        className="w-full bg-gray-100 p-4 rounded text-sm font-mono border border-gray-300 resize-none"
        style={{
          whiteSpace: "pre-wrap", // Ensures line breaks and word wrap
          wordBreak: "break-word", // Wraps long lines
          minHeight: "300px", // Minimum height
          height: "auto", // Auto height, adjusted dynamically
          maxHeight: "70vh", // Fill most of the screen
          overflowY: "auto", // Enable scrolling if necessary
        }}
      />
    </div>
  );
}
