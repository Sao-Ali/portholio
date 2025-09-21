import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function Page() {
  return (
      <section className="mx-auto max-w-[720px] px-5 sm:px-8 py-12 md:py-16 lg:py-20">
          <Navbar/>

          <h1 className="mb-6 text-2xl font-semibold tracking-tighter">My Portfolio</h1>

          <p className="mb-4 text-neutral-800 dark:text-neutral-200">
              Computer Engineering student building at the intersection of software and hardware — with a strong
              background in software development and a passion for creating critical, impactful systems.
          </p>

          <p className="mb-4 text-neutral-800 dark:text-neutral-200">
              I love MMA, Matcha, and My Girlfriend
          </p>
          <h1 className="mb-4 text-neutral-800 dark:text-neutral-200">
              <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-600 dark:hover:text-blue-400"
              >
                  Check out my Resume here
              </a>
          </h1>
          <Footer/>
      </section>
  );
}
