import Image from "next/image";
import { BlogPostList } from "@/components/blog-post-list";
import Divider from "@/components/divider";
import HyperLink from "@/components/hyperlink";
import ProjectFeatureCard from "@/components/project-feature-card";
import SiteHeader from "@/components/site-header";
import { profile, projects } from "@/lib/portfolio-data";

export const metadata = {
  title: "Ali Sao | Portfolio",
  description: profile.bio,
};

export default function Page() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
      <section className="m-auto min-h-screen">
        <SiteHeader />

        <div className="flex flex-col gap-3">
          <h1>
            welcome to <strong>Ali&apos;s Blog</strong>
          </h1>
          <p>
            hi, i&apos;m <HyperLink href="/portfolio">Ali</HyperLink>! this is
            my little corner of the internet where i share thoughts, projects,
            and pieces of my undergraduate journey.
          </p>
          <p>
            i&apos;m currently based in{" "}
            <span className="font-bold">Orange County</span>, studying computer
            engineering and figuring things out one class, project, and late
            night bug at a time.
          </p>
          <p>
            i&apos;ll update my <HyperLink href="/now">now</HyperLink> page once
            in a while when there&apos;s enough life to report. for now, welcome
            to the blog. make yourself at home.
          </p>
          <p>
            welcome, and thank you for visiting my corner of the{" "}
            <span className="relative">
              internet!
              <Image
                src="/smile.svg"
                width={13}
                height={9}
                alt=""
                aria-hidden="true"
                className="absolute right-[-16px] top-0"
              />
            </span>
          </p>
        </div>

        <div className="px-2 py-6">
          <Image
            src="/arrow.svg"
            width={58}
            height={76}
            alt=""
            aria-hidden="true"
          />
        </div>

        <h2>check out my projects</h2>
        <div className="grid grid-cols-1 gap-4 pt-4">
          {projects.map((project, index) => (
            <ProjectFeatureCard
              key={project.slug}
              href={`/projects#${project.slug}`}
              title={project.title}
              description={project.desc}
              thumbnailUrl={project.image}
              latest={index === 0}
            />
          ))}
        </div>

        <Divider />

        <h2>everything i&apos;ve written so far</h2>
        <BlogPostList includeNowUpdates />
      </section>
    </main>
  );
}
