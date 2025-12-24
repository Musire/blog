import Post from "@/models/Post";
import BlogContent from "@/components/home/BlogContent";
import { Navbar } from "@/components/UI";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

interface BlogPostPageProps {
  params: { 
    categorySlug: string,
    slug: string 
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await connectDB();
  const { categorySlug, slug } = await params

  const doc = await Category.findOne({ slug: categorySlug })
  const categoryId = doc?._id.toString()

  const post = await Post.findOne({ slug, category: categoryId }).lean();

  if (!post) {
    return (
      <main className="page-layout">
        <div className="display-layout justify-center">
          <p className="h-full w-full centered text-2xl">Post not found</p>
        </div>
      </main>
    )
  }

  // Pass content and other props to a reusable component
  return (
    <main className="page-layout">
      <div className="display-layout">
        <Navbar />
        <BlogContent content={post.content} title={post.title} />
      </div>
    </main>
  );
}
