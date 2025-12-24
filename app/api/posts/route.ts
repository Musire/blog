import { NextResponse } from "next/server";
import Post from "@/models/Post";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}
