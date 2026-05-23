import { NextResponse } from "next/server";
import { getProjectBySlug, getProjects } from "@/lib/content/portfolio";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getProjects().map(project => ({ slug: project.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json({ project });
}
