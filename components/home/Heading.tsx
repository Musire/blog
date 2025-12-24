export default function Heading() {
    return ( 
        <div className="text-whitesmoke flex xs:flex-col md:flex-row md:items-center justify-between xs:max-md:mt-20 md:mt-10 py-10 w-full">
          <h1 className="text-6xl font-poppins  my-4">Blog</h1>
          <span className="flex flex-col lg:max-w-96 xs:w-full">
            <h2 className="text-alternate">Inspiration meets innovation</h2>
            <h3 className="opacity-87 font-semibold z-10">The Company Blog</h3>
            <article className="px-6 py-3 rounded-lg border border-white/37 grid grid-rows-2 grid-cols-[5rem_1fr] place-content-cente mt-6">
              <div className="bg-dark rounded-full size-14 row-span-2"/>
              <p className="self-end">Juan Marrufo</p>
              <p className=" self-start text-sm text-alternate">Content Writer</p>
            </article>
          </span>
        </div>
     );
}
 
