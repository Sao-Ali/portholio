export default function NotFound() {
    return (
        <main className="terminal-post">
            <section className="terminal-post-inner">
                <p><span className="terminal-user">visitor</span>@<span className="terminal-host">ali-sao.dev</span>:~$ open missing-page</p>
                <h1 className="mt-8 text-2xl font-semibold tracking-tighter">404 - Page Not Found</h1>
                <p className="terminal-muted mt-4">command not found: this route does not exist</p>
            </section>
        </main>
    )
}
