"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import useSfx from "@/app/components/useSfx";
import styles from "./case-study.module.css";

export default function CaseStudyLayout({
  cover,
  sections,
  children,
}: {
  cover: { src: string; alt: string };
  sections: { id: string; label: string }[];
  children: ReactNode;
}) {
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
    }, {rootMargin: "-15% 0px -55% 0px"});
    sections.forEach(({ id }) => {const el = document.getElementById(id); if (el) observer.observe(el);});
    return () => observer.disconnect();
  }, [sections]);
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
    else el.scrollIntoView({behavior: "smooth", block: "start"});
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
        {sections.map(({ id, label }) => {
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
    {mounted && createPortal((<aside ref={sidebarRef} className={styles.sidebar}>
        {outline}
      </aside>), document.body)}
    {mounted && createPortal(<button ref={topRef} className={styles.toTop} type="button" aria-label="Back to top" onClick={backToTop}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3M4 7L8 3L12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Top</button>, document.body)}
    <div className={styles.cover}><img src={cover.src} alt={cover.alt} /></div>
    <div className={styles.body}>
      <div className={styles.mobileSidebar}>{backLink}</div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  </main>;
}
