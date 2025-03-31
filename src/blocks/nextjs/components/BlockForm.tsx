"use client";

import { BlockType } from "../schemas";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
import { useDebounce } from "@/blocks/core/debounce";
import Link from "next/link";
import { updateBlock } from "../actions";

type BlockFormProps = {
  initialValues?: BlockType;
  isEditMode: boolean;
  blockId?: number; // Block ID only required in edit mode
  formAction?: (formData: FormData) => Promise<string | void>; // Only used for creating new blocks (Update relies on autosave)
};

/**
 * Block Form component - can receive both Create and Edit form actions
 */
export default function BlockForm({
  initialValues = { title: "", code: "" },
  isEditMode,
  blockId,
  formAction,
}: BlockFormProps) {

  // Initialize react-hook-form
  const formMethods = useForm<BlockType>({
    defaultValues: initialValues,
  });

  const [title, setTitle] = useState<string>(initialValues.title || "");
  const [code, setCode] = useState<string>(initialValues.code || "");
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Debounce title and code values for auto-save
  const debouncedTitle = useDebounce(title, 1987);
  const debouncedCode = useDebounce(code, 1987);

  // Auto-save for title and code in edit mode
  useEffect(() => {
    if (!isEditMode || !blockId || (!debouncedTitle && !debouncedCode)) {
      return;
    }
    const autoSaveBlock = async () => {

      const formData = new FormData();
      formData.append("title", debouncedTitle);
      formData.append("code", debouncedCode);

      setIsAutoSaving(true);
      await updateBlock(blockId, formData, false);
      setTimeout(() => setIsAutoSaving(false), 1000);
    };

    autoSaveBlock();
  }, [debouncedTitle, debouncedCode, blockId, isEditMode]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  /*
   * Handle Form Submission - this works for create mode only
   * the form action prop provides an implemented server action
   * that either returns an error message or redirects.
   */
  const handleFormSubmit = async (formData: FormData) => {
    if (!formAction) return;

    formData.set("title", title);
    formData.set("code", code);

    const error = await formAction(formData);

    if (typeof error === "string") {
      setFormError(error);
    } else {
      // Clear error if everything is fine
      setFormError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-8">
      {/* Wrap with FormProvider */}
      <FormProvider {...formMethods}>
        <form
          action={async (formData) => {
            await handleFormSubmit(formData);
          }}
          className="space-y-8"
        >
          {/* Single Form Error Message */}
          {formError && (
            <div className="p-4 mb-4 text-sm text-red-600 bg-red-100 rounded">
              {formError}
            </div>
          )}

          {/* Title Input */}
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                name="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </FormControl>
          </FormItem>

          {/* Auto-save Message */}
          {isAutoSaving && (
            <p className="text-sm text-blue-500 animate-pulse">
              ✨ Auto-saving...
            </p>
          )}

          {/* Code Editor */}
          <FormItem>
            <FormLabel>Code</FormLabel>
            <CodeEditor
              initialValue={code}
              onCodeChange={handleCodeChange}
              language="javascript"
              blockId={blockId}
              isEditMode={isEditMode}
            />
          </FormItem>

          {/* Update Button in Edit Mode (just navigates back) */}
          <div className="flex justify-end gap-4">
            {isEditMode ? (
              <Link
                href={`/blocks/${blockId}`}
                passHref
              >
                <Button asChild>
                  <span>Save</span>
                </Button>
              </Link>
            ) : (
              <Button type="submit">Create Block</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
