"use client";

import { useEffect, useRef, useState } from "react";

const TRACK_SRC = "/audio/ambient.mp3";

/**
 * Floating mute toggle for the background track. It starts silent because
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

    void audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play background music"}
      className="music-toggle fixed bottom-6 right-4 z-100 lg:right-[6vw]"
    >
      <span
        aria-hidden
        className={`music-toggle-icon ${
          playing ? "music-toggle-icon-on" : "music-toggle-icon-off"
        }`}
      />
    </button>
  );
}
