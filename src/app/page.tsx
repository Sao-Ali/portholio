import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function Page() {
  return (
      <section className="mx-auto max-w-[720px] px-5 sm:px-8 py-12 md:py-16 lg:py-20">
        <Navbar />

        <h1 className="mb-6 text-2xl font-semibold tracking-tighter">My Portfolio</h1>

        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          I’m a Computer Engineering student building at the intersection of software and hardware —
          mission-critical systems, embedded tooling, and clean UIs that don’t crash when it matters.
        </p>

        <p className="mb-4 text-neutral-800 dark:text-neutral-200">
          I love MMA, Matcha, and Fashion
        </p>
          <Footer />
      </section>
  );
}
