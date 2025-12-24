import { formatMonthYear } from "@/lib/utils";
import Link from "next/link";

export type PostData = {
  _id: string;
  title: string;
  description: string;
  author: string;
  slug: string;
  createdAt: string;
  category: {
    _id: string;
    slug: string;
  }
};

export default function Post({ data }: { data: PostData}) {
    const { title, description, author, slug, createdAt, category } = data;
    return ( 
        <article className="flex space-y-6 flex-col bg-darkest rounded-xl px-6 py-4 justify-between h-48">
            <Link 
              href={`/blog/${category.slug}/${slug}`} 
              className="text-xl capitalize "
            >
              {title}
            </Link>
            <p className="text-whitesmoke/87 line-clamp-2 h-12">{description}</p>
            <span className="flex items-center space-x-2">
                <p className="opacity-60">{`by ${author}`}</p>
                <p className="text-alternate">•</p>
                <p className="text-alternate">{formatMonthYear(createdAt)}</p>
            </span>
        </article>
     );
}
 
