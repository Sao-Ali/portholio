import { NextResponse } from "next/server";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getBlogPosts().map(post => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }

  return NextResponse.json({ post });
}
