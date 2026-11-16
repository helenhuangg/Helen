"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { BookOpen, ListChecks, Route, type LucideIcon } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../case-study.module.css";
import CaseStudyLayout from "../CaseStudyLayout";

const sections = ["TL;DR", "Overview", "The Challenge", "Design Principles", "Process", "Outcome", "Impact", "Reflection"];
const ids = ["summary", "overview", "challenge", "goal", "process", "outcome", "impact", "reflection"];
const outlineSections = sections.map((label, index) => ({ id: ids[index], label }));
const direction = [
  { src: "yhack-ds-wireframe-sketch.png", label: "Sketch", alt: "Initial landing page sketch" },
  { src: "yhack-ds-color-palette.png", label: "Color", alt: "YHack color palette" },
  { src: "yhack-ds-typography.png", label: "Type", alt: "Typography and YHack wordmark" },
];
const development = [
  { src: "yhack-wireframes-section-sketches.png", label: "Sketch V2", alt: "Section layout sketches" },
  { src: "yhack-wireframes-hero-iterations.png", label: "Sketch V2", alt: "Hero layout iterations" },
  { src: "yhack-iterations-part-1.png", label: "V1", alt: "Early YHack concepts, typography, and grayscale layout on the Figma canvas" },
  { src: "yhack-wireframes-figma-canvas.png", label: "V2", alt: "Original Figma canvas of YHack sketches and layout iterations" },
  { src: "yhack-iterations-part-2.png", label: "V3", alt: "Later YHack layout and visual iterations on the Figma canvas" },
  { src: "yhack-iteration-v5.png", label: "V4", alt: "YHack V4 Figma canvas with the full-page design, cloud layers, floating islands, envelopes, and postcard FAQ" },
];
const illustrations = ["floating-islands", "tracks-stamps", "envelopes", "wordmark", "sterling-library", "clouds"].map(name => ({
  src: `yhack-asset-${name}.png`,
  label: name.replaceAll("-", " "),
  alt: `YHack ${name.replaceAll("-", " ")}`,
}));

function Gallery({ images }: { images: typeof direction }) {
  const [filter, setFilter] = useState("All");
  useEffect(() => { const frame = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(frame); }, [filter]);
  return <div className={`${styles.gallery} ${filter === "All" ? styles.galleryAll : ""}`}>
    <div className={styles.filters} aria-label="Filter project images">
      {["All", ...new Set(images.map(image => image.label))].map(label => <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>)}
    </div>
    <div className={styles.images}>
      {images.filter(image => filter === "All" || image.label === filter).map(image => (
        <img key={image.src} src={`/images/${image.src}`} alt={image.alt} onLoad={() => ScrollTrigger.refresh()} />
      ))}
    </div>
  </div>;
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: ReactNode }) {
  return <section id={id} className={styles.section}>
    <div className={styles.sectionHeading}><p className={styles.label}>{label}</p><h2>{title}</h2></div>
    {children}
  </section>;
}

