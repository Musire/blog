import Post, { PostData } from "./Post";

export default function LatestPosts({ posts }: { posts: PostData[]}) {

    return ( 
        <div className="">
            <h2 className="mb-6 text-4xl font-semibold xs:max-md:mt-12 pb-2 border-b-2 border-white/37">Latest</h2>
            <ul className="md:min-h-[90%] h-fit space-y-12 flex flex-col justify-end ">
                {posts?.map(p => {
                    return <Post key={p._id} data={p} />
                })}
            </ul>
        </div>
     );
}
 