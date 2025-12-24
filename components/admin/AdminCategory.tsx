'use client';

import { deleteCategories } from "@/app/actions/category.actions";
import { useAdmin } from "@/app/hooks";
import ContinueButton from "@/components/admin/ContinueButton";
import DeleteModal from "@/components/admin/DeleteModal";
import { useRouter } from "next/navigation";
import CardDisplay from "./CardDisplay";
import { AdminHeader } from "./AdminHeader";
import { createExcerpt } from "@/lib/utils";

export interface CategoryType {
  _id: string;
  title: string;
  description: string;
  postCount: number
}

export default function AdminCategory({ categories }: { categories: CategoryType[] }) {
  const { 
    mode, 
    selected,
    setSelected,
    modalOpen, 
    changeMode, 
    handleSelect, 
    setModal } = useAdmin()

  const router = useRouter()

  const handleDeletion = () => {
      setSelected([])
      setModal(false)
      deleteCategories(selected)
      router.refresh()
  }
  

  return (
    <main className="page-layout ">
        <div className="display-layout space-y-6 pt-6 relative">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Only you can see this page. Add your CRUD tools here.</p>
        <AdminHeader 
            mode={mode}
            onModeChange={changeMode}
            resourceBasePath="/admin/category"
        />
        <CardDisplay
            items={categories}
            mode={mode}
            selected={selected}
            getId={(category) => category._id}
            onSelect={handleSelect}
            renderItem={(category) => (
                <article className="w-full rounded-xl h-full px-3 py-2 flex flex-col space-y-2 relative">
                  <p className="text-2xl capitalize">{category.title}</p>
                  <p className="text-sm" >{createExcerpt(category.description, 60)}</p>
                  <p className="self-end mt-auto text-alternate rounded-full centered ">{`posts ${category.postCount}`}</p>
                </article>
            )}
        />
        <ContinueButton 
            mode={mode} 
            hasSelection={selected.length > 0}
            onDelete={() => setModal(true)}
            selected={selected}
            base='category'
        />
        <DeleteModal 
            modalOpen={modalOpen}
            setModal={setModal}
            handleDeletion={handleDeletion} 
        />
        </div>
    </main>
  );
}


