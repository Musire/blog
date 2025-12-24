'use client';

import { Form, Input } from "@/components/UI";
import { CategorySchema, CreateCategoryInput } from "@/validators/category.schema";
import { createCategory, updateCategory } from "@/app/actions/category.actions";
import { useState } from "react";
import { useRouter } from "next/navigation";


type CategoryCreationFormProps = {
  data: CreateCategoryInput ;
  isUpdate?: boolean;
};

export default function CategoryCreationForm ({ data, isUpdate=false }: CategoryCreationFormProps) {

    const [error, setError] = useState<string | null | undefined >(null)
    const router = useRouter()
    

    const handleSubmit = async (formData: CreateCategoryInput ) => {
        console.log(formData)

        setError(null)

        if (isUpdate && !data?._id) {
            throw new Error("Update mode requires an id");
        }
        
        const result = isUpdate
            ? await updateCategory({ ...formData, id: data?._id })
            : await createCategory(formData);

        if (!result.success) {
            setError(result.error)
            return;
        }

        router.push("/admin/category");
    }

    return (
    <>
        <Form 
            initialValues={data}
            schema={CategorySchema}
            onSubmit={handleSubmit}
            error={error}
            >
            <Input 
                label="title"
                name='title'
                />
            <Input 
                label="description"
                name='description'
                type='text-area'
                />

        </Form>
        {error && (
            <p className="text-error-dark">{error}</p>
        )}
    </>
    );
}