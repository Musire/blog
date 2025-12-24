// src/app/actions/category.actions.ts
"use server";

import { connectDB } from "@/lib/db";
import { slugify, createExcerpt } from "@/lib/utils";
import Post from "@/models/Post";
import {
  PostSchema,
  CreatePostInput,
  UpdatePostInput,
  UpdatePostSchema,
} from "@/validators/post.schema";
import { revalidatePath } from "next/cache";




export async function createPost(input: CreatePostInput) {
  const parsed = PostSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await connectDB();

  const { title, description, content, category, featured } = parsed.data;

  const slug = slugify(title.toLowerCase());
  const excerpt = createExcerpt(content);

  try {
    await Post.create({
      title,
      description,
      slug,
      content,
      excerpt,
      category, // ObjectId
      featured,
      author: "Juan Marrufo",
    });
    return { success: true }
  } catch (err: any) {
    if (err.code === 11000) {
      return {
        success: false,
        error: "Post title already exists",
      };
    }

    return {
      success: false,
      error: "Failed to create post",
    };
  }
}

export async function deletePosts(ids: string[]) {
  if (!ids || ids.length === 0) {
    throw new Error("No IDs provided");
  }

  await connectDB();

  await Post.deleteMany({
    _id: { $in: ids },
  });

  // Revalidate admin list page
  revalidatePath("/admin/post");
}

export async function updatePost(input: UpdatePostInput) {
  const parsed = UpdatePostSchema.safeParse(input);

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  await connectDB();

  const { id, title, description, content, category } = parsed.data;

  const slug = slugify(title);
  const excerpt = createExcerpt(content);

  try {
    const updated = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
        slug,
        content,
        excerpt,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return {
        success: false,
        error: "Post not found",
      };
    }

    return { success: true };
  } catch (err: any) {
    if (err.code === 11000) {
      return {
        success: false,
        error: "Post title already exists",
      };
    }

    throw new Error(err)

    return {
      success: false,
      error: "Failed to update post",
    };
  }
}