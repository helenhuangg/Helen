"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  const showAnimRef = useRef<gsap.core.Tween | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const showAnim = gsap
      .from("header", {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    showAnimRef.current = showAnim;

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      e.deltaY > 10 ? showAnim.reverse() : e.deltaY < -10 && showAnim.play();
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientY - touchStartY;
      if (Math.abs(delta) < 10) return;
      delta > 0 ? showAnim.play() : showAnim.reverse();
      touchStartY = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      showAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (showAnimRef.current) {
      showAnimRef.current.play();
    }
  }, [pathname]);

  return (
    <header className="fixed w-full flex items-center justify-between px-[10vw] py-[1.5vw] z-100">
      <Link href="/" className="cursor-pointer">
        <Image src="/clover.svg" alt="Clover Logo" width={38} height={36} />
      </Link>

      <nav className="flex items-center gap-6">
        <button
          className="nav-link"
          onClick={() =>
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: "#work", offsetY: 80 },
            })
          }
        >
          Work
        </button>
        <button
          className="nav-link"
          onClick={() =>
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: "#fun", offsetY: 80 },
            })
          }
        >
          Fun
        </button>
        <button
          className="nav-link"
          onClick={() =>
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: "#about", offsetY: 80 },
            })
          }
        >
          About
        </button>
      </nav>
    </header>
  );
};

export default Header;
