import "server-only";

import fs from "fs";
import path from "path";
import {
  type BlogMetadata,
  type BlogPost,
  type BlogPostSummary,
  validateBlogMetadata,
  validateBlogPosts,
} from "@/lib/content/schema";

function parseFrontmatter(fileContent: string): { metadata: Record<string, string>; content: string } {
  const fm = /^---\s*\n([\s\S]*?)\n---\s*\n?/;
  const match = fileContent.match(fm);

  if (!match) {
    return { metadata: {}, content: fileContent.trim() };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.slice(match[0].length).trim();
  const metadata: Record<string, string> = {};

  for (const rawLine of frontMatterBlock.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key] = value;
  }

  return { metadata, content };
}

function getPostsDirectory() {
  const root = process.cwd();

  // Supports both a src/app layout and a root app layout if the repo changes.
  const appDir = fs.existsSync(path.join(root, "src", "app"))
    ? path.join(root, "src", "app")
    : path.join(root, "app");

  return path.join(appDir, "blog", "posts");
}

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(file => path.extname(file).toLowerCase() === ".mdx");
}

function readBlogPost(dir: string, file: string): BlogPost {
  const abs = path.join(dir, file);
  const raw = fs.readFileSync(abs, "utf-8");
  const { metadata, content } = parseFrontmatter(raw);
  const slug = path.basename(file, path.extname(file));

  return {
    metadata: validateBlogMetadata(metadata, slug),
    slug,
    content,
  };
}

function sortPostsByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}

function cloneMetadata(metadata: BlogMetadata): BlogMetadata {
  return { ...metadata };
}

function clonePost(post: BlogPost): BlogPost {
  return {
    slug: post.slug,
    metadata: cloneMetadata(post.metadata),
    content: post.content,
  };
}

export function getBlogPosts(): BlogPost[] {
  const postsDir = getPostsDirectory();
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  return validateBlogPosts(getMDXFiles(postsDir).map(file => readBlogPost(postsDir, file))).map(clonePost);
}

export function getSortedBlogPosts(): BlogPost[] {
  return sortPostsByDateDesc(getBlogPosts()).map(clonePost);
}

export function getBlogPostSummaries(): BlogPostSummary[] {
  return getSortedBlogPosts().map(post => ({
    slug: post.slug,
    metadata: cloneMetadata(post.metadata),
  }));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const post = getBlogPosts().find(item => item.slug === slug);
  return post ? clonePost(post) : undefined;
}

export function formatDate(dateInput: string, includeRelative = false): string {
  const iso = dateInput.includes("T") ? dateInput : `${dateInput}T00:00:00`;
  const date = new Date(iso);
  const full = date.toLocaleString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

  if (!includeRelative) return full;

  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const minutes = Math.round(diffMs / 60000);
  const hours = Math.round(diffMs / 3600000);
  const days = Math.round(diffMs / 86400000);
  const months = Math.round(diffMs / (86400000 * 30));
  const years = Math.round(diffMs / (86400000 * 365));

  let rel: string;
  if (Math.abs(years) >= 1) rel = rtf.format(years, "year");
  else if (Math.abs(months) >= 1) rel = rtf.format(months, "month");
  else if (Math.abs(days) >= 1) rel = rtf.format(days, "day");
  else if (Math.abs(hours) >= 1) rel = rtf.format(hours, "hour");
  else rel = rtf.format(minutes, "minute");

  return `${full} (${rel})`;
}
