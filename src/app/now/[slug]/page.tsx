import { notFound } from "next/navigation";
import BackButton from "@/components/back-button";
import SiteHeader from "@/components/site-header";
import { formatNowUpdateDate, nowUpdates } from "../updates";

type NowArchivePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return nowUpdates.map((update) => ({
    slug: update.slug,
  }));
}

export async function generateMetadata({ params }: NowArchivePageProps) {
  const { slug } = await params;
  const update = nowUpdates.find((entry) => entry.slug === slug);

  if (!update) {
    return {
      title: "Now Archive | Ali Sao",
    };
  }

  return {
    title: `${update.title} | Ali Sao`,
    description: update.summary,
  };
}

export default async function NowArchivePage({ params }: NowArchivePageProps) {
  const { slug } = await params;
  const update = nowUpdates.find((entry) => entry.slug === slug);

  if (!update) {
    notFound();
  }

  return (
    <main className="mx-auto mt-8 max-w-xl px-6 md:px-0">
      <section className="summary">
        <SiteHeader />
        <BackButton />
        <h1 className="title mb-8 text-2xl font-semibold tracking-tighter">
          {formatNowUpdateDate(update.publishedAt)}
        </h1>

        <div className="mt-8">{update.content}</div>
      </section>
    </main>
  );
}
