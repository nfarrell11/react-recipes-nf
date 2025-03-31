"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type EditButtonProps = {
  blockId: number;
};
/**
 * EditBlockButton Component - Navigates to edit page
 */
export function EditButton({ blockId }: EditButtonProps) {
  return (
    <Link href={`/blocks/${blockId}/edit`} passHref>
      <Button variant="outline" asChild>
        <span>✏️ Edit Block</span>
      </Button>
    </Link>
  );
}
