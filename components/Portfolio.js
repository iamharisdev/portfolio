"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

// ---- inline icons (stroke follows currentColor) ----
const ICONS = {
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.66-5.66 1.41-1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14-1.41-1.41M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  arrowUp: "M12 19V5m-7 7 7-7 7 7",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  chevLeft: "m15 18-6-6 6-6",
  chevRight: "m9 18 6-6-6-6",
  external: "M14 4h6v6m0-6-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5",
  download: "M12 4v11m-5-5 5 5 5-5M5 20h14",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "m5 12 5 5L20 7",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5-1.2L7 22l5-3 5 3-1.5-8.2",
  github:
    "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- small hook: true the first time an element scrolls into view ----
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, className = "", as: Tag = "div", ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

function SectionHead({ index, eyebrow, title, lead }) {
  return (
    <Reveal className="sec-head">
      <span className="sec-eyebrow">
        <span className="sec-index">{index}</span>
        {eyebrow}
      </span>
      <h2 className="sec-title">{title}</h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </Reveal>
  );
}

// ---- tracks scroll: progress bar, nav shadow, active section, back-to-top ----
function useScrollState() {
  const [state, setState] = useState({ progress: 0, scrolled: false, active: "" });
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      let active = "";
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) active = id;
      }
      setState({ progress: max > 0 ? y / max : 0, scrolled: y > 12, active });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return state;
}

function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      return next;
    });
  }, []);
  return [theme, toggle];
}

