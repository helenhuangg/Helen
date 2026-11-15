"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import React from "react";
import Link from "next/link";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import useSfx from "./useSfx";
import MusicToggle from "./MusicToggle";
import styles from "./HeaderMenu.module.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother);

const NAV_LINKS = [
  { href: "/", label: "Work" },
  { href: "/fun", label: "Craft" },
  { href: "/about", label: "About" },
] as const;

const WORK_PAGES = [
  { href: "/work/yhack", label: "YHack 2026" },
  { href: "/work/libra", label: "Libra" },
  { href: "/work/yale-clubs", label: "YaleClubs", ready: false },
  { href: "/work/adobe", label: "Adobe", ready: false },
] as const;

const Header = () => {
  const showAnimRef = useRef<gsap.core.Tween | null>(null);
  const menuOpenRef = useRef(false);
  const pathname = usePathname();
  const playSelectSfx = useSfx("/audio/select.mp3");
  const [menuOpen, setMenuOpen] = useState(false);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    const isTouch = window.matchMedia("(max-width: 1023px)").matches;

    const showAnim = gsap
      .from("header", {
        yPercent: -100,
        paused: true,
        duration: 0.25,
      })
      .progress(1);

    showAnimRef.current = showAnim;

    const trigger = ScrollTrigger.create({
      scroller: isTouch ? "#smooth-wrapper" : undefined,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (menuOpenRef.current || self.scroll() < 40) {
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
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const wrapper = document.getElementById("smooth-wrapper");
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      if (wrapper) wrapper.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    if (wrapper) wrapper.style.overflow = "";
  }, [menuOpen]);

  const handleNavClick =
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      playSelectSfx();
      setMenuOpen(false);
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

  const toggleMenu = () => {
    playSelectSfx();
    setMenuOpen((open) => !open);
  };

  return (
    <>
      <header className="fixed top-0 z-[10000] w-full px-6 py-[18px] lg:px-[min(215px,15vw)]">
        <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="justify-self-start"
            onClick={handleNavClick("/")}
          >
            <img src="/images/home/header-clover.svg" alt="Helen Huang" />
          </Link>
          <nav className="hidden items-center gap-4 md:flex lg:gap-[26px]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="home-nav-link"
                onClick={handleNavClick(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:justify-self-end">
            <MusicToggle />
            <button
              type="button"
              className={styles.menuBtn}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <nav
        id="mobile-menu"
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.pages}>
          {NAV_LINKS.map((link) => {
            const isWorkLink = link.href === "/";
            const onWorkPage = pathname.startsWith("/work/");
            const isCurrent =
              isWorkLink
                ? pathname === "/" || onWorkPage
                : pathname === link.href;

            if (isWorkLink && onWorkPage) {
              return (
                <div key={link.label} className={styles.group}>
                  <Link
                    href={link.href}
                    aria-current="page"
                    className={styles.page}
                    onClick={handleNavClick(link.href)}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {link.label}
                  </Link>
                  <div className={styles.tree}>
                    {WORK_PAGES.map((project) => {
                      const isReady = !("ready" in project) || project.ready;
                      const isProjectCurrent = pathname === project.href;

                      if (!isReady) {
                        return (
                          <span
                            key={project.href}
                            className={`${styles.project} ${styles.projectSoon}`}
                            aria-disabled="true"
                          >
                            {project.label}
                          </span>
                        );
                      }

                      return (
                        <Link
                          key={project.href}
                          href={project.href}
                          aria-current={
                            isProjectCurrent ? "page" : undefined
                          }
                          className={styles.project}
                          onClick={handleNavClick(project.href)}
                          tabIndex={menuOpen ? 0 : -1}
                        >
                          {project.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                className={styles.page}
                onClick={handleNavClick(link.href)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
