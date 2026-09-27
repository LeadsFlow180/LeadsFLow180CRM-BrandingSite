"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getAgentVideo } from "@/lib/agentVideos";

type Props = {
  id: string;
  name: string;
  title: string;
  photo: string;
  /** Stage Play/Pause — video follows this so clips can finish before rotate. */
  playing: boolean;
  onProgress?: (ratio: number) => void;
  onEnded?: () => void;
  /** Fired when there is no usable clip (missing file / error / reduced motion). */
  onUnavailable?: () => void;
  /** Fired once the portrait is safe to show (first video frame, or photo). */
  onReady?: () => void;
};

/** Stage portrait: plays /agents/videos/{id}.mp4 once when present, otherwise the still photo. */
export function AgentStageMedia({
  id,
  name,
  title,
  photo,
  playing,
  onProgress,
  onEnded,
  onUnavailable,
  onReady,
}: Props) {
  const reduce = useReducedMotion() ?? false;
  // Reason: always a string so effect dependency arrays never change length (null holes break HMR).
  const videoSrc = getAgentVideo(id) ?? "";
  const [failed, setFailed] = useState(false);
  const [frameReady, setFrameReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readySent = useRef(false);

  // Reason: keep effect dependency arrays fixed-length; parent callbacks change identity every render.
  const onUnavailableRef = useRef(onUnavailable);
  const onProgressRef = useRef(onProgress);
  const onEndedRef = useRef(onEnded);
  const onReadyRef = useRef(onReady);
  onUnavailableRef.current = onUnavailable;
  onProgressRef.current = onProgress;
  onEndedRef.current = onEnded;
  onReadyRef.current = onReady;

  useEffect(() => {
    setFailed(false);
    setFrameReady(false);
    readySent.current = false;
  }, [id, videoSrc]);

  const showVideo = Boolean(videoSrc) && !failed && !reduce;

  const markReady = () => {
    if (readySent.current) return;
    readySent.current = true;
    setFrameReady(true);
    onReadyRef.current?.();
  };

  useEffect(() => {
    if (!showVideo) {
      onUnavailableRef.current?.();
      markReady();
    }
    // Reason: markReady/onUnavailable are stable via refs; only re-run when media mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVideo, id]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    // Reason: always muted so browsers allow autoplay without a gesture.
    el.muted = true;
    if (playing) {
      void el.play().catch(() => setFailed(true));
    } else {
      el.pause();
    }
    // Reason: fixed 3-slot deps — do not add/remove entries (breaks Fast Refresh / React).
  }, [playing, showVideo, videoSrc]);

  if (showVideo) {
    return (
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        playsInline
        preload="auto"
        muted
        // Reason: stay invisible until a decoded frame exists so the still never flashes between clips.
        className={`h-full w-full object-cover object-top transition-opacity duration-150 ${frameReady ? "opacity-100" : "opacity-0"}`}
        onError={() => {
          setFailed(true);
          onUnavailableRef.current?.();
        }}
        onLoadedData={(e) => {
          const v = e.currentTarget;
          v.muted = true;
          if (playing) void v.play().catch(() => setFailed(true));
          // Reason: wait for an actual painted frame when the browser supports it.
          const rvfc = (
            v as HTMLVideoElement & {
              requestVideoFrameCallback?: (cb: () => void) => number;
            }
          ).requestVideoFrameCallback;
          if (typeof rvfc === "function") {
            rvfc.call(v, () => markReady());
          } else {
            markReady();
          }
        }}
        onPlaying={() => markReady()}
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
    // eslint-disable-next-line @next/next/no-img-element
    <img src={photo} alt={`${name}, ${title}`} className="h-full w-full object-cover object-top" />
  );
}
