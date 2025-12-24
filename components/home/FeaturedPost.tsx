import { formatMonthYear } from "@/lib/utils";
import Link from "next/link";

type PostInputType = {
    _id: string;
    title: string;
    description: string;
    slug: string;
    author: string;
    createdAt: string;
    image?: string;
    category: {
        _id: string;
        slug: string;
    }
}

export default function FeaturedPost({ post } : { post : PostInputType }) {

    const { title, description, slug, author, createdAt, category } = post

    return ( 
        <article className="text-whitesmoke flex flex-col space-y-6">
            <div className="bg-whitesmoke w-full xs:h-60 md:h-96 rounded-xl"></div>
            <Link href={`/blog/${category.slug}/${slug}`} className="text-3xl" >{title}</Link>
            <p className="opacity-87">{description}</p>
            <div className="flex items-center space-x-2">
                <p className="opacity-60">{`by ${author}`}</p>
                <p className="text-alternate">•</p>
                <p className="text-alternate">{formatMonthYear(createdAt)}</p>
            </div>
        </article>
     );
}
 