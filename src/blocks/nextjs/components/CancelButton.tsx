"use client";

import { Button } from "@/components/ui/button";

/**
 * Cancel Button Component - Navigates back to the previous page
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/history
 */
export function CancelButton() {
  const handleBack = () => { 
    if (typeof window !== "undefined") window.history.back(); 
  }
  return (
    <Button variant="outline" onClick={handleBack}>
      ← Go Back
    </Button>
  );
}
