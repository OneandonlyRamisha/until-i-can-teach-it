import Link from "next/link";
import styles from "./ctaSection.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>What comes next?</span>
        <h2 className={styles.title}>
          Start <em>reading.</em>
        </h2>
        <p className={styles.subtitle}>
          Browse all essays on stoicism, ethics, metaphysics, and more.
        </p>
        <Link href="/blog" className={styles.cta}>
          <span>Browse All Essays</span>
          <FaArrowRightLong className={styles.icon} />
        </Link>
      </div>
    </section>
  );
}