// ---- counts up from 0 once visible ----
function CountUp({ value, suffix = "" }) {
  const [ref, inView] = useInView(0.4);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setN(value);
      return;
    }
    let raf;
    const start = performance.now();
    const dur = 1300;
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// ---- hero terminal: types out each command + its output ----
function Terminal({ lines }) {
  const [rendered, setRendered] = useState([]);
  const [typing, setTyping] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setRendered(lines);
      setDone(true);
      return;
    }
    let cancelled = false;
    let li = 0;
    function typeLine() {
      if (cancelled) return;
      if (li >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[li];
      const { cmd } = line;
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i <= cmd.length) {
          setTyping(cmd.slice(0, i));
          i++;
          setTimeout(tick, 26);
        } else {
          setRendered((prev) => [...prev, line]);
          setTyping("");
          li++;
          setTimeout(typeLine, 240);
        }
      };
      tick();
    }
    const start = setTimeout(typeLine, 500);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [lines]);

  return (
    <div className="terminal" aria-label="Terminal summary">
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-title">haris@portfolio — zsh</span>
      </div>
      <div className="term-body">
        {rendered.map((l, idx) => (
          <div key={idx}>
            <div className="term-line">
              <span className="prompt">❯ </span>
              <span className="cmd">{l?.cmd}</span>
            </div>
            <div className="term-out">{l?.out}</div>
          </div>
        ))}
        {typing !== "" && (
          <div className="term-line">
            <span className="prompt">❯ </span>
            <span className="cmd">{typing}</span>
            <span className="cursor" />
          </div>
        )}
        {done && (
          <div className="term-line">
            <span className="prompt">❯ </span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}

// moves a radial highlight to follow the pointer (used on hero + cards)
const trackPointer = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

function StatusBadge({ status }) {
  return (
    <span className={`status ${status}`}>
      <span className="led" />
      {status === "live" ? "Live" : "In development"}
    </span>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <article
      className="proj-card"
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${p.name}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      onMouseMove={trackPointer}
    >
      <div className="proj-thumb">
        <Image src={p.img} alt="" fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 380px" quality={75} />
        <span className="proj-cats">
          {p.category?.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </span>
      </div>
      <div className="proj-body">
        <div className="proj-top">
          <h3 className="proj-name">{p.name}</h3>
          <StatusBadge status={p.status} />
        </div>
        <p className="proj-desc">{p.desc}</p>
        <div className="proj-tags">
          {p.tags.slice(0, 4).map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
          {p.tags.length > 4 && <span className="tag more">+{p.tags.length - 4}</span>}
        </div>
        <span className="proj-more">
          View details <Icon name="arrowRight" size={15} />
        </span>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose, onPrev, onNext, position }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  // portal to <body> so the modal sits above the fixed nav, outside the section's stacking context
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-media">
          <Image src={project.img} alt={project.name} fill sizes="(max-width: 860px) 100vw, 820px" quality={85} />
        </div>
        <button ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        <div className="modal-body">
          <div className="modal-head">
            <StatusBadge status={project.status} />
            <span className="modal-pos">{position}</span>
          </div>
          <h3 id="modal-title" className="modal-title">
            {project.name}
          </h3>
          <p className="modal-desc">{project.desc}</p>

          <div className="modal-grid">
            <div>
              <h4>My role</h4>
              <p>{project.role}</p>
              <h4>Tech stack</h4>
              <div className="proj-tags">
                {project.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4>Key features</h4>
              <ul className="check-list">
                {project.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={15} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="modal-foot">
            <div className="proj-links">
              {project.links.length > 0 ? (
                project.links.map((l) => (
                  <a key={l.label} className="btn btn-primary btn-sm" href={l.url} target="_blank" rel="noreferrer">
                    {l.label} <Icon name="external" size={15} />
                  </a>
                ))
              ) : (
                <span className="muted-note">Private / client project — no public link</span>
              )}
            </div>
            <div className="modal-nav">
              <button className="icon-btn" onClick={onPrev} aria-label="Previous project">
                <Icon name="chevLeft" />
              </button>
              <button className="icon-btn" onClick={onNext} aria-label="Next project">
                <Icon name="chevRight" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Projects({ projects }) {
  const filters = useMemo(() => {
    const counts = {};
    projects.forEach((p) => p.category?.forEach((c) => (counts[c] = (counts[c] || 0) + 1)));
    return [["All", projects.length], ...Object.entries(counts).sort((a, b) => b[1] - a[1])];
  }, [projects]);
  const [filter, setFilter] = useState("All");
  const [openIdx, setOpenIdx] = useState(null);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category?.includes(filter));
  const close = useCallback(() => setOpenIdx(null), []);
  const prev = useCallback(() => setOpenIdx((i) => (i - 1 + visible.length) % visible.length), [visible.length]);
  const next = useCallback(() => setOpenIdx((i) => (i + 1) % visible.length), [visible.length]);

  return (
    <>
      <Reveal className="filters" role="tablist" aria-label="Filter projects">
        {filters.map(([name, count]) => (
          <button
            key={name}
            role="tab"
            aria-selected={filter === name}
            className={`filter ${filter === name ? "on" : ""}`}
            onClick={() => setFilter(name)}
          >
            {name}
            <span className="count">{count}</span>
          </button>
        ))}
      </Reveal>
      <div className="proj-grid" key={filter}>
        {visible.map((p, i) => (
          <div className="proj-cell" style={{ "--i": i }} key={p.name}>
            <ProjectCard p={p} onOpen={() => setOpenIdx(i)} />
          </div>
        ))}
      </div>
      {openIdx !== null && visible[openIdx] && (
        <ProjectModal
          project={visible[openIdx]}
          position={`${openIdx + 1} / ${visible.length}`}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <button className={`icon-btn ${copied ? "ok" : ""}`} onClick={copy} aria-label="Copy email address">
      <Icon name={copied ? "check" : "copy"} size={16} />
      <span className="copy-tip" role="status">
        {copied ? "Copied!" : ""}
      </span>
    </button>
  );
}

const socialIcon = (label) => {
  const l = label.toLowerCase();
  return ICONS[l] ? l : "external";
};

export default function Portfolio({ content }) {
  const { profile, terminalLines, about, experience, education, projects, achievements, skillGroups, contact, footerText } =
    content;
  const { progress, scrolled, active } = useScrollState();
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="bg-decor" aria-hidden="true" />

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a className="nav-brand" href="#top" aria-label="Back to top">
            <span className="logo">{profile.name.split(" ").map((w) => w[0]).join("")}</span>
            <span className="brand-text">{profile.name}</span>
          </a>
          <div className="nav-links">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={active === n.id ? "on" : ""}>
                {n.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>
            <a className="btn btn-primary btn-sm nav-cta" href="#contact">
              Hire me
            </a>
            <button
              className="icon-btn menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? "on" : ""} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
        </div>
      </nav>

      <header className="hero" id="top" onMouseMove={trackPointer}>
        <div className="hero-spot" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="availability">
              <span className="pulse" />
              {profile.availability.charAt(0) + profile.availability.slice(1).toLowerCase()}
            </div>
            <h1 className="title">
              Hi, I&apos;m {profile.name}.
              <span className="title-role">{profile.role}</span>
            </h1>
            <p className="subtitle">{profile.tagline}</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#projects">
                View my work <Icon name="arrowRight" size={16} />
              </a>
              <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer" download>
                <Icon name="download" size={16} /> Download résumé
              </a>
            </div>
            <div className="hero-socials">
              {contact.socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="icon-btn">
                  <Icon name={socialIcon(s.label)} size={17} />
                </a>
              ))}
              <span className="hero-loc">
                <Icon name="pin" size={15} /> {profile.location}
              </span>
            </div>
          </div>

          <div className="hero-side">
            <Terminal lines={terminalLines} />
          </div>
        </div>

        {profile.stats && (
          <div className="wrap">
            <div className="stats">
              {profile.stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-num">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="about">
          <div className="wrap">
            <SectionHead index="01" eyebrow="About" title="Building products people use every day" />
            <div className="about-grid">
              <Reveal className="about-photo">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 860px) 280px, 320px"
                  quality={85}
                />
              </Reveal>
              <Reveal className="about-text">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <dl className="facts">
                  {about.configRows.map((row) => (
                    <div className="fact" key={row.key}>
                      <dt>{row.key}</dt>
                      <dd className={row.highlight ? "hl" : ""}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="chips">
                  {profile.metaChips[1]?.label.split("·").map((c) => (
                    <span className="chip" key={c}>
                      {c.trim()}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="alt">
          <div className="wrap">
            <SectionHead index="02" eyebrow="Experience" title="Where I've worked" />
            <ol className="timeline">
              {experience.map((job) => (
                <Reveal as="li" className="job" key={job.role + job.company}>
                  <span className="job-dot" aria-hidden="true" />
                  <div className="job-card">
                    <div className="job-head">
                      <div>
                        <h3 className="job-role">{job.role}</h3>
                        <div className="job-co">{job.company}</div>
                      </div>
                      <span className={`job-date ${/present/i.test(job.date) ? "current" : ""}`}>{job.date}</span>
                    </div>
                    <ul className="job-points">
                      {job.points.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                    {job.award && (
                      <div className="award">
                        <Icon name="award" size={16} />
                        {job.award.replace(/^★\s*/, "")}
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal as="h3" className="sub-head">
              Education
            </Reveal>
            <div className="edu-grid">
              {education.map((e) => (
                <Reveal className="edu-card" key={e.title}>
                  <div className="yrs">{e.years}</div>
                  <h4>{e.title}</h4>
                  <p>{e.place}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <SectionHead
              index="03"
              eyebrow="Projects"
              title="Selected work"
              lead="Mobile, web, desktop and AI products I've built and shipped. Click any project for the full breakdown."
            />
            <Projects projects={projects} />
          </div>
        </section>

        <section id="achievements" className="alt">
          <div className="wrap">
            <SectionHead index="04" eyebrow="Highlights" title="What I bring to a team" />
            <div className="ach-grid">
              {achievements.map((a) => (
                <Reveal className="ach-card" key={a.title} onMouseMove={trackPointer}>
                  <div className="ach-icon">{a.icon}</div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <SectionHead index="05" eyebrow="Skills" title="Tools & technologies" />
            <div className="skill-groups">
              {skillGroups.map((g) => (
                <Reveal className="skill-group" key={g.label}>
                  <div className="skill-group-label">
                    {g.label}
                    <span>{g.items.length}</span>
                  </div>
                  <div className="skill-tags">
                    {g.items.map((item) => (
                      <span className="skill-tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="alt">
          <div className="wrap">
            <SectionHead index="06" eyebrow="Contact" title="Get in touch" />
            <Reveal className="contact-box" onMouseMove={trackPointer}>
              <div className="contact-copy">
                <h3>{contact.heading}</h3>
                <p>{contact.blurb}</p>
                <div className="hero-cta">
                  <a className="btn btn-primary" href={`mailto:${contact.email}`}>
                    <Icon name="mail" size={16} /> Send an email
                  </a>
                  <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer" download>
                    <Icon name="download" size={16} /> Résumé
                  </a>
                </div>
              </div>
              <div className="contact-list">
                <div className="contact-item">
                  <span className="ci-icon">
                    <Icon name="mail" />
                  </span>
                  <div>
                    <span className="ci-k">Email</span>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                  <CopyEmail email={contact.email} />
                </div>
                <div className="contact-item">
                  <span className="ci-icon">
                    <Icon name="phone" />
                  </span>
                  <div>
                    <span className="ci-k">Phone</span>
                    <a href={`tel:${contact.phone.replace(/\s|-/g, "")}`}>{contact.phone}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="ci-icon">
                    <Icon name="pin" />
                  </span>
                  <div>
                    <span className="ci-k">Location</span>
                    <span>{contact.location}</span>
                  </div>
                </div>
                <div className="social-row">
                  {contact.socials.map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                      <Icon name={socialIcon(s.label)} size={16} /> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <span>
            © {new Date().getFullYear()} · {footerText}
          </span>
          <div className="footer-links">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <a href="#top" className={`to-top ${progress > 0.08 ? "show" : ""}`} aria-label="Back to top">
        <Icon name="arrowUp" />
      </a>
    </>
  );
}
