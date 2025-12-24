import Post, { PostData } from "./Post";

export default function ListDisplay({ items }: { items: PostData[] }) {

  if (items.length === 0) {
    return (
      <ul className="w-full flex-1 grid place-items-center">
        <li>
          <p className="opacity-60">No items found</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className="w-full flex-1 grid xs:grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll scrollbar-none max-h-[80dvh] p-3 ">
      {items?.map(i => {
        return (
            <Post
                key={i._id} 
                data={i}
            />
        )
      })}
    </ul>
  );
}
