"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import virmiu from "@/public/images/fun/kyurinas.png";
import yaleHunter from "@/public/images/fun/yale-hunter.png";
import yaleMath from "@/public/images/fun/yale-math-competitions.png";
import pushOrPull from "@/public/images/fun/push-or-pull.png";
import dfaStickers from "@/public/images/fun/dfa-bdd-stickers.png";
import yaleLaw from "@/public/images/fun/yale-supreme-court.png";
import grokathon1 from "@/public/images/fun/grokathon/design-1.png";
import grokathon2 from "@/public/images/fun/grokathon/design-2.png";
import grokathon3 from "@/public/images/fun/grokathon/design-3.png";
import grokathon4 from "@/public/images/fun/grokathon/design-4.png";
import dfaCover from "@/public/images/fun/dfa-studio/cover.jpg";
import dfaFirst from "@/public/images/fun/dfa-studio/first.jpg";
import dfaEvents from "@/public/images/fun/dfa-studio/events.jpg";
import dfaInstagram from "@/public/images/fun/dfa-studio/instagram.jpg";
import styles from "./page.module.css";

type Project = {
  title: string;
  year?: string;
  image?: StaticImageData;
  designs?: { image: StaticImageData; alt: string; video?: string }[];
  video?: string;
  fullVideo?: string;
  poster?: string;
  href?: string;
  interactivePreview?: boolean;
  description?: string;
  builtWith?: string[];
};

const collections: { id: string; title: string; projects: Project[] }[] = [
  {
    id: "motion",
    title: "Motion",
    projects: [
      { title: "Spotify Commercial", builtWith: ["After Effects"], description: "A student commercial made for Student Television Network.", year: "2024", video: "/videos/spot1.mp4", fullVideo: "/videos/spotify-commercial.mp4", poster: "/images/fun/motion/spotify.jpg" },
      { title: "Thanksgiving Food Drive", description: "A promotional video for my school’s annual food drive.", year: "2024", video: "/videos/Thanksgiving Food Drive Promotional Video.mp4", poster: "/images/fun/motion/thanksgiving-food-drive.jpg" },
      { title: "Flower Sale Fundraiser", description: "A flower-themed promo to raise funds for our trip to the Student Television Network convention.", year: "2023", video: "/videos/Flower Sale Fundraiser Promotional Video.mp4", poster: "/images/fun/motion/flower-sale-fundraiser.jpg" },
      { title: "QuickChews Commercial", description: "Motion graphics for a student commercial made with a friend who directed and filmed it.", year: "2024", video: "/videos/QuickChews Commercial Video.mp4", poster: "/images/fun/motion/quickchews.jpg" },
      { title: "Job Fair", description: "An informational promo for my school district’s job fair.", year: "2023", video: "/videos/D218 Job Fair Promotional Video.mp4", poster: "/images/fun/motion/job-fair.jpg" },
      { title: "Dog Dish", description: "A motion intro for our school’s news roundup.", year: "2024", video: "/videos/Dog Dish Intro.mp4", poster: "/images/fun/motion/dog-dish.jpg" },
      { title: "Club Corner", description: "An animated intro for a school broadcast segment introducing student clubs.", year: "2025", video: "/videos/Club Corner Intro.mp4", poster: "/images/fun/motion/club-corner.jpg" },
    ],
  },
  {
    id: "websites",
    title: "Websites & Experiences",
    projects: [
      { title: "Virmiu", interactivePreview: true, description: "A commission website for an illustrator and retexture modder.", year: "2026", image: virmiu, href: "https://virmiu.netlify.app/index.html" },
      { title: "Yale Africa Start Up Review", year: "2025" },
      { title: "Yale Hunter", description: "A pixel-art game made with friends for CPSC 1001.", year: "2025", image: yaleHunter, href: "https://github.com/helenhuangg/CPSC1001-Yale-Hunter" },
    ],
  },
  {
    id: "misc",
    title: "Other Misc.",
    projects: [
      {
        title: "DFA Studio 2026 Launch",
        year: "2026",
        description: "Motion graphics for the DFA Studio 2026 launch.",
        builtWith: ["Figma Motion"],
        image: dfaCover,
        designs: [
          { image: dfaCover, alt: "Launch cover motion graphic", video: "/videos/dfa-studio/cover.mp4" },
          { image: dfaFirst, alt: "1ST motion graphic", video: "/videos/dfa-studio/first.mp4" },
          { image: dfaEvents, alt: "Events motion graphic", video: "/videos/dfa-studio/events.mp4" },
          { image: dfaInstagram, alt: "Instagram launch motion graphic", video: "/videos/dfa-studio/instagram.mp4" },
        ],
      },
      {
        title: "y/cs Designs",
        year: "2026",
        description: "Grokathon event graphics for Yale Computer Society.",
        image: grokathon1,
        designs: [
          { image: grokathon1, alt: "Grokathon event poster with a QR code, participant perks, and prizes" },
          { image: grokathon2, alt: "Two-panel Grokathon social graphic announcing the event and prizes" },
          { image: grokathon3, alt: "Square Grokathon announcement featuring the illustrated mascot at a laptop" },
          { image: grokathon4, alt: "Alternate square Grokathon design featuring the laptop illustration" },
        ],
      },
      { title: "Yale Math Competitions", year: "2025", image: yaleMath },
      { title: "Push or Pull?", description: "A zine made for ART 1782.", year: "2025", image: pushOrPull },
      { title: "DFA Bulldog Days Stickers", description: "Sticker designs for Design for America’s Bulldog Days event.", year: "2026", image: dfaStickers },
      { title: "Yale Supreme Court Advocacy Clinic", year: "2026", image: yaleLaw },
    ],
  },
];

