"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(CustomEase, DrawSVGPlugin);
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
    gsap.set(".preloader-svg path", { drawSVG: "0%" });

    const tl = gsap.timeline();

    const count = { value: 0 };
    tl.to(
      count,
      {
        value: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate() {
          counter.textContent = String(Math.floor(count.value));
        },
      },
      0,
    );

    tl.to(
      ".preloader-svg path",
      {
        drawSVG: "100%",
        duration: 2,
        ease: "power1.inOut",
      },
      0,
    );

    tl.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete() {
        loader.style.display = "none";
        gsap.to(".hero-bg", { scale: 1, duration: 2, ease: "hop" });
        gsap.to("header", { opacity: 1, duration: 0.5 });
        onComplete();
      },
    });
  }, [mounted, onComplete]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={loaderRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-(--color-primary)"
      style={{
        minHeight: "max(100dvh, 100vh)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="relative flex items-center justify-center">
        <svg
          className="preloader-svg"
          width="120"
          height="120"
          viewBox="0 0 788 788"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M468.135 27C523.909 27 580.37 66.3194 580.374 141.469C580.374 172.36 573.604 197.15 558.419 221.846C556.23 225.406 553.233 229.629 549.587 234.37C555.636 229.604 560.96 225.741 565.301 223.073C590.13 207.809 614.916 201 645.678 201C713.071 201 760.143 247.054 760.144 312.99C760.144 350.166 744.941 373.254 729.907 386.989C749.585 404.944 760.144 430.442 760.144 461.139C760.144 516.913 720.827 573.37 645.678 573.37C614.78 573.37 589.987 566.6 565.298 551.419C551.638 543.023 528.227 522.727 503.242 499.56C527.686 525.911 549.489 550.971 558.293 565.297C573.557 590.137 580.366 614.923 580.366 645.674C580.366 713.071 534.312 760.144 468.372 760.144C431.197 760.143 408.109 744.941 394.374 729.907C376.419 749.585 350.921 760.144 320.235 760.144C264.461 760.144 208 720.827 208 645.674C208 614.787 214.77 589.993 229.951 565.297C239.588 549.619 264.899 521.098 292.234 492.095C264.211 518.264 237.013 542.154 221.846 551.475C197.017 566.738 172.23 573.548 141.469 573.548C74.0718 573.548 27.0001 527.494 27 461.558C27 424.382 42.2058 401.293 57.2393 387.559C37.5583 369.604 27.0001 344.106 27 313.417C27 257.643 66.3194 201.185 141.469 201.182C172.367 201.182 197.161 207.952 221.85 223.133C227.054 226.332 233.673 231.26 241.256 237.415C236.542 231.426 232.719 226.152 230.073 221.846C214.81 197.013 208 172.226 208 141.469C208 74.0718 254.054 27 319.994 27C357.166 27 380.254 42.2026 393.992 57.2324C411.943 37.5547 437.442 27 468.135 27Z"
            stroke="var(--color-highlight)"
            strokeWidth="5"
            fill="none"
          />
        </svg>
        <p
          ref={counterRef}
          className="absolute cardTag text-(--color-highlight)"
        >
          0
        </p>
      </div>
    </div>,
    document.body,
  );
}
