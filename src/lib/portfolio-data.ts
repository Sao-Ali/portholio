export type Project = {
  id: number;
  slug: string;
  title: string;
  desc: string;
  stack: string[];
  url: string;
  image: string;
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
    slug: "sockets-and-pipes",
    title: "Sockets and Pipes",
    desc: "A Haskell systems project building an HTTP server from scratch while learning sockets, Unix I/O, and network protocols.",
    stack: ["Haskell", "Unix", "Sockets", "HTTP"],
    url: "https://github.com/Sao-Ali/sockets-and-pipes",
    image: "/projects/sockets-and-pipes.jpeg",
  },
  {
    id: 2,
    slug: "haskell-1m-request",
    title: "Haskell 1M Request",
    desc: "A Haskell version of the Handling 1 Million Requests project, using Servant with Postgres, Redis, and AWS EC2 deployment work.",
    stack: ["Haskell", "Postgres", "Redis", "AWS", "EC2", "Servant"],
    url: "https://github.com/Sao-Ali/haskell-1m-request",
    image: "/projects/haskell-1m-request.png",
  },
  {
    id: 3,
    slug: "haskell-dataframe",
    title: "Haskell DataFrame",
    desc: "A Haskell data-frame project for exploring typed tabular data, parsing, and data processing workflows.",
    stack: ["Haskell", "Data Processing", "Typed APIs"],
    url: "https://github.com/Sao-Ali/haskell-dataframe",
    image: "/projects/haskell-dataframe.gif",
  },
  {
    id: 4,
    slug: "hft-system",
    title: "HFT-System",
    desc: "A high-frequency trading senior design platform focused on fast UI panels, market data tables, and FPGA-connected workflows.",
    stack: ["React", "TypeScript", "WebSockets", "FPGA"],
    url: "https://github.com/vrushang1234/hft-system",
    image: "/projects/hft.png",
  },
  {
    id: 5,
    slug: "sana-aligner",
    title: "SANA Neural Network Aligner",
    desc: "Work around SANA, a neural network alignment project for comparing and mapping graph-like model structures.",
    stack: ["Research Software", "Algorithms", "C++"],
    url: "https://github.com/waynebhayes/SANA",
    image: "/SANA.png",
  },
  {
    id: 6,
    slug: "room-booking",
    title: "Engineering Room Booking System",
    desc: "A booking system for engineering rooms, built as a practical web app for scheduling shared resources.",
    stack: ["Next.js", "TypeScript", "Web App"],
    url: "https://ics-259.vercel.app/",
    image: "/Project 1.png",
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
