export interface Project {
  slug: string;
  title: string;
  blurb: string; // short, shown on card
  preview: string; // hover preview text
  description: string[]; // modal paragraphs
  tags: string[];
  images: string[];
  cover: string;
  links: { label: string; href: string }[];
  year?: string;
  role?: string;
}

export const projects: Project[] = [
  {
    slug: "coldsoup",
    title: "Coldsoup",
    blurb: " I use it every day with my various teams to stay structured.",
    preview:
      "A team messenger I built for internal use, that got way more sophisticated than I expected. I use it every day with my various teams to stay structured.",
    description: [
      "coldsoup - a team messenger i initially built for internal use with one idea: no DMs, no channels, just threads inside groups. Every thread has an OPEN / URGENT / DONE status, so the whole team can see what's handled and what's on fire without asking.",
      "The status model. A thread isn't just a chat - it's a task with a state. You always know what's still open and what's done, without anyone chasing for updates.",
      "Installs like an app. It's a PWA, so it lives on your home screen and opens like a native app. One codebase, works everywhere.",
      "Deployed and live on Vercel and Supabase.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Vercel",
      "React Native",
      "Resend",
    ],
    images: ["/coldsoup-mocks/1.png"],
    cover: "/coldsoup-mocks/1.png",
    links: [
      { label: "Live", href: "https://coldsoup.kallsup.se/" },
      { label: "GitHub", href: "https://github.com/konceptaWilliam/coldsoup" },
    ],
    year: "2026 - now",
    role: "System development/design",
  },
  {
    slug: "skoldatabasen",
    title: "Skoldatabasen",
    blurb: "",
    preview:
      "Built a full internal CRM for Aktiv Skola to manage a national database of Swedish schools.",
    description: [
      "Built a full internal CRM for Aktiv Skola to manage a national database of Swedish schools - search, contacts, notes, and a newsletter pipeline that keeps thousands of subscribers in sync with Mailchimp. Fast, clean, and built around how the team actually works day to day.",
      "Natural-language search. You can type something like 'schools in Gothenburg with a librarian' and it gets parsed into a real query. If that fails for any reason, it quietly falls back to keyword search instead of breaking.",
      "A detail-first data model. Schools, contacts, classes, and notes all live in one drill-in view. Inline editing, contact memos, soft-delete, and a record of who changed what and when.",
      "Node.js + SQL Server on the backend. Lookups are batched to stay under SQL Server's 2,100-parameter limit, writes are chunked, and the query layer holds up as the dataset grows.",
      "Mailchimp sync, with a deliberate safety call: unsubscribes get archived out of the audience entirely instead of just losing a tag. That way a campaign sent to the wrong list can't reach people who opted out. It's reversible, and tagging runs through async batches to avoid a registration race.",
      "Bulk newsletter tooling. Excel/CSV import matched on email, live subscriber counts, filtered CSV export, and a one-click push to Mailchimp.",
    ],
    tags: [
      "React.js",
      "TypeScript",
      "Node.js",
      "SQL Server",
      "Mailchimp",
      "Tailwind",
    ],
    images: [
      "/skoldb-mocks/1.png",
      "/skoldb-mocks/3.png",
      "/skoldb-mocks/4.png",
      "/skoldb-mocks/5.png",
      "/skoldb-mocks/6.png",
    ],
    cover: "/skoldb-mocks/6.png",
    links: [],
    year: "2025 — now",
    role: "System development/design",
  },

  {
    slug: "bondgarden",
    title: "Bondgården - Digital learning platform",
    blurb: "",
    preview:
      "Built a full browser-based learning platform for Aktiv Skola, aimed to Swedish children aged 7–11.",
    description: [
      "Built a full JS browser-based learning platform for Aktiv Skola, aimed to Swedish children aged 7–11. 20+ educational games across math, spelling, and general knowledge, wrapped in a joyful farm world kids actually want to return to.",
      "20+ mini-games in Phaser 3 (arcade/physics) and vanilla JS (quiz, word, puzzle). All mobile-first with full touch support",
      "Iframe-isolated architecture. Each game runs sandboxed in a shared game shell, with a reusable component library (highscore, sound, currency, item-drops, custom avatar creator etc)",
      "PHP + database backend. save system, reward claiming, and a custom analytics pipeline tracking sessions, engagement, and player identity",
      "Installable PWA with offline support",
      "Kids-first-approach. playable avatars, virtual garden, coins, collectibles, and a warm, animated visual identity built for ages 7–11",
      "Internal tooling. a custom scaffolding + code-review system to ship new games fast and keep quality consistent",
      "A platform, not just a game. architecture, backend, game design, and UX in one project",
      "Developed and maintaned as a live-service product, with new content and features added continuously since 2024. Used by thousands of Swedish children in schools and at home, with a growing library of educational games and activities.",
    ],
    tags: ["JavaScript", "Phaser 3", "PHP", "HTML", "SVG", "CSS"],
    images: [
      "/bondgarden-mocks/bond1.png",
      "/bondgarden-mocks/bond2.png",
      "/bondgarden-mocks/bond3.png",
      "/bondgarden-mocks/bond4.png",
      "/bondgarden-mocks/bond5.png",
    ],
    cover: "/bondgarden-mocks/bond1.png",
    links: [],
    year: "2024 — now",
    role: "System development/design",
  },
];
