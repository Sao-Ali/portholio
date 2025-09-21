import { ProjectCard } from "@/components/project-card";
import { Navbar } from "@/components/navbar";

export default function ProjectsPage() {
    return (
        <section>
            <h1 className="mb-6 text-2xl font-semibold tracking-tighter">Projects</h1>
            <p className="mb-8 text-neutral-700 dark:text-neutral-300">
                A selection of projects I’ve worked on — spanning research, web apps, and full-stack
                engineering initiatives.
            </p>

            {/* Project cards */}
            <div className="space-y-6">
                <ProjectCard
                    title="Lost in Translation"
                    description="C++ + embeddings pipeline aligning JP/EN subtitles; Next.js frontend with Palantir AIP integrations."
                    image="/lost.png"
                    buttonText="View Project"
                    buttonLink="https://github.com/Sao-Ali/palantir"
                />
                <ProjectCard
                    title="SANA Neural-Network Aligner"
                    description="Contributed to the SANA lab by building a modern React + TypeScript web interface for large-scale network alignment."
                    image="/SANA.png"
                    buttonText="View Project"
                    buttonLink="https://hayeslab.ics.uci.edu/"
                />
                <ProjectCard
                    title="Intertale — Indie Film Site"
                    description="Next.js + Tailwind production site inspired by A24; media library and cinematic landing pages."
                    image="/intertale.png"
                    buttonText="View Project"
                    buttonLink="https://github.com/Sao-Ali/intertale"
                />
                <ProjectCard
                    title="Engineering Student Council — Technical Director"
                    description="Led development of full-stack applications for 30+ engineering clubs at UCI."
                    image="/Project 3.png"
                    buttonText="View Project"
                    buttonLink="https://esc.eng.uci.edu/"
                />
                <ProjectCard
                    title="Room Booking Calendar"
                    description="Vanilla React calendar with reservation popup, recurring events, and inline editing."
                    image="/Project 1.png"
                    buttonText="View Project"
                    buttonLink="https://ics-259.vercel.app/"
                />
            </div>
        </section>
    );
}
