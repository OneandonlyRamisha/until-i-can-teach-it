import Link from "next/link";
import styles from "./aboutSection.module.css";
import { FaArrowRightLong } from "react-icons/fa6";

export default function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.top}>
          <span className={styles.label}>About the Author</span>
          <p className={styles.opener}>Luka · Philosophy Journal</p>
        </div>

        <h2 className={styles.statement}>
          I write to understand.<br />
          I publish when I can <em>teach it.</em>
        </h2>

        <div className={styles.bottom}>
          <p className={styles.text}>
            This is a philosophy journal — nothing else. I write about stoicism,
            ethics, metaphysics, and the questions philosophy has always asked.
            Every essay is a test: if I can&apos;t explain it simply, I
            don&apos;t understand it well enough yet.
          </p>
          <Link href="/about" className={styles.cta}>
            <span>Learn More</span>
            <FaArrowRightLong className={styles.ctaIcon} />
          </Link>
        </div>

      </div>
    </section>
  );
}
