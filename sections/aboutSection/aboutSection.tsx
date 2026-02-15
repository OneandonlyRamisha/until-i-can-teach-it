import Link from "next/link";
import styles from "./aboutSection.module.css";

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <span className={styles.line}></span>
      <p className={styles.aboutMe}>
        {`
          I'm a curious generalist who believes the best way to learn something
          is to teach it. This blog is my attempt to make sense of ideas across
          disciplines — from ancient philosophy to modern code. Every post is a
          test: if I can't explain it simply, I don't understand it well enough.`}
      </p>
      <Link href={"/about"} className={styles.cta}>
        Learn More About Me
      </Link>
    </section>
  );
}
