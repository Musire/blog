
type DataType = {
    title: string;
    content: string[]
}

export default function TextCard ({ data }: { data: DataType }) {
    const { title, content } = data
    return (
        <article className="flex flex-col space-y-4 w-full py-6 text-center text-balance">
            <h2 className="text-3xl capitalize">{title}</h2>
            {content.map((paragraph, index) => (
                <p key={`${title}-${index}`} className="">{paragraph}</p>
            ))}
        </article>
  );
}