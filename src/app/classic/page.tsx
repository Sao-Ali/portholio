import { ClassicBlogPosts } from "@/components/classic-posts";
import { ClassicNav } from "@/components/classic-nav";
import Footer from "@/components/footer";
import { profile } from "@/lib/portfolio-data";

export const metadata = {
  title: "Classic Portfolio | Ali Sao",
  description: "The non-terminal version of Ali Sao's portfolio and blog.",
};

export default function ClassicPage() {
  return (
    <main className="classic-shell">
      <div className="classic-container">
        <ClassicNav />

        <section>
          <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
            My Portfolio
          </h1>

          <p className="mb-4">
            Computer Engineering student building full-stack applications,
            infrastructure, and system integrations.
          </p>

          <p className="mb-4">
            I work across full-stack development, infrastructure, and integration
            between software systems, with a growing interest in software that
            connects to hardware.
          </p>

          <p className="mb-4">I love MMA and nature.</p>

          <p className="mb-4">Based in OC/LA - open to relocation.</p>

          <div className="my-12">
            <ClassicBlogPosts />
          </div>

          <p className="mb-6">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Check out my resume here
            </a>
          </p>
        </section>

        <Footer />
      </div>
    </main>
  );
}
