'use client';

import { slugify } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu ({ links }: { links: string[] }) {

    const [open, setOpen] = useState<boolean>(false);
    const toggleDrawer = () => setOpen(prev => !prev)

    return (
    <>
        { open && (
            <aside className="text-whitesmoke bg-deeper p-4 h-[calc(100dvh)] fixed top-16 left-0 xs:w-screen z-40 md:hidden flex flex-col items-center">
                <p className="text-xl mb-12 mt-20 -ml-6 w-40 text-left  font-semibold">Categories</p>
                <ul className="flex flex-col space-y-4  ml-6">
                    { links?.map(l => <Link key={l} href={`/blog/${slugify(l)}`} className=" capitalize w-40 opacity-87 hover:opacity-100" >{l}</Link>)}
                </ul>
                <Link href="/about" className="text-xl mb-12 mt-20 -ml-6 w-40 text-left  font-semibold" >About</Link>
            </aside>
        )}
        <button 
            className="  md:hidden"
            onClick={toggleDrawer}
        >
            {open ? <X size={35} /> : <Menu size={35} />}
        </button>
    </>
  );
}