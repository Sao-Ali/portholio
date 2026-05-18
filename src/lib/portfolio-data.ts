export type Project = {
  id: number;
  slug: string;
  title: string;
  desc: string;
  stack: string[];
  url: string;
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

export const projects: Project[] = [
  {
    id: 1,
    slug: "haskell-habit",
    title: "Haskell Habit Tracker",
    desc: "A CLI-first habit tracker built to learn functional programming while owning a lightweight daily workflow.",
    stack: ["Haskell", "CLI", "Functional Programming"],
    url: "https://github.com/Sao-Ali/haskell-habit-tracker",
  },
  {
    id: 2,
    slug: "hft-system",
    title: "HFT-System",
    desc: "A high-frequency trading senior design platform focused on fast UI panels, market data tables, and FPGA-connected workflows.",
    stack: ["React", "TypeScript", "WebSockets", "FPGA"],
    url: "https://github.com/vrushang1234/hft-system",
  },
  {
    id: 3,
    slug: "sana-aligner",
    title: "SANA Neural Network Aligner",
    desc: "Work around SANA, a neural network alignment project for comparing and mapping graph-like model structures.",
    stack: ["Research Software", "Algorithms", "C++"],
    url: "https://github.com/waynebhayes/SANA",
  },
  {
    id: 4,
    slug: "room-booking",
    title: "Engineering Room Booking System",
    desc: "A booking system for engineering rooms, built as a practical web app for scheduling shared resources.",
    stack: ["Next.js", "TypeScript", "Web App"],
    url: "https://ics-259.vercel.app/",
  },
];

export const socials: Social[] = [
  {
    id: 1,
    title: "GitHub",
    url: "https://github.com/sao-ali",
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/ali-sao/",
  },
  {
    id: 3,
    title: "Source",
    url: "https://github.com/Sao-Ali/portholio",
  },
];

export const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "C++",
  "JavaScript",
  "Haskell",
  "WebSockets",
  "Data structures and algorithms",
  "Hardware/software integration",
  "Mission-critical data workflows",
];

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Panasonic Avionics",
    period: "2025",
    highlights: [
      "Connected low-level C++ LRU fault data to a JavaScript-driven technician interface.",
      "Built fault display and export workflows for structured reports.",
      "Handled removable-device logic so reports could be saved securely in the field.",
    ],
  },
  {
    role: "Frontend / Systems Contributor",
    company: "HFT Senior Design",
    period: "UCI",
    highlights: [
      "Building UI panels for market data, orders, fills, and top-of-book snapshots.",
      "Designing fast table components and websocket paths for FPGA-connected data.",
    ],
  },
];

export const education: Education[] = [
  {
    title: "B.S. Computer Engineering",
    desc: "University of California, Irvine",
  },
];

export const profile = {
  name: "Ali Sao",
  email: "asao1@uci.edu",
  location: "OC/LA",
  promptHost: "ali-sao.dev",
  resumeUrl: "/resume.pdf",
  sourceUrl: "https://github.com/Sao-Ali/portholio",
  bio: "Computer Engineering student building full-stack applications, infrastructure, and system integrations.",
  focus:
    "I work across full-stack development, infrastructure, and integration between software systems, with a growing interest in software that connects to hardware.",
};
