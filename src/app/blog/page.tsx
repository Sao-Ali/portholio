import { BlogPostList } from "@/components/blog-post-list";
import BackButton from "@/components/back-button";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: "Blog | Ali Sao",
  description: "Writing by Ali Sao about software, hardware, and projects.",
};

export default function BlogIndexPage() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
      <section>
        <SiteHeader />
        <BackButton />
        <section>
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            blog
          </h1>
          <BlogPostList />
        </section>
      </section>
    </main>
  );
}
