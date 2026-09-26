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
      <motion.video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        poster={photo}
        playsInline
        // Reason: start muted for autoplay policy; stage play overlay unlocks audio.
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
