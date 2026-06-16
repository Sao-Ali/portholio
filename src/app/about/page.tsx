import AboutImages from "@/components/about-images";
import BackButton from "@/components/back-button";
import SiteHeader from "@/components/site-header";

export const metadata = {
  title: "About | Ali Sao",
  description: "A little about Ali Sao.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
      <section className="summary">
        <SiteHeader />
        <BackButton />
        <h1 className="title mb-8 text-2xl font-semibold tracking-tighter">
          a little about me
        </h1>

        <div className="mt-10">
          <AboutImages />

          <p>
            hello, i&apos;m <strong>Ali Sao</strong>, pronounced{" "}
            <strong>Ah-Lee</strong>.
          </p>
          <p>
            i&apos;m 20 years old and i currently live in Irvine, CA. i was
            raised and grew up in Cambodia for 12 years before moving to
            California in 2019.
          </p>
          <p>
            i have a hard time describing myself, so i&apos;ll leave it to my
            girlfriend:
          </p>
          <ul>
            <li>
              <i>&quot;damn he so indie and niche and he pmo&quot; - Czarina Calascan</i>
            </li>
          </ul>
          <p>
            i currently work as a software integration intern at Panasonic
            Avionics California. i enjoy Haskell and systems programming.
          </p>
          <p>
            i love to travel and learn new perspectives with the people i love.
          </p>
          <p>
            thank you for taking the time to learn a bit more about me.
          </p>
          <p>love,</p>
          <p className="font-display text-3xl text-green">Ali</p>
        </div>
      </section>
    </main>
  );
}
