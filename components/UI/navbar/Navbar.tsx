
import Link from "next/link";
import DesktopLinks from "./DesktopLinks";
import MobileMenu from "./MobileMenu";
import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

export default async function Navbar() {
    await connectDB()

    const categories = await Category.find().select('title').lean()
    const links = categories?.map(c => c.title)

    return ( 
        <nav className=" h-16 flex space-x-4 items-center fixed bg-deeper z-50 top-0 xs:left-6 xs:w-[calc(100dvw-3rem)] md:left-20 lg:left-[15dvw]  md:w-[80dvw] lg:w-[69dvw] lg:pl-6 justify-between border-b border-white/37">
            <Link href="/" className="text-3xl font-poppins">JUAN. </Link>
            <DesktopLinks links={links} />
            <MobileMenu links={links} />
        </nav>
     );
}
 
