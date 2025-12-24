import PostCreationForm from "@/components/admin/PostCreationForm";
import BackButton from "@/components/UI/buttons/BackButton";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export default async function PostCreation () {
  await connectDB();

  const categories = (await Category.find()
    .select("_id title")
    .sort({ title: 1 })
    .lean()
  ).map(cat => ({
    _id: cat._id.toString(),
    title: cat.title,
  }));

  const data = {
      title: '',
      description: '',
      content: '',
      category: '',
      featured: false
  }


  return (
    <main className="page-layout">
        <div className="display-layout pt-6 items-center">
            <span className="spaced my-10  w-full">
              <BackButton />
              <h1 className=" text-2xl">Post Creation Form</h1>
            </span>
            <PostCreationForm categories={categories} data={data} />
        </div>
    </main>
  );
}