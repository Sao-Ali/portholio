import { BlogPosts } from "@/components/posts";

export default function Page() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                My Portfolio
            </h1>

            <p className="mb-4">
                Computer Engineering student with a drive to build mission-critical software
                handling large volumes of data that sits between software and hardware.
            </p>

            <p className="mb-4">I love MMA and nature.</p>

            <p className="mb-4">Based in OC/LA — open to relocation.</p>

            <div className="my-12">
                <BlogPosts />
            </div>

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
        </section>
    );
}
