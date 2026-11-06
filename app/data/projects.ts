export type ProjectCategory = "professional" | "personal";

export type IconKey = "landmark" | "trending" | "wealth" | "payments" | "ecommerce" | "music";

export type Project = {
  id: string;
  category: ProjectCategory;
  name: string;
  /** Industry label shown as a badge, e.g. "Banking". */
  industry: string;
  icon: IconKey;
  /** Plain-text wordmark, used only when no logo file is provided. */
  brand?: string;
  /** Optional: logo file under /public (white/transparent PNG works best), shown in the preview visual. */
  logo?: string;
  tech: string[];
  description: string;
  /** Two gradient stops used for the preview visual and selected-card accent. */
  accent: [string, string];
  /** Optional: only renders a "View Project" button when a real URL exists. */
  url?: string;
  /** Optional: path under /public, e.g. "/projects/agan-fm.png". Replaces the abstract visual. */
  image?: string;
};

export const INITIAL_PROFESSIONAL_COUNT = 4;

export const projects: Project[] = [
  {
    id: "dbs-client-connect",
    logo: "/dbs.png",
    category: "professional",
    name: "DBS – Client Connect",
    industry: "Banking",
    icon: "landmark",
    brand: "DBS",
    tech: ["React", "Redux", "TypeScript", "Material UI"],
    description: "A service-request experience designed to simplify customer and operational workflows.",
    accent: ["#22d3ee", "#3b82f6"]
  },
  {
    id: "sc-credx",
    logo: "/scb.png",
    category: "professional",
    name: "Standard Chartered – CREDX",
    industry: "Fintech",
    icon: "trending",
    brand: "Standard|Chartered",
    tech: ["React", "Redux Saga", "Styled Components", "Jest", "Next.js"],
    description: "Enterprise front-end development for a banking platform, with a focus on reusable UI and reliable delivery.",
    accent: ["#34d399", "#14b8a6"]
  },
  {
    id: "ubs-fif",
    logo: "/ubs.png",
    category: "professional",
    name: "UBS – Financial Instrument Finder",
    industry: "Wealth Management",
    icon: "wealth",
    brand: "UBS",
    tech: ["React", "Redux", "TypeScript", "Material UI", "Jest"],
    description:
      "A standalone search engine for wealth-management professionals to find financial instruments by keyword, refine results by country, range, date and instrument type, and move selected items into other applications.",
    accent: ["#38bdf8", "#6366f1"]
  },
  {
    id: "uob-rpp",
    logo: "/uob.png",
    category: "professional",
    name: "UOB – Retail Payment Platform",
    industry: "Payments",
    icon: "payments",
    brand: "UOB",
    tech: ["React", "Redux", "TypeScript", "Material UI", "Jest", "Jenkins"],
    description:
      "A payment platform for shoppers coming from merchant sites. It connects to UOB's payment gateway to process card and bank payments, then returns customers to the merchant with a clear success, failed, rejected or expired status.",
    accent: ["#fb7185", "#a855f7"]
  },
  {
    id: "collect-forever",
    logo: "/cf-logo.png",
    category: "professional",
    name: "Collect Forever",
    industry: "E-commerce",
    icon: "ecommerce",
    tech: ["Web application"],
    description: "An online collectibles and comic-book shopping experience.",
    accent: ["#fb923c", "#ec4899"]
  },
  {
    id: "agan-fm",
    category: "personal",
    name: "Agan FM",
    industry: "Music / Entertainment",
    icon: "music",
    brand: "Agan FM",
    tech: ["Mobile app", "React Native"],
    description: "A Tamil-focused radio listening experience bringing online stations and curated audio together.",
    accent: ["#a78bfa", "#d946ef"]
  }
];
