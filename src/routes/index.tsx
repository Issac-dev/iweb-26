import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Cursor } from "@/components/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "iWeb AI Studio — World-Class Web, Brand & AI" },
      { name: "description", content: "iWeb AI Studio is a Lagos creative agency building websites, brands and AI-native digital experiences engineered to perform on the world stage." },
      { property: "og:title", content: "iWeb AI Studio — The World Is Watching" },
      { property: "og:description", content: "AI-native web development, brand and growth from Lagos to the world." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const PILLARS = [
  { n: "01", t: "Vision", d: "We start with what your brand is really competing for — and design every pixel to win it." },
  { n: "02", t: "Design", d: "Editorial, cinematic interfaces that look as confident on a phone as on a stadium screen." },
  { n: "03", t: "Development", d: "Performance-obsessed builds with modern stacks, schema, and AI baked into the core." },
  { n: "04", t: "Growth", d: "LLM SEO, structured data and conversion craft that compound month over month." },
];

const PROJECTS = [
  { n: "01", name: "Polaris Solicitors", tag: "Legal — Brand & Web" },
  { n: "02", name: "NotedMark AI", tag: "SaaS — Product Site" },
  { n: "03", name: "Lagos SME Hub", tag: "Platform — Web App" },
  { n: "04", name: "Meridian Finance", tag: "Finance — Brand System" },
  { n: "05", name: "GI Consortium", tag: "Enterprise — Digital" },
];

const STAGES = [
  { n: "01", t: "Discovery", d: "Audit, interviews, market read." },
  { n: "02", t: "Strategy", d: "Positioning, structure, north star." },
  { n: "03", t: "Design", d: "Brand & interface direction." },
  { n: "04", t: "Development", d: "Build, integrate, optimize." },
  { n: "05", t: "Launch", d: "Ship, measure, scale." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Page() {
  useReveal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll-controlled video scrubbing
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let duration = 0;
    const onMeta = () => { duration = video.duration || 0; };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      if (duration > 0) {
        try { video.currentTime = Math.min(duration - 0.05, p * duration); } catch { /* noop */ }
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#f4f1ea" }}>
      <Cursor />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference">
        <a href="#top" className="font-display text-2xl tracking-wide" style={{ color: "#f4f1ea" }}>
          iWeb<span style={{ color: "#c9a84c" }}>.</span>AI
        </a>
        <nav className="hidden md:flex gap-8 font-condensed uppercase text-xs tracking-[0.25em]" style={{ color: "#f4f1ea" }}>
          <a href="#studio">Studio</a>
          <a href="#lineup">Work</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="font-condensed uppercase text-xs tracking-[0.25em] border border-current px-4 py-2" style={{ color: "#f4f1ea" }}>
          Start
        </a>
      </header>

      {/* HERO (sticky pinned ~500vh) */}
      <section id="top" ref={sectionRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/hero.mp4"
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* gradient overlays */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.25) 60%, rgba(10,10,10,0.85) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 70%, rgba(193,18,31,0.18), transparent 60%)" }} />

          {/* eyebrow */}
          <div className="absolute top-24 left-6 md:left-10 reveal in">
            <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#f4f1ea" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
              Lagos · Nigeria · Global
            </div>
          </div>

          {/* headline */}
          <div className="absolute inset-x-0 bottom-28 md:bottom-32 px-6 md:px-10">
            <h1 className="font-display reveal in leading-[0.85] text-[18vw] md:text-[14vw] lg:text-[12vw]" style={{ color: "#f4f1ea" }}>
              THE WORLD IS<br />
              <span style={{ color: "#c9a84c" }}>WATCHING.</span>
            </h1>
            <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-6 md:gap-10 items-end">
              <p className="reveal reveal-delay-1 in max-w-xl text-base md:text-lg leading-snug" style={{ color: "#f4f1eacc" }}>
                iWeb AI Studio crafts websites, brands, and digital experiences built to perform under the spotlight.
              </p>
              <div className="reveal reveal-delay-2 in flex flex-wrap gap-3 md:justify-end">
                <a href="#contact" className="font-condensed uppercase tracking-[0.25em] text-sm px-7 py-4" style={{ background: "#c9a84c", color: "#0a0a0a" }}>
                  Start Your Project
                </a>
                <a href="#lineup" className="font-condensed uppercase tracking-[0.25em] text-sm px-7 py-4 border" style={{ color: "#f4f1ea", borderColor: "#f4f1ea66" }}>
                  See Our Work
                </a>
              </div>
            </div>
          </div>

          {/* progress */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "#ffffff14" }}>
            <div ref={progressRef} className="h-full origin-left" style={{ background: "#c9a84c", transform: "scaleX(0)" }} />
          </div>
          <div className="absolute bottom-3 left-6 md:left-10 font-condensed uppercase text-[10px] tracking-[0.35em]" style={{ color: "#f4f1ea99" }}>
            Scroll to begin
          </div>
          <div className="absolute bottom-3 right-6 md:right-10 font-condensed uppercase text-[10px] tracking-[0.35em]" style={{ color: "#f4f1ea99" }}>
            Reel · 2026
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="relative overflow-hidden border-y" style={{ background: "#c9a84c", borderColor: "#00000022" }}>
        <div className="ticker-track flex whitespace-nowrap py-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8 font-display text-3xl md:text-4xl" style={{ color: "#0a0a0a" }}>
              {["iWeb AI Studio","AI-Native Web Development","Lagos & Beyond","LLM SEO & Schema","Premium Brands","World-Class Digital Experiences"].map((t, j) => (
                <span key={j} className="flex items-center gap-8">
                  <span className="tracking-wide">{t}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: "#c1121f" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* STUDIO */}
      <section id="studio" className="px-6 md:px-10 py-28 md:py-40 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div className="reveal">
            <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
              The Studio · 01
            </div>
            <h2 className="font-display mt-6 leading-[0.88] text-[14vw] md:text-[7.5vw]" style={{ color: "#f4f1ea" }}>
              BUILT FOR THE<br />
              <span className="font-italic-accent" style={{ color: "#c9a84c" }}>biggest</span> STAGE.
            </h2>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#f4f1eadd" }}>
              We are a small, senior team out of Lagos engineering digital products for ambitious brands.
              Strategy, brand, interface and AI under one roof — shipped fast, with the polish of a flagship launch
              and the discipline of a championship campaign.
            </p>
            <div className="mt-10 grid grid-cols-2 border-t border-l" style={{ borderColor: "#ffffff1f" }}>
              {PILLARS.map((p, i) => (
                <div key={p.n} className={`reveal reveal-delay-${(i % 4) + 1} border-b border-r p-6 md:p-8`} style={{ borderColor: "#ffffff1f" }}>
                  <div className="font-display text-3xl" style={{ color: "#c9a84c" }}>{p.n}</div>
                  <div className="font-display text-2xl md:text-3xl mt-2" style={{ color: "#f4f1ea" }}>{p.t.toUpperCase()}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#f4f1ea99" }}>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LINEUP */}
      <section id="lineup" className="border-t" style={{ borderColor: "#ffffff14" }}>
        <div className="px-6 md:px-10 pt-20 pb-10 max-w-[1400px] mx-auto reveal">
          <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
            The Lineup · 02
          </div>
          <h2 className="font-display mt-4 text-[14vw] md:text-[8vw] leading-[0.88]">SELECTED WORK.</h2>
        </div>
        <ul className="border-t" style={{ borderColor: "#ffffff14" }}>
          {PROJECTS.map((p) => (
            <li key={p.n} className="group relative overflow-hidden border-b reveal" style={{ borderColor: "#ffffff14" }}>
              <a href="#contact" className="relative flex items-center px-6 md:px-10 transition-all duration-500" style={{ height: 220 }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, rgba(193,18,31,0.85) 0%, rgba(10,10,10,0.95) 100%)" }} />
                <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 font-display select-none" style={{ fontSize: "clamp(120px, 22vw, 320px)", color: "#ffffff08", lineHeight: 1 }}>
                  {p.n}
                </div>
                <div className="relative z-10 flex w-full items-baseline justify-between gap-6 transition-transform duration-500 group-hover:-translate-y-1">
                  <div>
                    <div className="font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>{p.tag}</div>
                    <div className="font-display mt-2 leading-[0.9] text-[10vw] md:text-[6vw]" style={{ color: "#f4f1ea" }}>
                      {p.name.toUpperCase()}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-4 font-condensed uppercase tracking-[0.3em] text-xs translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" style={{ color: "#c9a84c" }}>
                    View Case
                    <span aria-hidden className="inline-block">→</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#f4f1ea", color: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal">
            <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c1121f" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
              Road to the Final · 03
            </div>
            <h2 className="font-display mt-4 text-[14vw] md:text-[7vw] leading-[0.88]">
              FIVE STAGES. <span className="font-italic-accent" style={{ color: "#c1121f" }}>one</span> RESULT.
            </h2>
          </div>

          <div className="mt-20 relative">
            <div className="absolute left-0 right-0 top-[42px] h-px" style={{ background: "#0a0a0a22" }} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 relative">
              {STAGES.map((s, i) => (
                <div key={s.n} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-condensed uppercase text-[11px] tracking-[0.3em]" style={{ color: "#0a0a0a99" }}>Stage {s.n}</div>
                    <span className="h-3 w-3 rounded-full" style={{ background: i === STAGES.length - 1 ? "#c1121f" : "#0a0a0a" }} />
                  </div>
                  <div className="font-display text-4xl md:text-5xl mt-6 leading-none">{s.t.toUpperCase()}</div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "#0a0a0acc" }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 md:py-28 px-6 md:px-10" style={{ background: "#c1121f", color: "#f4f1ea" }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {[
            { v: "27", sup: "+", l: "Projects Shipped" },
            { v: "100", sup: "%", l: "AI-Native" },
            { v: "3", sup: "x", l: "Traffic Growth" },
            { v: "48", sup: "h", l: "To Launch" },
          ].map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="font-display leading-none text-[20vw] md:text-[8vw]">
                {s.v}<span style={{ color: "#c9a84c" }}>{s.sup}</span>
              </div>
              <div className="font-condensed uppercase tracking-[0.3em] text-[11px] mt-3" style={{ color: "#f4f1eadd" }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden py-32 md:py-44 px-6 md:px-10" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="font-display leading-none" style={{ fontSize: "min(38vw, 520px)", color: "#c9a84c10", letterSpacing: "0.02em" }}>
            CHAMPION
          </div>
        </div>
        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className="reveal inline-flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
            Kickoff
          </div>
          <h2 className="font-display reveal reveal-delay-1 mt-6 leading-[0.88] text-[14vw] md:text-[9vw]">
            READY FOR YOUR<br />
            <span style={{ color: "#c1121f" }}>BIGGEST</span> SEASON?
          </h2>
          <p className="reveal reveal-delay-2 mt-8 mx-auto max-w-2xl text-lg" style={{ color: "#f4f1eacc" }}>
            Tell us what you're building. We'll come back within 24 hours with first thoughts and a clear next move.
          </p>
          <div className="reveal reveal-delay-3 mt-12">
            <a href="mailto:hello@iwebai.studio" className="inline-block font-condensed uppercase tracking-[0.3em] text-sm px-10 py-5" style={{ background: "#c9a84c", color: "#0a0a0a" }}>
              Start the Conversation
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 md:px-10 py-8" style={{ borderColor: "#f4f1ea1f" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-condensed uppercase text-[11px] tracking-[0.3em]">
          <div className="font-display text-2xl tracking-wide">iWeb<span style={{ color: "#c9a84c" }}>.</span>AI</div>
          <div style={{ color: "#f4f1ea88" }}>© 2026 iWeb AI Studio · Lagos, Nigeria</div>
          <div className="flex gap-6" style={{ color: "#f4f1eacc" }}>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
            <a href="mailto:hello@iwebai.studio">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
