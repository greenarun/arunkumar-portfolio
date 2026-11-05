"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown, ArrowRight, ArrowUpRight, Code2, Download, Github,
  Linkedin, Mail, Menu, Palette, Sparkles, X, Layers3, BriefcaseBusiness,
  GraduationCap, MapPin, ExternalLink
} from "lucide-react";
import { useState } from "react";

const skills = [
  "React.js", "Next.js", "JavaScript", "TypeScript", "Vue.js", "Redux",
  "Node.js", "React Native", "HTML5", "CSS3", "SASS / LESS", "Bootstrap",
  "Tailwind CSS", "Material UI", "Figma", "Photoshop", "Sketch"
];

const experience = [
  { company: "Dynamics Inc.", role: "Full Stack Developer", period: "Jan 2025 – Sep 2025", detail: "Worked on e-commerce experiences, including comic-book and collectibles platforms." },
  { company: "Optimum Solution", role: "Senior Front-End Developer", period: "May 2023 – Dec 2024 · Mar 2019 – Jun 2020", detail: "Front-end engineering across banking and wealth-management applications using React, Next.js, TypeScript and modern UI tooling." },
  { company: "I2S Business Solution Pte Ltd", role: "Senior Front-End React Developer", period: "Sep 2022 – Apr 2023", detail: "Contributed to a DBS Singapore service-request portal using React, Redux, TypeScript, Material UI and micro-frontend architecture." },
  { company: "PersolKelly", role: "Tech Lead – Front End", period: "Jun 2020 – Jul 2021", detail: "Front-end technical leadership and delivery for enterprise financial-services applications." },
  { company: "Aleph Labs", role: "Front-End Developer", period: "May 2016 – Jan 2019", detail: "Built digital experiences for enterprise clients across banking and telecommunications." },
  { company: "Renault Nissan Technology & Business Centre India", role: "Senior Front-End Developer", period: "Jun 2013 – Jan 2016", detail: "Developed and optimized front-end solutions for Renault and Nissan automotive applications, delivering intuitive, high-performance interfaces for vehicle-related systems." },
  { company: "Infosys", role: "Senior Process Executive", period: "Feb 2012 – Jun 2013", detail: "Designed and developed user-centric web interfaces for GlaxoSmithKline, creating visually appealing, functional websites that improved user experience and supported client business goals." }
];

type Project = { name: string; symbol: string; type: string; description: string; accent: string; tag: string; brand?: string; logoSrc?: string };

const projects: Project[] = [
  { name: "DBS – Client Connect", brand: "DBS", symbol: "⌘", type: "Banking · React · Redux · TypeScript", description: "A service-request experience designed to simplify customer and operational workflows.", accent: "from-cyan-400/25 to-blue-500/10", tag: "BANKING" },
  { name: "Standard Chartered – CREDX", brand: "Standard|Chartered", symbol: "◈", type: "Banking · React · Azure DevOps", description: "Enterprise front-end development for a banking platform, with a focus on reusable UI and reliable delivery.", accent: "from-emerald-400/25 to-teal-500/10", tag: "FINTECH" },
  { name: "UBS – Financial Instrument Finder", brand: "UBS", symbol: "◎", type: "Wealth Management · React · Redux · TypeScript · Material UI · Jest", description: "A standalone search engine for wealth-management professionals to find financial instruments by keyword, refine results by country, range, date and instrument type, and move selected items into other applications.", accent: "from-sky-400/25 to-indigo-500/10", tag: "WEALTH MGMT" },
  { name: "UOB – Retail Payment Platform", brand: "UOB", symbol: "◇", type: "Payments · React · Redux · TypeScript · Material UI · Jest · Jenkins", description: "A payment platform for shoppers coming from merchant sites. It connects to UOB's payment gateway to process card and bank payments, then returns customers to the merchant with a clear success, failed, rejected or expired status.", accent: "from-rose-400/25 to-purple-500/10", tag: "PAYMENTS" },
  { name: "Collect Forever", symbol: "✳", type: "E-commerce · Web application", description: "An online collectibles and comic-book shopping experience.", accent: "from-orange-400/25 to-pink-500/10", tag: "E-COMMERCE" },
  { name: "Agan FM", symbol: "♫", type: "Personal project · Mobile app", description: "A Tamil-focused radio listening experience bringing online stations and curated audio together.", accent: "from-violet-400/25 to-fuchsia-500/10", tag: "PERSONAL PROJECT" }
];

