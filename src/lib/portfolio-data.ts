import type { Education, Experience, Profile, Project, Social } from "@/lib/content/schema";

export type { Education, Experience, Profile, Project, Social } from "@/lib/content/schema";

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
  {
    id: 5,
    slug: "radar-console",
    title: "Radar Console",
    desc: "A real-time radar simulation and tracking console with a Haskell DSP backend and React/TypeScript operator UI.",
    stack: ["Haskell", "React", "TypeScript", "WebSockets", "DSP"],
    url: "https://github.com/Sao-Ali/radar-console",
    highlights: [
      "Built a Haskell backend that generates synthetic radar range profiles, performs signal detection, tracks moving targets, and streams live results to the UI.",
      "Implemented DSP-style signal processing with Gaussian target-return simulation, dB range profiles, median noise-floor estimation, local peak detection, SNR filtering, and range-bin mapping.",
      "Developed 1D and 2D tracking with nearest-neighbor association, distance gating, lifecycle management, alpha-beta filtering, and velocity estimation.",
      "Simulated classified targets such as drones, planes, and birds with synthetic motion models, measurement noise, amplitude/SNR signatures, and mock classification confidence.",
      "Designed a JSON WebSocket protocol with Haskell aeson, websockets, and STM for live/replay modes, health messages, detections, and track updates.",
      "Built the React, TypeScript, Vite, and Canvas radar scope to visualize detections, tracks, classes, SNR, speed, latency, and system status.",
    ],
  },
  {
    id: 6,
    slug: "signaldeck",
    title: "SignalDeck",
    desc: "A Haskell-powered terminal telemetry dashboard that validates numeric streams and renders live metrics with sparklines.",
    stack: ["Haskell", "Cabal", "Brick", "Vty", "Nix"],
    url: "https://github.com/Sao-Ali/SignalDeck",
    highlights: [
      "Built a terminal telemetry dashboard that ingests numeric metric streams from files, stdin pipelines, or live demo sources.",
      "Implemented rolling-window state management to track recent samples, current value, average value, invalid rows, and blank rows.",
      "Rendered lightweight terminal visualizations, including Unicode sparklines for real-time trend monitoring.",
      "Developed an interactive TUI using Brick and Vty with pause/resume controls, keyboard input handling, and live updating telemetry.",
      "Separated pure data-processing logic from IO/rendering code and added tests for parsing, validation, rolling windows, and display output.",
    ],
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

export const profile: Profile = {
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
