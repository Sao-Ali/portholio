import { TerminalReader } from "@/components/terminal-reader";
import { getProjects } from "@/lib/content/portfolio";

export default function ProjectsPage() {
    const projects = getProjects();

    return (
        <TerminalReader command="vi projects">
            <h1 className="sr-only">Ali Sao Projects</h1>
            <div className="terminal-output-block mt-4">
                {projects.map((project) => (
                    <a
                        key={project.title}
                        href={`/projects/${project.slug}`}
                        className="terminal-list-item block no-underline"
                    >
                        <p><span className="terminal-accent">{project.slug}.md</span></p>
                        <p>{project.title}</p>
                        <p className="terminal-muted">{project.desc}</p>
                        <p className="terminal-dim">{project.stack.join(" / ")}</p>
                    </a>
                ))}
            </div>
            <p className="terminal-muted mt-6">From home: cd projects, ls, vi &lt;file&gt;.</p>
        </TerminalReader>
    );
}
