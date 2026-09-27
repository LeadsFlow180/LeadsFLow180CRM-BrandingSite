"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getAgentVideo } from "@/lib/agentVideos";
import { getAgentStageFrame } from "@/lib/agentStageFrame";

type Props = {
  id: string;
  name: string;
  title: string;
  photo: string;
  /** Stage Play/Pause — video follows this so clips can finish before rotate. */
  playing: boolean;
  /** Browsers block autoplay-with-sound until a click; parent keeps unlock across agents. */
  soundOn: boolean;
  onProgress?: (ratio: number) => void;
  onEnded?: () => void;
  /** Fired when there is no usable clip (missing file / error / reduced motion). */
  onUnavailable?: () => void;
  /** Fired once the portrait is safe to show (first video frame, or photo). */
  onReady?: () => void;
  /** Unmuted play was blocked — parent should flip the mute toggle. */
  onSoundBlocked?: () => void;
};

/** Stage portrait: plays /agents/videos/{id}.mp4 once when present, otherwise the still photo. */
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
  onSoundBlocked,
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
  const onSoundBlockedRef = useRef(onSoundBlocked);
  onUnavailableRef.current = onUnavailable;
  onProgressRef.current = onProgress;
  onEndedRef.current = onEnded;
  onReadyRef.current = onReady;
  onSoundBlockedRef.current = onSoundBlocked;

  useEffect(() => {
    setFailed(false);
    setFrameReady(false);
    readySent.current = false;
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
    // Reason: markReady/onUnavailable are stable via refs; only re-run when media mode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showVideo, id]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    el.muted = !soundOn;
    el.volume = 1;
    if (playing) {
      void el.play().catch(() => {
        // Reason: if unmuted autoplay is blocked, fall back to muted and sync the toggle.
        if (!el.muted) {
          el.muted = true;
          onSoundBlockedRef.current?.();
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

  if (showVideo) {
    return (
      <video
        key={videoSrc}
        ref={videoRef}
        src={videoSrc}
        playsInline
        preload="auto"
        // Reason: prefer unmuted; parent Mute/Unmute toggle controls this after load.
        muted={!soundOn}
        // Reason: stay invisible until a decoded frame exists so the still never flashes between clips.
        // Scale + object-position crop letterbox / headroom so the portrait edge stays filled.
        style={mediaStyle}
        className={`h-full w-full object-cover transition-opacity duration-150 ${frameReady ? "opacity-100" : "opacity-0"}`}
        onError={() => {
          setFailed(true);
          onUnavailableRef.current?.();
        }}
        onLoadedData={(e) => {
          const v = e.currentTarget;
          v.muted = !soundOn;
          if (playing) {
            void v.play().catch(() => {
              if (!v.muted) {
                v.muted = true;
                onSoundBlockedRef.current?.();
                void v.play().catch(() => setFailed(true));
              } else {
                setFailed(true);
              }
            });
          }
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
    <img
      src={photo}
      alt={`${name}, ${title}`}
      style={mediaStyle}
      className="h-full w-full object-cover"
    />
  );
}
