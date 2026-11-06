"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BriefcaseBusiness, CreditCard, ExternalLink, Landmark,
  Music2, PieChart, ShoppingBag, Star, TrendingUp, type LucideIcon
} from "lucide-react";
import { INITIAL_PROFESSIONAL_COUNT, projects, type IconKey, type Project, type ProjectCategory } from "../data/projects";

const iconMap: Record<IconKey, LucideIcon> = {
  landmark: Landmark,
  trending: TrendingUp,
  wealth: PieChart,
  payments: CreditCard,
  ecommerce: ShoppingBag,
  music: Music2
};

const categories: { id: ProjectCategory; label: string; Icon: LucideIcon }[] = [
  { id: "professional", label: "Professional Projects", Icon: BriefcaseBusiness },
  { id: "personal", label: "Personal Projects", Icon: Star }
];

function accentStyle(project: Project) {
  return { "--a": project.accent[0], "--b": project.accent[1] } as React.CSSProperties;
}

function ProjectPreview({ project, featured = false }: { project: Project; featured?: boolean }) {
  const Icon = iconMap[project.icon];
  const brandLines = project.brand?.split("|");
  const brandClass = project.brand ? project.brand.replace("|", "").toLowerCase().replace(/\s+/g, "") : "";
  return (
    <article className={`sw-preview glass ${featured ? "featured" : ""}`} style={accentStyle(project)}>
      <div className="sw-art">
        {project.image ? (
          <Image src={project.image} alt={`${project.name} preview`} fill sizes="(max-width: 850px) 100vw, 520px" className="sw-art-img" />
        ) : (
          <>
            <Icon className="sw-art-icon" strokeWidth={1.2} aria-hidden />
            {project.logo ? (
              <div className="sw-logo">
                <Image src={project.logo} alt={`${project.name} logo`} fill sizes="260px" className="sw-logo-img" />
              </div>
            ) : brandLines && (
              <div className={`sw-brand sw-brand-${brandClass}`}>
                {brandLines.map((line) => <span key={line}>{line}</span>)}
              </div>
            )}
          </>
        )}
        <span className="sw-badge"><Icon size={13} aria-hidden /> {project.industry}</span>
      </div>
      <div className="sw-body">
        <h3>{project.name}</h3>
        <ul className="sw-tech" aria-label="Technologies">
          {project.tech.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p>{project.description}</p>
        {project.url && (
          <a className="button primary sw-cta" href={project.url} target="_blank" rel="noreferrer">
            View Project <ExternalLink size={15} aria-hidden />
          </a>
        )}
      </div>
    </article>
  );
}

export default function SelectedWork() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<ProjectCategory>("professional");
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(projects[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);

  const list = projects.filter((p) => p.category === category);
  const limit = category === "professional" && !expanded ? INITIAL_PROFESSIONAL_COUNT : list.length;
  const visible = list.slice(0, limit);
  const hiddenCount = list.length - visible.length;
  const canToggle = category === "professional" && list.length > INITIAL_PROFESSIONAL_COUNT;
  const active = visible.find((p) => p.id === activeId) ?? visible[0];
  const featured = list.length === 1;
  const dur = reduce ? 0 : 0.28;

  // Keep the selection valid when the list changes.
  useEffect(() => {
    if (!visible.some((p) => p.id === activeId)) setActiveId(visible[0].id);
  }, [category, expanded]); // eslint-disable-line react-hooks/exhaustive-deps

  const switchCategory = (next: ProjectCategory) => {
    if (next === category) return;
    setCategory(next);
    setExpanded(false);
    setActiveId(projects.find((p) => p.category === next)!.id);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = categories.length - 1;
    let target = -1;
    if (e.key === "ArrowRight") target = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") target = index === 0 ? last : index - 1;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = last;
    if (target < 0) return;
    e.preventDefault();
    tabRefs.current[target]?.focus();
    switchCategory(categories[target].id);
  };

  const selectProject = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 850px)").matches) {
      previewRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
    }
  };

  return (
    <div className="sw">
      <div className="sw-tabs" role="tablist" aria-label="Project categories">
        {categories.map(({ id, label, Icon }, i) => (
          <button
            key={id}
            ref={(el) => { tabRefs.current[i] = el; }}
            id={`sw-tab-${id}`}
            role="tab"
            type="button"
            aria-selected={category === id}
            aria-controls={`sw-panel-${id}`}
            tabIndex={category === id ? 0 : -1}
            className={category === id ? "active" : ""}
            onClick={() => switchCategory(id)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            <Icon size={16} aria-hidden /> <span>{label}</span>
          </button>
        ))}
      </div>

      <div id={`sw-panel-${category}`} role="tabpanel" aria-labelledby={`sw-tab-${category}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={category}
            className={`sw-layout ${featured ? "is-featured" : ""}`}
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -6 }}
            transition={{ duration: dur }}
          >
            {!featured && (
              <ul className="sw-list">
                {visible.map((project, i) => {
                  const Icon = iconMap[project.icon];
                  const isActive = project.id === active.id;
                  return (
                    <li key={project.id}>
                      <button
                        type="button"
                        className={`sw-card ${isActive ? "active" : ""}`}
                        style={accentStyle(project)}
                        aria-pressed={isActive}
                        onClick={() => selectProject(project.id)}
                      >
                        <em className="sw-num">{String(i + 1).padStart(2, "0")}</em>
                        <span className="sw-icon"><Icon size={19} aria-hidden /></span>
                        <span className="sw-text">
                          <strong>{project.name}</strong>
                          <small>{project.description}</small>
                        </span>
                        <ArrowUpRight size={18} className="sw-arrow" aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="sw-preview-wrap" ref={previewRef} aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="sw-preview-motion"
                  initial={{ opacity: 0, y: reduce ? 0 : 12, scale: reduce ? 1 : 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  transition={{ duration: dur }}
                >
                  <ProjectPreview project={active} featured={featured} />
                </motion.div>
              </AnimatePresence>
            </div>

            {canToggle && (
              <button type="button" className="view-more" onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
                {expanded ? "Show less" : `View more projects (${hiddenCount})`}
                <ArrowRight size={15} className={expanded ? "flip" : ""} aria-hidden />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
