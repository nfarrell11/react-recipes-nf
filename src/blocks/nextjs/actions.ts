"use server";
import { BlockSchema, FetchedBlockSchema, FetchedBlockType } from "./schemas";
import { db } from "@/database";
import { getUserFromSession } from "@/auth/core/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

/**
 * Create Block Action - creates a new block in the logged in user's collection
 * @param formData - Form data from BlockForm
 * @returns error message or redirects on success 
 */
export async function createBlock(formData: FormData) {

  const user = await getUserFromSession(await cookies());
  if (!user) {
    redirect("/");
  }

  const parsedData = BlockSchema.safeParse({
    title: String(formData.get("title")),
    code: String(formData.get("code")),
  });

  if (!parsedData.success) {
    return "Please include a title and a block of code";
  }

  try {
    const newBlock = await db.block.create({
      data: {
        title: parsedData.data.title,
        code: parsedData.data.code,
        userId: user.id,
      },
    });

    if (!newBlock) return "Failed to create block";
  } catch (error) {
    console.log(error);
    return "An unexpected error occurred while creating the block";
  }
  redirect("/blocks");
}

/**
 * Fetch all blocks for the authenticated user
 * 
 * @returns Array of validated blocks
 */
export async function fetchUserBlocks(
  cookies: ReadonlyRequestCookies
): Promise<FetchedBlockType[]> {

  const user = await getUserFromSession(cookies);
  if (!user) {
    return [];
  }
  try {
    const blocks = await db.block.findMany({
      where: { userId: user.id },
    });

    const parsedBlocks = blocks.map((block) =>
      FetchedBlockSchema.safeParse(block)
    );

    return parsedBlocks
      .filter((result) => result.success)
      .map((result) => result.data) as FetchedBlockType[];
  } catch (error) {
    console.error("Error fetching user blocks:", error);
    return [];
  }
}

/**
 * Get Block Action - gets block from database by its block ID
 * 
 * @param blockId 
 * @returns the block with the specified block ID
 * @throws error message if the block ID is not found in the blocks collection for the currently logged in user
 */
export async function getBlockById(blockId: number): Promise<FetchedBlockType> {

  if (isNaN(blockId)) {
    throw new Error("Invalid block ID")
  }

  const block = await db.block.findUnique({
    where: { id: blockId },
  });

  if(!block) {
    throw new Error("Block not found")
  }

  const parsedBlock = FetchedBlockSchema.safeParse(block);
  if (!parsedBlock.success) {
    throw new Error("Block data error")
  }
  return block;
}

/**
 * Update Block Action - updates the current block
 * 
 * @param blockId - the block ID 
 * @param formData - the title and code block as structured data
 * @param shouldRedirect - true if the user manually submits the edit, false if the system autosaves partially completed edits
 * @returns an error message or redirects to the block page
 */
export async function updateBlock(
  blockId: number,
  formData: FormData,
  shouldRedirect: boolean = true
) {
  const user = await getUserFromSession(await cookies());
  if (!user) return "User not authenticated";
  
  const block = await db.block.findUnique({
    where: { id: Number(blockId) },
  });

  if (!block || block.userId !== user.id) {
    return "Unauthorized to edit this block";
  }

  const parsedData = BlockSchema.safeParse({
    title: String(formData.get("title")),
    code: String(formData.get("code")),
  });

  if (!parsedData.success) {
    return "Invalid block data";
  }

  try {
    await db.block.update({
      where: { id: blockId },
      data: parsedData.data,
    });

    if (shouldRedirect === true) {
      redirect(`/blocks/${blockId}`);
    }
  } catch (error) {
    console.error("Error updating block:", error);
    return "An unexpected error occurred while updating the block";
  }
}

/**
 * Delete Block Action - deletes any block by its ID
 * 
 * @param id - ID of the block to delete
 * @returns Error message if delete fails
 */
export async function deleteBlock(id: number) {
  try {
    await db.block.delete({
      where: { id },
    });
    console.log(`✅ Block ${id} deleted successfully`);
    redirect("/blocks");
  } catch (error) {
    console.error("Error deleting block:", error);
    return "An error occurred while deleting the block";
  }
}
