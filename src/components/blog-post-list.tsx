import { formatShortDate, getBlogPosts } from "@/app/blog/utils";
import { getNowArchiveEntries } from "@/app/now/updates";
import HyperLink from "@/components/hyperlink";

type WritingEntry = {
  title: string;
  publishedAt: string;
  href: string;
};

type BlogPostListProps = {
  includeNowUpdates?: boolean;
};

export function BlogPostList({ includeNowUpdates = false }: BlogPostListProps) {
  const blogEntries: WritingEntry[] = getBlogPosts().map((post) => ({
    title: post.metadata.title,
    publishedAt: post.metadata.publishedAt,
    href: `/blog/${post.slug}`,
  }));

  const nowEntries: WritingEntry[] = includeNowUpdates
    ? getNowArchiveEntries()
    : [];

  const allEntries = [...blogEntries, ...nowEntries];
  const entriesByYear = allEntries.reduce<Record<string, WritingEntry[]>>((acc, entry) => {
    const year = new Date(entry.publishedAt).getFullYear().toString();
    acc[year] = acc[year] ?? [];
    acc[year].push(entry);
    return acc;
  }, {});
  const sortedYears = Object.keys(entriesByYear).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div>
      {sortedYears.map(year => (
        <div key={year}>
          <h3 className="mb-4 mt-8 text-2xl font-bold">{year}</h3>
          {entriesByYear[year]
            .sort(
              (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            )
            .map(entry => (
              <div key={entry.href} className="flex w-full pb-2">
                <p className="mr-4 w-[60px] tabular-nums text-neutral-600">
                  {formatShortDate(entry.publishedAt)}
                </p>
                <div className="flex-1">
                  <HyperLink href={entry.href}>
                    {entry.title}
                  </HyperLink>
                </div>
              </div>
            ))}
            </div>
      ))}
    </div>
  );
}
