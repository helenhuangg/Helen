"use client";

import { useEffect, useRef } from "react";

type ScrollPlayVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
};

export default function ScrollPlayVideo({
  src,
  className,
  style,
  ...props
}: ScrollPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target !== video) continue;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-15% 0px -15% 0px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      loop
      muted
      playsInline
      preload="metadata"
      style={style}
      {...props}
    />
  );
}
