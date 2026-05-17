"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function TerminalReader({
  children,
  command,
  cwd = "~",
}: {
  children: ReactNode;
  command: string;
  cwd?: "~" | "blog" | "projects";
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("type :q to return to the terminal");

  const exitReader = () => {
    setMessage("closing buffer...");
    router.push("/?restore=1");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (!isTyping && event.key === ":") {
        event.preventDefault();
        setInput(":");
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="terminal-post">
      <section className="terminal-post-inner">
        <p>
          <span className="terminal-user">visitor</span>@
          <span className="terminal-host">ali-sao.dev{cwd === "~" ? "" : `/${cwd}`}</span>:~$ {command}
        </p>
        {children}
      </section>
      <form
        className="terminal-reader-command"
        onSubmit={event => {
          event.preventDefault();
          if (input.trim() === ":q") {
            exitReader();
            return;
          }
          setMessage(`not an editor command: ${input || "(empty)"}`);
          setInput("");
        }}
      >
        <span className="terminal-dim">NORMAL</span>
        <input
          ref={inputRef}
          value={input}
          aria-label="reader command"
          autoComplete="off"
          spellCheck={false}
          onChange={event => setInput(event.target.value)}
          onKeyDown={event => {
            if (event.key === "Escape") {
              setInput("");
              inputRef.current?.blur();
            }
          }}
        />
        <span className="terminal-muted">{message}</span>
      </form>
    </main>
  );
}
