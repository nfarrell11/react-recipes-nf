"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * CreateBlockButton Component - Navigates to create page
 */
export function CreateButton() {
  return (
    <Link href="/blocks/create" passHref>
      <Button variant="default" asChild>
        <span>+ Create Block</span>
      </Button>
    </Link>
  );
}
