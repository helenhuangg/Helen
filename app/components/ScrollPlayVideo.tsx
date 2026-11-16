"use client";

import { useEffect, useRef, useState } from "react";

type ScrollPlayVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src?: string;
  sources?: { src: string; type: string }[];
  playbackLabel?: string;
};

export default function ScrollPlayVideo({
  src,
  sources,
  className,
  style,
  playbackLabel,
  ...props
}: ScrollPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(false);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      if (!inViewRef.current || manuallyPaused.current) return;
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

  const video = (
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
      controls={playbackLabel ? false : props.controls}
      onPlay={(event) => {
        if (playbackLabel) setPlaying(true);
        props.onPlay?.(event);
      }}
      onPause={(event) => {
        if (playbackLabel) setPlaying(false);
        props.onPause?.(event);
      }}
    >
      {sources?.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );

  if (!playbackLabel) return video;

  return (
    <button
      type="button"
      className="block w-full cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-4"
      aria-label={`${playing ? "Pause" : "Play"} ${playbackLabel}`}
      onClick={() => {
        const element = videoRef.current;
        if (!element) return;
        manuallyPaused.current = !element.paused;
        if (manuallyPaused.current) element.pause();
        else void element.play().catch(() => {});
      }}
    >
      {video}
    </button>
  );
}