const gallery = collections.flatMap(({ title: category, projects }) =>
  projects.map(project => ({ ...project, category: category === "Motion" ? "Motion Graphics" : category })),
);

function CraftCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { title, year, image, video, poster, designs } = project;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const designCount = designs?.length ?? 0;

  useEffect(() => {
    if (designCount < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!reducedMotion.matches && !document.hidden) {
        setPreviewIndex(current => (current + 1) % designCount);
      }
    }, 3500);
    return () => window.clearInterval(timer);
  }, [designCount]);

  function stopPreview() {
    videoRef.current?.pause();
    setPlaying(false);
  }
  return (
    <li
      className={styles.card}
      onPointerEnter={event => {
        if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const preview = videoRef.current;
        if (preview) void preview.play().catch(() => {});
      }}
      onPointerLeave={stopPreview}
    >
      <div className={styles.media} data-placeholder={!image && !video}>
        {designs?.length ? (
          <div className={styles.cardSlideshow}>
            {designs.map((design, index) => (
              <Image
                key={design.image.src}
                src={design.image}
                alt=""
                sizes="(max-width: 767px) 80vw, 340px"
                data-active={index === previewIndex}
              />
            ))}
          </div>
        ) : image && <Image src={image} alt="" sizes="(max-width: 767px) 80vw, 605px" />}
        {poster && <img src={poster} alt="" />}
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
      <button className={styles.cardButton} type="button" aria-label={`View ${title}`} aria-haspopup="dialog" onClick={() => { stopPreview(); onOpen(); }} />
    </li>
  );
}

