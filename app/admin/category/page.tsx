
import AdminCategory from "@/components/admin/AdminCategory";
import { connectDB } from "@/lib/db";
import { serializeValue } from "@/lib/utils";
import Category from "@/models/Category";

export default async function Page() {
  await connectDB()
  const categories = await Category.find()
    .populate('postCount')
    .sort({ createdAt: -1 })
    .select('title description postCount')
    .lean({ virtuals: true });


  const serializedCategories = categories.map(c => serializeValue(c) )

  return <AdminCategory categories={serializedCategories} />
}
