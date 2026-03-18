"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./scrollCanvas.module.css";

const FRAME_COUNT = 121;
const BG = "#F5F4ED";

function getFrame(set: 1 | 2 | 3, index: number): string {
  const n = String(Math.min(Math.max(index, 1), FRAME_COUNT)).padStart(4, "0");
  return `/img${set}-frames/frame_${n}.webp`;
}

function ease(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

function mapRange(
  v: number,
  a: number,
  b: number,
  c: number,
  d: number,
): number {
  return c + ((clamp(v, a, b) - a) / (b - a)) * (d - c);
}

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const img1Ref = useRef<HTMLImageElement[]>([]);
  const img2Ref = useRef<HTMLImageElement[]>([]);
  const img3Ref = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const floatRafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 0 });

  // DOM overlay refs
  const titleRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const eyeOverlayRef = useRef<HTMLDivElement>(null);
  const frameDecoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const draw = useCallback((p: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const { w, h, dpr: d } = sizeRef.current;

    if (w !== rect.width || h !== rect.height || d !== dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = rect.width;
    const H = rect.height;

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    const t = performance.now() / 1000;

    // ── Mobile / portrait tablet: static single-screen hero ──
    // Draw statue full-width rising from ~38% down; gentle float
    if (W <= 768 || (W <= 1024 && H > W)) {
      const imgArr = img1Ref.current;
      const img = imgArr[0];
      if (img?.complete && img.naturalWidth) {
        const fs = W;
        const dx = 0;
        const floatOffset = Math.sin(t * 0.75) * 5;
        const dy = H * 0.38 + floatOffset;
        const CROP_PX = 70;
        const srcCrop = Math.round(img.naturalHeight * (CROP_PX / fs));
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight - srcCrop, dx, dy, fs, fs);
      }
      return;
    }

    // ── Desktop: full scroll-driven three-act animation ──
    const fs1 = W > H ? H : W;
    const rightHalfDx = W * 0.5 + (W * 0.5 - fs1) / 2;

    let imgArr: HTMLImageElement[];
    let fi: number;
    let fs: number;
    let dx: number;
    let dy: number;

    const floatAmp =
      p < 0.3 ? 10 : p < 0.65 ? mapRange(p, 0.3, 0.65, 10, 0) : 0;
    const floatOffset = Math.sin(t * 0.75) * floatAmp;

    if (p < 0.3) {
      imgArr = img1Ref.current;
      fi = Math.round((p / 0.3) * (FRAME_COUNT - 1));
      fs = fs1;
      dx = rightHalfDx;
      dy = (H - fs) / 2 + floatOffset;
    } else if (p < 0.65) {
      imgArr = img2Ref.current;
      const act2p = (p - 0.3) / 0.35;
      fi = Math.round(act2p * (FRAME_COUNT - 1));
      fs = clamp(mapRange(act2p, 0, 0.45, fs1, W), fs1, W);
      dx = clamp(mapRange(act2p, 0, 0.45, rightHalfDx, 0), 0, rightHalfDx);
      dy = (H - fs) / 2 + floatOffset;
    } else {
      imgArr = img3Ref.current;
      fi = Math.round(((p - 0.65) / 0.35) * (FRAME_COUNT - 1));
      fs = W;
      dx = 0;
      dy = (H - W) / 2;
    }

    fi = clamp(fi, 0, FRAME_COUNT - 1);
    const img = imgArr[fi];
    if (img?.complete && img.naturalWidth) {
      const CROP_PX = 70;
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      const srcCrop = Math.round(srcH * (CROP_PX / fs));
      ctx.drawImage(img, 0, 0, srcW, srcH - srcCrop, dx, dy, fs, fs);
    }
  }, []);

  const updateDOM = useCallback((p: number) => {
    // ─── Scroll hint ───
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = String(
        clamp(mapRange(p, 0, 0.06, 1, 0), 0, 1),
      );
    }

    // ─── Title ───
    if (titleRef.current) {
      const op =
        p < 0.3
          ? 1
          : p < 0.405
            ? clamp(mapRange(p, 0.3, 0.405, 1, 0), 0, 1)
            : 0;

      titleRef.current.style.opacity = String(op);
      titleRef.current.style.left = "8%";
      titleRef.current.style.transform = "translateY(-50%) translateX(0%)";
    }

    // ─── Divider + frame decoration ───
    const decoOp = clamp(mapRange(p, 0.25, 0.35, 1, 0), 0, 1);
    if (dividerRef.current) dividerRef.current.style.opacity = String(decoOp);
    if (frameDecoRef.current)
      frameDecoRef.current.style.opacity = String(decoOp);

    // ─── Side texts ───
    const getSideTextOp = (p: number, fromRight: boolean) => {
      const base = fromRight ? 24 : -24;
      if (p < 0.555) return { op: 0, tx: base };
      if (p < 0.592)
        return {
          op: ease(mapRange(p, 0.555, 0.592, 0, 1)),
          tx: mapRange(p, 0.555, 0.592, base, 0),
        };
      if (p < 0.658) return { op: 1, tx: 0 };
      if (p < 0.676)
        return {
          op: ease(mapRange(p, 0.658, 0.676, 1, 0)),
          tx: mapRange(p, 0.658, 0.676, 0, base),
        };
      return { op: 0, tx: base };
    };

    if (leftTextRef.current) {
      const { op, tx } = getSideTextOp(p, false);
      leftTextRef.current.style.opacity = String(clamp(op, 0, 1));
      leftTextRef.current.style.transform = `translateX(${tx}px)`;
    }

    if (rightTextRef.current) {
      const { op, tx } = getSideTextOp(p, true);
      rightTextRef.current.style.opacity = String(clamp(op, 0, 1));
      rightTextRef.current.style.transform = `translateX(${tx}px)`;
    }

    // ─── Act 3: eye vignette ───
    if (eyeOverlayRef.current) {
      let op = 0;
      if (p >= 0.65) {
        const a3 = (p - 0.65) / 0.35;
        if (a3 >= 0.8) op = ease(mapRange(a3, 0.8, 1.0, 0, 1));
      }
      eyeOverlayRef.current.style.opacity = String(clamp(op, 0, 1));
    }

    // ─── Act 3: quote ───
    if (quoteRef.current) {
      let op = 0;
      let ty = 20;
      if (p >= 0.65) {
        const a3 = (p - 0.65) / 0.35;
        if (a3 >= 0.92) {
          op = ease(mapRange(a3, 0.92, 1.0, 0, 1));
          ty = mapRange(a3, 0.92, 1.0, 20, 0);
        }
      }
      quoteRef.current.style.opacity = String(clamp(op, 0, 1));
      quoteRef.current.style.transform = `translateY(${ty}px)`;
    }
  }, []);

  const onScroll = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const iw = window.innerWidth;
    const ih = window.innerHeight;
    // Mobile / portrait tablet: no scroll-driven animation
    if (iw <= 768 || (iw <= 1024 && ih > iw)) return;
    const scrollable = c.scrollHeight - ih;
    // Guard against degenerate scrollable values (e.g. 100vh > 100dvh on iOS)
    if (scrollable < 100) return;
    const p = clamp(-c.getBoundingClientRect().top / scrollable, 0, 1);
    progressRef.current = p;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      draw(p);
      updateDOM(p);
    });
  }, [draw, updateDOM]);

  useEffect(() => {
    const loadSet = (
      set: 1 | 2 | 3,
      ref: React.RefObject<HTMLImageElement[]>,
      delay: number,
      onFirstFrame?: () => void,
    ) => {
      const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
      let drawn = false;

      const loadFrame = (i: number) => {
        const img = new Image();
        img.src = getFrame(set, i + 1);
        img.onload = () => {
          if (!drawn && i === 0 && onFirstFrame) {
            drawn = true;
            onFirstFrame();
          }
        };
        imgs[i] = img;
      };

      if (delay === 0) {
        for (let i = 0; i < Math.min(12, FRAME_COUNT); i++) loadFrame(i);
        setTimeout(() => {
          for (let i = 12; i < FRAME_COUNT; i++) loadFrame(i);
        }, 100);
      } else {
        setTimeout(() => {
          for (let i = 0; i < FRAME_COUNT; i++) loadFrame(i);
        }, delay);
      }

      ref.current = imgs;
    };

    loadSet(1, img1Ref, 0, () => {
      draw(0);
      updateDOM(0);
    });
    loadSet(2, img2Ref, 400);
    loadSet(3, img3Ref, 800);

    // Float loop: always runs on mobile/portrait-tablet (static float); runs on desktop during Acts 1 & 2
    const floatLoop = () => {
      const iw = window.innerWidth;
      const ih = window.innerHeight;
      if (iw <= 768 || (iw <= 1024 && ih > iw) || progressRef.current < 0.65) {
        draw(progressRef.current);
      }
      floatRafRef.current = requestAnimationFrame(floatLoop);
    };
    floatRafRef.current = requestAnimationFrame(floatLoop);

    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      sizeRef.current = { w: 0, h: 0, dpr: 0 };
      // If switching to mobile, reset progress so no stale desktop frame is shown
      const iw = window.innerWidth;
      const ih = window.innerHeight;
      if (iw <= 768 || (iw <= 1024 && ih > iw)) progressRef.current = 0;
      draw(progressRef.current);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(floatRafRef.current);
    };
  }, [draw, onScroll, updateDOM]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />

        {/* Mobile gradient: parchment at top fades into the statue below */}
        <div className={styles.mobileOverlay} />

        {/* Act 1: decorative border around right-half statue area */}
        <div ref={frameDecoRef} className={styles.frameDeco} />

        {/* Act 1: vertical divider at 50% */}
        <div ref={dividerRef} className={styles.divider} />

        {/* Act 1→2: title block */}
        <div ref={titleRef} className={styles.titleBlock}>
          <span className={styles.eyebrow}>A Philosophical Journal</span>
          <h1 className={styles.titleHeading}>
            <span className={styles.titleTop}>Until I Can</span>
            <em className={styles.titleBottom}>Teach It</em>
          </h1>
          <p className={styles.tagline}>
            Philosophy essays — written
            <br />
            to understand, not to impress.
          </p>
          <div ref={scrollHintRef} className={styles.scrollHint}>
            <span className={styles.scrollBar} />
            <span className={styles.scrollLabel}>Scroll</span>
          </div>
        </div>

        {/* Act 2: left side text */}
        <div
          ref={leftTextRef}
          className={styles.leftText}
          style={{ opacity: 0 }}
        >
          <span className={styles.sideEyebrow}>Philosophy</span>
          <p className={styles.sideBody}>
            If I can explain it clearly,
            <br />I understand it.
          </p>
        </div>

        {/* Act 2: right side text */}
        <div
          ref={rightTextRef}
          className={styles.rightText}
          style={{ opacity: 0 }}
        >
          <p className={styles.sideTagline}>
            One subject.
            <br />
            Endless questions.
          </p>
        </div>

        {/* Act 3: radial eye vignette */}
        <div
          ref={eyeOverlayRef}
          className={styles.eyeOverlay}
          style={{ opacity: 0 }}
        />

        {/* Act 3: quote overlay */}
        <div
          ref={quoteRef}
          className={styles.quoteOverlay}
          style={{ opacity: 0 }}
        >
          <blockquote className={styles.overlayQuote}>
            &ldquo;The unexamined life<br />is not worth living.&rdquo;
          </blockquote>
          <cite className={styles.overlayAttribution}>— Socrates</cite>
        </div>
      </div>
    </div>
  );
}
