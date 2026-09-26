"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getAgentVideo } from "@/lib/agentVideos";
import { ease } from "../Motion";

type Props = {
  id: string;
  name: string;
  title: string;
  photo: string;
  /** Stage Play/Pause — video follows this so clips can finish before rotate. */
  playing: boolean;
  /** Browsers block autoplay-with-sound until a click; parent stores unlock across agents. */
  soundOn: boolean;
  onEnableSound?: () => void;
  onProgress?: (ratio: number) => void;
  onEnded?: () => void;
  /** Fired when there is no usable clip (missing file / error / reduced motion). */
  onUnavailable?: () => void;
};

/** Stage portrait: plays /agents/videos/{id}.mp4 once when present, otherwise the still photo. */
export function AgentStageMedia({
  id,
  name,
  title,
  photo,
  playing,
  soundOn = false,
  onEnableSound,
  onProgress,
  onEnded,
  onUnavailable,
}: Props) {
  const reduce = useReducedMotion();
  const videoSrc = getAgentVideo(id) ?? null;
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reason: keep effect dependency arrays fixed-length; parent callbacks change identity every render.
  const onUnavailableRef = useRef(onUnavailable);
  const onProgressRef = useRef(onProgress);
  const onEndedRef = useRef(onEnded);
  onUnavailableRef.current = onUnavailable;
  onProgressRef.current = onProgress;
  onEndedRef.current = onEnded;

  useEffect(() => {
    setFailed(false);
  }, [id, videoSrc]);

  const showVideo = Boolean(videoSrc) && !failed && !reduce;

  useEffect(() => {
    if (!showVideo) onUnavailableRef.current?.();
  }, [showVideo, id]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    el.muted = !soundOn;
    el.volume = 1;
    if (playing) {
      void el.play().catch(() => {
        // Reason: if unmuted autoplay is blocked, fall back to muted rather than killing the clip.
        if (!el.muted) {
          el.muted = true;
          void el.play().catch(() => setFailed(true));
        } else {
          setFailed(true);
        }
      });
    } else {
      el.pause();
    }
  }, [playing, showVideo, videoSrc, soundOn]);

  if (showVideo && videoSrc) {
    return (
      <div className="absolute inset-0">
        <motion.video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          poster={photo}
          playsInline
          // Reason: start muted for autoplay policy; user tap enables sound for the rest of the visit.
          muted={!soundOn}
          className="h-full w-full object-cover object-top"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          onError={() => {
            setFailed(true);
            onUnavailableRef.current?.();
          }}
          onLoadedData={(e) => {
            const v = e.currentTarget;
            v.muted = !soundOn;
            if (playing) void v.play().catch(() => setFailed(true));
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration && Number.isFinite(v.duration)) {
              onProgressRef.current?.(v.currentTime / v.duration);
            }
          }}
          onEnded={() => onEndedRef.current?.()}
        />
        {!soundOn && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEnableSound?.();
            }}
            className="absolute right-3 bottom-3 z-10 inline-flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-[11px] font-semibold tracking-wide text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-black/85"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H3v6h3l5 4V5z" />
              <path d="M15 9l6 6M21 9l-6 6" />
            </svg>
            Tap for sound
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.img
      src={photo}
      alt={`${name}, ${title}`}
      className="h-full w-full object-cover object-top"
      initial={{ scale: 1 }}
      animate={{ scale: reduce ? 1 : 1.08 }}
      transition={{ duration: 7, ease: "linear" }}
    />
  );
}
