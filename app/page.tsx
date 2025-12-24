import { FeaturedPost, Heading, LatestPosts } from "@/components/home";
import { Navbar } from "@/components/UI";
import { connectDB } from "@/lib/db";
import { serializeValue } from "@/lib/utils";
import Post from "@/models/Post";

export default async function Home() {

  await connectDB();

  const [featuredPost, recentPosts] = await Promise.all([
    Post.findOne({ featured: true })
      .populate('category', 'slug')
      .lean(),

    Post.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('category', 'slug')
      .lean(),
  ]);

  return (
    <main className="centered min-h-screen bg-darker ">
      <div className="bg-deeper min-h-screen border-black/40 capitalize border-2  xs:w-screen  md:w-[85dvw] lg:w-[70dvw] px-6 text-whitesmoke pb-12 relative">
        <Navbar />
        <Heading />
        <div className="grid xs:grid-cols-1 md:grid-cols-[60%_1fr] gap-6">
          <FeaturedPost post={serializeValue(featuredPost)} />
          <LatestPosts posts={recentPosts} />
        </div>
      </div>
    </main>
  );
}
