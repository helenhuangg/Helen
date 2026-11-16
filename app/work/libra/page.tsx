"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollPlayVideo from "@/app/components/ScrollPlayVideo";
import styles from "./page.module.css";
import useSfx from "@/app/components/useSfx";

const sections = ["TL;DR", "Role", "Problem", "Research", "Solution", "Features", "Precautions", "Reflection"];
const ids = ["summary", "role", "problem", "research", "solution", "features", "precautions", "reflection"];

const DEMO_YOUTUBE_ID = "95AB5zyNXjE";
const PROTOTYPE_URL = "https://www.figma.com/proto/a297lSdtMpmZwH8P68bRBl/FigBuild---Libra?node-id=200-4168&t=4ziG1uTxUwlFDhdl-1";

const stats = [
  ["30", "Age when balance starts to decline"],
  ["38K", "Deaths each year from falling"],
  ["50M", "Americans with balance disorders"],
] as const;

const features = [
  {
    id: "onboarding",
    title: "Personalized From Day One",
    copy: "Onboarding flexes to fit patients recovering from injury, athletes & dancers, and casual users alike.",
    video: "/videos/onboard.mp4",
  },
  {
    id: "live-balance",
    title: "Stay Balanced, Stay Safe",
    copy: "Real-time tracking of center of gravity, with instant feedback the moment balance starts to slip, built to catch small issues before they become injuries.",
    video: "/videos/live.mp4",
  },
  {
    id: "practice",
    title: "Practice, Your Way",
    copy: "Structured PT-recommended modules and games, both sorted by balance type so training always has a purpose. Whether it’s a guided session with a mirror-mode feedback or a quick game chasing a personal best.",
    video: "/videos/prac.mp4",
  },
  {
    id: "profile",
    title: "Profile",
    copy: "Surfaces environmental conditions in plain language like dropping pressure or rising humidity, so users know what to expect from their body today, alongside their fall risk score and daily challenge.",
    video: "/videos/profile_1.mp4",
  },
] as const;

const learnings = [
  "Building a tool that reads balance as an early warning sign showed us how much health tech overlooks the small, everyday signals our bodies give",
  "Designing for patients, athletes, and casual users at once taught us that “one-size-fits-all” rarely works in health — personalization has to be built in from the start.",
  "Working through a fast, remote 3-day sprint pushed us to trust our instincts fast, especially when deciding what to keep from AI tools like Figma Make.",
] as const;

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return <section id={id} className={styles.section}>
    <div className={styles.sectionHeading}><p className={styles.label}>{label}</p><h2>{title}</h2></div>
    {children}
  </section>;
}

