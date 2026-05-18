import { TerminalReader } from "@/components/terminal-reader";
import {
  education,
  experience,
  profile,
  projects,
  skills,
  socials,
} from "@/lib/portfolio-data";

export const metadata = {
  title: "Resume PDF | Ali Sao",
  description: "Ali Sao resume PDF.",
};

export default function PortfolioPdfPage() {
  return (
    <TerminalReader command="vi resume.pdf">
      <article className="terminal-resume">
        <header>
          <h1>Ali Sao</h1>
          <p className="terminal-muted">{profile.bio}</p>
          <p className="terminal-muted">
            {profile.location} |{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a> |{" "}
            <a href={socials[0].url} target="_blank" rel="noopener noreferrer">GitHub</a> |{" "}
            <a href={socials[1].url} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </header>

        <section>
          <h2>Profile</h2>
          <p>{profile.focus}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map(item => (
            <div className="terminal-resume-item" key={`${item.company}-${item.role}`}>
              <p><strong>{item.role}</strong> - {item.company}</p>
              <p className="terminal-dim">{item.period}</p>
              <ul>
                {item.highlights.map(highlight => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map(project => (
            <div className="terminal-resume-item" key={project.slug}>
              <p>
                <strong>{project.title}</strong>{" "}
                <a href={project.url} target="_blank" rel="noopener noreferrer">[link]</a>
              </p>
              <p className="terminal-muted">{project.desc}</p>
              <p className="terminal-dim">{project.stack.join(" / ")}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          <p>{skills.join(" / ")}</p>
        </section>

        <section>
          <h2>Education</h2>
          {education.map(item => (
            <p key={item.title}><strong>{item.title}</strong> - {item.desc}</p>
          ))}
        </section>

        <footer>
          <p className="terminal-muted">
            Type <span className="terminal-accent">:q</span> to return to the terminal.{" "}
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              Open the PDF version
            </a>.
          </p>
        </footer>
      </article>
    </TerminalReader>
  );
}
