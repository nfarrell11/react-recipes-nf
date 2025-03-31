import { z } from "zod";

export const BlockSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  code: z.string().min(1, "Code must be at least 1 character long"),
});

export const FetchedBlockSchema = BlockSchema.extend({
  id: z.number(),
});

export type BlockType = z.infer<typeof BlockSchema>;
export type FetchedBlockType = z.infer<typeof FetchedBlockSchema>;
