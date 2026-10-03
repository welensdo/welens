"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { WeLensReceipt, type WeLensReceiptProps } from "./WeLensReceipt";

function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

const AUDIO_DURATION_MS = 3192;
const RECEIPT_AUDIO_SRC = new URL("receipt-printer.mp3", "https://cool.prepx.cfd/").toString();
const TEAR_AUDIO_SRC = new URL("paper-tearing.mp3", "https://cool.prepx.cfd/").toString();
const PAPER_HEIGHT = 680; // Aumentado significativamente para mostrar todo el contenido
const ZIG_ZAG_REVEAL = 12;
const PRINT_EDGE_BUFFER = 10;
const TEAR_THRESHOLD = 52;
const MAX_DRAG_DISTANCE = 260;
const SNAP_DURATION_MS = 160;
const TEAR_DURATION_MS = 210;
const FALL_DURATION_MS = 680;
const PAPER_FORWARD_TILT = 5;

type ReceiptPhase = "idle" | "printing" | "ready" | "snapping" | "tearing" | "falling";

type FallMotion = {
  x: number;
  y: number;
  rotation: number;
  opacity: number;
};

type GestureState = {
  active: boolean;
  keyboardGrabbed: boolean;
  pointerId: number | null;
  startX: number;
  startY: number;
};

export type WeLensReceiptPrinterProps = {
  className?: string;
  audioSrc?: string;
  tearAudioSrc?: string;
  receiptData: WeLensReceiptProps;
  autoStart?: boolean;
  onPrintComplete?: () => void;
  onTearComplete?: () => void;
  onPrintProgress?: (progress: number) => void;
};

export type WeLensReceiptPrinterHandle = {
  open: () => void;
  print: () => void;
  reset: () => void;
};

const INITIAL_FALL: FallMotion = { x: 0, y: 0, rotation: 0, opacity: 1 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value: number) {
  const clamped = clamp(value, 0, 1);
  return 1 - (1 - clamped) ** 3;
}

function clampDragVector(x: number, y: number) {
  const distance = Math.hypot(x, y);
  if (distance <= MAX_DRAG_DISTANCE || distance === 0) {
    return { x, y };
  }
  const scale = MAX_DRAG_DISTANCE / distance;
  return { x: x * scale, y: y * scale };
}

function createZigZagClipPath(teeth = 22) {
  const points = ["0% 0%", "100% 0%", "100% 97%"];
  for (let index = teeth; index >= 0; index -= 1) {
    const x = (index / teeth) * 100;
    const y = index % 2 === 0 ? 100 : 95;
    points.push(x + "% " + y + "%");
  }
  points.push("0% 0%");
  return "polygon(" + points.join(", ") + ")";
}

function createTearClipPaths(teeth = 16) {
  const seam: string[] = [];
  for (let index = 0; index <= teeth; index += 1) {
    const x = (index / teeth) * 100;
    const y = index % 2 === 0 ? 7.2 + (index % 3) * 0.25 : 9.7 - (index % 4) * 0.2;
    seam.push(x + "% " + y + "%");
  }

  const attached = ["0% 0%", "100% 0%"].concat([...seam].reverse());
  const lower = seam.concat(["100% 98%"]);

  for (let index = 10; index >= 0; index -= 1) {
    const x = (index / 10) * 100;
    lower.push(x + "% " + (index % 2 === 0 ? 100 : 98) + "%");
  }

  return {
    attached: "polygon(" + attached.join(", ") + ")",
    lower: "polygon(" + lower.join(", ") + ")",
  };
}

const FONT_STYLES = [
  "@font-face {",
  "font-family: \"Louize\";",
  "src: url(\"https://cdn.21st.dev/assets/mirror/31/31a5a75fe4ab8b05c7013ee0f0548fe2472cb133789c37e70313f005efbf8210.woff\") format(\"woff2\");",
  "font-display: swap;",
  "font-style: normal;",
  "font-weight: 400;",
  "}",
  "@font-face {",
  "font-family: \"Geist Pixel\";",
  "src: url(\"https://cdn.21st.dev/assets/mirror/2e/2ed63dce777ba4093eb48c7f3f0d8f13b1ab38d6b450bba80f848903926447a6.ttf\") format(\"truetype\");",
  "font-display: swap;",
  "font-style: normal;",
  "font-weight: 400;",
  "}",
  "[data-receipt-printer-scene] { color: #000000; font-family: \"Louize\"; }",
  "[data-receipt-printer-scene] .receipt-printer-pixel { font-family: \"Geist Pixel\"; }",
].join("\n");

