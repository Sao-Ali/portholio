import Link from "next/link";
import { formatDate, getBlogPosts } from "@/app/blog/utils";

export function ClassicBlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
        )
        .map(post => (
          <Link
            key={post.slug}
            href={`/classic/blog/${post.slug}`}
            className="flex flex-col space-y-1 mb-4 group"
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-400 md:w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-neutral-100 tracking-tight group-hover:underline">
                {post.metadata.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
