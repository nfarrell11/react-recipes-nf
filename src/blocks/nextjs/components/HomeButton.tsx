"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeButton() {
  return (
    <Link href="/blocks" passHref>
      <Button variant="default" asChild>
        <span>React Recipes v2</span>
      </Button>
    </Link>
  );
}
