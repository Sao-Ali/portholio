export default function ProjectsPage() {
    const projects = [
        {
            name: "Haskell-Habit",
            href: "https://github.com/Sao-Ali/haskell-habit-tracker",
        },
        {
            name: "HFT-System",
            href: "https://github.com/vrushang1234/hft-system",
        },
        {
            name: "SANA Neural Network Aligner",
            href: "https://github.com/waynebhayes/SANA",
        },
        {
            name: "Engineering Room Booking System",
            href: "https://ics-259.vercel.app/",
        },
    ];

    return (
        <section>
            <h1 className="mb-6 text-2xl font-semibold tracking-tighter">Projects</h1>

            <div>
                {projects.map((project) => (
                    <a
                        key={project.name}
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col space-y-1 mb-4 group"
                    >
                        <div className="w-full flex flex-col">
                            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight group-hover:underline">
                                {project.name}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
