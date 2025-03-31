import BlockForm from "@/blocks/nextjs/components/BlockForm";
import { createBlock } from "@/blocks/nextjs/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function CreateBlockPage() {

  async function handleCreateForm(formData: FormData) {
    "use server";
    const result = await createBlock(formData);

    if (!result || typeof result === "string") {
      return result;
    } else {
      redirect("/blocks");
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>Create Block</CardTitle>
        </CardHeader>
        <CardContent>
          <BlockForm
            initialValues={{ title: "", code: "" }}
            isEditMode={false}
            formAction={handleCreateForm}
          />
        </CardContent>
      </Card>
    </div>
  );
}
