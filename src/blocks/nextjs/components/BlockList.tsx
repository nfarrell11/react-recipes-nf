import BlockItem from "./BlockItem";
import { FetchedBlockType } from "../schemas";
import { fetchUserBlocks } from "../actions";
import { cookies } from "next/headers";
// import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// /**
//  * Fetch blocks for the authenticated user
//  * @returns Array of validated blocks
//  */
// async function fetchUserBlocks(
//   cookies: ReadonlyRequestCookies
// ): Promise<FetchedBlockType[]> {
//   // Get the authenticated user from the session
//   const user = await getUserFromSession(cookies);
//   if (!user) {
//     return [];
//   }

//   try {
//     // Fetch all blocks belonging to the authenticated user
//     const blocks = await db.block.findMany({
//       where: { userId: user.id },
//     });

//     // Validate and parse blocks with FetchedBlockSchema
//     const parsedBlocks = blocks.map((block) =>
//       FetchedBlockSchema.safeParse(block)
//     );

//     // Filter out invalid blocks
//     return parsedBlocks
//       .filter((result) => result.success)
//       .map((result) => result.data) as FetchedBlockType[];
//   } catch (error) {
//     console.error("❌ Error fetching user blocks:", error);
//     return [];
//   }
// }

/**
 * BlockList Component - Lists all blocks for the authenticated user
 */
export default async function BlockList() {
  // Fetch cookies to get user session
  const allCookies = await cookies();
  const blocks = await fetchUserBlocks(allCookies);

  if (blocks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No blocks found. Create your first block!
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blocks.map((block: FetchedBlockType) => (
        <BlockItem key={block.id} block={block} />
      ))}
    </ul>
  );
}
