import styles from "./quoteSection.module.css";

export default function QuoteSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.openMark}>&ldquo;</span>
        <blockquote className={styles.quote}>
          We suffer more often<br />in imagination<br />than in reality.
        </blockquote>
        <cite className={styles.attribution}>— Seneca</cite>
      </div>
    </section>
  );
}
