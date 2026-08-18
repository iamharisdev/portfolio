"use client";

import { useEffect, useRef, useState } from "react";

// ---- small hook: fades an element in the first time it scrolls into view ----
function useReveal() {
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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={`reveal ${inView ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ---- hero terminal: types out each command + its output ----
function Terminal({ lines }) {
  const [rendered, setRendered] = useState([]); // completed lines
  const [typing, setTyping] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setRendered(lines);
      setShowCursor(true);
      return;
    }

    let cancelled = false;
    let li = 0;

    function typeLine() {
      if (cancelled) return;
      if (li >= lines.length) {
        setShowCursor(true);
        return;
      }
      const { cmd } = lines[li];
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i <= cmd.length) {
          setTyping(cmd.slice(0, i));
          i++;
          setTimeout(tick, 28);
        } else {
          setRendered((prev) => [...prev, lines[li]]);
          setTyping("");
          li++;
          setTimeout(typeLine, 260);
        }
      };
      tick();
    }
    typeLine();
    return () => {
      cancelled = true;
    };
  }, [lines]);

  const currentIdx = rendered.length;

  return (
    <div className="terminal">
      <div className="term-bar">
        <div className="term-dot" style={{ background: "#FF6B6B" }} />
        <div className="term-dot" style={{ background: "#F5B54C" }} />
        <div className="term-dot" style={{ background: "#5EEAD4" }} />
        <span className="title">haris@portfolio — zsh</span>
      </div>
      <div className="term-body">
        {rendered.map((l, idx) => (
          <div key={idx}>
            <div className="term-line">
              <span className="prompt">~$ </span>
              <span className="path">{l?.cmd}</span>
            </div>
            <div className="term-out">{l?.out}</div>
          </div>
        ))}
        {typing !== "" && (
          <div className="term-line">
            <span className="prompt">~$ </span>
            <span className="path">{typing}</span>
          </div>
        )}
        {showCursor && <span className="cursor" />}
      </div>
    </div>
  );
}

function ProjectCard({ p }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="proj-card" onClick={() => setOpen((o) => !o)}>
      <div className="proj-thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.img} alt={p.name} loading="lazy" />
      </div>
      <div className="proj-body">
        <div className="proj-top">
          <span className="proj-name">{p.name}</span>
          <span className={`status ${p.status}`}>
            <span className="led" />
            {p.status === "live" ? "LIVE" : "IN DEV"}
          </span>
        </div>
        <div className="proj-desc">{p.desc}</div>
        <div className="proj-tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className={`proj-detail ${open ? "open" : "open"}`}>
        <h5>role</h5>
        <p className="role-text">{p.role}</p>
        <h5>key features</h5>
        <ul>
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {p.links.length > 0 && (
          <div className="proj-links">
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Portfolio({ content }) {
  const { profile, terminalLines, about, experience, education, projects, achievements, skillGroups, contact, footerText } =
    content;

  return (
    <>
      <div className="bg-grid" />

      <nav>
        <div className="nav-inner">
          <div className="nav-brand">
            <span className="dot" />
            iamharisdev
          </div>
          <div className="nav-links">
            <a href="#about">about</a>
            <a href="#experience">experience</a>
            <a href="#projects">projects</a>
            <a href="#skills">skills</a>
            <a href="#contact">contact</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="blink" /> STATUS: {profile.availability}
            </div>
            <h1 className="title">
              {profile.name}
              <br />
              <span className="accent">{profile.role}.</span>
            </h1>
            <p className="subtitle">{profile.tagline}</p>
            <div className="hero-meta">
              {profile.metaChips.map((c) => (
                <span className="chip" key={c.label}>
                  {c.led && <span className="led" />}
                  {c.label}
                </span>
              ))}
            </div>
            <div className="hero-cta">
              <a className="btn btn-primary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                ↓ resume.pdf
              </a>
              <a className="btn btn-ghost" href="#contact">
                ./contact.sh
              </a>
              <a className="btn btn-ghost" href="#projects">
                ./projects --all
              </a>
            </div>
          </div>

          <Terminal lines={terminalLines} />
        </div>
      </header>

      <section id="about">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="sec-tag">01 · profile</span>
            <span className="sec-title">About</span>
            <span className="sec-rule" />
          </Reveal>
          <Reveal className="about-grid">
            <div className="about-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.photo} alt={profile.name} />
            </div>
            <div className="about-text">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="config-box">
                {about.configRows.map((row) => (
                  <div className="config-row" key={row.key}>
                    <span className="k">{row.key}</span>
                    <span className="v" style={row.highlight ? { color: "var(--teal)" } : undefined}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="experience">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="sec-tag">02 · git log</span>
            <span className="sec-title">Experience</span>
            <span className="sec-rule" />
          </Reveal>

          <Reveal className="log">
            {experience.map((job) => (
              <div className="commit" key={job.role + job.company}>
                <div className="commit-head">
                  <span className="commit-role">{job.role}</span>
                  <span className="commit-co">@ {job.company}</span>
                  <span className="commit-date">{job.date}</span>
                </div>
                <ul>
                  {job.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
                {job.award && <div className="award">{job.award}</div>}
              </div>
            ))}
          </Reveal>

          <Reveal className="edu-grid">
            {education.map((e) => (
              <div className="edu-card" key={e.title}>
                <div className="yrs">{e.years}</div>
                <h4>{e.title}</h4>
                <p>{e.place}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="projects">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="sec-tag">03 · deployments</span>
            <span className="sec-title">Projects</span>
            <span className="sec-rule" />
          </Reveal>
          <Reveal className="proj-grid">
            {projects.map((p) => (
              <ProjectCard p={p} key={p.name} />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="achievements">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="sec-tag">04 · milestones</span>
            <span className="sec-title">Achievements</span>
            <span className="sec-rule" />
          </Reveal>
          <Reveal className="ach-grid">
            {achievements.map((a) => (
              <div className="ach-card" key={a.title}>
                <div className="ach-icon">{a.icon}</div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="skills">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="sec-tag">05 · package.json</span>
            <span className="sec-title">Skills</span>
            <span className="sec-rule" />
          </Reveal>
          <Reveal className="skill-groups">
            {skillGroups.map((g) => (
              <div key={g.label}>
                <div className="skill-group-label">{g.label}</div>
                <div className="skill-tags">
                  {g.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="contact">
        <div className="wrap">
          <Reveal className="sec-head">
            <span className="sec-tag">06 · connect</span>
            <span className="sec-title">Get in touch</span>
            <span className="sec-rule" />
          </Reveal>
          <Reveal className="contact-box">
            <div>
              <h3>{contact.heading}</h3>
              <p>{contact.blurb}</p>
              <div className="social-row">
                {contact.socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-list">
              <div className="contact-item">
                <span className="k">email</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div className="contact-item">
                <span className="k">phone</span>
                <a href={`tel:${contact.phone.replace(/\s|-/g, "")}`}>{contact.phone}</a>
              </div>
              <div className="contact-item">
                <span className="k">location</span>
                <span>{contact.location}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer>
        {footerText} · © {new Date().getFullYear()}
      </footer>
    </>
  );
}
