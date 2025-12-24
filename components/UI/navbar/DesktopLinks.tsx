'use client';

import { slugify } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DesktopLinks ({ links }: { links: string[] }) {
    const [linkDrawer, setLinkDrawer] = useState<boolean>(false);

    const toggleLinkDrawer = () => setLinkDrawer(prev => !prev)

    return (
    <ul className="ml-12 flex space-x-4 xs:max-md:hidden">
        <li className="">
            <Link 
                href="/about" 
                className="text-whitesmoke/60 hover:text-whitesmoke"
            >
                About
            </Link>
        </li>
        <li className="relative">
            <button 
                className="text-whitesmoke/60 hover:text-whitesmoke hover:cursor-pointer flex items-center space-x-2 w-40" 
                type="button"
                onClick={toggleLinkDrawer}
            >
                <span className="">Categories</span>
                <ChevronDown className={` transition-transform duration-300 ${linkDrawer ? "rotate-180 " : ""}`} />
            </button>
            {linkDrawer && (
                <ul className="flex flex-col space-y-4 capitalize absolute  top-12  normal-space bg-deep border border-white/37 rounded-lg">
                    { links?.map(l => <Link key={l} href={`/blog/${slugify(l)}`} className=" w-40 opacity-87 hover:opacity-100" >{l}</Link>)}
                </ul>
            )}
        </li>
    </ul>
  );
}