import { NextResponse } from "next/server";
import { getBlogPostSummaries } from "@/lib/content/posts";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json({ posts: getBlogPostSummaries() });
}
