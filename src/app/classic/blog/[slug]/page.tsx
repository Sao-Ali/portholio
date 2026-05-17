import type { Metadata as NextMetadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { ClassicNav } from "@/components/classic-nav";
import Footer from "@/components/footer";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { baseUrl } from "@/app/sitemap";

export function generateStaticParams() {
  return getBlogPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextMetadata> {
  const { slug } = await params;
  const post = getBlogPosts().find(item => item.slug === slug);
  if (!post) return {};

  return {
    title: `${post.metadata.title} | Ali Sao`,
    description: post.metadata.summary,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      url: `${baseUrl}/classic/blog/${slug}`,
    },
  };
}

export default async function ClassicBlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPosts().find(item => item.slug === slug);
  if (!post) return notFound();

  return (
    <main className="classic-shell">
      <div className="classic-container">
        <ClassicNav />

        <article>
          <h1 className="text-2xl font-semibold tracking-tighter">
            {post.metadata.title}
          </h1>
          <p className="mt-2 mb-8 text-sm text-neutral-400">
            {formatDate(post.metadata.publishedAt)}
          </p>
          <div className="prose dark:prose-invert max-w-none prose-h1:mb-6 prose-h2:mt-10 prose-h2:mb-4 prose-p:mb-5 prose-li:mb-2 leading-relaxed">
            <CustomMDX source={post.content} />
          </div>
        </article>

        <Footer />
      </div>
    </main>
  );
}