function Collection({ id, title, projects, onOpen }: (typeof collections)[number] & { onOpen: (title: string) => void }) {
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
            {projects.map(project => <CraftCard key={project.title} project={project} onOpen={() => onOpen(project.title)} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function DesignCarousel({ designs }: { designs: NonNullable<Project["designs"]> }) {
  const [slide, setSlide] = useState(0);
  const design = designs[slide];
  if (!design) return null;

  const count = designs.length;
  const move = (step: number) => setSlide(current => (current + step + count) % count);

  return (
    <div
      className={styles.designCarousel}
      role="group"
      aria-label="Project designs"
      onKeyDown={event => {
        if (event.target instanceof HTMLVideoElement || count < 2 || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
        event.preventDefault();
        event.stopPropagation();
        move(event.key === "ArrowLeft" ? -1 : 1);
      }}
    >
      <div className={styles.designStage} data-multiple={count > 1}>
        {count > 1 && (
          <button type="button" aria-label="Previous design" onClick={() => move(-1)}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
        )}
        <div className={styles.dialogMedia}>
          {design.video ? (
            <video key={design.video} src={design.video} poster={design.image.src} controls playsInline preload="metadata" aria-label={design.alt} />
          ) : (
            <Image src={design.image} alt={design.alt} sizes="(max-width: 700px) 94vw, 850px" />
          )}
        </div>
        {count > 1 && (
          <button type="button" aria-label="Next design" onClick={() => move(1)}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      {count > 1 && (
        <p className={styles.designCounter} aria-live="polite" aria-atomic="true">Design {slide + 1} / {count}</p>
      )}
    </div>
  );
}

function ProjectDialog({
  index,
  setIndex,
  onClose,
}: {
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const project = gallery[index];
  const video = project.fullVideo ?? project.video;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const smoother = ScrollSmoother.get();
    const wasPaused = smoother?.paused();
    if (smoother && !wasPaused) smoother.paused(true);

    return () => {
      if (dialog.open) dialog.close();
      if (smoother && !wasPaused) smoother.paused(false);
    };
  }, []);

  function move(direction: -1 | 1) {
    setIndex((index + direction + gallery.length) % gallery.length);
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="craft-dialog-title"
      onClose={() => { if (!dialogRef.current?.open) onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      onKeyDown={event => {
        if (event.target instanceof HTMLVideoElement || event.altKey || event.metaKey || event.ctrlKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div className={styles.dialogFrame}>
        <div className={styles.dialogSheet}>
          <button type="button" autoFocus className={styles.dialogClose} aria-label="Close project" onClick={() => dialogRef.current?.close()}>
            <X size={18} aria-hidden="true" />
          </button>
          <div className={styles.dialogScroll} key={project.title}>
            {project.interactivePreview && project.href ? (
              <div className={styles.dialogMedia}>
                <iframe
                  className={styles.sitePreview}
                  src={project.href}
                  title={`${project.title} interactive website`}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : project.designs?.length ? (
              <DesignCarousel designs={project.designs} />
            ) : (video || project.image) && (
              <div className={styles.dialogMedia}>
                {video ? (
                  <video key={video} src={video} poster={project.poster} controls playsInline preload="metadata" aria-label={project.title} />
                ) : project.image && (
                  <Image src={project.image} sizes="(max-width: 700px) 94vw, 850px" alt={project.title} />
                )}
              </div>
            )}
            <div className={styles.dialogDetails}>
              <div className={styles.dialogHeading}>
                <h2 id="craft-dialog-title">{project.title}</h2>
                <span className={styles.dialogTag}>{project.category}</span>
              </div>
              {project.description && <p className={styles.dialogDescription}>{project.description}</p>}
              <div className={styles.dialogTools}>
                <dl>
                  <dt>Made with</dt>
                  <dd>{project.builtWith?.join(", ") || "Tools to be added"}</dd>
                </dl>
                {project.builtWith?.includes("After Effects") && (
                  <span className={styles.afterEffectsBadge} aria-hidden="true">Ae</span>
                )}
              </div>
              {project.href && (
                <a className={styles.dialogLink} href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.href.includes("github.com") ? "View on GitHub" : "Visit site"} ↗
                </a>
              )}
            </div>
          </div>
        </div>
        <div className={styles.dialogPager} aria-label="Browse Craft projects">
          <button type="button" aria-label="Previous project" onClick={() => move(-1)}><ChevronLeft size={18} aria-hidden="true" /></button>
          <span aria-live="polite" aria-atomic="true"><span className="sr-only">{project.title}, project </span>{index + 1} / {gallery.length}</span>
          <button type="button" aria-label="Next project" onClick={() => move(1)}><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </dialog>
  );
}

export default function CraftPage() {
  const [projectIndex, setProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      document.getElementById("smooth-wrapper")?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <h1>Crafts</h1>
        <p>designs i make for my beloved school orgs, friends, and myself</p>
      </div>
      {collections.map(collection => (
        <Collection key={collection.id} {...collection} onOpen={title => setProjectIndex(gallery.findIndex(project => project.title === title))} />
      ))}
      {projectIndex !== null && <ProjectDialog index={projectIndex} setIndex={setProjectIndex} onClose={() => setProjectIndex(null)} />}
    </main>
  );
}
