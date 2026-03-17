"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  const showAnimRef = useRef<gsap.core.Tween | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) {
          const { ScrollSmoother } = require("gsap/ScrollSmoother");
          const smoother = ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(el, false);
          } else {
            const wrapper = document.getElementById("smooth-wrapper");
            if (wrapper) {
              const y = el.getBoundingClientRect().top + wrapper.scrollTop - 80;
              wrapper.scrollTo({ top: y, behavior: "smooth" });
            } else {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }
      } else {
        router.push("/?scrollTo=" + sectionId);
      }
    },
    [pathname, router],
  );

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) {
      // On mobile: keep header always visible (scroll hide/show is unreliable with smooth-wrapper)
      gsap.set("header", { yPercent: 0 });
      return;
    }

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
      delta > 0 ? showAnim.reverse() : showAnim.play();
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
    <header className="fixed w-full flex items-center justify-between px-4 lg:px-[6vw] py-[1.5vw] z-100">
      <Link href="/" className="cursor-pointer">
        <Image src="/clover.svg" alt="Clover Logo" width={38} height={36} />
      </Link>

      <nav className="flex items-center gap-6">
        <button className="nav-link" onClick={() => scrollToSection("work")}>
          Work
        </button>
        <Link href="/fun" className="nav-link">
          Fun
        </Link>
        <Link href="/about" className="nav-link">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Header;
