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
};

export default function FunProjectCard({
  title,
  tag,
  description,
  imageSrc,
  imageAlt,
  placeholderHeight,
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

  return (
    <article className="fun-card flex flex-col gap-4 self-stretch">
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-sm"
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
      </div>

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
