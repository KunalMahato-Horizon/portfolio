import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   TIMELINE (ms from mount)
   ───────────────────────────────────────────────────────────── */
const T = {
  assembleStart: 0,
  assembleEnd: 1300,   // logo locked
  holdEnd: 2100,       // name + role committed
  coordinateEnd: 2600, // coordinate readout flashes, then clears
  shatterStart: 3100,  // break apart begins
  finish: 3900,        // parent notified
};

const ORANGE = "#F97316";
const BG = "#09090b";

/* ─────────────────────────────────────────────────────────────
   ASSEMBLY ORIGINS
   Each piece arrives along a slightly different trajectory so
   the four marks feel like they're finding their place, not
   just popping into position.
   ───────────────────────────────────────────────────────────── */
const PIECES = [
  {
    id: "spine",
    kind: "path",
    d: "M8 6V26",
    origin: { x: -90, y: -70, rotate: -60, scale: 0.5 },
    delay: 0,
  },
  {
    id: "topArm",
    kind: "path",
    d: "M12 16L24 6",
    origin: { x: 80, y: -100, rotate: 70, scale: 0.5 },
    delay: 0.08,
  },
  {
    id: "bottomLeg",
    kind: "path",
    d: "M12 16L24 26",
    origin: { x: 90, y: 100, rotate: -75, scale: 0.5 },
    delay: 0.16,
  },
  {
    id: "dot",
    kind: "circle",
    cx: 26,
    cy: 16,
    r: 2.5,
    origin: { x: 120, y: -10, scale: 0 },
    delay: 0.26,
  },
];

/* Debris — each has its own vector and rotation */
const DEBRIS = [
  { x: -140, y: 90, r: 2.2, rot: -180 },
  { x: 130, y: -150, r: 3.0, rot: 220 },
  { x: -100, y: -130, r: 1.8, rot: -140 },
  { x: 160, y: 110, r: 2.6, rot: 260 },
  { x: -50, y: 170, r: 1.5, rot: -100 },
  { x: 90, y: 200, r: 2.0, rot: 180 },
  { x: -170, y: -20, r: 1.6, rot: -220 },
  { x: 180, y: 40, r: 2.4, rot: 200 },
];

/* ─────────────────────────────────────────────────────────────
   SPRING / EASE PRESETS
   ───────────────────────────────────────────────────────────── */
const ASSEMBLE_SPRING = {
  type: "spring",
  stiffness: 170,
  damping: 13,
  mass: 0.85,
};

const SHATTER_EASE = [0.16, 1, 0.3, 1];

