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
  // {
  //   id: 1,
  //   slug: "sockets-and-pipes",
  //   title: "Sockets and Pipes",
  //   desc: "A Haskell systems project building an HTTP server from scratch while learning sockets, Unix I/O, and network protocols.",
  //   stack: ["Haskell", "Unix", "Sockets", "HTTP"],
  //   url: "https://github.com/Sao-Ali/sockets-and-pipes",
  //   image: "/projects/sockets-and-pipes.jpeg",
  // },
  {
    id: 2,
    slug: "vetch",
    title: "Vetch",
    desc: "A Kubernetes operator for VM provisioning, designed for measured AI inference across AWS and Qualcomm edge hardware.",
    stack: ["Go", "Kubernetes", "KubeVirt", "AWS", "Nix", "Edge AI"],
    url: "https://github.com/Sao-Ali/vetch",
    image: "/projects/vetch-architecture.svg",
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
    id: 5,
    slug: "sana-aligner",
    title: "Hayes Lab Research Tools",
    desc: "A research website helping 200+ researchers nationwide discover and use network alignment tools, including SANA.",
    stack: ["Research Tools", "Web Development", "Network Alignment"],
    url: "https://hayeslab.ics.uci.edu/tools",
    image: "/SANA.png",
  },
  {
    id: 6,
    slug: "room-booking",
    title: "Engineering Room Booking System",
    desc: "Room reservations for the engineering student body, serving 500+ users with a simpler way to find and book space.",
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
