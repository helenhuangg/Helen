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
      { rootMargin: "-20% 0px -60% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted, sections]);

  const nav = (
    <nav
      className="fixed left-[10vw] top-[10vw] w-[10vw] flex flex-col items-start font-[family-name:var(--font-dm-mono)]"
      style={{
        borderRight: "0.25px solid var(--color-highlight)",
        zIndex: 9999,
        pointerEvents: "auto",
      }}
    >
      <div className="flex flex-col gap-[21px] items-start">
        <button
          onClick={() => {
            sessionStorage.setItem("scrollToWork", "true");
            router.push("/");
          }}
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
              className={`text-[12px] tracking-[-0.6px] uppercase transition-opacity cursor-pointer ${activeId === section.id ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
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
    </nav>
  );

  if (!mounted || !visible) return null;
  return createPortal(nav, document.body);
}
