import { redirect } from "next/navigation";
import { projects } from "@/lib/portfolio-data";

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export default async function ProjectRedirectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  redirect(`/projects#${slug}`);
}
