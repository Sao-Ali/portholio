import { getBlogPosts } from "@/app/blog/utils";
import { TerminalPortfolio } from "@/components/terminal-portfolio";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ restore?: string }>;
}) {
  const params = await searchParams;
  const posts = getBlogPosts().map(({ slug, metadata }) => ({ slug, metadata }));

  return <TerminalPortfolio posts={posts} skipBoot={params.restore === "1"} />;
}
