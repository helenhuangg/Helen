"use client";
import { useRef } from "react";
import gsap from "gsap";

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  hoverImage: string;
  href: string;
};

const ProjectCard = ({
  title,
  description,
  tags,
  image,
  hoverImage,
  href,
}: Project) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const defaultImgRef = useRef<HTMLImageElement>(null);
  const hoverImgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 0.97,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(defaultImgRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(hoverImgRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(defaultImgRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(hoverImgRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <a href={href} className="project-card flex flex-col gap-4 self-stretch">
      <div
        ref={cardRef}
        className="overflow-hidden rounded-lg relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={defaultImgRef}
          src={image}
          alt={title}
          className="w-full object-cover"
        />
        <img
          ref={hoverImgRef}
          src={hoverImage}
          alt={`${title} hover`}
          className="w-full object-cover absolute inset-0 opacity-0"
        />
      </div>

      <div className="flex flex-col items-start self-stretch">
        <div className="flex justify-between items-start self-stretch">
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
        <p className="cardDescription">{description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;
