"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems: Record<string, { name: string; external?: boolean }> = {
    "/": { name: "home" },
    "/projects": { name: "projects" },
    "/blog": { name: "blog" },
    "mailto:asao1@uci.edu?subject=Portfolio%20Inquiry": { name: "contact" },
};

export function Navbar() {
    const pathname = usePathname();

    return (
        <aside className="-ml-[8px] mb-12 tracking-tight">
            <div className="lg:sticky lg:top-20">
                <nav
                    id="nav"
                    className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
                >
                    <div className="flex flex-row space-x-0 pr-10">
                        {Object.entries(navItems).map(([path, { name, external }]) => {
                            const isActive = path === "/" ? pathname === "/" : pathname.startsWith(path);
                            const base =
                                "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1";
                            const active =
                                "text-neutral-900 dark:text-neutral-100 underline underline-offset-4";
                            const cls = cn(base, isActive && !external && active);

                            if (external) {
                                return (
                                    <a key={path} href={path} target="_blank" rel="noopener noreferrer" className={base}>
                                        {name}
                                    </a>
                                );
                            }
                            return (
                                <Link key={path} href={path} className={cls}>
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </aside>
    );
}
