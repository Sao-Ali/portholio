import { ClassicBlogPosts } from "@/components/classic-posts";
import { ClassicNav } from "@/components/classic-nav";
import Footer from "@/components/footer";

export const metadata = {
  title: "Classic Blog | Ali Sao",
  description: "Writing by Ali Sao about software, hardware, and projects.",
};

export default function ClassicBlogPage() {
  return (
    <main className="classic-shell">
      <div className="classic-container">
        <ClassicNav />

        <section>
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            Blog
          </h1>
          <ClassicBlogPosts />
        </section>

        <Footer />
      </div>
    </main>
  );
}
