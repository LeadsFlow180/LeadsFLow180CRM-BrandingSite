"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getAgentStageFrame } from "@/lib/agentStageFrame";
import { getAgentVideo } from "@/lib/agentVideos";

type Props = {
  id: string;
  name: string;
  title: string;
  photo: string;
  /** Stage Play/Pause — video follows this so clips can finish before rotate. */
  playing: boolean;
  /** True only when preference is on AND a user gesture has unlocked audio. */
  soundOn: boolean;
  onProgress?: (ratio: number) => void;
  onEnded?: () => void;
  /** Fired when there is no usable clip (missing file / error / reduced motion). */
  onUnavailable?: () => void;
  /** Fired once a video frame (or photo) is safe to show — used for seamless handoff. */
  onReady?: () => void;
};

/**
 * Stage portrait: photo paints immediately; optional video fades in on top once a frame is ready.
 * Parent keeps the outgoing clip mounted until this reports onReady for a seamless cut.
 */
export function AgentStageMedia({
  id,
  name,
  title,
  photo,
  playing,
  soundOn,
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
  const lastProgressAt = useRef(0);
  const readySent = useRef(false);

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
    lastProgressAt.current = 0;
  }, [id, videoSrc]);

  const showVideo = Boolean(videoSrc) && !failed && !reduce;
  const frame = getAgentStageFrame(id);
  const mediaStyle = {
    objectPosition: frame.position,
    transform: `scale(${frame.scale})`,
    transformOrigin: "center center",
  } as const;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVideo, id]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    el.muted = !soundOn;
    el.volume = 1;
    if (playing) {
      void el.play().catch(() => {
        // Reason: unmuted play can still fail before gesture — keep picture going muted; parent unlocks later.
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
    // Reason: fixed 4-slot deps — do not add/remove entries (breaks Fast Refresh / React).
  }, [playing, showVideo, videoSrc, soundOn]);

  // Reason: release the decoder only when this agent layer unmounts (after handoff), not mid-play.
  useEffect(() => {
    return () => {
      const el = videoRef.current;
      if (!el) return;
      el.pause();
      el.removeAttribute("src");
      el.load();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={`${name}, ${title}`}
        style={mediaStyle}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
          showVideo && frameReady ? "opacity-0" : "opacity-100"
        }`}
        decoding="async"
        fetchPriority="high"
      />
      {showVideo ? (
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          // Reason: auto so the next agent can buffer while the current clip finishes.
          preload="auto"
          muted={!soundOn}
          style={mediaStyle}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
            frameReady ? "opacity-100" : "opacity-0"
          }`}
          onError={() => {
            setFailed(true);
            onUnavailableRef.current?.();
          }}
          onLoadedData={(e) => {
            const v = e.currentTarget;
            v.muted = !soundOn;
            v.volume = 1;
            if (playing) {
              void v.play().catch(() => {
                if (!v.muted) {
                  v.muted = true;
                  void v.play().catch(() => setFailed(true));
                } else {
                  setFailed(true);
                }
              });
            }
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
          onCanPlay={() => markReady()}
          onTimeUpdate={(e) => {
            const now = performance.now();
            // Reason: progress bar does not need 60fps updates from large videos.
            if (now - lastProgressAt.current < 200) return;
            lastProgressAt.current = now;
            const v = e.currentTarget;
            if (v.duration && Number.isFinite(v.duration)) {
              onProgressRef.current?.(v.currentTime / v.duration);
            }
          }}
          onEnded={() => onEndedRef.current?.()}
        />
      ) : null}
    </div>
  );
}
