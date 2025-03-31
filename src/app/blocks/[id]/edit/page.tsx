import BlockForm from "@/blocks/nextjs/components/BlockForm";
import { getBlockById, updateBlock } from "@/blocks/nextjs/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

type EditBlockPageProps = { params: Promise<{ id: string }> }

export default async function EditBlockPage({ params }: EditBlockPageProps) {
  const { id } = await params;
  const blockId = Number(id);
  const block = await getBlockById(blockId);

  const formAction = async (formData: FormData) => {
    "use server";
    const error = await updateBlock(blockId, formData, true);

    if (error) {
      console.log(error);
      redirect("/")
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-[750px]">
      <Card>
        <CardHeader>
          <CardTitle>Edit Block</CardTitle>
        </CardHeader>
        <CardContent>
          <BlockForm
            initialValues={block}
            isEditMode={true}
            blockId={blockId}
            formAction={formAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}
