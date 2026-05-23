"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BlogMetadata, PortfolioContent, Profile } from "@/lib/content/schema";

type BlogPostSummary = {
  slug: string;
  metadata: BlogMetadata;
};

type Command = {
  cmd: string;
  desc: string;
};

type CommandGroup = {
  title: string;
  commands: Command[];
};

type ThemeName = "dark" | "light" | "blue-matrix" | "espresso" | "sao";
type Directory = "~" | "blog" | "projects";
type TerminalSession = {
  history: string[];
  cwdHistory: Directory[];
  cwd: Directory;
};

const commands: Command[] = [
  { cmd: "welcome", desc: "display the intro" },
  { cmd: "ls", desc: "list files in the current directory" },
  { cmd: "cd", desc: "change directory" },
  { cmd: "vi", desc: "open a file, then :q returns here" },
  { cmd: "blog", desc: "open blog index" },
  { cmd: "projects", desc: "open project index" },
  { cmd: "resume", desc: "open resume.pdf" },
  { cmd: "about", desc: "show who Ali is" },
  { cmd: "socials", desc: "list social links" },
  { cmd: "email", desc: "open email" },
  { cmd: "skills", desc: "list technical skills" },
  { cmd: "experience", desc: "show experience" },
  { cmd: "education", desc: "show education" },
  { cmd: "themes", desc: "list or set themes" },
  { cmd: "help", desc: "show commands" },
  { cmd: "history", desc: "show command history" },
  { cmd: "clear", desc: "clear terminal" },
  { cmd: "echo", desc: "print text" },
  { cmd: "pwd", desc: "print current path" },
  { cmd: "whoami", desc: "print current user" },
];

const commandGroups: CommandGroup[] = [
  {
    title: "shell navigation",
    commands: [
      { cmd: "ls", desc: "list files in the current directory" },
      { cmd: "cd", desc: "change directory" },
      { cmd: "vi", desc: "open a file, then :q returns here" },
      { cmd: "pwd", desc: "print current path" },
      { cmd: "clear", desc: "clear terminal output" },
      { cmd: "history", desc: "show command history" },
    ],
  },
  {
    title: "portfolio shortcuts",
    commands: [
      { cmd: "about", desc: "show who Ali is" },
      { cmd: "blog", desc: "open blog index" },
      { cmd: "projects", desc: "open project index" },
      { cmd: "resume", desc: "open resume.pdf" },
      { cmd: "socials", desc: "list social links" },
      { cmd: "email", desc: "open email" },
    ],
  },
  {
    title: "background",
    commands: [
      { cmd: "skills", desc: "list technical skills" },
      { cmd: "experience", desc: "show experience" },
      { cmd: "education", desc: "show education" },
    ],
  },
  {
    title: "utilities",
    commands: [
      { cmd: "themes", desc: "list or set themes" },
      { cmd: "help", desc: "show this grouped command list" },
      { cmd: "echo", desc: "print text" },
      { cmd: "whoami", desc: "print current user" },
      { cmd: "welcome", desc: "display the full intro" },
    ],
  },
];

const themeNames: ThemeName[] = ["dark", "light", "blue-matrix", "espresso", "sao"];

function parseInput(input: string) {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  return { cmd: parts[0] ?? "", args: parts.slice(1) };
}

