"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  hoverImage: string;
  href: string;
  index?: number;
};

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  hoverImage,
  href,
  index,
}: Project) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const defaultImgRef = useRef<HTMLImageElement>(null);
  const hoverImgRef = useRef<HTMLImageElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const [isMobile, setIsMobile] = useState(true); // Default mobile to avoid loading hover image

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 1023px)").matches);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      gsap.set(cardRef.current, { scale: 1 });
      gsap.set(defaultImgRef.current, { opacity: 1 });
      gsap.set(hoverImgRef.current, { opacity: 0 });
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
    gsap.to(defaultImgRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(hoverImgRef.current, { opacity: 1, duration: 0.3 });
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
    gsap.to(defaultImgRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(hoverImgRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(descRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link
      href={href}
      className="project-card flex flex-col gap-4 self-stretch"
      data-order={index}
    >
      <div
        ref={cardRef}
        className="overflow-hidden rounded-sm relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={defaultImgRef}
          src={image}
          alt={title}
          className="w-full object-cover"
        />
        {!isMobile && (
          <img
            ref={hoverImgRef}
            src={hoverImage}
            alt={`${title} hover`}
            className="w-full object-cover absolute inset-0 opacity-0"
          />
        )}
      </div>

      <div className="flex flex-col items-start self-stretch gap-1">
        <div className="flex justify-between items-center self-stretch">
          <h3 className="cardTitle">{title}</h3>
          <div className="flex gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="cardTag flex px-2.5 py-0.5 justify-center items-center gap-2.5"
                style={{ background: "var(--color-accent)" }}
              >
                {tag}
              </span>
            ))}
          </div>
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
    </Link>
  );
};

export default ProjectCard;
