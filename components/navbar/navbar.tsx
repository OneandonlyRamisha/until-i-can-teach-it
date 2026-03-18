"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Essays" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [transparent, setTransparent] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setTransparent(false);
        if (window.innerWidth > 480) setMenuOpen(false);
        return;
      }
      const threshold = ((750 - 100) / 100) * window.innerHeight;
      setTransparent(window.scrollY < threshold);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const isHome = pathname === "/";

  return (
    <>
      <nav
        className={[
          styles.nav,
          isHome && transparent ? styles.navTransparent : "",
          menuOpen ? styles.navMenuOpen : "",
        ].filter(Boolean).join(" ")}
      >
        <div className={styles.inner}>
          <Link
            href="/"
            className={styles.logo}
            onClick={() => setMenuOpen(false)}
          >
            <em className={styles.logoText}>Until I Can Teach It</em>
          </Link>

          {/* Desktop links */}
          <div className={styles.links}>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${isActive(href) ? styles.active : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Burger button — mobile only */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
      >
        {/* Atmospheric watermark */}
        <span className={styles.watermark} aria-hidden="true">
          Philosophy
        </span>

        <nav className={styles.overlayNav} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`${styles.overlayLink} ${isActive(href) ? styles.overlayLinkActive : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className={styles.overlayNum}>0{i + 1}</span>
              <span className={styles.overlayLabel}>{label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.overlayFooter}>
          <span className={styles.overlayFooterText}>
            A Philosophy Journal
          </span>
          <span className={styles.overlayFooterDot}>·</span>
          <span className={styles.overlayFooterText}>by Luka</span>
        </div>
      </div>
    </>
  );
}
