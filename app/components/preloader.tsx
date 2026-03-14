"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const counterRef = useRef<HTMLParagraphElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const counter = counterRef.current;
    const loader = loaderRef.current;
    if (!counter || !loader) return;

    gsap.set("header", { opacity: 0 });

    const count = { value: 0 };
    gsap.to(count, {
      value: 100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate() {
        counter.textContent = String(Math.floor(count.value));
      },
      onComplete() {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete() {
            gsap.to(".hero-bg", { scale: 1, duration: 2, ease: "hop" });
            gsap.to("header", { opacity: 1, duration: 0.5 });
            onComplete();
          },
        });
      },
    });
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-(--color-primary)"
    >
      <p ref={counterRef} className="cardTag text-(--color-highlight)">
        0
      </p>
    </div>,
    document.body,
  );
}
