import CategoryCreationForm from "@/components/admin/CategoryCreationForm";
import BackButton from "@/components/UI/buttons/BackButton";

export default function PostCreation () {
  return (
    <main className="page-layout">
        <div className="display-layout pt-6 items-center">
            <span className="spaced my-10  w-full">
              <BackButton />
              <h1 className=" text-2xl">Category Creation Form</h1>
            </span>
            <CategoryCreationForm data={{ title: '', description: '' }} />
        </div>
    </main>
  );
}