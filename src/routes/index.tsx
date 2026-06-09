import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIFA World Cup 2026 — The World Is Watching" },
      { name: "description", content: "The 23rd FIFA World Cup. 48 nations. 16 host cities. 104 matches across the United States, Canada and Mexico. June 11 — July 19, 2026." },
      { property: "og:title", content: "FIFA World Cup 2026 — The World Is Watching" },
      { property: "og:description", content: "48 nations. 3 host countries. 16 cities. 104 matches. The biggest World Cup in history kicks off June 11, 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

const PILLARS = [
  { n: "01", t: "48 Nations", d: "The first World Cup expanded to 48 teams — more nations, more stories, more drama than ever before." },
  { n: "02", t: "3 Countries", d: "Hosted across the United States, Canada and Mexico — the first ever tri-nation World Cup." },
  { n: "03", t: "16 Cities", d: "From Vancouver to Mexico City, sixteen iconic stadiums will stage the world's biggest tournament." },
  { n: "04", t: "104 Matches", d: "A record-breaking 104 fixtures — 39 more than 2022 — across 39 days of football." },
];

const CITIES = [
  { n: "01", name: "New York / New Jersey", tag: "Final · MetLife Stadium" },
  { n: "02", name: "Mexico City", tag: "Opening Match · Estadio Azteca" },
  { n: "03", name: "Los Angeles", tag: "SoFi Stadium" },
  { n: "04", name: "Toronto", tag: "BMO Field" },
  { n: "05", name: "Miami · Dallas · Atlanta", tag: "And ten more host cities" },
];

const STAGES = [
  { n: "01", t: "Group Stage", d: "12 groups of 4. June 11 — 27." },
  { n: "02", t: "Round of 32", d: "Knockouts begin. June 28 — July 3." },
  { n: "03", t: "Round of 16", d: "The field tightens. July 4 — 7." },
  { n: "04", t: "Quarters & Semis", d: "Eight nations. July 9 — 15." },
  { n: "05", t: "The Final", d: "MetLife Stadium. July 19." },
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

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

function Page() {
  useReveal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const countdown = useCountdown(new Date("2026-06-11T16:00:00Z"));

  // Scroll-controlled video scrubbing
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let duration = 0;
    const onReady = () => {
      duration = video.duration || 0;
      if (duration > 0) setVideoReady(true);
    };
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 1) onReady();

    // Prime the video on iOS — required before currentTime updates work reliably
    const prime = () => {
      video.play().catch(() => { /* noop */ });
      video.pause();
    };
    prime();
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    window.addEventListener("click", prime, { once: true });

    let raf = 0;
    const tick = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      if (duration > 0) {
        const target = Math.min(duration - 0.05, p * duration);
        try { video.currentTime = target; } catch { /* noop */ }
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("click", prime);
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#f4f1ea" }}>
      <Cursor />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference">
        <a href="#top" className="font-display text-2xl tracking-wide" style={{ color: "#f4f1ea" }}>
          WC<span style={{ color: "#c9a84c" }}>.</span>26
        </a>
        <nav className="hidden md:flex gap-8 font-condensed uppercase text-xs tracking-[0.25em]" style={{ color: "#f4f1ea" }}>
          <a href="#tournament">Tournament</a>
          <a href="#cities">Host Cities</a>
          <a href="#format">Format</a>
          <a href="#tickets">Tickets</a>
        </nav>
        <a href="#tickets" className="font-condensed uppercase text-xs tracking-[0.25em] border border-current px-4 py-2" style={{ color: "#f4f1ea" }}>
          Tickets
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
            preload="metadata"
            disableRemotePlayback
            className="absolute inset-0 h-full w-full"
            style={{ objectFit: "cover", objectPosition: "center", opacity: videoReady ? 1 : 0, transition: "opacity 600ms ease" }}
          />
          {/* fallback bg while video loads */}
          <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse at 50% 60%, #1a1a1a 0%, #0a0a0a 70%)" }} />

          {/* eyebrow */}
          <div className="absolute top-24 left-6 md:left-10 reveal in">
            <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#f4f1ea" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
              USA · Canada · Mexico · June 11 — July 19, 2026
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
                The 23rd FIFA World Cup. 48 nations. 16 cities. 104 matches across three countries. The biggest World Cup in history kicks off in—
              </p>
              <div className="reveal reveal-delay-2 in flex gap-4 md:justify-end font-display text-3xl md:text-5xl" style={{ color: "#c9a84c" }}>
                {[
                  { v: countdown.d, l: "Days" },
                  { v: countdown.h, l: "Hrs" },
                  { v: countdown.m, l: "Min" },
                  { v: countdown.s, l: "Sec" },
                ].map((c) => (
                  <div key={c.l} className="text-center">
                    <div className="tabular-nums leading-none">{String(c.v).padStart(2, "0")}</div>
                    <div className="font-condensed uppercase tracking-[0.25em] text-[10px] mt-2" style={{ color: "#f4f1eaaa" }}>{c.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* progress */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "#ffffff14" }}>
            <div ref={progressRef} className="h-full origin-left" style={{ background: "#c9a84c", transform: "scaleX(0)" }} />
          </div>
          <div className="absolute bottom-3 left-6 md:left-10 font-condensed uppercase text-[10px] tracking-[0.35em]" style={{ color: "#f4f1ea99" }}>
            Scroll to play
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
              {["FIFA World Cup 2026","48 Nations · 3 Countries","June 11 — July 19","104 Matches","16 Host Cities","The World Is Watching"].map((t, j) => (
                <span key={j} className="flex items-center gap-8">
                  <span className="tracking-wide">{t}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: "#c1121f" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* TOURNAMENT */}
      <section id="tournament" className="px-6 md:px-10 py-28 md:py-40 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          <div className="reveal">
            <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
              The Tournament · 01
            </div>
            <h2 className="font-display mt-6 leading-[0.88] text-[14vw] md:text-[7.5vw]" style={{ color: "#f4f1ea" }}>
              THE BIGGEST<br />
              <span className="font-italic-accent" style={{ color: "#c9a84c" }}>stage</span> EVER.
            </h2>
          </div>
          <div className="reveal reveal-delay-1">
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#f4f1eadd" }}>
              For the first time, the FIFA World Cup expands to 48 nations and stretches across three countries.
              From the opening match at the historic Estadio Azteca in Mexico City to the final under the lights at
              MetLife Stadium in New York / New Jersey — this is the World Cup, rewritten.
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

      {/* HOST CITIES */}
      <section id="cities" className="border-t" style={{ borderColor: "#ffffff14" }}>
        <div className="px-6 md:px-10 pt-20 pb-10 max-w-[1400px] mx-auto reveal">
          <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
            The Host Cities · 02
          </div>
          <h2 className="font-display mt-4 text-[14vw] md:text-[8vw] leading-[0.88]">SIXTEEN STAGES.</h2>
        </div>
        <ul className="border-t" style={{ borderColor: "#ffffff14" }}>
          {CITIES.map((p) => (
            <li key={p.n} className="group relative overflow-hidden border-b reveal" style={{ borderColor: "#ffffff14" }}>
              <a href="#tickets" className="relative flex items-center px-6 md:px-10 transition-all duration-500" style={{ height: 220 }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, rgba(193,18,31,0.85) 0%, rgba(10,10,10,0.4) 100%)" }} />
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
                  <div className="hidden md:flex items-center gap-4 font-condensed uppercase tracking-[0.3em] text-xs translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    Explore
                    <span aria-hidden className="inline-block">→</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* FORMAT */}
      <section id="format" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#f4f1ea", color: "#0a0a0a" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal">
            <div className="flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c1121f" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
              Road to the Final · 03
            </div>
            <h2 className="font-display mt-4 text-[14vw] md:text-[7vw] leading-[0.88]">
              FIVE ROUNDS. <span className="font-italic-accent" style={{ color: "#c1121f" }}>one</span> TROPHY.
            </h2>
          </div>

          <div className="mt-20 relative">
            <div className="absolute left-0 right-0 top-[42px] h-px" style={{ background: "#0a0a0a22" }} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-6 relative">
              {STAGES.map((s, i) => (
                <div key={s.n} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-condensed uppercase text-[11px] tracking-[0.3em]" style={{ color: "#0a0a0a99" }}>Round {s.n}</div>
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
            { v: "48", sup: "", l: "Nations" },
            { v: "16", sup: "", l: "Host Cities" },
            { v: "104", sup: "", l: "Matches" },
            { v: "39", sup: "d", l: "Of Football" },
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
      <section id="tickets" className="relative overflow-hidden py-32 md:py-44 px-6 md:px-10" style={{ background: "#0a0a0a" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="font-display leading-none" style={{ fontSize: "min(38vw, 520px)", color: "#c9a84c10", letterSpacing: "0.02em" }}>
            CHAMPION
          </div>
        </div>
        <div className="relative max-w-[1200px] mx-auto text-center">
          <div className="reveal inline-flex items-center gap-3 font-condensed uppercase text-[11px] tracking-[0.35em]" style={{ color: "#c9a84c" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c1121f" }} />
            Kickoff · June 11, 2026
          </div>
          <h2 className="font-display reveal reveal-delay-1 mt-6 leading-[0.88] text-[14vw] md:text-[9vw]">
            BE THERE WHEN<br />
            <span style={{ color: "#c1121f" }}>HISTORY</span> HAPPENS.
          </h2>
          <p className="reveal reveal-delay-2 mt-8 mx-auto max-w-2xl text-lg" style={{ color: "#f4f1eacc" }}>
            Sign up for ticket alerts, match schedules and host city guides. The biggest tournament ever staged is closer than you think.
          </p>
          <div className="reveal reveal-delay-3 mt-12">
            <a href="#" className="inline-block font-condensed uppercase tracking-[0.3em] text-sm px-10 py-5" style={{ background: "#c9a84c", color: "#0a0a0a" }}>
              Get Ticket Alerts
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 md:px-10 py-8" style={{ borderColor: "#f4f1ea1f" }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-condensed uppercase text-[11px] tracking-[0.3em]">
          <div className="font-display text-2xl tracking-wide">WC<span style={{ color: "#c9a84c" }}>.</span>26</div>
          <div style={{ color: "#f4f1ea88" }}>© 2026 · FIFA World Cup 26 · Fan Site</div>
          <div className="flex gap-6" style={{ color: "#f4f1eacc" }}>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter / X</a>
            <a href="#">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
