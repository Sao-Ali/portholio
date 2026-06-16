import Image from "next/image";
import BackButton from "@/components/back-button";
import HyperLink from "@/components/hyperlink";
import SiteHeader from "@/components/site-header";
import { projects, type Project } from "@/lib/portfolio-data";

export const metadata = {
  title: "Projects | Ali Sao",
  description: "Selected projects by Ali Sao.",
};

type ProjectContribution = {
  category: string;
  headline: string[];
  summary: string;
  description: string;
  visualMode?: "cover" | "contain";
};

const contributionDetails: Record<string, ProjectContribution> = {
  "sockets-and-pipes": {
    category: "HASKELL SYSTEMS",
    headline: ["BUILDING AN HTTP", "SERVER FROM", "SCRATCH IN HASKELL."],
    summary:
      "Sockets and Pipes is my walk through a Joy of Haskell book project that builds a web server from scratch in Haskell.",
    description:
      "The project uses HTTP as the path into systems programming: sockets, Unix I/O, request and response semantics, and pieces of RFC 9110 and RFC 9112. Instead of hiding the protocol behind a framework, I am implementing the lower layers directly to understand what web servers actually do.",
    visualMode: "contain",
  },
  "haskell-1m-request": {
    category: "HASKELL BACKEND",
    headline: ["HANDLING 1 MILLION", "REQUESTS WITH", "HASKELL SERVANT."],
    summary:
      "Haskell 1M Request is my Haskell version of the Handling 1 Million Requests project, rebuilt around Servant instead of the Node.js examples.",
    description:
      "The project connects a Haskell API to Postgres and Redis, then explores how the service behaves when deployed and tuned on AWS EC2. It is focused on understanding the backend pieces behind high-throughput request handling: app runtime, database access, cache behavior, deployment environment, and server design.",
    visualMode: "contain",
  },
  "haskell-dataframe": {
    category: "DATA INFRASTRUCTURE",
    headline: ["DESIGNING TYPED", "DATAFRAME WORKFLOWS", "IN HASKELL."],
    summary:
      "Haskell DataFrame is a typed data-processing library experiment for parsing, shaping, and working with tabular data safely.",
    description:
      "The project explores schema design, API ergonomics, parsing, and type-level guarantees. It turns messy data workflows into a smaller, more reliable Haskell interface.",
    visualMode: "contain",
  },
  "hft-system": {
    category: "TRADING SYSTEMS",
    headline: ["BUILDING REAL-TIME", "TRADING INTERFACES", "FOR HFT WORKFLOWS."],
    summary:
      "HFT-System is a real-time trading platform prototype connecting market data, order entry, fills, and FPGA-driven workflows.",
    description:
      "I focused on frontend structure, websocket data paths, and dense UI states that make fast-changing trading information readable during rapid system events.",
  },
  "sana-aligner": {
    category: "RESEARCH SOFTWARE",
    headline: ["ALIGNING NETWORKS", "WITH SANA GRAPH", "ALGORITHMS."],
    summary:
      "SANA is a research software project for aligning graph-like structures and comparing complex network representations.",
    description:
      "The work centers on understanding algorithms, navigating a larger C++ codebase, and contributing to tooling that supports repeatable research workflows.",
  },
  "room-booking": {
    category: "EDUCATION TECHNOLOGY",
    headline: ["SIMPLIFYING SHARED", "ENGINEERING ROOM", "RESERVATIONS."],
    summary:
      "The Engineering Room Booking System is a scheduling web app for reserving shared engineering rooms and reducing coordination overhead.",
    description:
      "The app uses a clear booking flow, predictable resource states, and simple interactions to make availability easier to understand for students and staff.",
  },
};

function isAnimatedImage(src: string) {
  return src.toLowerCase().endsWith(".gif");
}

function PortfolioDivider() {
  return (
    <div className="portfolio-divider" aria-hidden="true">
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    </div>
  );
}

function ProjectCaseStudy({ project }: { project: Project }) {
  const detail = contributionDetails[project.slug];
  const isAnimatedProjectImage = isAnimatedImage(project.image);
  const imageClass =
    isAnimatedProjectImage || detail.visualMode === "contain"
      ? "object-contain p-12 sm:p-16"
      : "object-cover";

  return (
    <section id={project.slug} className="scroll-mt-10 py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-[0.38fr_0.62fr] md:gap-14">
        <div>
          <p className="mb-5 text-xs font-bold uppercase text-gray">
            {detail.category}
          </p>
          <h2 className="font-sans text-4xl font-bold leading-[0.98] text-neutral-950 md:text-5xl">
            {detail.headline.map(line => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="pt-1">
          <p className="text-lg font-semibold leading-7 text-neutral-950">
            {detail.summary}
          </p>
          <p className="mt-5 text-base leading-7 text-neutral-700">
            {detail.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray">
            {project.stack.map(item => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="mt-6">
            <HyperLink href={project.url}>View project</HyperLink>
          </div>
        </div>
      </div>

      <a href={project.url} target="_blank" rel="noopener noreferrer">
        <div className="mx-auto mt-12 w-full max-w-[90%] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="relative aspect-[16/10] bg-green-faded-xl">
            <Image
              src={project.image}
              fill
              sizes="(max-width: 768px) 90vw, 900px"
              alt={`${project.title} screenshot`}
              unoptimized={isAnimatedProjectImage}
              className={imageClass}
            />
          </div>
        </div>
      </a>

      <PortfolioDivider />
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <main className="mx-auto mt-8 max-w-5xl px-6 md:px-10">
      <section>
        <SiteHeader />
        <BackButton />

        <section className="summary mx-auto max-w-xl">
          <p>
            Hi! I&apos;m <strong>Ali</strong>, a computer engineering student
            based in Orange County.
          </p>
          <p>
            I currently work at Panasonic Avionics as a software integration
            intern.
          </p>
          <p>
            I&apos;d consider myself a systems-minded builder in some sense -
            here&apos;s some of my work.
          </p>
          <p>
            I&apos;m interested in Haskell, systems programming,
            hardware/software integration, and building tools that help people
            understand complex systems. Please reach out if you&apos;d like to
            chat!
          </p>
          <p>
            <HyperLink href="https://www.linkedin.com/in/ali-sao/">
              LinkedIn
            </HyperLink>{" "}
            / <HyperLink href="https://github.com/sao-ali">GitHub</HyperLink> /{" "}
            <HyperLink href="/blog">Blog</HyperLink>
          </p>
        </section>

        <h1 className="title mt-16 text-center text-2xl font-semibold tracking-tighter">
          ~ notable contributions on the INTERNET ~
        </h1>

        <div>
          {projects.map(project => (
            <ProjectCaseStudy key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
