import Link from "next/link";

type HyperLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function HyperLink({ href, children }: HyperLinkProps) {
  const isExternal = href.startsWith("http");

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className="hyperlink">
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a href={href} className="hyperlink" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className="hyperlink">
      {children}
    </Link>
  );
}
