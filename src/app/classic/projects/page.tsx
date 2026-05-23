import { ClassicNav } from "@/components/classic-nav";
import Footer from "@/components/footer";
import { getProjects } from "@/lib/content/portfolio";

export const metadata = {
  title: "Classic Projects | Ali Sao",
  description: "Selected projects by Ali Sao.",
};

export default function ClassicProjectsPage() {
  const projects = getProjects();

  return (
    <main className="classic-shell">
      <div className="classic-container">
        <ClassicNav />

        <section>
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            Projects
          </h1>

          <div className="space-y-8">
            {projects.map(project => (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <h2 className="text-lg font-medium tracking-tight group-hover:underline">
                  {project.title}
                </h2>
                <p className="mt-2 text-neutral-300">{project.desc}</p>
                <p className="mt-2 text-sm text-neutral-500">
                  {project.stack.join(" / ")}
                </p>
                {project.highlights?.length ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-400">
                    {project.highlights.map(highlight => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
              </a>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
