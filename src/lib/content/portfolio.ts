import "server-only";

import {
  education as sourceEducation,
  experience as sourceExperience,
  profile as sourceProfile,
  projects as sourceProjects,
  skills as sourceSkills,
  socials as sourceSocials,
} from "@/lib/portfolio-data";
import {
  type Education,
  type Experience,
  type PortfolioContent,
  type Profile,
  type Project,
  type Social,
  validatePortfolioContent,
} from "@/lib/content/schema";

const content = validatePortfolioContent({
  projects: sourceProjects,
  socials: sourceSocials,
  skills: sourceSkills,
  experience: sourceExperience,
  education: sourceEducation,
  profile: sourceProfile,
});

function cloneProject(project: Project): Project {
  return {
    ...project,
    stack: [...project.stack],
    highlights: project.highlights ? [...project.highlights] : undefined,
  };
}

function cloneExperience(experience: Experience): Experience {
  return {
    ...experience,
    highlights: [...experience.highlights],
  };
}

function clonePortfolioContent(value: PortfolioContent): PortfolioContent {
  return {
    projects: value.projects.map(cloneProject),
    socials: value.socials.map(social => ({ ...social })),
    skills: [...value.skills],
    experience: value.experience.map(cloneExperience),
    education: value.education.map(item => ({ ...item })),
    profile: { ...value.profile },
  };
}

export function getPortfolioContent(): PortfolioContent {
  return clonePortfolioContent(content);
}

export function getProjects(): Project[] {
  return content.projects.map(cloneProject);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const project = content.projects.find(item => item.slug === slug);
  return project ? cloneProject(project) : undefined;
}

export function getSocials(): Social[] {
  return content.socials.map(social => ({ ...social }));
}

export function getSkills(): string[] {
  return [...content.skills];
}

export function getExperience(): Experience[] {
  return content.experience.map(cloneExperience);
}

export function getEducation(): Education[] {
  return content.education.map(item => ({ ...item }));
}

export function getProfile(): Profile {
  return { ...content.profile };
}
