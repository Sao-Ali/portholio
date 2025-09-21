import { BlogPosts } from "@/components/posts";

export default function Page() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                My Portfolio
            </h1>

            <p className="mb-4">
                Computer Engineering student building at the intersection of software and
                hardware — with a strong background in software development and a passion
                for creating critical, impactful systems.
            </p>

            <p className="mb-4">
                I love MMA, Matcha, and my girlfriend.
            </p>
            <BlogPosts />

            <p className="mb-6">
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-600 dark:hover:text-blue-400"
                >
                    Check out my Resume here
                </a>
            </p>

            <div className="my-8">
            </div>
        </section>
    );
}
