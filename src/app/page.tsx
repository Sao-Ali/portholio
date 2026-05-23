import { TerminalPortfolio } from "@/components/terminal-portfolio";
import { getPortfolioContent } from "@/lib/content/portfolio";
import { getBlogPostSummaries } from "@/lib/content/posts";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ restore?: string }>;
}) {
  const params = await searchParams;
  const posts = getBlogPostSummaries();
  const portfolio = getPortfolioContent();

  return <TerminalPortfolio posts={posts} portfolio={portfolio} skipBoot={params.restore === "1"} />;
}
