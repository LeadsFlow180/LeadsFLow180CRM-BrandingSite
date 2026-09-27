/** Per-agent stage crop: scale zooms in; y shifts the focal point (higher = crop more from the top). */
export type StageFrame = {
  scale: number;
  /** CSS object-position, e.g. "50% 18%" */
  position: string;
};

const DEFAULT_FRAME: StageFrame = {
  // Reason: slight zoom so every clip fills the portrait without letterbox / edge gaps.
  scale: 1.12,
  position: "50% 14%",
};

/** Tune individuals when a source is wider, lower, or has empty headroom. */
const FRAMES: Record<string, Partial<StageFrame>> = {
  jojo: { scale: 1.2, position: "50% 28%" },
  caleb: { scale: 1.28, position: "50% 22%" },
  carlos: { scale: 1.18, position: "50% 16%" },
  jay: { scale: 1.16, position: "50% 18%" },
  mark: { scale: 1.16, position: "50% 16%" },
  lee: { scale: 1.16, position: "50% 16%" },
  zenda: { scale: 1.18, position: "50% 20%" },
  shelly: { scale: 1.16, position: "50% 18%" },
  leila: { scale: 1.18, position: "50% 18%" },
  niki: { scale: 1.18, position: "50% 18%" },
  sonja: { scale: 1.16, position: "50% 16%" },
  danica: { scale: 1.16, position: "50% 18%" },
  omar: { scale: 1.16, position: "50% 16%" },
  adam: { scale: 1.16, position: "50% 16%" },
  amir: { scale: 1.16, position: "50% 16%" },
};

export function getAgentStageFrame(id: string): StageFrame {
  return { ...DEFAULT_FRAME, ...FRAMES[id] };
}
