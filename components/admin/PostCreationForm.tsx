'use client';

import { Form, Input } from "@/components/UI/forms";
import DropdownButton from "../UI/buttons/DropdownButton";
import ControlledInput from "../UI/forms/ControlledInput";
import { createPost, updatePost } from "@/app/actions/post.actions";
import { CreatePostInput, PostSchema } from "@/validators/post.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormCheckbox } from "../UI/forms/CheckBox";

type CategoryType = {
    _id: string,
    title: string
}


type PostCreationFormProps = {
  categories: CategoryType[];
  data: CreatePostInput ;
  isUpdate?: boolean;
};

export default function PostCreationForm ({ categories, data, isUpdate=false }: PostCreationFormProps) {
    const [error, setError] = useState  <string | null | undefined >(null)
    const router = useRouter()

    const handleSubmit = async (formData: CreatePostInput ) => {
        console.log(formData)

        setError(null)

        const category = categories.find(
            c => c.title === formData.category
        );

        if (!category) {
            setError('Invalid category');
            return;
        }

        const payload = {
            ...formData,
            category: category._id,
        };

        if (isUpdate && !data?._id) {
            throw new Error("Update mode requires an id");
        }

        const result = isUpdate
            ? await updatePost({ ...payload, id: data?._id })
            : await createPost(payload);


        if (!result.success) {
            setError(result.error)
            return;
        }

        router.push("/admin/post");
    }


    return (
    
    <>
        <Form 
            initialValues={data}
            schema={PostSchema}
            onSubmit={handleSubmit}
            error={error}
        >
            <ControlledInput 
                name="category"
                label="category"
            >
                {(field) => (
                    <DropdownButton
                        {...field}
                        options={categories?.map(c => c.title)}
                    />
                )}
            </ControlledInput>
            <Input 
                label="title"
                name='title'
            />
            <Input 
                label="description"
                name='description'
                type='text-area'
            />
            <Input 
                label="content"
                name='content'
                type='text-area'
            />
            <FormCheckbox 
                label='featured post'
                name='featured'
            />
        </Form>
        {error && (
            <p className="text-error-dark">{error}</p>
        )}
    </>
    );
}