import StartHereContainer from "@/components/startHereContainer/startHereContainer";
import styles from "./startHereSection.module.css";
import { getPosts } from "@/lib/posts";

export default async function StartHereSection() {
  const data = await getPosts({ limit: 2 });

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.label}>Recommended Reading</span>
          <h2 className={styles.title}>
            Start <em>Here</em>
          </h2>
        </div>
        <p className={styles.subtitle}>
          New to the journal? These essays are the best place to start.
        </p>
      </div>
      <div className={styles.grid}>
        {data.map((i, index) => (
          <StartHereContainer
            key={i.slug}
            header={i.header}
            url={i.slug}
            category={i.category}
            des={i.des}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
