"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import React from "react";
import Link from "next/link";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import useSfx from "./useSfx";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

const NAV_LINKS = [
  { href: "/", label: "Work" },
  { href: "/fun", label: "Fragments" },
  { href: "/about", label: "About" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/1pSQv6oYWgAKggDZ_Z5LegXw_tSoMkCXx/view?usp=sharing";

const Header = () => {
  const showAnimRef = useRef<gsap.core.Tween | null>(null);
  const pathname = usePathname();
  const playSelectSfx = useSfx("/audio/select.mp3");

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    const showAnim = gsap
      .from("header", {
        yPercent: -100,
        paused: true,
        duration: 0.25,
      })
      .progress(1);

    showAnimRef.current = showAnim;

    // On mobile the page scrolls inside #smooth-wrapper; on desktop
    // ScrollSmoother drives the window scroll.
    const trigger = ScrollTrigger.create({
      scroller: isMobile ? "#smooth-wrapper" : undefined,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (self.scroll() < 40) {
          showAnim.play();
          return;
        }
        if (self.direction === 1) showAnim.reverse();
        else showAnim.play();
      },
    });

    return () => {
      trigger.kill();
      showAnim.kill();
    };
  }, []);

  useEffect(() => {
    if (showAnimRef.current) {
      showAnimRef.current.play();
    }
  }, [pathname]);

  // Next skips navigation when the href matches the current route, which would
  // otherwise leave you parked mid-page.
  const handleNavClick =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      playSelectSfx();
      if (href !== pathname) return;

      event.preventDefault();
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, true);
        return;
      }
      const wrapper = document.getElementById("smooth-wrapper");
      if (wrapper) wrapper.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <header className="fixed w-full flex items-center justify-between px-4 lg:px-[6vw] py-[1.5vw] z-100">
      {/* Negative margins pull the label padding back so text sits on the page gutter. */}
      <nav className="flex items-center gap-2 -ml-[10px]">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="nav-link"
            onClick={handleNavClick(link.href)}
          >
            <span className="nav-link-label">{link.label}</span>
          </Link>
        ))}
      </nav>

      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link -mr-[10px]"
        onClick={playSelectSfx}
      >
        <span className="nav-link-label">Resume</span>
      </a>
    </header>
  );
};

export default Header;
