"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const Header = () => {
  useEffect(() => {
    const showAnim = gsap
      .from("header", {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <header className="fixed w-full flex items-center justify-between px-[10vw] py-[1.5vw] z-100">
      <Link href="/" className="cursor-pointer">
        <Image src="/clover.svg" alt="Clover Logo" width={42} height={40} />
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
