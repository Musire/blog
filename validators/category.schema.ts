import { z } from "zod";

export const CategorySchema = z.object({
        description: z
          .string()
          .min(1, 'a brief description is required')
          .max(350, 'please provide a shorter description '),
        title: z
          .string()
          .min(1, 'a proper title is required')
          .max(50, 'please provide a shorter title'),
    });

export const UpdateCategorySchema = CategorySchema.extend({
  id: z.string(),
});

export type CreateCategoryInput = {
  title: string;
  description: string;
  _id?: string | undefined;
};

export type UpdateCategoryInput = {
  id: string | undefined;
  title: string;
  description: string;
};
