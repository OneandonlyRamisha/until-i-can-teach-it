"use client";

import { useEffect, useState } from "react";
import styles from "./pageLoader.module.css";

const MIN_DISPLAY_MS = 700;

export default function PageLoader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
      setTimeout(() => {
        setHiding(true);
        setTimeout(() => setGone(true), 650);
      }, wait);
    };

    window.addEventListener("canvas-ready", dismiss, { once: true });

    // Fallback for pages without ScrollCanvas (blog, about, etc.)
    const onLoad = () => dismiss();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Hard cap: always dismiss after 6s regardless
    const cap = setTimeout(dismiss, 6000);

    return () => {
      window.removeEventListener("canvas-ready", dismiss);
      window.removeEventListener("load", onLoad);
      clearTimeout(cap);
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.loader} ${hiding ? styles.hiding : ""}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>A Philosophical Journal</p>
        <h2 className={styles.title}>
          Until I Can
          <br />
          <em>Teach It</em>
        </h2>
        <div className={styles.track}>
          <div className={styles.fill} />
        </div>
      </div>
    </div>
  );
}