export default function YHack() {
  const summaryEndRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = summaryEndRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { el.dataset.revealed = "true"; observer.disconnect(); }
    }, { threshold: .6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <CaseStudyLayout cover={{ src: "/images/yhack2.png", alt: "YHack 2026 illustrated website" }} sections={outlineSections}>
        <h1>YHack 2026: Designing a Hackathon Site Full of Love</h1>
        <p className={styles.deck}>Drawing ~800 registrations, a 3.2× jump from Fall 2024’s reported turnout, with a sky-to-ground scroll that guided visitors from the hero to Apply.</p>
        <dl className={styles.facts}>
          {[["Role", "Lead Product Designer"], ["Timeline", "Dec 2025 – Feb 2026"], ["Software", "Figma, Adobe Illustrator, Procreate"], ["Team", "Mandy Chen (graphics support), Rohan Phanse (development)"]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <section id="summary" className={styles.summary}>
          <p className={styles.label}>TL;DR</p>
          <p>YHack is Yale’s flagship hackathon, where students from across the country build products for social good. Over five weeks, I designed the 2026 event website from scratch, including a reusable design system and custom illustrations. <span ref={summaryEndRef} className={styles.summaryEnd}>The event drew ~800 registrations, about 3.2× the reported Fall 2024 in-person turnout.</span></p>
          <a className={styles.live} href="https://yhack.org" target="_blank" rel="noopener noreferrer">Visit the live site ↗</a>
        </section>
        <Section id="overview" label="Overview" title="An Invitation to Hack">
          <p>As the only product designer on YHack 2026, I took the main website from blank slate to launch. Building on the teaser’s visual tone, I defined what the site says, how people move through it, and how the Love theme shows up in its illustrations, interactions, and experiences.</p>
          <div><h3>This included:</h3><ul className={styles.tasks}>
            <li><strong>Set the design direction.</strong> I researched how TreeHacks, HackMIT, and Hack the North defined their concepts, visual language, and interactions.</li>
            <li><strong>Designed the full page.</strong> I decided what information to prioritize, how the page should unfold as visitors scrolled, and how the hero, About, Sponsors, FAQ, and footer would fit together.</li>
            <li><strong>Built the design system.</strong> I created reusable components, including buttons, input fields, and accordions, and defined how they would look and behave across the site.</li>
            <li><strong>Created the site’s illustrations and visual assets.</strong> I designed the clouds, floating islands, wax stamps, envelopes, postcard, YHack wordmark, and Sterling Library illustration.</li>
          </ul></div>
        </Section>
        <Section id="challenge" label="The Challenge" title="Bringing YHack Back">
          <p>YHack skipped 2025, so the 2026 site had to reintroduce it to students who hadn’t seen it before. The Love theme called for personality, hackers needed a quick path to apply, and we had only a few weeks.</p>
          <blockquote><img src="/images/case-study/quote-rule.svg" alt="" />How might we bring YHack back with a story that draws people in without hiding what they came for?</blockquote>
        </Section>
        <Section id="goal" label="Design Principles" title="Story First, Clarity Always">
          <p>Three rules guided every design decision.</p>
          <ol className={styles.principles}>
            {([
              [Route, "Create an immersive scroll experience", "Make the site feel like a journey, with each section flowing into the next."],
              [BookOpen, "Tell a story visually", "Lead with personality so the Love theme feels crafted."],
              [ListChecks, "Keep information clear and accessible", "Keep it playful while helping hackers find what they need quickly."],
            ] satisfies [LucideIcon, string, string][]).map(([Icon, title, description]) => (
              <li key={title}>
                <Icon className={styles.principleIcon} size={44} strokeWidth={1.25} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </Section>
        <Section id="process" label="Process" title="Starting Big">
          <h3>Establishing the Visual Direction</h3>
          <p>I met with two designers to align on the graphics. We decided on three features:</p>
          <ul>
            <li><strong>A sky-to-ground scroll narrative.</strong> The page descends from clouds to a lush landscape.</li>
            <li><strong>Layered parallax animation.</strong> Clouds and islands move at different speeds to create depth.</li>
            <li><strong>Romantic micro-moments.</strong> Envelopes, wax seals, and postcards reinforce the theme.</li>
          </ul>
          <p>From there, I sketched my initial vision, finalized the typography and wordmark, and built the design system.</p>
          <Gallery images={direction} />
          <h3>Nailing Down the Content</h3>
          <p>With the “how might we” question in mind, I moved into mid-fidelity to lock in the content hierarchy, scroll interactions, and assets we’d need.</p>
          <Gallery images={development} />
          <h3>Bringing It to Life</h3>
          <p>I replaced the wireframe placeholders with custom clouds, wax stamps, envelopes, postcards, and a Sterling Memorial Library illustration. I worked with Mandy on the Handsome Dan art, then handed off the designs and assets to Rohan to build.</p>
          <Gallery images={illustrations} />
        </Section>
        <Section id="outcome" label="Outcome" title="Design with Love">
          <p>The experiences I worked on include:</p>
          {["Hero", "About", "Tracks", "FAQ", "Footer"].map((label, index) => <figure className={styles.mockup} key={label}><figcaption>{label}</figcaption><img src={`/gifs/${encodeURIComponent(`Convert to GIF project (${index + 1}).gif`)}`} alt={`YHack ${label} animated design`} onLoad={() => ScrollTrigger.refresh()} /></figure>)}
        </Section>
        <Section id="impact" label="Impact" title="From Sketches to Launch">
          <dl className={styles.metrics}>
            {[
              ["10+", "Full-page design iterations"],
              ["~800", "Registrations"],
              ["3.2×", "Fall 2024 reported turnout"],
            ].map(([number, label]) => (
              <div key={label}><dt>{label}</dt><dd>{number}</dd></div>
            ))}
          </dl>
          <p>About 800 people registered for YHack 2026, roughly 3.2× the 250 students that <a className="underline underline-offset-2" href="https://yaledailynews.com/articles/yhack-brings-hundreds-of-hackers-to-campus-for-24-hours-of-innovation-2">Yale Daily News</a> reported attending in person in Fall 2024. After applying, one hacker messaged the team to say how smooth the site felt and singled out my Yale illustration at the bottom.</p>
          <div className={styles.comments}>
            <figure>
              <img src="/images/yhack-comment-applicant.png" alt="Applicant message praising the YHack website and Yale illustration" onLoad={() => ScrollTrigger.refresh()} />
            </figure>
            <figure>
              <img src="/images/yhack-comment-figma.png" alt="Figma comment on Iteration V3 saying w work" onLoad={() => ScrollTrigger.refresh()} />
            </figure>
          </div>
        </Section>
        <Section id="reflection" label="Reflection" title="Challenges & Outcomes">
          <p>So much of this process was experimental, I found myself putting in more time and effort than I anticipated, and sometimes on the incorrect things. This was largely due to my inexperience but it taught me to iterate with purpose. This project went through countless revisions and every single one of them was shaped by valuable feedback from both Mandy and Rohan.</p>
          <p>Designing for YHack gave me the chance to work with other people and get their perspectives. It made me realize that it’s not just about doing your part but also staying aligned, communicative, and trusting the people you are working with.</p>
        </Section>
    </CaseStudyLayout>
  );
}
