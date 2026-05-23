export type Project = {
  id: number;
  slug: string;
  title: string;
  desc: string;
  stack: string[];
  url: string;
  highlights?: string[];
};

export type Social = {
  id: number;
  title: string;
  url: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type Education = {
  title: string;
  desc: string;
};

export type Profile = {
  name: string;
  email: string;
  location: string;
  promptHost: string;
  resumeUrl: string;
  sourceUrl: string;
  bio: string;
  focus: string;
};

export type PortfolioContent = {
  projects: Project[];
  socials: Social[];
  skills: string[];
  experience: Experience[];
  education: Education[];
  profile: Profile;
};

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export type BlogPost = {
  metadata: BlogMetadata;
  slug: string;
  content: string;
};

export type BlogPostSummary = {
  metadata: BlogMetadata;
  slug: string;
};

function assertRecord(value: unknown, field: string): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Invalid content: ${field} must be an object.`);
  }
}

function assertNonEmptyString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid content: ${field} must be a non-empty string.`);
  }
}

function assertStringArray(value: unknown, field: string): asserts value is string[] {
  if (!Array.isArray(value) || value.some(item => typeof item !== "string" || item.trim().length === 0)) {
    throw new Error(`Invalid content: ${field} must be a list of non-empty strings.`);
  }
}

function assertSlug(value: unknown, field: string): asserts value is string {
  assertNonEmptyString(value, field);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`Invalid content: ${field} must be a lowercase kebab-case slug.`);
  }
}

function assertDate(value: unknown, field: string): asserts value is string {
  assertNonEmptyString(value, field);
  if (Number.isNaN(new Date(value).getTime())) {
    throw new Error(`Invalid content: ${field} must be a valid date.`);
  }
}

function assertUrl(value: unknown, field: string, allowRelative = false): asserts value is string {
  assertNonEmptyString(value, field);

  if (allowRelative && value.startsWith("/")) return;

  try {
    new URL(value);
  } catch {
    throw new Error(`Invalid content: ${field} must be a valid URL.`);
  }
}

function assertEmail(value: unknown, field: string): asserts value is string {
  assertNonEmptyString(value, field);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    throw new Error(`Invalid content: ${field} must be a valid email address.`);
  }
}

function assertUnique(values: string[], field: string) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Invalid content: duplicate ${field} "${value}".`);
    }
    seen.add(value);
  }
}

export function validateProject(project: unknown, index: number): Project {
  const field = `projects[${index}]`;
  assertRecord(project, field);
  if (typeof project.id !== "number" || !Number.isInteger(project.id) || project.id < 1) {
    throw new Error(`Invalid content: ${field}.id must be a positive integer.`);
  }
  assertSlug(project.slug, `${field}.slug`);
  assertNonEmptyString(project.title, `${field}.title`);
  assertNonEmptyString(project.desc, `${field}.desc`);
  assertStringArray(project.stack, `${field}.stack`);
  assertUrl(project.url, `${field}.url`, true);

  if (project.highlights !== undefined) {
    assertStringArray(project.highlights, `${field}.highlights`);
  }

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    desc: project.desc,
    stack: [...project.stack],
    url: project.url,
    highlights: project.highlights ? [...project.highlights] : undefined,
  };
}

export function validateSocial(social: unknown, index: number): Social {
  const field = `socials[${index}]`;
  assertRecord(social, field);
  if (typeof social.id !== "number" || !Number.isInteger(social.id) || social.id < 1) {
    throw new Error(`Invalid content: ${field}.id must be a positive integer.`);
  }
  assertNonEmptyString(social.title, `${field}.title`);
  assertUrl(social.url, `${field}.url`);

  return {
    id: social.id,
    title: social.title,
    url: social.url,
  };
}

export function validateExperience(experience: unknown, index: number): Experience {
  const field = `experience[${index}]`;
  assertRecord(experience, field);
  assertNonEmptyString(experience.role, `${field}.role`);
  assertNonEmptyString(experience.company, `${field}.company`);
  assertNonEmptyString(experience.period, `${field}.period`);
  assertStringArray(experience.highlights, `${field}.highlights`);

  return {
    role: experience.role,
    company: experience.company,
    period: experience.period,
    highlights: [...experience.highlights],
  };
}

export function validateEducation(education: unknown, index: number): Education {
  const field = `education[${index}]`;
  assertRecord(education, field);
  assertNonEmptyString(education.title, `${field}.title`);
  assertNonEmptyString(education.desc, `${field}.desc`);

  return {
    title: education.title,
    desc: education.desc,
  };
}

export function validateProfile(profile: unknown): Profile {
  assertRecord(profile, "profile");
  assertNonEmptyString(profile.name, "profile.name");
  assertEmail(profile.email, "profile.email");
  assertNonEmptyString(profile.location, "profile.location");
  assertNonEmptyString(profile.promptHost, "profile.promptHost");
  assertUrl(profile.resumeUrl, "profile.resumeUrl", true);
  assertUrl(profile.sourceUrl, "profile.sourceUrl");
  assertNonEmptyString(profile.bio, "profile.bio");
  assertNonEmptyString(profile.focus, "profile.focus");

  return {
    name: profile.name,
    email: profile.email,
    location: profile.location,
    promptHost: profile.promptHost,
    resumeUrl: profile.resumeUrl,
    sourceUrl: profile.sourceUrl,
    bio: profile.bio,
    focus: profile.focus,
  };
}

export function validatePortfolioContent(content: unknown): PortfolioContent {
  assertRecord(content, "portfolio content");

  if (!Array.isArray(content.projects)) {
    throw new Error("Invalid content: projects must be an array.");
  }
  if (!Array.isArray(content.socials)) {
    throw new Error("Invalid content: socials must be an array.");
  }
  if (!Array.isArray(content.skills)) {
    throw new Error("Invalid content: skills must be an array.");
  }
  if (!Array.isArray(content.experience)) {
    throw new Error("Invalid content: experience must be an array.");
  }
  if (!Array.isArray(content.education)) {
    throw new Error("Invalid content: education must be an array.");
  }

  assertStringArray(content.skills, "skills");

  const projects = content.projects.map(validateProject);
  const socials = content.socials.map(validateSocial);
  const experience = content.experience.map(validateExperience);
  const education = content.education.map(validateEducation);
  const profile = validateProfile(content.profile);

  assertUnique(projects.map(project => project.id.toString()), "project id");
  assertUnique(projects.map(project => project.slug), "project slug");
  assertUnique(socials.map(social => social.id.toString()), "social id");
  assertUnique(socials.map(social => social.title), "social title");

  return {
    projects,
    socials,
    skills: [...content.skills],
    experience,
    education,
    profile,
  };
}

export function validateBlogMetadata(metadata: unknown, slug: string): BlogMetadata {
  const field = `post "${slug}" metadata`;
  assertRecord(metadata, field);
  assertNonEmptyString(metadata.title, `${field}.title`);
  assertDate(metadata.publishedAt, `${field}.publishedAt`);
  assertNonEmptyString(metadata.summary, `${field}.summary`);

  if (metadata.image !== undefined) {
    assertUrl(metadata.image, `${field}.image`, true);
  }

  return {
    title: metadata.title,
    publishedAt: metadata.publishedAt,
    summary: metadata.summary,
    image: metadata.image,
  };
}

export function validateBlogPosts(posts: BlogPost[]): BlogPost[] {
  assertUnique(posts.map(post => post.slug), "post slug");
  return posts.map(post => ({
    slug: post.slug,
    metadata: { ...post.metadata },
    content: post.content,
  }));
}
