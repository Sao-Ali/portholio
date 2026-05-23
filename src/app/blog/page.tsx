import Link from "next/link";
import { TerminalReader } from "@/components/terminal-reader";
import { formatDate, getSortedBlogPosts } from "@/lib/content/posts";

export const metadata = {
    title: "Ali Sao Blog",
    description: "Terminal-indexed writing about software, hardware, and projects.",
};

export default function BlogIndexPage() {
    const posts = getSortedBlogPosts();

    return (
        <TerminalReader command="vi blog">
            <h1 className="sr-only">Ali Sao Blog</h1>
            <div className="terminal-output-block mt-4">
                {posts.map((post, index) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="terminal-list-item block no-underline">
                        <p><span className="terminal-accent">{post.slug}.mdx</span></p>
                        <p>{index + 1}. {post.metadata.title}</p>
                        <p className="terminal-muted">{formatDate(post.metadata.publishedAt)} - {post.metadata.summary}</p>
                    </Link>
                ))}
            </div>
            <p className="terminal-muted mt-6">From home: cd blog, ls, vi &lt;file&gt;.</p>
        </TerminalReader>
    );
}
