"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type WorkNavProps = {
  sections: { id: string; label: string }[];
};

export default function WorkNav({ sections }: WorkNavProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [backHidden, setBackHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    setVisible(mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener("change", handler);
    return () => {
      setMounted(false);
      mq.removeEventListener("change", handler);
    };
  }, []);

  // Mobile: hide back button as soon as user scrolls down, show when scrolling up
  useEffect(() => {
    if (!mounted || visible) return;

    const scrollEl = document.getElementById("smooth-wrapper");
    if (!scrollEl) return;

    const getScrollTop = () =>
      scrollEl.scrollTop ?? document.documentElement.scrollTop ?? 0;

    lastScrollY.current = getScrollTop();

    const TOP_THRESHOLD = 80; // Near top: always show (avoids overscroll bounce hiding it)

    const updateFromScroll = () => {
      const current = getScrollTop();
      const delta = current - lastScrollY.current;
      if (current < TOP_THRESHOLD) {
        setBackHidden(false); // Near top: always show
      } else if (Math.abs(delta) > 1) {
        setBackHidden(delta > 0);
      }
      lastScrollY.current = current;
    };

    const onScroll = () => updateFromScroll();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });

    let rafId: number;
    const poll = () => {
      updateFromScroll();
      rafId = requestAnimationFrame(poll);
    };
    rafId = requestAnimationFrame(poll);

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, visible]);

  useEffect(() => {
    if (!mounted) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted, sections]);

  const handleBack = () => {
    router.push("/?scrollTo=work");
  };

  const BackArrow = () => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="244 400 100 256 244 112"
        style={{
          fill: "none",
          stroke: "var(--color-primary)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "48px",
        }}
      />
      <line
        x1="120"
        y1="256"
        x2="412"
        y2="256"
        style={{
          fill: "none",
          stroke: "var(--color-primary)",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "48px",
        }}
      />
    </svg>
  );

  if (!mounted) return null;

  if (!visible) {
    return (
      <>
        <div
          className="fixed left-0 top-0 z-[9998] w-full px-4 pt-4 transition-opacity duration-200 ease-out"
          style={{
            top: 56,
            paddingTop: "max(16px, env(safe-area-inset-top))",
            opacity: backHidden ? 0 : 1,
            pointerEvents: backHidden ? "none" : "auto",
          }}
        >
          <button
            onClick={handleBack}
            className="flex items-center justify-center px-[5px] text-[13px] tracking-[-0.65px] whitespace-nowrap cursor-pointer font-[family-name:var(--font-dm-mono)]"
            style={{
              color: "var(--color-primary)",
            }}
          >
            ← BACK
          </button>
        </div>
        {/* Spacer so content doesn't sit under fixed back button */}
        <div className="h-0 pt-14" aria-hidden />
      </>
    );
  }

  return createPortal(
    <nav
      className="fixed left-[6vw] top-[calc(5rem+5vh+10px)] w-max pr-2 flex flex-col items-start font-[family-name:var(--font-dm-mono)]"
      style={{
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <div className="flex flex-col gap-[21px] items-start">
        <button
          onClick={handleBack}
          className="flex items-center justify-center px-[5px] text-[13px] tracking-[-0.65px] whitespace-nowrap cursor-pointer"
          style={{
            backgroundColor: "var(--color-highlight)",
            color: "var(--color-primary)",
          }}
        >
          ← BACK
        </button>

        <div className="flex flex-col gap-[4px] items-start">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`text-left whitespace-nowrap text-[12px] tracking-[-0.6px] uppercase transition-opacity cursor-pointer ${activeId === section.id ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
              style={{ color: "var(--color-primary)" }}
              onClick={() =>
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: `#${section.id}`, offsetY: 80 },
                })
              }
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>,
    document.body,
  );
}
