"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type FunProjectCardProps = {
  title: string;
  tag: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  placeholderHeight?: number;
  href?: string;
};

export default function FunProjectCard({
  title,
  tag,
  description,
  imageSrc,
  imageAlt,
  placeholderHeight,
  href,
}: FunProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      gsap.set(cardRef.current, { scale: 1 });
      gsap.set(descRef.current, { opacity: 0, y: 12 });
    }
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (isMobile) return;
    gsap.to(cardRef.current, {
      scale: 0.97,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(descRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(descRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const media = (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-sm ${href ? "cursor-pointer" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          className="w-full object-cover"
        />
      ) : (
        <div
          className="w-full shrink-0 bg-white"
          style={{ height: placeholderHeight ?? 280 }}
          aria-hidden
        />
      )}
      {href && (
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-[20px] leading-none text-white backdrop-blur-[2px]">
            ↗
          </span>
        </span>
      )}
    </div>
  );

  return (
    <article className="fun-card flex flex-col gap-4 self-stretch">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {media}
        </a>
      ) : (
        media
      )}

      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="flex items-center justify-between self-stretch">
          <h3 className="cardTitle">{title}</h3>
          <span
            className="cardTag flex shrink-0 items-center justify-center gap-2.5 px-2.5 py-0.5"
            style={{ background: "var(--color-accent)" }}
          >
            {tag}
          </span>
        </div>
        <p
          ref={descRef}
          className="cardDescription"
          style={
            !isMobile
              ? { opacity: 0, transform: "translateY(12px)" }
              : undefined
          }
        >
          {description}
        </p>
      </div>
    </article>
  );
}
