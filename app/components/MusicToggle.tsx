"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./MusicToggle.module.css";

const TRACK_SRC = "/audio/ambient.mp3";

const BARS = [
  { x: 0.5, dur: "0.85s", begin: "0s" },
  { x: 4.9, dur: "0.68s", begin: "0.12s" },
  { x: 9.3, dur: "1s", begin: "0.24s" },
] as const;

/**
 * Header mute toggle for the background track. It starts silent because
 * browsers block sound until the page has been interacted with, and pausing
 * keeps the playhead so unmuting resumes where it left off.
 */
export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = 0.3;
    // The file is a few megabytes, so it only downloads once someone asks for it.
    audio.preload = "none";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    setPlaying(true);
    void audio.play().catch(() => setPlaying(false));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className={`${styles.toggle} ${playing ? styles.playing : ""}`}
    >
      <svg
        className={styles.eq}
        width="12"
        height="14"
        viewBox="0 0 12 14"
        aria-hidden
      >
        {BARS.map((bar) =>
          playing ? (
            <rect
              key={bar.x}
              x={bar.x}
              y="1"
              width="2.2"
              height="12"
              rx="1.1"
              fill="currentColor"
            >
              <animate
                attributeName="height"
                values="3.2;12;3.2"
                dur={bar.dur}
                begin={bar.begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="9.8;1;9.8"
                dur={bar.dur}
                begin={bar.begin}
                repeatCount="indefinite"
              />
            </rect>
          ) : (
            <circle
              key={bar.x}
              cx={bar.x + 1.1}
              cy="12"
              r="1.1"
              fill="currentColor"
            />
          ),
        )}
      </svg>
      <span className="max-sm:sr-only">
        {playing ? "Sound on" : "Sound off"}
      </span>
    </button>
  );
}
