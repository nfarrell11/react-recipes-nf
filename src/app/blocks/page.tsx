import BlockList from "@/blocks/nextjs/components/BlockList";
import { CreateButton } from "@/blocks/nextjs/components/CreateButton";

export default async function BlocksPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Blocks</h1>
        <CreateButton />
      </div>
      <BlockList />
    </main>
  );
}
