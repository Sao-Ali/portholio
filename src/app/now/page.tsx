import BackButton from "@/components/back-button";
import HyperLink from "@/components/hyperlink";
import SiteHeader from "@/components/site-header";
import { formatNowUpdateDate, nowUpdates } from "./updates";

export const metadata = {
  title: "Now | Ali Sao",
  description: "What Ali Sao is up to now.",
};

export default function NowPage() {
  return (
    <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
      <section className="summary">
        <SiteHeader />
        <BackButton />
        <h1 className="title mb-8 text-2xl font-semibold tracking-tighter">
          what i&apos;m up to now
        </h1>

        <div className="mt-8">
          <p>
            <i>
              * this page is all about what i&apos;m doing now. it&apos;s inspired
              by <HyperLink href="https://nownownow.com/about">nownownow.com</HyperLink>.
            </i>
          </p>
          {nowUpdates.map((update) => (
            <section key={update.slug} id={update.slug} className="scroll-mt-24">
              <h2 className="mt-8">{formatNowUpdateDate(update.publishedAt)}</h2>
              {update.content}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
