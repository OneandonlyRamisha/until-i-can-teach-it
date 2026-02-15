import styles from "./heroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Until I Can Teach It</h1>
        <span className={styles.line}></span>
      </div>

      <h3 className={styles.subheader}>
        {`  A personal space where I write about what I'm learning — from
              philosophy and sales to coding and books. If I can explain it clearly,
              I understand it. If not, I keep learning.`}
      </h3>
    </section>
  );
}
