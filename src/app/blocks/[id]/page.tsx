import Block from "@/blocks/nextjs/components/Block";
import { getBlockById } from "@/blocks/nextjs/actions";
import { notFound } from "next/navigation";

type BlockPageProps = { params: Promise<{ id: string }> }

export default async function BlockPage({ params }: BlockPageProps) {
  const { id } = await params;
  const block = await getBlockById(Number(id));

  if (!block) notFound();

  return (
    <div className="container mx-auto p-6">
      <Block block={block} />
    </div>
  );
}
