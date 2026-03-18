import styles from "./marqueeSection.module.css";

const row1 = [
  "Logos", "Eudaimonia", "Virtue", "Reason", "Truth",
  "Wisdom", "Ethics", "Dialectic", "Aporia", "Catharsis",
  "Logos", "Eudaimonia", "Virtue", "Reason", "Truth",
  "Wisdom", "Ethics", "Dialectic", "Aporia", "Catharsis",
];

const row2 = [
  "Episteme", "Arete", "Kairos", "Nous", "Aletheia",
  "Phronesis", "Ataraxia", "Sophia", "Stoicism", "Telos",
  "Episteme", "Arete", "Kairos", "Nous", "Aletheia",
  "Phronesis", "Ataraxia", "Sophia", "Stoicism", "Telos",
];

export default function MarqueeSection() {
  return (
    <section className={styles.section} aria-hidden="true">
      <div className={`${styles.track} ${styles.trackLeft}`}>
        {row1.map((word, i) => (
          <span key={`r1-${i}`} className={styles.item}>
            {word}
            <span className={styles.dot}>·</span>
          </span>
        ))}
      </div>
      <div className={`${styles.track} ${styles.trackRight}`}>
        {row2.map((word, i) => (
          <span key={`r2-${i}`} className={`${styles.item} ${styles.itemAlt}`}>
            {word}
            <span className={styles.dot}>·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