export default function Libra() {
  const playOutlineHover = useSfx("/audio/select.mp3", 0.12);
  const [active, setActive] = useState("summary");
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    let frame: number;
    let lastPosition = 0;
    let showTop = false;
    const update = () => {
      const page = pageRef.current;
      const sidebar = sidebarRef.current;
      if (page && progressRef.current) {
        const rect = page.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
      if (sidebar && page) {
        const rect = page.getBoundingClientRect();
        const body = page.querySelector(`.${styles.body}`)?.getBoundingClientRect();
        sidebar.style.top = `${Math.max(120, (body?.top ?? 0) + 52)}px`;
        sidebar.style.visibility = rect.bottom > 160 ? "visible" : "hidden";
        const position = -rect.top;
        if (Math.abs(position - lastPosition) > 2) {
          showTop = position < lastPosition && position > 300;
          lastPosition = position;
        }
        if (position < 300) showTop = false;
        if (topRef.current) {
          topRef.current.dataset.visible = String(showTop);
          topRef.current.tabIndex = showTop ? 0 : -1;
          topRef.current.setAttribute("aria-hidden", String(!showTop));
        }
      }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -55% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  function backToTop() {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, smooth);
    else document.getElementById("smooth-wrapper")?.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
  }

  function navigate(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(el, !window.matchMedia("(prefers-reduced-motion: reduce)").matches, "top 100px");
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  const backLink = (
    <Link href="/" className={styles.back}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M13 8H3M7 4L3 8L7 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back
    </Link>
  );

  const outline = (
    <>
      {backLink}
      <nav aria-label="Case study sections">
        {sections.map((label, index) => {
          const id = ids[index];
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") playOutlineHover();
              }}
              onClick={(event) => {
                event.preventDefault();
                navigate(id);
              }}
            >
              <svg className={styles.navDash} width="12" height="4" viewBox="0 0 12 4" aria-hidden="true">
                <path d="M1 2H11" pathLength="1" />
              </svg>
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </>
  );

  return <main ref={pageRef} className={styles.page}>
    {mounted && createPortal(<div className={styles.progress} aria-hidden="true"><div ref={progressRef} /></div>, document.body)}
    {mounted && createPortal(<aside ref={sidebarRef} className={styles.sidebar}>{outline}</aside>, document.body)}
    {mounted && createPortal(<button ref={topRef} className={styles.toTop} type="button" aria-label="Back to top" onClick={backToTop}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3M4 7L8 3L12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Top</button>, document.body)}
    <div className={styles.cover}><img src="/images/libra-cover.png" alt="Libra Live Balance phone mockup" /></div>
    <div className={styles.body}>
      <div className={styles.mobileSidebar}>{backLink}</div>
      <div className={styles.content}>
        <h1>Libra: See Your Sixth Sense</h1>
        <dl className={styles.facts}>
          {[
            ["Role", "Product Designer"],
            ["Timeline", "Mar 7 – Mar 9, 2026"],
            ["Software", "Figma, FigJam, FigMake"],
            ["Team", "Mandy Chen, Miffy Wang, Chris Shia"],
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>

        <section id="summary" className={styles.summary}>
          <p className={styles.label}>TL;DR</p>
          <p>
            Libra is a balance-sensing product built for FigBuild 2026. During the three-day sprint, I led branding and visual design, designed and prototyped the UI, and created the presentation slides.
          </p>
          <div className={styles.ctas}>
            {DEMO_YOUTUBE_ID ? (
              <a className={styles.live} href={`https://www.youtube.com/watch?v=${DEMO_YOUTUBE_ID}`} target="_blank" rel="noopener noreferrer">Watch the demo ↗</a>
            ) : null}
            <a className={styles.live} href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer">Open prototype ↗</a>
          </div>
        </section>

        <Section id="role" label="Role" title="My Responsibilities">
          <p>I worked on building out the visual identity and shape assets for the project, and collaborated closely with the team on wireframing and prototyping. I also designed the Figma presentation slides and added small animations to the demo video to give it a bit of extra polish.</p>
          <div>
            <h3>This included:</h3>
            <ul className={styles.tasks}>
              <li><strong>Visual identity.</strong> Branding and shape assets that made Libra feel like a sixth sense, not a clinical tracker.</li>
              <li><strong>UI &amp; prototyping.</strong> Wireframes and flows built with Mandy, Miffy, and Chris.</li>
              <li><strong>Presentation &amp; polish.</strong> Figma slides plus small demo animations for the final pitch.</li>
            </ul>
          </div>
        </Section>

        <Section id="problem" label="Problem" title="Balance declines quietly">
          <p>Alysa&apos;s ankle has been compensating for months without her realizing it. She figured that was just part of being an athlete.</p>
          <p>Most people never train their balance — they just rely on instinct. That instinct shifts with age, injury, or a growing body, but the decline goes unnoticed until a fall or a dizzy spell forces it into view. Even then, it&apos;s often written off as mental — nerves, a bad day — rather than something that can be measured and rebuilt into a new sense.</p>
        </Section>

        <Section id="research" label="Research" title="What We Found">
          <dl className={styles.metrics}>
            {stats.map(([number, label]) => (
              <div key={label}><dt>{label}</dt><dd>{number}</dd></div>
            ))}
          </dl>
          <p>Mandy, Miffy, and Chris&apos;s research and interviews revealed something surprising: balance is an invisible but critical factor in mortality across all age groups.</p>
        </Section>

        <Section id="solution" label="Solution" title="Introducing: Libra">
          <p>Libra makes balance visible — a sixth sense you can train — so decline stops being invisible until it becomes injury.</p>
          {DEMO_YOUTUBE_ID ? (
            <div className={styles.embed}>
              <iframe
                src={`https://www.youtube.com/embed/${DEMO_YOUTUBE_ID}`}
                title="Libra demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}
        </Section>

        <Section id="features" label="Features" title="Designed for Every Body">
          {features.map((feature) => (
            <figure className={styles.feature} key={feature.id} id={feature.id}>
              <figcaption>{feature.title}</figcaption>
              <p>{feature.copy}</p>
              <ScrollPlayVideo
                src={feature.video}
                className={styles.media}
                playbackLabel={feature.title}
                onLoadedData={() => ScrollTrigger.refresh()}
              />
            </figure>
          ))}
        </Section>

        <Section id="precautions" label="Precautions" title="Safeguards & Considerations">
          <p>Responsible design meant privacy, consent, and emergency protocols had to sit beside the product story — not after it.</p>
          <img className={styles.media} src="/images/libra/privacy.jpg" alt="Privacy and Consent screens" onLoad={() => ScrollTrigger.refresh()} />
          <img className={styles.media} src="/images/libra/emergency.jpg" alt="Emergency Protocols screens" onLoad={() => ScrollTrigger.refresh()} />
        </Section>

        <Section id="reflection" label="Reflection" title="Looking Back">
          <div className={styles.learnings}>
            {learnings.map((learning) => (
              <p className={styles.learning} key={learning}>{learning}</p>
            ))}
          </div>
        </Section>
      </div>
    </div>
  </main>;
}
