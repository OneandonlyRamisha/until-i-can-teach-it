import styles from "./manifestoSection.module.css";

const principles = [
  {
    n: "01",
    heading: "Clarity is the proof.",
    body: "If I struggle to explain an idea simply, I don't understand it — I've only memorized it. Every essay here is a stress-test of my own comprehension.",
  },
  {
    n: "02",
    heading: "Certainty is the enemy.",
    body: "The marble cracks. What looked solid becomes permeable under the right question. I keep learning because every answer reveals a deeper one.",
  },
  {
    n: "03",
    heading: "Understanding compounds.",
    body: "Philosophical ideas don't exist in isolation. Ethics echoes into metaphysics, epistemology into politics. Every concept connects to another — that's what makes philosophy worth doing.",
  },
];

export default function ManifestoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        <div className={styles.top}>
          <span className={styles.label}>001 / The Method</span>
          <p className={styles.opener}>
            Three things I hold onto as I write.
          </p>
        </div>

        <div className={styles.list}>
          {principles.map((p) => (
            <article key={p.n} className={styles.item}>
              <span className={styles.num}>{p.n}</span>
              <div className={styles.content}>
                <h3 className={styles.heading}>{p.heading}</h3>
                <p className={styles.body}>{p.body}</p>
              </div>
            </article>
          ))}
        </div>

      </div>

      <div className={styles.marqueeWrap} aria-hidden="true">
        <div className={styles.marquee}>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
          <span>Until I Can Teach It</span>
          <span className={styles.dot}>·</span>
        </div>
      </div>
    </section>
  );
}
