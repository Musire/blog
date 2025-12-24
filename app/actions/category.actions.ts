// src/app/actions/category.actions.ts
"use server";

import { connectDB } from "@/lib/db";
import { slugify } from "@/lib/utils";
import Category from "@/models/Category";
import {
  CategorySchema,
  CreateCategoryInput,
  UpdateCategoryInput,
  UpdateCategorySchema
} from "@/validators/category.schema";
import { revalidatePath } from "next/cache";



export async function createCategory(input: CreateCategoryInput) {
  const parsed = CategorySchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await connectDB();

  try {
    await Category.create({
      title: parsed.data.title.toLowerCase(),
      description: parsed.data.description,
      slug: slugify(parsed.data.title.toLowerCase())
    });
    return { success: true }
  } catch (err: any) {
    if (err.code === 11000) {
      return {
        success: false,
        error: "Category already exists",
      };
    }
    
    return {
      success: false,
      error: "Failed to create category",
    };

  }
}


export async function deleteCategories(ids: string[]) {
  if (!ids || ids.length === 0) {
    throw new Error("No IDs provided");
  }

  await connectDB();

  await Category.deleteMany({
    _id: { $in: ids },
  });

  // Revalidate admin list page
  revalidatePath("/admin/category");
}



export async function updateCategory(input: UpdateCategoryInput) {
  const parsed = UpdateCategorySchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await connectDB();

  const { id, title, description } = parsed.data;


  try {
    const updated = await Category.findByIdAndUpdate(
      id,
      {
        title,
        description,
        slug: slugify(title)
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return {
        success: false,
        error: "Category not found",
      };
    }

    return { success: true };
  } catch (err: any) {
    if (err.code === 11000) {
      return {
        success: false,
        error: "Category title already exists",
      };
    }
    

    return {
      success: false,
      error: "Failed to update category",
    };
  }
}