function stripQuotes(value: string) {
  return value.replace(/^["'`](.*)["'`]$/, "$1");
}

function Usage({ children }: { children: ReactNode }) {
  return <div className="terminal-muted">Usage: {children}</div>;
}

function directoryPath(cwd: Directory) {
  return cwd === "~" ? "" : `/${cwd}`;
}

function Prompt({ cwd, promptHost }: { cwd: Directory; promptHost: string }) {
  return (
    <span className="terminal-prompt">
      <span className="terminal-user">visitor</span>@
      <span className="terminal-host">{promptHost}{directoryPath(cwd)}</span>:~$
    </span>
  );
}

function WelcomeOutput({ profile }: { profile: Profile }) {
  return (
    <div className="terminal-output-block">
      <pre className="terminal-ascii" aria-hidden="true">{`
    ___    __    ____   _____ ___    ____
   /   |  / /   /  _/  / ___//   |  / __ \\
  / /| | / /    / /    \\__ \\/ /| | / / / /
 / ___ |/ /____/ /    ___/ / ___ |/ /_/ /
/_/  |_/_____/___/   /____/_/  |_/_____/
`}</pre>
      <p>Welcome to Ali Sao&apos;s terminal portfolio.</p>
      <p>{profile.bio}</p>
      <p className="terminal-muted">
        Focused on full-stack product work, infrastructure, and practical systems integration.
      </p>
      <p className="terminal-muted">
        Start like a shell: <span className="terminal-accent">ls</span>,{" "}
        <span className="terminal-accent">cd blog</span>,{" "}
        <span className="terminal-accent">ls</span>,{" "}
        <span className="terminal-accent">vi panasonic.mdx</span>.
      </p>
      <p className="terminal-muted">
        <strong className="terminal-strong">Non-terminal visitors</strong> can still type{" "}
        <span className="terminal-accent">blog</span>, <span className="terminal-accent">projects</span>,{" "}
        <span className="terminal-accent">resume</span>, or <span className="terminal-accent">help</span>.
      </p>
      <p className="terminal-muted">
        Prefer the regular site?{" "}
        <a className="terminal-link" href="/classic">
          Open the classic portfolio
        </a>.
      </p>
    </div>
  );
}

function PinnedWelcome({ profile }: { profile: Profile }) {
  return (
    <header className="terminal-pinned-welcome">
      <WelcomeOutput profile={profile} />
    </header>
  );
}

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const bootLines = useMemo(
    () => [
      "ssh visitor@ali-sao.dev",
      "resolving ali-sao.dev...",
      "handshake: software + hardware",
      "mounting /home/ali-sao/portfolio",
      "indexing blog/*.mdx",
      "indexing projects/*.md",
      "starting interactive shell",
      "access granted",
    ],
    []
  );
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    const timers = bootLines.map((line, index) =>
      window.setTimeout(() => {
        setVisibleLines(current => [...current, line]);
      }, 360 * index)
    );

    const done = window.setTimeout(onComplete, 360 * bootLines.length + 850);
    return () => {
      timers.forEach(timer => window.clearTimeout(timer));
      window.clearTimeout(done);
    };
  }, [bootLines, onComplete]);

  return (
    <main className="terminal-shell terminal-boot" aria-label="Connecting to Ali Sao portfolio">
      <div className="terminal-window">
        <div className="terminal-scanline" />
        {visibleLines.map((line, index) => (
          <p key={`${line}-${index}`}>
            <span className="terminal-dim">[{String(index + 1).padStart(2, "0")}]</span>{" "}
            <span className={index === visibleLines.length - 1 ? "terminal-accent" : undefined}>{line}</span>
          </p>
        ))}
        <p className="terminal-cursor-line">
          <span className="terminal-accent">_</span>
        </p>
      </div>
    </main>
  );
}

function fileNameForPost(slug: string) {
  return `${slug}.mdx`;
}

function fileNameForProject(slug: string) {
  return `${slug}.md`;
}

function parseStoredSession(session: string | null): TerminalSession | null {
  if (!session) return null;
  try {
    return JSON.parse(session) as TerminalSession;
  } catch {
    window.sessionStorage.removeItem("terminal-session");
    return null;
  }
}

