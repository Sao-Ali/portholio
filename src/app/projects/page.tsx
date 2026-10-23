import Image from "next/image";
import BackButton from "@/components/back-button";
import HyperLink from "@/components/hyperlink";
import SiteHeader from "@/components/site-header";
import { projects, type Project } from "@/lib/portfolio-data";

export const metadata = {
  title: "Projects | Ali Sao",
  description: "Selected projects by Ali Sao.",
};

const projectDetails: Record<string, { category: string; impact: string }> = {
  vetch: {
    category: "AI INFRASTRUCTURE",
    impact:
      "I build the Kubernetes and KubeVirt provisioning layer. The proposal maps out CPU-backed inference on AWS, then whole-request routing to a Qualcomm-based edge device, with latency and resource use measured across both.",
  },
  "haskell-dataframe": {
    category: "DATA INFRASTRUCTURE",
    impact:
      "A typed Haskell library exploring safer parsing, shaping, and processing of tabular data.",
  },
  "sana-aligner": {
    category: "RESEARCH SOFTWARE",
    impact:
      "The Hayes Lab website brings network alignment tools and research resources together for more than 200 researchers nationwide, making methods such as SANA easier to find and use.",
  },
  "room-booking": {
    category: "CAMPUS TOOLS",
    impact:
      "Used by the engineering student body, this booking app helps more than 500 users check room availability and reserve shared space without back-and-forth coordination.",
  },
};

function ProjectEntry({ project }: { project: Project }) {
  const detail = projectDetails[project.slug];
  const isAnimated = project.image.endsWith(".gif");

  return (
    <article id={project.slug} className="scroll-mt-8 border-b border-neutral-200 py-8">
      <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:gap-7">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-[16/10] overflow-hidden rounded-md border border-neutral-200 bg-green-faded-xl sm:aspect-[4/3]"
          aria-label={`View ${project.title}`}
        >
          <Image
            src={project.image}
            fill
            sizes="(max-width: 640px) 100vw, 180px"
            unoptimized={isAnimated}
            alt={`${project.title} preview`}
            className={isAnimated ? "object-contain p-3" : "object-cover"}
          />
        </a>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray">
            {detail.category}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-950">
            {project.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            {detail.impact}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray">
            {project.stack.map(item => <span key={item}>{item}</span>)}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <HyperLink href={project.url}>View project</HyperLink>
            {project.slug === "vetch" && (
              <HyperLink href="/projects/Vetch-Update.pdf">
                Open proposal PDF
              </HyperLink>
            )}
          </div>
        </div>
      </div>

      {project.slug === "vetch" && (
        <details className="mt-5 rounded-md border border-neutral-200 bg-off-white">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-neutral-800">
            Read the Vetch proposal here
          </summary>
          <div className="border-t border-neutral-200 p-3">
            <iframe
              src="/projects/Vetch-Update.pdf#view=FitH"
              title="Vetch senior design proposal PDF"
              loading="lazy"
              className="h-[520px] w-full rounded-sm bg-white sm:h-[680px]"
            />
            <p className="mt-2 text-xs text-gray">
              If the preview does not load, <HyperLink href="/projects/Vetch-Update.pdf">open the PDF</HyperLink>.
            </p>
          </div>
        </details>
      )}
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto mt-8 max-w-3xl px-6 pb-16">
      <SiteHeader />
      <BackButton />
      <h1 className="title mt-10 text-3xl font-semibold tracking-tight">
        selected projects
      </h1>
      <p className="mt-2 text-neutral-700">
        Infrastructure, research tools, and practical software for people who use them.
      </p>
      <div className="mt-8 border-t border-neutral-200">
        {projects.map(project => <ProjectEntry key={project.slug} project={project} />)}
      </div>
    </main>
  );
}
