import TextCard from "@/components/about/TextCard";
import { Navbar } from "@/components/UI";
import { aboutText } from "@/content/about/text";

export default function AboutPage () {

  return (
    <main className="page-layout">
      <div className="display-layout">
        <Navbar />
        <div className="mt-20 flex flex-col items-center">
          <h1 className="text-5xl mb-16">ABOUT</h1>
          <ul className="flex-col flex divide-y divide-whitesmoke/37">
            {aboutText?.map(c => (
              <TextCard key={c.title} data={c} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}