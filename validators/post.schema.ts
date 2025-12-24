// validators/post.schema.ts
import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  category: z.string(),
  featured: z.boolean()
});

export const UpdatePostSchema = PostSchema.extend({
  id: z.string(),
});

export type CreatePostInput = {
  title: string;
  description: string;
  content: string;
  category: string;
  featured: boolean;
  _id?: string | undefined;
};

// update
export type UpdatePostInput = {
  id: string | undefined;
  title: string;
  description: string;
  content: string;
  category: string;
  featured: boolean;
};
