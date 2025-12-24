
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogContentProps {
  content: string;
  title?: string;
}

export default function BlogContent({ content, title }: BlogContentProps) {
  return (
    <article className=" prose prose-slate dark:prose-invert mx-auto py-10 centered-col w-full text-balance text-center">
      {title && <h1 className="capitalize mt-20" >{title}</h1>}
      <MDXRemote source={content} />
    </article>
  );
}
