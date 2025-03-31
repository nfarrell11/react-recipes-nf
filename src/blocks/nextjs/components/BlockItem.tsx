"use client";

import Link from "next/link";
import { FetchedBlockType } from "../schemas";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";

type BlockItemProps = {
  block: FetchedBlockType;
};
/**
 * Block Item - shows the title and a preview of the code block
 */
export default function BlockItem({ block }: BlockItemProps) {
  return (
    <li className="border rounded p-4 shadow hover:shadow-lg transition-all">
      <Link
        href={`/blocks/${block.id}`}
        className="text-blue-600 hover:underline"
      >
        <h2 className="text-xl font-bold">{block.title}</h2>
      </Link>
      <p className="text-gray-500 truncate">{block.code.substring(0, 50)}...</p>
      <div  className="flex items-center justify-end gap-4">
        <EditButton blockId={block.id} />
        <DeleteButton blockId={block.id} />
      </div>
    </li>
  );
}
