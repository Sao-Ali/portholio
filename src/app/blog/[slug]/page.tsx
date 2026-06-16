import type { Metadata as NextMetadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import BackButton from "@/components/back-button";
import SiteHeader from "@/components/site-header";
import { formatDate, getBlogPosts } from "@/app/blog/utils";
import { baseUrl } from "@/app/sitemap";

function getPostImageUrl(title: string, image?: string) {
    if (!image) return `${baseUrl}/og?title=${encodeURIComponent(title)}`;
    return image.startsWith("http")
        ? image
        : `${baseUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}

export function generateStaticParams() {
    return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<NextMetadata> {
    const { slug } = await params;
    const post = getBlogPosts().find((p) => p.slug === slug);
    if (!post) return {};

    const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
    const og = getPostImageUrl(title, image);

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
    const post = getBlogPosts().find((p) => p.slug === slug);
    if (!post) return notFound();

    const ogForSchema = getPostImageUrl(post.metadata.title, post.metadata.image);

    return (
        <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
          <section>
            <SiteHeader />
            <BackButton />
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
            <article>
              <h1 className="text-2xl font-semibold tracking-tighter">
                {post.metadata.title}
              </h1>
              <p className="mt-2 mb-8 text-sm text-gray">
                {formatDate(post.metadata.publishedAt)}
              </p>
              <div className="prose max-w-none prose-h1:mb-6 prose-h2:mt-10 prose-h2:mb-4 prose-p:mb-5 prose-li:mb-2 leading-relaxed">
                <CustomMDX source={post.content} />
              </div>
            </article>
          </section>
        </main>
    );
}
