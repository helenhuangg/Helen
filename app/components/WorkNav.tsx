"use client";

import { useState, useEffect } from "react";
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
    sessionStorage.setItem("scrollToWork", "true");
    router.push("/");
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
      <div className="px-4 pt-4">
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
    );
  }

  return createPortal(
    <nav
      className="fixed left-[10vw] top-[10vw] w-[10vw] pr-4 flex flex-col items-start font-[family-name:var(--font-dm-mono)]"
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
