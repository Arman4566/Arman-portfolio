import { useEffect, useState } from 'react';
import Terrain from './components/Terrain.jsx';
import SkillGlobe from './components/SkillGlobe.jsx';
import Tilt from './components/Tilt.jsx';
import { SathiVisual, BuddyVisual } from './components/Visuals.jsx';
import { GitHub, LinkedIn, Mail, Download, External, Pin, Copy, Check, Code, Mark } from './components/Icons.jsx';
import { links, facts, featured, more, skillGroups, globeWords, education, certs } from './data.js';

const NAV = [
  ['about', 'About'],
  ['projects', 'Projects'],
  ['skills', 'Skills'],
  ['learning', 'Learning'],
  ['contact', 'Contact'],
];

function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Nav({ active }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <a className="nav__logo" href="#top" aria-label="Arman Ahamad, back to top">
        <Mark />
        <span>Arman</span>
      </a>
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">Menu</span>
        <i /><i /><i />
      </button>
      <nav id="nav-links" className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
        {NAV.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'is-active' : ''}
            aria-current={active === id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a className="nav__resume" href={links.resume} download>
          <Download width={16} height={16} /> Resume
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__inner">
        <p className="chip">
          <span className="chip__dot" aria-hidden="true" /> Open to internships
        </p>
        <h1 className="hero__name" aria-label="Arman Ahamad">
          <span className="word"><span style={{ '--i': 0 }}>Arman</span></span>{' '}
          <span className="word"><span style={{ '--i': 1 }}>Ahamad</span></span>
        </h1>
        <p className="hero__lede">
          I build Flutter apps, Node.js servers and AI features that do a real job: reading a
          prescription, turning a textbook photo into flashcards, guiding someone by voice.
        </p>
        <div className="hero__cta">
          <a className="btn btn--sun" href="#projects">See my projects</a>
          <a className="btn btn--ghost" href={links.resume} download>
            <Download width={17} height={17} /> Download resume
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about">
        <Tilt className="about__photo" max={7}>
          <img src="/profile.jpg" alt="Portrait of Arman Ahamad" width="464" height="515" />
        </Tilt>
        <div className="about__text">
          <h2>I like apps that have a real job to do.</h2>
          <p>
            I’m a BCA student at MIET Kumaon in Haldwani. I build the mobile app in Flutter, the
            server in Node.js, and bring in AI where it helps: OCR, Gemini and small Python
            services.
          </p>
          <p>
            I led team Strawhats at HackIndia Spark 10, handling the planning, the architecture and
            the final pitch. I also hold an NCC ‘A’ Certificate, which taught me to show up on time
            and work as a team.
          </p>
          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Featured({ project, flip }) {
  const Visual = project.id === 'sathi' ? SathiVisual : BuddyVisual;
  return (
    <article className={`feature ${flip ? 'feature--flip' : ''}`}>
      <div className="feature__text">
        <p className="feature__kind">{project.kind}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ul className="feature__points">
          {project.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <ul className="tags" aria-label={`${project.name} technologies`}>
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <a className="link" href={links.github} target="_blank" rel="noreferrer">
          <GitHub width={16} height={16} /> View on GitHub <External width={14} height={14} />
        </a>
      </div>
      <Tilt className="feature__visual" max={8}>
        <Visual />
      </Tilt>
    </article>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <h2 className="section__title">Projects</h2>
        {featured.map((p, i) => (
          <Featured key={p.id} project={p} flip={i % 2 === 1} />
        ))}
        <div className="more">
          {more.map((m) => (
            <article key={m.name} className="more__item">
              <p className="feature__kind">{m.kind}</p>
              <h3>{m.name}</h3>
              <p>{m.text}</p>
              <ul className="tags">
                {m.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap skills">
        <div className="skills__copy">
          <h2 className="section__title">Skills</h2>
          <p className="muted">Drag the sphere to spin it.</p>
          <div className="skills__groups">
            {skillGroups.map(([name, items]) => (
              <div key={name}>
                <h3>{name}</h3>
                <p>{items.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
        <SkillGlobe words={globeWords} />
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section className="section" id="learning">
      <div className="wrap learning">
        <div>
          <h2 className="section__title">Education</h2>
          <ol className="timeline">
            {education.map((e) => (
              <li key={e.title}>
                <time>{e.when}</time>
                <h3>{e.title}</h3>
                <p>{e.place}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="section__title">Certifications</h2>
          <ul className="certs">
            {certs.map((c) => (
              <li key={c.title}>
                <time>{c.when}</time>
                <h3>{c.title}</h3>
                <p>{c.issuer}</p>
              </li>
            ))}
          </ul>
          <p className="muted certs__more">
            More practice on{' '}
            <a className="inline" href={links.hackerrank} target="_blank" rel="noreferrer">
              HackerRank
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', message: '' });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      window.location.href = `mailto:${links.email}`;
    }
  };

  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name || 'your portfolio'}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}`);
    window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section" id="contact">
      <div className="wrap contact">
        <div>
          <h2 className="section__title">Let’s build something useful.</h2>
          <p className="muted">
            I’m looking for an internship where I can ship mobile and AI features to real users.
            Email is the quickest way to reach me.
          </p>
          <p className="contact__line"><Pin width={17} height={17} /> Haldwani, Uttarakhand, India</p>
          <p className="contact__line">
            <Mail width={17} height={17} />
            <a className="inline" href={`mailto:${links.email}`}>{links.email}</a>
            <button type="button" className="copy" onClick={copy}>
              {copied ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </p>
          <div className="socials">
            <a href={links.github} target="_blank" rel="noreferrer"><GitHub /> GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer"><LinkedIn /> LinkedIn</a>
            <a href={links.hackerrank} target="_blank" rel="noreferrer"><Code /> HackerRank</a>
          </div>
        </div>
        <form className="form" onSubmit={send}>
          <label>
            Your name
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Message
            <textarea
              rows="5"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </label>
          <button className="btn btn--sun" type="submit">Open in my email app</button>
          <p className="muted form__note">This opens your email app with the message filled in.</p>
        </form>
      </div>
    </section>
  );
}

export default function App() {
  const active = useActiveSection(NAV.map(([id]) => id));
  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Terrain />
      <Nav active={active} />
      <main>
        <Hero />
        <div className="page">
          <About />
          <Projects />
          <Skills />
          <Learning />
          <Contact />
          <footer className="footer">
            <p>© 2026 Arman Ahamad. Built with React and Three.js.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
