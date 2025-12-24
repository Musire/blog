import CategoryCreationForm from "@/components/admin/CategoryCreationForm";
import BackButton from "@/components/UI/buttons/BackButton";
import { connectDB } from "@/lib/db";
import { serializeValue } from "@/lib/utils";
import Category from "@/models/Category";

type PageProps = {
    params: {
        id: string;
    };
};

export default async function CategoryEdit ({ params }: PageProps) {
  const { id } = await params;

  await connectDB()
  const category = await Category
    .findById(id)
    .select(' title description')
    .lean()


  return (
    <main className="page-layout">
        <div className="display-layout pt-6 items-center">
            <span className="spaced my-10  w-full">
              <BackButton />
              <h1 className=" text-2xl">Edit Category </h1>
            </span>
            <CategoryCreationForm
              isUpdate
              data={serializeValue(category)} 
            />
        </div>
    </main>
  );
}