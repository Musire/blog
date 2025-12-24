import ListDisplay from "@/components/home/ListDisplay";
import { Navbar } from "@/components/UI";
import { connectDB } from "@/lib/db";
import { serializeValue, unslugify } from "@/lib/utils";
import Category from "@/models/Category";
import Post from "@/models/Post";

type PageProps = {
    params: {
        categorySlug: string;
        slug: string;
    };
};

export default async function CategoryPage ({ params }: PageProps) {
    const { categorySlug } = await params;
    await connectDB()

    const doc = await Category.findOne({ slug: categorySlug })
    const categoryId = doc?._id.toString()
    
    const posts = await Post
        .find({ category: categoryId })
        .populate('category', 'slug')
        .select('title description author slug createdAt')
        .lean()

    const cleanPosts = serializeValue(posts)


    return (
        <main className=" page-layout">
            <div className="display-layout space-y-6">
                <Navbar />
                <h2 className="text-whitesmoke mt-20 text-3xl uppercase w-full text-center">{doc?.title}</h2>
                <ListDisplay items={cleanPosts} />
            </div>
        </main>
    );
}