export function TerminalPortfolio({
  posts,
  portfolio,
  skipBoot = false,
}: {
  posts: BlogPostSummary[];
  portfolio: PortfolioContent;
  skipBoot?: boolean;
}) {
  const { education, experience, profile, projects, skills, socials } = portfolio;
  const restoredSession = useMemo(
    () =>
      skipBoot && typeof window !== "undefined"
        ? parseStoredSession(window.sessionStorage.getItem("terminal-session"))
        : null,
    [skipBoot]
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(restoredSession?.history ?? []);
  const [cwdHistory, setCwdHistory] = useState<Directory[]>(restoredSession?.cwdHistory ?? []);
  const [cwd, setCwd] = useState<Directory>(restoredSession?.cwd ?? "~");
  const [draftIndex, setDraftIndex] = useState(-1);
  const [hints, setHints] = useState<string[]>([]);
  const [theme, setTheme] = useState<ThemeName>("dark");
  const [bootComplete, setBootComplete] = useState(skipBoot);

  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) =>
          new Date(b.metadata.publishedAt).getTime() -
          new Date(a.metadata.publishedAt).getTime()
      ),
    [posts]
  );

  const openUrl = useCallback((url: string, target = "_blank") => {
    window.open(url, target, "noopener,noreferrer");
  }, []);

  const saveSession = useCallback((session: TerminalSession) => {
    window.sessionStorage.setItem("terminal-session", JSON.stringify(session));
  }, []);

  const listEntries = useCallback(
    (dir: Directory) => {
      if (dir === "blog") return sortedPosts.map(post => fileNameForPost(post.slug));
      if (dir === "projects") return projects.map(project => fileNameForProject(project.slug));
      return ["blog/", "projects/", "resume.pdf", "about.txt", "socials.txt"];
    },
    [projects, sortedPosts]
  );

  const resolveReadable = useCallback(
    (target: string, dir: Directory) => {
      const cleanTarget = target.replace(/^\.?\//, "").replace(/\/$/, "");
      const path = cleanTarget.includes("/") ? cleanTarget : `${dir === "~" ? "" : `${dir}/`}${cleanTarget}`;

      const post = sortedPosts.find(
        item => path === `blog/${fileNameForPost(item.slug)}` || path === `blog/${item.slug}` || cleanTarget === item.slug
      );
      if (post) return { type: "blog" as const, url: `/blog/${post.slug}`, label: `blog/${fileNameForPost(post.slug)}` };

      if (cleanTarget === "blog") {
        return { type: "route" as const, url: "/blog", label: "blog/" };
      }

      if (cleanTarget === "projects") {
        return { type: "route" as const, url: "/projects", label: "projects/" };
      }

      const project = projects.find(
        item =>
          path === `projects/${fileNameForProject(item.slug)}` ||
          path === `projects/${item.slug}` ||
          cleanTarget === item.slug
      );
      if (project) {
        return { type: "project" as const, url: `/projects/${project.slug}`, label: `projects/${fileNameForProject(project.slug)}` };
      }

      if (["resume", "resume.pdf"].includes(cleanTarget)) {
        return { type: "pdf" as const, url: profile.resumeUrl, label: "resume.pdf" };
      }

      if (["about.txt", "about"].includes(cleanTarget)) {
        return { type: "virtual" as const, url: "", label: "about.txt" };
      }

      if (["socials.txt", "socials"].includes(cleanTarget)) {
        return { type: "virtual" as const, url: "", label: "socials.txt" };
      }

      return null;
    },
    [profile.resumeUrl, projects, sortedPosts]
  );

  useEffect(() => {
    if (skipBoot && restoredSession) {
      window.history.replaceState(null, "", "/");
    }

    const stored = window.localStorage.getItem("terminal-theme") as ThemeName | null;
    const initial = stored && themeNames.includes(stored) ? stored : "dark";
    document.documentElement.dataset.terminalTheme = initial;
  }, [restoredSession, skipBoot]);

  useEffect(() => {
    document.documentElement.dataset.terminalTheme = theme;
    window.localStorage.setItem("terminal-theme", theme);
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--terminal-bg").trim());
  }, [theme]);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  useEffect(() => {
    const preventArrowScroll = (event: KeyboardEvent) => {
      if (event.code === "ArrowUp" || event.code === "ArrowDown") event.preventDefault();
    };
    window.addEventListener("keydown", preventArrowScroll);
    return () => window.removeEventListener("keydown", preventArrowScroll);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const runSideEffects = (cmd: string, args: string[], session: TerminalSession) => {
    if (cmd === "cd" && args.length === 1) {
      const target = args[0].replace(/\/$/, "");
      if (target === "~" || target === ".." || target === "/") setCwd("~");
      if (target === "blog") setCwd("blog");
      if (target === "projects") setCwd("projects");
    }

    if (cmd === "vi" && args.length === 1) {
      const readable = resolveReadable(args[0], cwd);
      if (readable && ["blog", "pdf", "project", "route"].includes(readable.type)) {
        saveSession(session);
        openUrl(readable.url, readable.type === "pdf" ? "_blank" : "_self");
      }
    }

    if (cmd === "resume" && args.length === 0) {
      saveSession(session);
      openUrl(profile.resumeUrl, "_blank");
    }

    if (cmd === "blog" && args.length === 0) {
      saveSession(session);
      openUrl("/blog", "_self");
    }

    if (cmd === "projects" && args.length === 0) {
      saveSession(session);
      openUrl("/projects", "_self");
    }

    if (cmd === "email" && args.length === 0) {
      openUrl(`mailto:${profile.email}?subject=Portfolio%20Inquiry`, "_self");
    }

    if (cmd === "themes" && args.length === 2 && args[0] === "set" && themeNames.includes(args[1] as ThemeName)) {
      setTheme(args[1] as ThemeName);
    }
  };

  const submitCommand = (value: string) => {
    const trimmed = value.trim();
    const { cmd, args } = parseInput(trimmed);
    const nextHistory = trimmed === "clear" ? [] : [...history, trimmed];
    const nextCwdHistory = trimmed === "clear" ? [] : [...cwdHistory, cwd];
    const session = { history: nextHistory, cwdHistory: nextCwdHistory, cwd };

    runSideEffects(cmd, args, session);

    if (trimmed === "clear") {
      setHistory([]);
      setCwdHistory([]);
    } else {
      setHistory(nextHistory);
      setCwdHistory(nextCwdHistory);
    }
    setInput("");
    setHints([]);
    setDraftIndex(-1);
  };

  const autocomplete = () => {
    const value = input;
    if (!value) return;
    const { cmd, args } = parseInput(value);
    const hasTrailingSpace = value.endsWith(" ");

    if (cmd === "cd" && (hasTrailingSpace || args.length === 1)) {
      const partial = hasTrailingSpace ? "" : args[0] ?? "";
      const dirs = cwd === "~" ? ["blog", "projects"] : [".."];
      const matches = dirs.filter(dir => dir.startsWith(partial));
      if (matches.length === 1) setInput(`cd ${matches[0]}`);
      else setHints(matches);
      return;
    }

    if (cmd === "vi" && (hasTrailingSpace || args.length === 1)) {
      const partial = hasTrailingSpace ? "" : args[0] ?? "";
      const files = listEntries(cwd).map(entry => entry.replace(/\/$/, ""));
      const matches = files.filter(file => file.startsWith(partial));
      if (matches.length === 1) setInput(`vi ${matches[0]}`);
      else setHints(matches);
      return;
    }

    if (value === "themes " || value === "themes s") {
      setInput("themes set ");
      return;
    }
    if (value.startsWith("themes set ")) {
      const partial = value.replace("themes set ", "");
      const matches = themeNames.filter(name => name.startsWith(partial));
      if (matches.length === 1) setInput(`themes set ${matches[0]}`);
      else setHints(matches);
      return;
    }

    const matches = commands.map(({ cmd: command }) => command).filter(command => command.startsWith(value));
    if (matches.length === 1) setInput(matches[0]);
    else setHints(matches);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const ctrlI = event.ctrlKey && event.key.toLowerCase() === "i";
    const ctrlL = event.ctrlKey && event.key.toLowerCase() === "l";

    if (event.key === "Tab" || ctrlI) {
      event.preventDefault();
      autocomplete();
      return;
    }

    if (ctrlL) {
      event.preventDefault();
      setHistory([]);
      setCwdHistory([]);
      setInput("");
      setHints([]);
      setDraftIndex(-1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = Math.min(draftIndex + 1, history.length - 1);
      setDraftIndex(nextIndex);
      setInput(history[history.length - 1 - nextIndex] ?? "");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (draftIndex <= 0) {
        setDraftIndex(-1);
        setInput("");
        return;
      }
      const nextIndex = draftIndex - 1;
      setDraftIndex(nextIndex);
      setInput(history[history.length - 1 - nextIndex] ?? "");
    }
  };

  const renderDirectoryList = (dir: Directory) => (
    <div className="terminal-output-block terminal-file-list">
      {listEntries(dir).map(entry => (
        <p key={entry}>
          <span className={entry.endsWith("/") ? "terminal-accent" : "terminal-muted"}>{entry}</span>
        </p>
      ))}
    </div>
  );

  const renderOutput = (raw: string, index: number) => {
    if (!raw) return <div className="terminal-muted"> </div>;
    const { cmd, args } = parseInput(raw);
    const commandCwd = cwdHistory[index] ?? "~";

    if (!commands.some(command => command.cmd === cmd)) {
      return <div>command not found: {raw}</div>;
    }

    if (cmd === "welcome") return <WelcomeOutput profile={profile} />;
    if (cmd === "ls") {
      if (args.length) return <Usage>ls</Usage>;
      return renderDirectoryList(commandCwd);
    }
    if (cmd === "cd") {
      if (args.length !== 1) return <Usage>cd blog OR cd projects OR cd ..</Usage>;
      const target = args[0].replace(/\/$/, "");
      if (["~", "..", "/", "blog", "projects"].includes(target)) {
        return <div className="terminal-muted"> </div>;
      }
      return <div>cd: no such directory: {args[0]}</div>;
    }
    if (cmd === "vi") {
      if (args.length !== 1) return <Usage>vi &lt;file&gt;</Usage>;
      const readable = resolveReadable(args[0], commandCwd);
      if (!readable) return <div>vi: {args[0]}: No such file</div>;
      if (readable.type === "virtual" && readable.label === "about.txt") {
        return (
          <div className="terminal-output-block">
            <p><span className="terminal-accent">about.txt</span></p>
            <p>Hi, my name is <span className="terminal-accent">Ali Sao</span>.</p>
            <p>{profile.focus}</p>
            <p>I&apos;m based in {profile.location} and open to relocation.</p>
            <p>I also love MMA and nature.</p>
          </div>
        );
      }
      if (readable.type === "virtual" && readable.label === "socials.txt") {
        return (
          <div className="terminal-output-block">
            <p><span className="terminal-accent">socials.txt</span></p>
            {socials.map(social => (
              <p key={social.id}>
                <span className="terminal-accent">{social.title}</span>
                <span className="terminal-muted"> - {social.url}</span>
              </p>
            ))}
          </div>
        );
      }
      if (readable.type === "route") return <div>Opening {readable.label}... type :q to return.</div>;
      if (readable.type === "project") return <div>Opening {readable.label}... type :q to return.</div>;
      if (readable.type === "pdf") return <div>Opening {readable.label} in a new tab...</div>;
      return <div>Opening {readable.label}... type :q to return.</div>;
    }
    if (cmd === "blog") {
      if (args.length) return <Usage>blog</Usage>;
      return <div>Opening blog/... type :q to return.</div>;
    }
    if (cmd === "projects") {
      if (args.length) return <Usage>projects</Usage>;
      return <div>Opening projects/... type :q to return.</div>;
    }
    if (cmd === "resume") {
      if (args.length) return <Usage>{cmd}</Usage>;
      return <div>Opening resume.pdf in a new tab...</div>;
    }
    if (cmd === "about") {
      if (args.length) return <Usage>about</Usage>;
      return (
        <div className="terminal-output-block">
          <p>Hi, my name is <span className="terminal-accent">Ali Sao</span>.</p>
          <p>{profile.focus}</p>
          <p>I&apos;m based in {profile.location} and open to relocation.</p>
          <p>I also love MMA and nature.</p>
        </div>
      );
    }
    if (cmd === "socials") {
      if (args.length) return <Usage>socials</Usage>;
      return (
        <div className="terminal-output-block">
          {socials.map(social => (
            <p key={social.id}>
              <span className="terminal-accent">{social.title}</span>
              <span className="terminal-muted"> - {social.url}</span>
            </p>
          ))}
        </div>
      );
    }
    if (cmd === "email") {
      if (args.length) return <Usage>email</Usage>;
      return <div>{profile.email}</div>;
    }
    if (cmd === "skills") {
      if (args.length) return <Usage>skills</Usage>;
      return <div>{skills.map(skill => <p key={skill}>- {skill}</p>)}</div>;
    }
    if (cmd === "experience") {
      if (args.length) return <Usage>experience</Usage>;
      return (
        <div className="terminal-output-block">
          {experience.map(item => (
            <div className="terminal-list-item" key={`${item.company}-${item.role}`}>
              <p><span className="terminal-accent">{item.role}</span> @ {item.company}</p>
              <p className="terminal-dim">{item.period}</p>
              {item.highlights.map(highlight => <p className="terminal-muted" key={highlight}>- {highlight}</p>)}
            </div>
          ))}
        </div>
      );
    }
    if (cmd === "education") {
      if (args.length) return <Usage>education</Usage>;
      return <div>{education.map(item => <p key={item.title}><span className="terminal-accent">{item.title}</span> - {item.desc}</p>)}</div>;
    }
    if (cmd === "themes") {
      if (args.length === 2 && args[0] === "set") {
        if (!themeNames.includes(args[1] as ThemeName)) return <Usage>themes set &lt;{themeNames.join("|")}&gt;</Usage>;
        return <div>Theme set to {args[1]}.</div>;
      }
      if (args.length) return <Usage>themes OR themes set &lt;name&gt;</Usage>;
      return <div>{themeNames.map(name => <p key={name}>{name === theme ? "*" : " "} {name}</p>)}</div>;
    }
    if (cmd === "help") {
      if (args.length) return <Usage>help</Usage>;
      const longest = Math.max(...commandGroups.flatMap(group => group.commands.map(command => command.cmd.length)));
      return (
        <div className="terminal-output-block">
          <p className="terminal-muted">Primary path: ls {">"} cd blog/projects {">"} ls {">"} vi file {">"} :q</p>
          {commandGroups.map(group => (
            <div className="terminal-help-group" key={group.title}>
              <p className="terminal-strong">{group.title}</p>
              {group.commands.map(command => (
                <p key={command.cmd}>
                  <span className="terminal-accent">{command.cmd.padEnd(longest + 2, " ")}</span>
                  <span className="terminal-muted">- {command.desc}</span>
                </p>
              ))}
            </div>
          ))}
          <div className="terminal-dim terminal-help-keys">
            <p>Tab / Ctrl+i: autocomplete command, directory, or file</p>
            <p>Up / Down: command history</p>
            <p>Ctrl+l: clear</p>
          </div>
        </div>
      );
    }
    if (cmd === "history") {
      if (args.length) return <Usage>history</Usage>;
      return <div>{history.slice(0, index + 1).map((item, itemIndex) => <p key={`${item}-${itemIndex}`}>{item}</p>)}</div>;
    }
    if (cmd === "clear") return null;
    if (cmd === "echo") return <div>{stripQuotes(args.join(" "))}</div>;
    if (cmd === "pwd") {
      if (args.length) return <Usage>pwd</Usage>;
      return <div>/home/ali-sao/portfolio/{commandCwd === "~" ? "" : commandCwd}</div>;
    }
    if (cmd === "whoami") {
      if (args.length) return <Usage>whoami</Usage>;
      return <div>visitor</div>;
    }
  };

  return !bootComplete ? (
    <BootScreen onComplete={() => setBootComplete(true)} />
  ) : (
    <main className="terminal-shell" aria-label="Ali Sao terminal portfolio">
      <h1 className="sr-only">Ali Sao Terminal Portfolio</h1>
      <div className="terminal-window">
      <PinnedWelcome profile={profile} />
        {history.map((item, index) => (
          <div className="terminal-entry" key={`${item}-${index}`}>
            <div className="terminal-command-line">
              <Prompt cwd={cwdHistory[index] ?? "~"} promptHost={profile.promptHost} /> <span>{item}</span>
            </div>
            <div className="terminal-response">{renderOutput(item, index)}</div>
          </div>
        ))}
        {hints.length > 1 && (
          <div className="terminal-hints">
            {hints.map(hint => <span key={hint}>{hint}</span>)}
          </div>
        )}
        <form
          className="terminal-form"
          onSubmit={event => {
            event.preventDefault();
            submitCommand(input);
          }}
        >
          <label htmlFor="terminal-input"><Prompt cwd={cwd} promptHost={profile.promptHost} /></label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            autoFocus
            onChange={event => {
              setInput(event.target.value);
              setHints([]);
            }}
            onKeyDown={handleKeyDown}
          />
        </form>
        <div ref={endRef} />
      </div>
    </main>
  );
}