const WeLensReceiptPrinter = forwardRef<WeLensReceiptPrinterHandle, WeLensReceiptPrinterProps>(
  function WeLensReceiptPrinter(
    {
      className,
      audioSrc = RECEIPT_AUDIO_SRC,
      tearAudioSrc = TEAR_AUDIO_SRC,
      receiptData,
      autoStart = true,
      onPrintComplete,
      onTearComplete,
    },
    ref,
  ) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const tearAudioRef = useRef<HTMLAudioElement>(null);
    const audioAvailableRef = useRef<boolean | null>(null);
    const tearAudioAvailableRef = useRef<boolean | null>(null);
    const frameRef = useRef<number | null>(null);
    const durationRef = useRef(AUDIO_DURATION_MS);
    const printStartedAtRef = useRef(0);
    const snapStartedAtRef = useRef(0);
    const snapStartXRef = useRef(0);
    const snapStartYRef = useRef(0);
    const tearStartedAtRef = useRef(0);
    const fallStartedAtRef = useRef(0);
    const fallStartXRef = useRef(0);
    const fallStartRotationRef = useRef(0);
    const fallDirectionRef = useRef(1);
    const phaseRef = useRef<ReceiptPhase>("idle");
    const reducedMotionRef = useRef(false);
    const gestureRef = useRef<GestureState>({ 
      active: false, 
      keyboardGrabbed: false, 
      pointerId: null, 
      startX: 0, 
      startY: 0 
    });
    const tearOffsetRef = useRef(0);
    const tearOffsetYRef = useRef(0);

    const [phase, setPhase] = useState<ReceiptPhase>("idle");
    const [printProgress, setPrintProgress] = useState(0);
    const [tearProgress, setTearProgress] = useState(0);
    const [tearOffset, setTearOffset] = useState(0);
    const [tearOffsetY, setTearOffsetY] = useState(0);
    const [fallMotion, setFallMotion] = useState(INITIAL_FALL);
    const [reducedMotion, setReducedMotion] = useState(false);

    const id = useId();
    const receiptId = "receipt-printer-instructions-" + id.replace(/:/g, "");

    const zigZagClipPath = useMemo(() => createZigZagClipPath(), []);
    const tearClipPaths = useMemo(() => createTearClipPaths(), []);

    const isReady = phase === "ready";
    const isSplit = phase === "tearing" || phase === "falling";
    const paperVisibleHeight = phase === "printing" ? PAPER_HEIGHT * printProgress : PAPER_HEIGHT;
    const revealAllowance = phase === "printing" ? ZIG_ZAG_REVEAL * (1 - printProgress) : 0;
    const paperWindowHeight = phase === "printing" ? paperVisibleHeight + revealAllowance + PRINT_EDGE_BUFFER : PAPER_HEIGHT;
    const paperY = phase === "printing" ? paperVisibleHeight - PAPER_HEIGHT + revealAllowance : 0;
    const paperBend = phase === "printing" ? PAPER_FORWARD_TILT * printProgress : phase === "ready" || phase === "snapping" || phase === "tearing" || phase === "falling" ? PAPER_FORWARD_TILT : 0;

    const dragShear = tearOffset * 0.07 + tearOffsetY * 0.025;
    const dragRotation = tearOffset * 0.001;

    const normalTransform =
      phase === "printing"
        ? "perspective(900px) translate3d(-50%, " + paperY + "px, 0) rotateX(" + paperBend + "deg)"
        : "perspective(900px) translate3d(-50%, 0, 0) rotateX(" + paperBend + "deg) skewX(" + dragShear + "deg) rotateZ(" + dragRotation + "deg)";

    const paperShadowTransform = normalTransform + " translate3d(6px, 10px, 0)";

    const pieceProgress = phase === "tearing" ? easeOutCubic(tearProgress) : 1;
    const pieceGap = phase === "tearing" ? 1 + 10 * pieceProgress : phase === "falling" ? 11 : 0;
    const pieceX = phase === "tearing" ? tearOffset * 0.05 * pieceProgress : phase === "falling" ? fallMotion.x : 0;
    const pieceY = phase === "tearing" ? tearOffsetY * 0.05 * pieceProgress : phase === "falling" ? tearOffsetY * 0.05 : 0;
    const pieceDirection = tearOffset !== 0 ? (tearOffset < 0 ? -1 : 1) : tearOffsetY < 0 ? -1 : 1;
    const pieceRotation = phase === "tearing" ? pieceDirection * 0.7 * pieceProgress : fallMotion.rotation;

    const pieceTransform =
      "perspective(900px) translate3d(calc(-50% + " + (tearOffset + pieceX) + "px), " + (tearOffsetY + pieceGap + pieceY + fallMotion.y) + "px, 0) rotateX(" + paperBend + "deg) skewX(" + dragShear + "deg) rotateZ(" + (dragRotation + pieceRotation) + "deg)";

    const paperClass = "absolute left-1/2 top-0 z-20 h-[42.5rem] w-[18.25rem] max-w-[80vw] bg-[#fffefb] text-black shadow-[0_26px_36px_-20px_rgba(0,0,0,0.62),0_9px_16px_-11px_rgba(0,0,0,0.42)] will-change-transform";

    const paperShadow = phase === "printing"
      ? "drop-shadow(0 10px 10px rgba(0, 0, 0, 0.2))"
      : "drop-shadow(0 18px 16px rgba(0, 0, 0, 0.38)) drop-shadow(0 4px 5px rgba(0, 0, 0, 0.24))";

    // Component methods continue as in original but adapted for WeLens
    const updatePhase = useCallback((nextPhase: ReceiptPhase) => {
      phaseRef.current = nextPhase;
      setPhase(nextPhase);
    }, []);

    const stopAnimation = useCallback(() => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    }, []);

    const stopTearAudio = useCallback(() => {
      const audio = tearAudioRef.current;
      if (!audio) return;
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch {}
    }, []);

    const startTearAudio = useCallback(() => {
      const audio = tearAudioRef.current;
      if (!audio || tearAudioAvailableRef.current === false) return;
      try {
        audio.currentTime = 0;
      } catch {}
      const playPromise = audio.play();
      if (playPromise) {
        void playPromise.catch(() => undefined);
      }
    }, []);

    // Auto-start effect
    useEffect(() => {
      if (autoStart && phase === "idle") {
        const timer = setTimeout(() => {
          startPrint();
        }, 1000); // Start after 1 second
        return () => clearTimeout(timer);
      }
    }, [autoStart, phase]);

    // Animation effects (simplified version of original)
    useEffect(() => {
      if (phase !== "printing" && phase !== "snapping" && phase !== "tearing" && phase !== "falling") return;

      const startedAt =
        phase === "printing"
          ? printStartedAtRef.current
          : phase === "snapping"
            ? snapStartedAtRef.current
            : phase === "tearing"
              ? tearStartedAtRef.current
              : fallStartedAtRef.current;

      const animate = (now: number) => {
        if (phase === "printing") {
          const progress = clamp((now - startedAt) / durationRef.current, 0, 1);
          setPrintProgress(progress);
          if (progress >= 1) {
            frameRef.current = null;
            updatePhase("ready");
            onPrintComplete?.();
            return;
          }
        } else if (phase === "snapping") {
          const progress = clamp((now - startedAt) / SNAP_DURATION_MS, 0, 1);
          const nextOffset = snapStartXRef.current * (1 - easeOutCubic(progress));
          const nextOffsetY = snapStartYRef.current * (1 - easeOutCubic(progress));
          tearOffsetRef.current = nextOffset;
          tearOffsetYRef.current = nextOffsetY;
          setTearOffset(nextOffset);
          setTearOffsetY(nextOffsetY);
          if (progress >= 1) {
            frameRef.current = null;
            tearOffsetRef.current = 0;
            tearOffsetYRef.current = 0;
            setTearOffset(0);
            setTearOffsetY(0);
            updatePhase("ready");
            return;
          }
        } else if (phase === "tearing") {
          const progress = clamp((now - startedAt) / TEAR_DURATION_MS, 0, 1);
          setTearProgress(progress);
          if (progress >= 1) {
            frameRef.current = null;
            fallStartedAtRef.current = now;
            fallStartXRef.current = tearOffsetRef.current * 0.05;
            fallStartRotationRef.current = fallDirectionRef.current * 0.7;
            setFallMotion({ x: fallStartXRef.current, y: 0, rotation: fallStartRotationRef.current, opacity: 1 });
            updatePhase("falling");
            return;
          }
        } else {
          const progress = clamp((now - startedAt) / FALL_DURATION_MS, 0, 1);
          const eased = progress * progress;
          const opacity = progress < 0.72 ? 1 : 1 - (progress - 0.72) / 0.28;
          setFallMotion({
            x: fallStartXRef.current + fallDirectionRef.current * (18 * progress + 46 * eased),
            y: 540 * eased,
            rotation: fallStartRotationRef.current + fallDirectionRef.current * (3 * progress + 32 * eased),
            opacity: clamp(opacity, 0, 1),
          });
          if (progress >= 1) {
            frameRef.current = null;
            tearOffsetRef.current = 0;
            tearOffsetYRef.current = 0;
            setTearOffset(0);
            setTearOffsetY(0);
            setTearProgress(0);
            setFallMotion(INITIAL_FALL);
            updatePhase("idle");
            onTearComplete?.();
            return;
          }
        }
        frameRef.current = requestAnimationFrame(animate);
      };

      frameRef.current = requestAnimationFrame(animate);
      return stopAnimation;
    }, [onPrintComplete, onTearComplete, phase, stopAnimation, updatePhase]);

    // Gesture handlers (simplified for touch interaction)
    const triggerTear = useCallback(() => {
      if (phaseRef.current !== "ready") return;
      const direction = tearOffsetRef.current < 0 ? -1 : 1;
      gestureRef.current = { active: false, keyboardGrabbed: false, pointerId: null, startX: 0, startY: 0 };
      fallDirectionRef.current = direction;
      
      if (reducedMotionRef.current) {
        tearOffsetRef.current = 0;
        tearOffsetYRef.current = 0;
        setTearOffset(0);
        setTearOffsetY(0);
        setFallMotion({ x: 0, y: 0, rotation: direction * 4, opacity: 0 });
        updatePhase("idle");
        onTearComplete?.();
        return;
      }

      stopAnimation();
      startTearAudio();
      tearStartedAtRef.current = performance.now();
      setTearProgress(0);
      updatePhase("tearing");
    }, [onTearComplete, startTearAudio, stopAnimation, updatePhase]);

    const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
      if (phaseRef.current !== "ready" || event.button !== 0) return;
      event.preventDefault();
      gestureRef.current = { active: true, keyboardGrabbed: false, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY };
      event.currentTarget.setPointerCapture(event.pointerId);
    }, []);

    const onPointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
      const gesture = gestureRef.current;
      if (!gesture.active || gesture.pointerId !== event.pointerId || phaseRef.current !== "ready") return;
      const drag = clampDragVector(event.clientX - gesture.startX, event.clientY - gesture.startY);
      tearOffsetRef.current = drag.x;
      tearOffsetYRef.current = drag.y;
      setTearOffset(drag.x);
      setTearOffsetY(drag.y);
      if (Math.hypot(drag.x, drag.y) >= TEAR_THRESHOLD) {
        triggerTear();
      }
    }, [triggerTear]);

    const onPointerUp = useCallback((event: ReactPointerEvent<HTMLElement>) => {
      const gesture = gestureRef.current;
      if (!gesture.active || gesture.pointerId !== event.pointerId) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      if (Math.hypot(tearOffsetRef.current, tearOffsetYRef.current) >= TEAR_THRESHOLD) {
        triggerTear();
      }
    }, [triggerTear]);

    const resetReceipt = useCallback(() => {
      stopAnimation();
      audioRef.current?.pause();
      stopTearAudio();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      gestureRef.current = { active: false, keyboardGrabbed: false, pointerId: null, startX: 0, startY: 0 };
      tearOffsetRef.current = 0;
      tearOffsetYRef.current = 0;
      setPrintProgress(0);
      setTearProgress(0);
      setTearOffset(0);
      setTearOffsetY(0);
      setFallMotion(INITIAL_FALL);
      updatePhase("idle");
    }, [stopAnimation, stopTearAudio, updatePhase]);

    const startPrint = useCallback(() => {
      stopAnimation();
      stopTearAudio();
      const audio = audioRef.current;
      const duration = audio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration * 1000 : durationRef.current;
      durationRef.current = duration;
      gestureRef.current = { active: false, keyboardGrabbed: false, pointerId: null, startX: 0, startY: 0 };
      tearOffsetRef.current = 0;
      tearOffsetYRef.current = 0;
      setPrintProgress(0);
      setTearProgress(0);
      setTearOffset(0);
      setTearOffsetY(0);
      setFallMotion(INITIAL_FALL);

      const beginPrintAnimation = () => {
        printStartedAtRef.current = performance.now();
        updatePhase("printing");
        if (reducedMotionRef.current) {
          setPrintProgress(1);
          updatePhase("ready");
          onPrintComplete?.();
        }
      };

      beginPrintAnimation();

      if (!audio || reducedMotionRef.current || audioAvailableRef.current === false) return;
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch {}
      const playPromise = audio.play();
      if (playPromise) {
        void playPromise.then(() => {
          audioAvailableRef.current = true;
        }).catch(() => {
          audioAvailableRef.current = false;
        });
      }
    }, [onPrintComplete, stopAnimation, stopTearAudio, updatePhase]);

    useImperativeHandle(ref, () => ({ open: startPrint, print: startPrint, reset: resetReceipt }), [resetReceipt, startPrint]);

    return (
      <div
        className={cn("relative isolate h-[44rem] w-full max-w-[35rem] overflow-visible", className)}
        data-receipt-phase={phase}
        data-receipt-printer-scene
      >
        <style>{FONT_STYLES}</style>

        {/* Printer slit */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[7.5rem] z-30 h-2 w-[min(20rem,80vw)] -translate-x-1/2 rounded-full bg-[#343737] shadow-[inset_0_2px_3px_rgba(0,0,0,0.72),0_3px_5px_rgba(0,0,0,0.28)]"
        />

        {/* Printer body */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[7rem] z-40 h-6 w-[min(23rem,84vw)] -translate-x-1/2 overflow-visible drop-shadow-[0_5px_8px_rgba(0,0,0,0.3)]"
          focusable="false"
          preserveAspectRatio="none"
          viewBox="0 0 368 24"
        >
          <path
            d="M 12 0 H 356 A 12 12 0 0 1 368 12 A 12 12 0 0 1 356 24 H 12 A 12 12 0 0 1 0 12 A 12 12 0 0 1 12 0 Z M 28 8 H 340 A 4 4 0 0 1 344 12 V 24 H 24 V 12 A 4 4 0 0 1 28 8 Z"
            fill="#c1c4c4"
            fillRule="evenodd"
          />
          <path
            d="M 28 8 H 340 A 4 4 0 0 1 344 12 V 24 M 24 24 V 12 A 4 4 0 0 1 28 8"
            fill="none"
            stroke="#343737"
            strokeOpacity="0.86"
            strokeWidth="1.25"
          />
          <path
            d="M 12 1 H 356 A 11 11 0 0 1 367 12"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.62"
            strokeWidth="1"
          />
        </svg>

        {/* Paper container */}
        <div
          className="absolute inset-x-0 top-[7.5rem] z-20"
          style={{
            height: paperWindowHeight + "px",
            overflow: phase === "printing" ? "hidden" : "visible",
            pointerEvents: "none",
          }}
        >
          {/* Paper shadow con zigzag - solo aparece cuando el recibo está completamente listo */}
          {!isSplit && phase === "ready" && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 z-10 h-[43rem] w-[18.25rem] max-w-[80vw] bg-black/40 blur-[9px]"
              style={{ 
                clipPath: zigZagClipPath, 
                opacity: 0.46, 
                transform: paperShadowTransform 
              }}
            />
          )}

          {/* Single receipt */}
          {!isSplit && phase !== "idle" && (
            <article
              aria-label="Recibo impreso de WeLens. Desliza para arrancarlo."
              className={cn(
                paperClass,
                "origin-top outline-none focus-visible:ring-2 focus-visible:ring-pricing-blue focus-visible:ring-offset-4",
                isReady && "cursor-grab touch-none active:cursor-grabbing",
              )}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              role="button"
              style={{
                clipPath: zigZagClipPath,
                opacity: phase === "printing" || isReady || phase === "snapping" ? 1 : 0,
                filter: paperShadow,
                pointerEvents: isReady ? "auto" : "none",
                transform: normalTransform,
                transformOrigin: "50% 0%",
              }}
              tabIndex={isReady ? 0 : -1}
            >
              <WeLensReceipt {...receiptData} />
            </article>
          )}

          {/* Split receipt (tearing/falling) */}
          {isSplit && (
            <>
              <div
                aria-hidden="true"
                className={cn(paperClass, "pointer-events-none origin-top")}
                style={{
                  clipPath: tearClipPaths.attached,
                  filter: paperShadow,
                  transform: normalTransform,
                  transformOrigin: "50% 8%",
                }}
              >
                <WeLensReceipt {...receiptData} />
              </div>

              <div
                aria-hidden="true"
                className={cn(paperClass, "pointer-events-none origin-top")}
                style={{
                  clipPath: tearClipPaths.lower,
                  filter: paperShadow,
                  opacity: fallMotion.opacity,
                  transform: pieceTransform,
                  transformOrigin: "50% 8%",
                }}
              >
                <WeLensReceipt {...receiptData} />
              </div>
            </>
          )}
        </div>

        {/* Audio elements */}
        <audio ref={audioRef} aria-hidden="true" preload="auto" src={audioSrc} />
        <audio ref={tearAudioRef} aria-hidden="true" preload="auto" src={tearAudioSrc} />

        {/* Screen reader instructions */}
        <p className="sr-only" id={receiptId}>
          El recibo se imprime automáticamente. Cuando esté listo, deslízalo en cualquier dirección para arrancarlo de la impresora.
        </p>
      </div>
    );
  }
);

export default WeLensReceiptPrinter;