function ProjectPreview({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const stack = project.type.split("·").map((t) => t.trim());
  return (
    <div className="preview-card glass">
      <div className={`project-art preview-art bg-gradient-to-br ${project.accent}`}>
        <span>{project.tag}</span>
        {project.logoSrc ? <img className="project-logo-img" src={project.logoSrc} alt="" /> : project.brand ? <div className={`project-brand brand-${project.brand.replace("|", "").toLowerCase()}`}>{project.brand.split("|").map((l, n) => <span key={n}>{l}</span>)}</div> : <div className="project-symbol">{project.symbol}</div>}
      </div>
      <div className="project-content">
        <h3>{project.name}</h3>
        <div className="preview-stack">{stack.map((t) => <i key={t}>{t}</i>)}</div>
        <p>{project.description}</p>
      </div>
    </div>
  );
}

const INITIAL_PROJECTS = 4;

function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_PROJECTS);
  const hiddenCount = projects.length - INITIAL_PROJECTS;
  return (
    <div className="showcase">
      <div className="showcase-left">
      <ul className="showcase-list">
        {visible.map((project, i) => (
          <li key={project.name} className={i === active ? "active" : ""}>
            <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-expanded={i === active}>
              <em>{String(i + 1).padStart(2, "0")}</em>
              <span className="showcase-name">{project.name}</span>
              <small>{project.tag}</small>
              <ArrowUpRight size={18} className="showcase-arrow" />
            </button>
            <div className="showcase-inline"><ProjectPreview project={project} index={i} /></div>
          </li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <button type="button" className="view-more" onClick={() => { setExpanded(!expanded); if (expanded && active >= INITIAL_PROJECTS) setActive(0); }} aria-expanded={expanded}>
          {expanded ? "Show less" : `View more (${hiddenCount})`}
          <ArrowRight size={15} className={expanded ? "flip" : ""} />
        </button>
      )}
      </div>
      <div className="showcase-preview" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}>
            <ProjectPreview project={projects[active]} index={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [["About", "#about"], ["Skills", "#skills"], ["Experience", "#experience"], ["Projects", "#projects"], ["Education", "#education"], ["Contact", "#contact"]];
  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand" href="#home"><span className="brand-mark">A</span><span>ARUNKUMAR<span className="brand-muted">.DEV</span></span></a>
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="nav-cta" href="#contact">Let&apos;s talk <ArrowUpRight size={15} /></a>
          </div>
        </nav>
      </header>

      <section id="home" className="hero container">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <div className="availability"><span className="pulse" /> OPEN TO INTERESTING OPPORTUNITIES</div>
          <p className="hello">Hello, I&apos;m</p>
          <h1>Arunkumar<br /><span>Packirisamy</span></h1>
          <h2>Full Stack Developer <i>&</i> UX Specialist</h2>
          <p className="hero-description">I build thoughtful, scalable web and mobile experiences — combining strong front-end engineering with a passion for clean, user-focused design.</p>
          <div className="hero-meta"><span><BriefcaseBusiness size={15} /> 15+ years experience</span><span><MapPin size={15} /> Singapore</span></div>
          <div className="hero-actions">
            <a className="button primary" href="#projects">Explore my work <ArrowRight size={17} /></a>
            <a className="button secondary" href="/Arunkumar-Packirisamy-Resume.pdf" target="_blank" rel="noreferrer"><Download size={16} /> Resume PDF</a>
          </div>
          <div className="socials">
            <a href="https://www.linkedin.com/in/greenarun/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href="https://github.com/greenarun" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="mailto:greenarun09@gmail.com" aria-label="Email"><Mail /></a>
          </div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}>
          <div className="portrait-orbit orbit-a" /><div className="portrait-orbit orbit-b" />
          <div className="portrait-frame"><Image src="/profile-cutout.png" alt="Illustrated profile portrait of Arunkumar Packirisamy" fill priority sizes="(max-width: 768px) 75vw, 440px" className="portrait" /></div>
          <div className="floating-card card-code"><Code2 size={18} /><span>Clean code<br /><b>Thoughtful UI</b></span></div>
          <div className="floating-card card-years"><Sparkles size={17} /><span><b>15+</b><small>Years building</small></span></div>
          <div className="visual-caption">DESIGN WITH PURPOSE <span>✳</span> BUILD WITH CARE</div>
        </motion.div>
        <a className="scroll-cue" href="#about"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
      </section>

      <section id="about" className="section container">
        <SectionTitle eyebrow="A LITTLE ABOUT ME" title="Engineering meets creativity." text="I enjoy turning complex requirements into intuitive, reliable digital products." />
        <div className="about-grid">
          <div className="about-copy glass">
            <span className="number">01 / ABOUT</span>
            <h3>Curious by nature.<br /><em>Developer by craft.</em></h3>
            <p>I am a software developer with 15+ years of experience building web and mobile applications. My work spans front-end engineering, full-stack development and UX-focused implementation.</p>
            <p>Over the years, I have contributed to projects in the banking and financial-services domain, as well as e-commerce and consumer applications. I value maintainable code, thoughtful interfaces and collaborative delivery.</p>
            <a className="text-link" href="#contact">More about working together <ArrowUpRight size={16} /></a>
          </div>
          <div className="about-stats">
            <div className="stat-card"><span>15+</span><p>Years of experience</p></div>
            <div className="stat-card"><span>Web +</span><p>Mobile development</p></div>
            <div className="stat-card"><span>FinTech</span><p>Banking domain experience</p></div>
            <div className="stat-card"><span>UX</span><p>Design-minded engineering</p></div>
          </div>
        </div>
      </section>

      <section id="skills" className="section container">
        <SectionTitle eyebrow="MY TOOLKIT" title="Skills & technologies." text="A practical toolkit for building polished products from interface to application logic." />
        <div className="skills-panel glass">
          <div className="skill-heading"><Layers3 /><div><h3>Technologies I work with</h3><p>Continuously learning, improving and exploring.</p></div></div>
          <div className="skill-list">{skills.map((skill, i) => <span className="skill-chip" key={skill}><i>{String(i + 1).padStart(2, "0")}</i>{skill}</span>)}</div>
          <div className="skill-foot"><span>FRONT-END</span><span>BACK-END</span><span>UI / UX</span><span>TOOLS & DELIVERY</span></div>
        </div>
      </section>

      <section id="experience" className="section container">
        <SectionTitle eyebrow="THE JOURNEY" title="Experience that shapes perspective." text="Selected roles and client engagements from my professional journey. Please verify dates and titles before publishing." />
        <div className="timeline">{experience.map((item, i) => <motion.article className="timeline-item glass" key={item.company} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}><div className="timeline-dot" /><div className="timeline-top"><span className="timeline-period">{item.period}</span><span className="timeline-index">0{i + 1}</span></div><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.detail}</p></motion.article>)}</div>
      </section>

      <section id="projects" className="section container">
        <SectionTitle eyebrow="SELECTED WORK" title="A few things I’ve helped build." text="A mix of enterprise platforms and personal projects. Client work is described at a high level." />
        <ProjectShowcase />
      </section>

      <section id="education" className="section container">
        <SectionTitle eyebrow="FOUNDATIONS" title="Education & achievements." />
        <div className="education-grid">
          <article className="glass education-card"><GraduationCap /><span className="eyebrow">POSTGRADUATE</span><h3>Master of Computer Applications</h3><p>Jamal Mohamed College</p><small>Affiliated to Bharathidasan University · CGPA 8.0</small></article>
          <article className="glass education-card"><GraduationCap /><span className="eyebrow">UNDERGRADUATE</span><h3>B.Sc. Computer Science</h3><p>A.V.V.M. Sri Pushpam College</p><small>Bharathidasan University · 77% · First Class</small></article>
          <article className="glass education-card achievement"><Sparkles /><span className="eyebrow">HIGHLIGHT</span><h3>Academic achievement</h3><p>Top 5% performance in high school and college examinations.</p><small>Include certificates or supporting details if you want to feature this publicly.</small></article>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container contact-inner"><div><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let&apos;s create something<br /><span>meaningful together.</span></h2><p>I&apos;m happy to connect about software engineering, front-end opportunities and interesting product ideas.</p></div><div className="contact-actions"><a className="button primary" href="mailto:greenarun09@gmail.com">Get in touch <ArrowUpRight size={17} /></a><a className="button secondary" href="https://www.linkedin.com/in/greenarun/" target="_blank" rel="noreferrer"><Linkedin size={16} /> Connect on LinkedIn</a><a className="button secondary" href="https://github.com/greenarun" target="_blank" rel="noreferrer"><Github size={16} /> View GitHub</a></div></div>
      </section>

      <footer className="footer container"><a className="brand" href="#home"><span className="brand-mark">A</span><span>ARUNKUMAR<span className="brand-muted">.DEV</span></span></a><p>Designed with curiosity. Built with care.</p><span>© {new Date().getFullYear()} Arunkumar Packirisamy</span></footer>
    </main>
  );
}
