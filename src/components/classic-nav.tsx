import Link from "next/link";

const navItems = [
  { href: "/", label: "terminal" },
  { href: "/classic", label: "home" },
  { href: "/classic/projects", label: "projects" },
  { href: "/classic/blog", label: "blog" },
  { href: "mailto:asao1@uci.edu?subject=Portfolio%20Inquiry", label: "contact" },
];

export function ClassicNav() {
  return (
    <nav className="classic-nav" aria-label="Classic portfolio navigation">
      {navItems.map(item =>
        item.href.startsWith("mailto:") ? (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
