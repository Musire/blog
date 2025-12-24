import PostCreationForm from "@/components/admin/PostCreationForm";
import BackButton from "@/components/UI/buttons/BackButton";
import { connectDB } from "@/lib/db";
import { serializeValue } from "@/lib/utils";
import Category from "@/models/Category";
import Post from "@/models/Post";

type PageProps = {
    params: {
    id: string;
    };
};

export default async function PostEdit ({ params }: PageProps) {
  const { id } = await params;

  await connectDB()
  const post = await Post
    .findById(id)
    .populate("category")
    .lean()

  const update = {...serializeValue(post)}
  update.category = post.category.title


  const categories = await Category.find()
      .select("_id title")
      .sort({ title: 1 })
      .lean()


  return (
    <main className="page-layout">
        <div className="display-layout pt-6 items-center">
            <span className="spaced my-10  w-full">
              <BackButton />
              <h1 className=" text-2xl">Edit Post </h1>
            </span>
            <PostCreationForm
              isUpdate
              categories={serializeValue(categories)} 
              data={update} />
        </div>
    </main>
  );
}