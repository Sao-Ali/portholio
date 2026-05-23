import type { Metadata as NextMetadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { TerminalReader } from "@/components/terminal-reader";
import { baseUrl } from "@/app/sitemap";
import { formatDate, getBlogPostBySlug, getBlogPosts } from "@/lib/content/posts";


export function generateStaticParams() {
    return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<NextMetadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return {};

    const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
    const og = image?.startsWith("http")
        ? image
        : `${baseUrl}${image ? (image.startsWith("/") ? "" : "/") + image : ""}` || `${baseUrl}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime,
            url: `${baseUrl}/blog/${slug}`,
            images: [{ url: og }],
        },
        twitter: { card: "summary_large_image", title, description, images: [og] },
    };
}

export default async function BlogPostPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return notFound();

    const ogForSchema =
        post.metadata.image?.startsWith("http")
            ? post.metadata.image
            : `${baseUrl}${post.metadata.image ? (post.metadata.image.startsWith("/") ? "" : "/") + post.metadata.image : ""}` ||
            `${baseUrl}/og?title=${encodeURIComponent(post.metadata.title)}`;

    return (
        <TerminalReader command={`vi ${slug}.mdx`} cwd="blog">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image: ogForSchema,
                        url: `${baseUrl}/blog/${slug}`,
                        author: { "@type": "Person", name: "Ali Sao" },
                    }),
                }}
            />
            <h1 className="mt-8 text-2xl font-semibold tracking-tighter">{post.metadata.title}</h1>
            <div className="mt-2 mb-8 text-sm">
                <p className="terminal-muted">
                {formatDate(post.metadata.publishedAt)}
                </p>
            </div>
            <article className="prose dark:prose-invert max-w-none prose-h1:mb-6 prose-h2:mt-10 prose-h2:mb-4 prose-p:mb-5 prose-li:mb-2 leading-relaxed">
                <CustomMDX source={post.content} />
            </article>
        </TerminalReader>
    );
}
