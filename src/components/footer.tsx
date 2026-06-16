import Divider from "@/components/divider";
import HyperLink from "@/components/hyperlink";
import SiteHeader from "@/components/site-header";

export default function Footer() {
  return (
    <footer className="pb-6">
      <Divider />
      <div className="flex flex-col items-center justify-center gap-4">
        <SiteHeader compact />
        <nav className="flex flex-wrap justify-center gap-4">
          <HyperLink href="/">home</HyperLink>
          <HyperLink href="/about">about</HyperLink>
          <HyperLink href="/now">now</HyperLink>
          <HyperLink href="/projects">projects</HyperLink>
        </nav>
        <nav className="flex flex-wrap justify-center gap-4">
          <HyperLink href="https://github.com/sao-ali">github</HyperLink>
          <HyperLink href="https://www.linkedin.com/in/ali-sao/">linkedin</HyperLink>
          <HyperLink href="https://x.com/Ner0_dev">twitter</HyperLink>
        </nav>
        <nav className="flex flex-wrap justify-center gap-4">
          <HyperLink href="/rss">rss</HyperLink>
        </nav>
        <p className="text-sm text-gray">{new Date().getFullYear()} ali sao</p>
      </div>
    </footer>
  );
}
