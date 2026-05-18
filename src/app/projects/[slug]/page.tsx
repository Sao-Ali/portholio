import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TerminalReader } from "@/components/terminal-reader";
import { projects } from "@/lib/portfolio-data";

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Ali Sao`,
    description: project.desc,
  };
}

export default async function ProjectFilePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return notFound();

  return (
    <TerminalReader command={`vi ${project.slug}.md`} cwd="projects">
      <h1 className="mt-8 text-2xl font-semibold tracking-tighter">{project.title}</h1>
      <div className="terminal-output-block mt-6">
        <p className="terminal-muted">{project.desc}</p>
        <p>
          <span className="terminal-accent">stack</span>
          <span className="terminal-muted">: {project.stack.join(" / ")}</span>
        </p>
        <p>
          <span className="terminal-accent">url</span>
          <span className="terminal-muted">: </span>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.url}
          </a>
        </p>
      </div>
    </TerminalReader>
  );
}
