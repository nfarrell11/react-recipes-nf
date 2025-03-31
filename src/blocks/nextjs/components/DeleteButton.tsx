"use client";

import { Button } from "@/components/ui/button";
import { deleteBlock } from "@/blocks/nextjs/actions";
import { useState } from "react";

type DeleteButtonProps = {
  blockId: number;
};
/**
 * DeleteBlockButton Component - Deletes a block after confirmation
 */
export function DeleteButton({ blockId }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this block? This action cannot be undone."
    );

    if (confirmed) {
      setIsDeleting(true);

      try {
        await deleteBlock(blockId);
        window.location.href = "/blocks"; // ✅ Redirect after deletion
      } catch (error) {
        console.error("Error deleting block:", error);
        alert("Failed to delete the block. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  }

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "🗑️ Delete Block"}
    </Button>
  );
}
