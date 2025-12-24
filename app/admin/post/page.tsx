
import AdminPost from "@/components/admin/AdminPost";
import { connectDB } from "@/lib/db";
import { serializeValue } from "@/lib/utils";
import Post from "@/models/Post";

export default async function Page() {
  await connectDB()
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .lean();

  const serializedPosts = posts.map(p => serializeValue(p) )

  return <AdminPost posts={serializedPosts} />
}