export default function BuildingLoader({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [stage, setStage] = useState("assembling");
  const completedRef = useRef(false);

  /* ── Timeline ─────────────────────────────────────────── */
  useEffect(() => {
    // Reduced motion: skip straight to done after a beat
    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          setStage("done");
          onComplete?.();
        }
      }, 500);
      return () => clearTimeout(t);
    }

    const timers = [
      setTimeout(() => setStage("assembled"), T.assembleEnd),
      setTimeout(() => setStage("committed"), T.holdEnd),
      setTimeout(() => setStage("coordinate"), T.coordinateEnd),
      setTimeout(() => setStage("shattering"), T.shatterStart),
      setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          setStage("done");
          onComplete?.();
        }
      }, T.finish),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, prefersReducedMotion]);

  /* Which variant name each piece should render right now */
  const pieceVariant = useMemo(() => {
    if (stage === "shattering") return "shattering";
    if (stage === "assembling") return "assembling";
    return "assembled";
  }, [stage]);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="building-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === "shattering" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, delay: stage === "shattering" ? 0.15 : 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden text-white"
        style={{ backgroundColor: BG }}
      >
        {/* ── Blueprint grid ─────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
          style={{
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          }}
        />

        {/* ── Corner ticks — subtle "HUD" framing ────────── */}
        <CornerTicks />

        {/* ── SVG build chamber ─────────────────────────── */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Halo — pulses only at the lock moment */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${ORANGE}40 0%, transparent 70%)`,
              filter: "blur(28px)",
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale:
                stage === "assembling"
                  ? 0.7
                  : stage === "assembled" || stage === "committed" || stage === "coordinate"
                  ? [0.85, 1.2, 1]
                  : 1.2,
              opacity:
                stage === "assembling"
                  ? 0
                  : stage === "assembled" || stage === "committed" || stage === "coordinate"
                  ? [0, 0.9, 0.45]
                  : 0,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <svg
            width="112"
            height="112"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 overflow-visible"
            style={{
              filter: "drop-shadow(0 0 14px rgba(249,115,22,0.35))",
            }}
          >
            {PIECES.map((p) => (
              <Piece
                key={p.id}
                piece={p}
                variant={pieceVariant}
              />
            ))}

            {/* Debris — only meaningful during shatter */}
            {DEBRIS.map((d, i) => (
              <motion.circle
                key={i}
                cx={16}
                cy={16}
                r={d.r}
                fill={ORANGE}
                initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
                animate={
                  stage === "shattering"
                    ? {
                        x: d.x,
                        y: d.y,
                        opacity: [0, 1, 0],
                        rotate: d.rot,
                        scale: [0.6, 1, 0.3],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 0.65,
                  ease: "easeOut",
                  delay: i * 0.015,
                }}
              />
            ))}
          </svg>
        </div>

        {/* ── Name + Role ───────────────────────────────── */}
        <div className="relative mt-8 flex flex-col items-center text-center overflow-hidden">
          <motion.h1
            initial={{ y: 22, opacity: 0 }}
            animate={{
              y:
                stage === "committed" || stage === "coordinate"
                  ? 0
                  : stage === "shattering"
                  ? -28
                  : 22,
              opacity:
                stage === "committed" || stage === "coordinate"
                  ? 1
                  : stage === "shattering"
                  ? 0
                  : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl font-semibold tracking-[0.3em] uppercase text-zinc-100"
          >
            Kunal Mahato
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{
              y:
                stage === "committed" || stage === "coordinate"
                  ? 0
                  : stage === "shattering"
                  ? -16
                  : 16,
              opacity:
                stage === "committed" || stage === "coordinate"
                  ? 1
                  : stage === "shattering"
                  ? 0
                  : 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-1.5 text-[11px] font-mono tracking-[0.28em] uppercase text-zinc-500"
          >
            Frontend Developer
          </motion.p>

          {/* Scanline sweep — appears with the name */}
          {(stage === "committed" || stage === "coordinate") && (
            <motion.div
              className="absolute inset-y-0 w-16 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${ORANGE}40, transparent)`,
              }}
              initial={{ left: "-25%", opacity: 0 }}
              animate={{ left: "125%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.0,
                ease: "easeInOut",
                times: [0, 0.15, 0.85, 1],
              }}
            />
          )}
        </div>

        {/* ── Bottom readout — swaps between three states ── */}
        <div className="absolute bottom-10 h-5 flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase">
          <AnimatePresence mode="wait">
            {stage === "assembling" && (
              <motion.span
                key="constructing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.55, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-600"
              >
                Constructing Interface
              </motion.span>
            )}

            {stage === "assembled" && (
              <motion.span
                key="locked"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-300"
              >
                Identity Locked
              </motion.span>
            )}

            {(stage === "committed" || stage === "coordinate") && (
              <motion.span
                key="coords"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-500"
              >
                <span className="text-zinc-600">x:</span> 26{"  "}
                <span className="text-zinc-600">y:</span> 16{"  "}
                <span className="text-zinc-600">r:</span> 2.5
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Piece — renders a stroke or circle with assembly/shatter variants
   ───────────────────────────────────────────────────────────── */
function Piece({ piece, variant }) {
  const { origin, delay } = piece;

  const assembleVariants = {
    assembling: {
      pathLength: 0.2,
      opacity: 0,
      x: origin.x,
      y: origin.y,
      rotate: origin.rotate ?? 0,
      scale: origin.scale ?? 0.5,
    },
    assembled: {
      pathLength: 1,
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        ...ASSEMBLE_SPRING,
        delay,
        pathLength: { delay, duration: 0.55, ease: "easeOut" },
        opacity: { delay, duration: 0.25 },
      },
    },
    shattering: {
      pathLength: 0.1,
      opacity: 0,
      x: origin.x * 2.2,
      y: origin.y * 2.2,
      rotate: (origin.rotate ?? 0) * 1.5,
      scale: 0.2,
      transition: { duration: 0.6, ease: SHATTER_EASE, delay: delay * 0.4 },
    },
  };

  if (piece.kind === "circle") {
    return (
      <motion.circle
        cx={piece.cx}
        cy={piece.cy}
        r={piece.r}
        fill={ORANGE}
        variants={assembleVariants}
        initial="assembling"
        animate={variant}
        style={{ transformOrigin: "26px 16px" }}
      />
    );
  }

  return (
    <motion.path
      d={piece.d}
      stroke={ORANGE}
      strokeWidth={2.5}
      strokeLinecap="round"
      variants={assembleVariants}
      initial="assembling"
      animate={variant}
      style={{ transformOrigin: "16px 16px" }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Corner ticks — small HUD flourishes in each corner
   ───────────────────────────────────────────────────────────── */
function CornerTicks() {
  const common = "absolute w-4 h-4 pointer-events-none";
  const stroke = "rgba(255,255,255,0.12)";

  return (
    <>
      <svg className={`${common} top-6 left-6`} viewBox="0 0 16 16" fill="none">
        <path d="M0 8V0H8" stroke={stroke} strokeWidth="1" />
      </svg>
      <svg className={`${common} top-6 right-6`} viewBox="0 0 16 16" fill="none">
        <path d="M16 8V0H8" stroke={stroke} strokeWidth="1" />
      </svg>
      <svg className={`${common} bottom-6 left-6`} viewBox="0 0 16 16" fill="none">
        <path d="M0 8V16H8" stroke={stroke} strokeWidth="1" />
      </svg>
      <svg className={`${common} bottom-6 right-6`} viewBox="0 0 16 16" fill="none">
        <path d="M16 8V16H8" stroke={stroke} strokeWidth="1" />
      </svg>
    </>
  );
}