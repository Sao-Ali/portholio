import { BlogPosts } from "@/components/posts";

export const metadata = {
    title: "Blog",
    description: "Read my latest blog posts about software, hardware, and projects.",
};

export default function BlogIndexPage() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">My Blog</h1>
            <BlogPosts />
        </section>
    );
}
