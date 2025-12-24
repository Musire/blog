'use client';

import { deletePosts } from "@/app/actions/post.actions";
import { useAdmin } from "@/app/hooks";
import ContinueButton from "@/components/admin/ContinueButton";
import DeleteModal from "@/components/admin/DeleteModal";
import { formatMonthYear } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CardDisplay from "./CardDisplay";
import { AdminHeader } from "./AdminHeader";

export interface PostType {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
}

export default function AdminPost({ posts }: { posts: PostType[] }) {
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
      deletePosts(selected)
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
            resourceBasePath="/admin/post"
        />
        <CardDisplay
            items={posts}
            mode={mode}
            selected={selected}
            getId={(post) => post._id}
            onSelect={handleSelect}
            renderItem={(post) => (
                <article className="w-full rounded-xl h-full  px-3 py-2 flex flex-col justify-between z-30">
                    <p className="text-2xl capitalize">{post.title}</p>
                    <span className="flex items-center space-x-2">
                        <p className="opacity-60">{`by ${post.author}`}</p>
                        <p className="text-alternate">•</p>
                        <p className="text-alternate">
                        {formatMonthYear(post.createdAt)}
                        </p>
                    </span>
                </article>
            )}
        />
        <ContinueButton 
            mode={mode} 
            hasSelection={selected.length > 0}
            onDelete={() => setModal(true)}
            selected={selected}
            base="post"
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


