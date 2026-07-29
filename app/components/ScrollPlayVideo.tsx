"use client";

import { useEffect, useRef } from "react";

type ScrollPlayVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src?: string;
  sources?: { src: string; type: string }[];
};

export default function ScrollPlayVideo({
  src,
  sources,
  className,
  style,
  ...props
}: ScrollPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      if (!inViewRef.current) return;
      void video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inViewRef.current = entry.isIntersecting;
          if (entry.isIntersecting) play();
          else video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);

    // play() before the media is ready is a no-op in some browsers, so retry
    // once there's actually a decoded frame to show.
    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={sources ? undefined : src}
      className={className}
      loop
      muted
      playsInline
      preload="auto"
      style={style}
      {...props}
    >
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
