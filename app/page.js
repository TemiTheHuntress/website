"use client";

import { useEffect, useRef, useState } from "react";

const logLines = [
  "booting TemiNet personal uplink...",
  "mounting /projects: success, mostly",
  "scanning abandoned folders: too many",
  "loading sarcasm module: online",
  "checking Cloudflare Pages: please clap",
  "routing bad ideas through neon filter",
  "warning: confidence exceeds test coverage",
  "deploy target: static files with delusions",
  "status: operational enough",
];

const tickerItems = [
  "signal acquired",
  "deploy gods unimpressed",
  "coffee dependency unresolved",
  "bug reports accepted under protest",
  "cyberdeck held together by CSS",
  "signal acquired",
  "deploy gods unimpressed",
  "coffee dependency unresolved",
];

export default function Home() {
  const canvasRef = useRef(null);
  const bootTime = useRef(Date.now());
  const [year, setYear] = useState("");
  const [uptime, setUptime] = useState("calculating regret");
  const [feed, setFeed] = useState([`> ${logLines[0]}`]);
  const [telemetry, setTelemetry] = useState({ signal: 91, cope: 64, bugs: "??" });

  useEffect(() => {
    setYear(String(new Date().getFullYear()));

    const uptimeTimer = window.setInterval(() => {
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - bootTime.current) / 1000));
      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = String(elapsedSeconds % 60).padStart(2, "0");
      setUptime(`${minutes}:${seconds} since refresh`);
    }, 1000);

    let feedIndex = 1;
    const feedTimer = window.setInterval(() => {
      const nextLine = `> ${logLines[feedIndex % logLines.length]}`;
      setFeed((currentFeed) => [...currentFeed.slice(-8), nextLine]);
      feedIndex += 1;
    }, 1500);

    const telemetryTimer = window.setInterval(() => {
      setTelemetry({
        signal: 88 + Math.floor(Math.random() * 10),
        cope: 52 + Math.floor(Math.random() * 35),
        bugs: Math.floor(Math.random() * 9),
      });
    }, 1800);

    return () => {
      window.clearInterval(uptimeTimer);
      window.clearInterval(feedTimer);
      window.clearInterval(telemetryTimer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frameId = 0;
    let rainColumns = [];

    function resizeRain() {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const columnCount = Math.ceil(window.innerWidth / 18);
      rainColumns = Array.from({ length: columnCount }, () => Math.random() * window.innerHeight);
    }

    function drawRain() {
      context.fillStyle = "rgba(5, 6, 10, 0.08)";
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.fillStyle = "rgba(184, 255, 61, 0.65)";
      context.font = "14px Cascadia Mono, Consolas, monospace";

      rainColumns.forEach((y, index) => {
        const character = Math.random() > 0.5 ? "1" : "0";
        context.fillText(character, index * 18, y);
        rainColumns[index] = y > window.innerHeight + 20 ? 0 : y + 18;
      });

      frameId = window.requestAnimationFrame(drawRain);
    }

    resizeRain();
    drawRain();
    window.addEventListener("resize", resizeRain);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeRain);
    };
  }, []);

  return (
    <>
      <canvas className="data-rain" ref={canvasRef} aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">DW</span>
          <span>TemiNet</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">teminet uplink / bad ideas over fiber / neon coping mechanism</p>
            <h1 id="hero-title">Tech experiments from the budget end of the dystopia.</h1>
            <p className="hero-copy">
              I build small websites, scripts, automations, and other digital contraptions that
              probably should have stayed in a notes app. They did not. Welcome to the evidence.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">Inspect the damage</a>
              <a className="button secondary" href="#about">Meet the operator</a>
            </div>
          </div>
          <aside className="system-panel" aria-label="Current operating conditions">
            <div className="panel-row">
              <span>mood</span>
              <strong>overclocked sarcasm</strong>
            </div>
            <div className="panel-row">
              <span>uptime</span>
              <strong>{uptime}</strong>
            </div>
            <div className="panel-row">
              <span>build status</span>
              <strong>green enough</strong>
            </div>
            <div className="panel-row">
              <span>threat model</span>
              <strong>my own ideas</strong>
            </div>
          </aside>
        </section>

        <section className="ticker" aria-label="System ticker">
          <div className="ticker-track">
            {tickerItems.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section id="about" className="section split" aria-labelledby="about-title">
          <div>
            <p className="eyebrow">about</p>
            <h2 id="about-title">Somewhere between tinkerer, technician, and warranty violation.</h2>
          </div>
          <div className="copy-stack">
            <p>
              I make small web things, scripts, experiments, and other suspiciously named folders.
              Some are useful. Some are educational. Some exist because I had caffeine and an
              unrealistic relationship with scope.
            </p>
            <p>
              This site is the public-facing shelf for the projects that survived long enough to
              receive a README. That is not a high bar, but it is a bar, and we respect process here.
            </p>
          </div>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <div className="section-heading">
            <p className="eyebrow">projects</p>
            <h2 id="projects-title">A curated gallery of decisions.</h2>
          </div>
          <div className="project-grid">
            <article className="project-card">
              <div className="card-topline">
                <span className="status live">live-ish</span>
                <span>web</span>
              </div>
              <h3>Static Website</h3>
              <p>
                The thing you are staring at. Deployed with Cloudflare Pages because infrastructure
                should be boring, unlike my commit messages.
              </p>
              <a href="#top" aria-label="View Static Website">View</a>
            </article>

            <article className="project-card">
              <div className="card-topline">
                <span className="status warning">unstable</span>
                <span>automation</span>
              </div>
              <h3>Script Pile</h3>
              <p>
                A majestic heap of little tools that save five minutes after only four hours of
                setup. This is called optimization.
              </p>
              <a href="https://github.com/TemiTheHuntress/website" rel="noreferrer">GitHub</a>
            </article>

            <article className="project-card">
              <div className="card-topline">
                <span className="status cursed">haunted</span>
                <span>experiment</span>
              </div>
              <h3>Abandoned Prototype</h3>
              <p>
                A bold concept, a clean start, a folder last modified at 02:13. We do not speak its
                original feature list aloud.
              </p>
              <a href="#contact">Ask why</a>
            </article>
          </div>
        </section>

        <section className="section console-section" aria-labelledby="console-title">
          <div className="section-heading">
            <p className="eyebrow">live console</p>
            <h2 id="console-title">The machine says it is fine, which is legally distinct from true.</h2>
          </div>
          <div className="console-grid">
            <div className="terminal" aria-label="Project terminal output">
              <div className="terminal-bar">
                <span />
                <span />
                <span />
                <strong>teminet://ops</strong>
              </div>
              <pre aria-live="polite">{feed.join("\n")}</pre>
            </div>
            <div className="telemetry" aria-label="Site telemetry">
              <div className="metric">
                <span>signal</span>
                <strong>{telemetry.signal}%</strong>
              </div>
              <div className="metric">
                <span>cope</span>
                <strong>{telemetry.cope}%</strong>
              </div>
              <div className="metric">
                <span>bugs</span>
                <strong>{telemetry.bugs}</strong>
              </div>
              <div className="meter">
                <span style={{ "--level": "82%" }} />
              </div>
            </div>
          </div>
        </section>

        <section className="section manifesto" aria-labelledby="manifesto-title">
          <p className="eyebrow">operating principles</p>
          <h2 id="manifesto-title">Ship tiny, complain artistically, learn anyway.</h2>
          <div className="principles">
            <p>Make the thing small enough to finish.</p>
            <p>Give bugs descriptive names so they feel accountable.</p>
            <p>Publish before the confidence wears off.</p>
          </div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">contact</p>
            <h2 id="contact-title">Send a signal into the fog.</h2>
          </div>
          <p>
            Want to talk projects, bugs, websites, or why CSS sometimes feels like negotiating with
            a vending machine? Find me on the usual internet ruins.
          </p>
          <div className="contact-links">
            <a href="mailto:noahthefounder@protonmail.com">Email</a>
            <a href="https://github.com/TemiTheHuntress/website" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </main>

      <footer>
        <span>&copy; {year} TemiNet.</span>
        <span>Static files, neon lies, and suspicious confidence.</span>
      </footer>
    </>
  );
}
