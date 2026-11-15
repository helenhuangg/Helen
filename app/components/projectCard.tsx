"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./ProjectCard.module.css";

type Project = {
  title: string;
  description: string;
  badge: string;
  image?: string;
  hoverImage?: string;
  href: string;
  index?: number;
  comingSoon?: boolean;
};

const ProjectCard = ({
  title,
  description,
  badge,
  image,
  hoverImage,
  href,
  index,
  comingSoon = false,
}: Project) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const defaultImgRef = useRef<HTMLImageElement>(null);
  const hoverImgRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      gsap.set(cardRef.current, { scale: 1 });
      gsap.set(defaultImgRef.current, { opacity: 1 });
      gsap.set(hoverImgRef.current, { opacity: 0 });
    }
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (isMobile || comingSoon) return;
    gsap.to(defaultImgRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(hoverImgRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    if (isMobile || comingSoon) return;
    gsap.to(defaultImgRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(hoverImgRef.current, { opacity: 0, duration: 0.3 });
  };

  const content = (
    <>
      <div
        ref={cardRef}
        className={`relative aspect-[3/2] overflow-hidden bg-[#d9d9d9] ${styles.media}${comingSoon ? ` ${styles.soonMedia}` : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {image && (
          <img
            ref={defaultImgRef}
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        )}
        {hoverImage && !isMobile && !comingSoon && (
          <img
            ref={hoverImgRef}
            src={hoverImage}
            alt={`${title} hover`}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
          />
        )}
      </div>

      <div className="flex w-full items-center justify-between gap-3">
        <h3 className="home-card-title min-w-0">{title}</h3>
        <span className="home-card-badge">{badge}</span>
      </div>
      <p className="home-card-copy">{description}</p>
    </>
  );

  if (comingSoon) {
    return (
      <div
        className={`project-card ${styles.soon} flex w-full flex-col gap-[7px]`}
        data-order={index}
        aria-disabled="true"
      >
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="project-card flex w-full flex-col gap-[7px]"
      data-order={index}
    >
      {content}
    </Link>
  );
};

export default ProjectCard;
