"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";

type Project = {
  title: string;
  year?: string;
  image?: string;
  video?: string;
  poster?: string;
  href?: string;
};

const collections: { id: string; title: string; projects: Project[] }[] = [
  {
    id: "motion",
    title: "Motion",
    projects: [
      { title: "Spotify Commercial", year: "2024", video: "/videos/spot1.mp4", poster: "/images/fun/motion/spotify.jpg" },
      { title: "Thanksgiving Food Drive", year: "2024", video: "/videos/Thanksgiving Food Drive Promotional Video.mp4", poster: "/images/fun/motion/thanksgiving-food-drive.jpg" },
      { title: "Flower Sale Fundraiser", year: "2023", video: "/videos/Flower Sale Fundraiser Promotional Video.mp4", poster: "/images/fun/motion/flower-sale-fundraiser.jpg" },
      { title: "QuickChews Commercial", year: "2024", video: "/videos/QuickChews Commercial Video.mp4", poster: "/images/fun/motion/quickchews.jpg" },
      { title: "Job Fair", year: "2023", video: "/videos/D218 Job Fair Promotional Video.mp4", poster: "/images/fun/motion/job-fair.jpg" },
      { title: "Dog Dish", year: "2024", video: "/videos/Dog Dish Intro.mp4", poster: "/images/fun/motion/dog-dish.jpg" },
      { title: "Club Corner", year: "2025", video: "/videos/Club Corner Intro.mp4", poster: "/images/fun/motion/club-corner.jpg" },
    ],
  },
  {
    id: "websites",
    title: "Websites & Experiences",
    projects: [
      { title: "Virmiu", year: "2026", image: "/images/fun/kyurinas.png", href: "https://virmiu.netlify.app/index.html" },
      { title: "Yale Africa Start Up Review", year: "2025" },
      { title: "Yale Hunter", year: "2025", image: "/images/fun/yale-hunter.png", href: "https://github.com/helenhuangg/CPSC1001-Yale-Hunter" },
    ],
  },
  {
    id: "misc",
    title: "Other Misc.",
    projects: [
      { title: "DFA Studio 2026 Launch", year: "2026" },
      { title: "y/cs Designs", year: "2026" },
      { title: "Yale Math Competitions", year: "2025", image: "/images/fun/yale-math-competitions.png" },
      { title: "Push or Pull?", year: "2025", image: "/images/fun/push-or-pull.png" },
      { title: "DFA Bulldog Days Stickers", year: "2026", image: "/images/fun/dfa-bdd-stickers.png" },
      { title: "Yale Supreme Court Advocacy Clinic", year: "2026", image: "/images/fun/yale-supreme-court.png" },
    ],
  },
];

function CraftCard({ project }: { project: Project }) {
  const { title, year, image, video, poster, href } = project;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function stopPreview() {
    videoRef.current?.pause();
    setPlaying(false);
  }
  const content = (
    <>
      <div
        className={styles.media}
        data-placeholder={!image && !video}
        onPointerEnter={event => {
          if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          const preview = videoRef.current;
          if (preview) void preview.play().catch(() => {});
        }}
        onPointerLeave={stopPreview}
      >
        {image && <img src={image} alt="" loading="lazy" />}
        {poster && <img src={poster} alt="" loading="lazy" />}
        {video && (
          <video
            ref={videoRef}
            data-playing={playing}
            src={video}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
          />
        )}
      </div>
      <div className={styles.caption}>
        <h3>{title}</h3>
        {year && <span>{year}</span>}
      </div>
    </>
  );

  return (
    <li className={styles.card}>
      {href?.startsWith("/") ? (
        <Link href={href} className={styles.cardLink}>{content}</Link>
      ) : href ? (
        <a href={href} className={styles.cardLink} target="_blank" rel="noopener noreferrer">{content}</a>
      ) : content}
    </li>
  );
}

function Collection({ id, title, projects }: (typeof collections)[number]) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  return (
    <section className={styles.collection}>
      <h2 className={styles.collectionHeading}>
        <button
          className={styles.summary}
          type="button"
          aria-expanded={open}
          aria-controls={`craft-${id}`}
          onClick={() => setOpen(value => !value)}
        >
          {title}
          <span className={styles.rule} aria-hidden="true" />
          <Plus className={styles.toggle} size={22} strokeWidth={1.3} aria-hidden="true" />
        </button>
      </h2>
      <div
        id={`craft-${id}`}
        className={styles.panel}
        data-open={open}
        inert={!open}
        onTransitionEnd={event => {
          if (event.target === event.currentTarget && event.propertyName === "grid-template-rows") {
            ScrollTrigger.refresh();
          }
        }}
      >
        <div className={styles.panelInner}>
          <ul className={styles.row} data-wide={id !== "misc"} aria-label={`${title} projects`} tabIndex={0}>
            {projects.map(project => <CraftCard key={project.title} project={project} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function CraftPage() {
  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <h1>Crafts</h1>
        <p>designs i make for my beloved school orgs, friends, and myself</p>
      </div>
      {collections.map(collection => <Collection key={collection.id} {...collection} />)}
    </main>
  );
}
